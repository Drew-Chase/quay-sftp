// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod log_ext;
use log_ext::LogExt;

fn main() {
    color_eyre::install().expect("color_eyre setup failed");
    let log_shutdown = tracing_subscriber::fmt()
        .with_max_level(tracing::Level::TRACE)
        .with_thread_names(true)
        .setup_log_db();
    quay_sftp_lib::run(move || log_shutdown.flush_and_shutdown());
}
