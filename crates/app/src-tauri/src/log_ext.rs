use std::sync::mpsc::{self, RecvTimeoutError, SyncSender};
use std::sync::{Arc, Mutex};
use std::time::Duration;

use rusqlite::Connection;
use tracing::field::{Field, Visit};
use tracing::{Event, Subscriber};
use tracing_subscriber::Layer;
use tracing_subscriber::fmt::SubscriberBuilder;
use tracing_subscriber::layer::{Context, SubscriberExt};
use tracing_subscriber::util::SubscriberInitExt;

struct LogEntry {
    timestamp: i64, // Unix timestamp in milliseconds
    level: String,
    target: String,
    message: String,
}

struct DbLayer {
    buffer: Arc<Mutex<Vec<LogEntry>>>,
}

/// Returned by [`LogExt::setup_log_db`]. Call [`LogShutdown::flush_and_shutdown`]
/// on application exit to drain any buffered log entries before the process ends.
pub struct LogShutdown {
    shutdown_tx: SyncSender<()>,
    thread_handle: Option<std::thread::JoinHandle<()>>,
}

impl LogShutdown {
    /// Signals the flush thread to do a final write and blocks until it finishes.
    pub fn flush_and_shutdown(mut self) {
        let _ = self.shutdown_tx.send(());
        if let Some(handle) = self.thread_handle.take() {
            let _ = handle.join();
        }
    }
}

#[derive(Default)]
struct MessageVisitor {
    message: String,
}

impl Visit for MessageVisitor {
    // Called for literal &str messages (e.g. tracing::info!("hello"))
    fn record_str(&mut self, field: &Field, value: &str) {
        if field.name() == "message" {
            self.message = value.to_string();
        }
    }

    // Called for format_args! messages (e.g. tracing::info!("hello {}", name))
    fn record_debug(&mut self, field: &Field, value: &dyn std::fmt::Debug) {
        if field.name() == "message" {
            self.message = format!("{value:?}");
        }
    }
}

impl<S: Subscriber> Layer<S> for DbLayer {
    fn on_event(&self, event: &Event<'_>, _ctx: Context<'_, S>) {
        let meta = event.metadata();
        let mut visitor = MessageVisitor::default();
        event.record(&mut visitor);

        let entry = LogEntry {
            timestamp: chrono::Utc::now().timestamp_millis(),
            level: meta.level().to_string(),
            target: meta.target().to_string(),
            message: visitor.message,
        };

        if let Ok(mut buf) = self.buffer.lock() {
            buf.push(entry);
        }
    }
}

fn flush_buffer(conn: &mut Connection, buffer: &Arc<Mutex<Vec<LogEntry>>>) {
    let entries: Vec<LogEntry> = {
        let mut buf = buffer.lock().unwrap();
        std::mem::take(&mut *buf)
    };

    if entries.is_empty() {
        return;
    }

    match conn.transaction() {
        Ok(tx) => {
            for entry in &entries {
                let _ = tx.execute(
                    "INSERT INTO logs (timestamp, level, target, message)
                     VALUES (?1, ?2, ?3, ?4)",
                    rusqlite::params![entry.timestamp, entry.level, entry.target, entry.message],
                );
            }
            if let Err(e) = tx.commit() {
                eprintln!("Log flush commit failed: {e}");
            }
        }
        Err(e) => eprintln!("Log flush transaction failed: {e}"),
    }
}

pub trait LogExt {
    /// Attaches a SQLite log sink to the subscriber, initialises it as the
    /// global default, and returns a [`LogShutdown`] handle for a final flush
    /// on application exit.
    fn setup_log_db(self) -> LogShutdown;
}

impl LogExt for SubscriberBuilder {
    fn setup_log_db(self) -> LogShutdown {
        let buffer: Arc<Mutex<Vec<LogEntry>>> = Arc::new(Mutex::new(Vec::new()));
        let db_layer = DbLayer { buffer: buffer.clone() };
        let (shutdown_tx, shutdown_rx) = mpsc::sync_channel(1);

        let thread_handle = std::thread::spawn(move || {
            let exe_path = std::env::current_exe().expect("Failed to get current exe path");
            let log_dir = exe_path
                .parent()
                .expect("Failed to get the exe parent path");
            let mut conn =
                Connection::open(log_dir.join(".quay_log")).expect("Failed to open log database");

            conn.execute_batch(
                "CREATE TABLE IF NOT EXISTS logs (
                    id        INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp INTEGER NOT NULL,
                    level     TEXT    NOT NULL,
                    target    TEXT    NOT NULL,
                    message   TEXT    NOT NULL
                );
                CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs (timestamp);
                CREATE INDEX IF NOT EXISTS idx_logs_level     ON logs (level);",
            )
            .expect("Failed to create logs table");

            loop {
                match shutdown_rx.recv_timeout(Duration::from_secs(5)) {
                    Ok(()) | Err(RecvTimeoutError::Disconnected) => {
                        // Shutdown signal or sender dropped — final flush then exit.
                        flush_buffer(&mut conn, &buffer);
                        break;
                    }
                    Err(RecvTimeoutError::Timeout) => {
                        // Normal 5-second interval flush.
                        flush_buffer(&mut conn, &buffer);
                    }
                }
            }
        });

        self.finish().with(db_layer).init();

        LogShutdown {
            shutdown_tx,
            thread_handle: Some(thread_handle),
        }
    }
}
