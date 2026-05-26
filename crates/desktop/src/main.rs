#![cfg_attr(all(target_os = "windows", not(debug_assertions)), windows_subsystem = "windows")]

pub mod utils;

slint::include_modules!();

use color_eyre::Result;
use color_eyre::eyre::Context;
use std::process::ExitCode;

fn main() -> Result<ExitCode> {
    color_eyre::install()?;
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::TRACE)
        .with_thread_names(true)
        .init();
    if std::env::args().len() > 1 {
        // This would indicate that the user is running the application with command-line arguments
        return quay_cli::run();
    }

    let app = MainWindow::new().with_context(|| "Failed to create main window")?;
    app.as_weak().upgrade_in_event_loop(|win| {
        utils::center_win::center_window(win.window());
    })?;
    app.run()?;
    Ok(ExitCode::SUCCESS)
}
