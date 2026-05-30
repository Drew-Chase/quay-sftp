#![cfg_attr(all(target_os = "windows", not(debug_assertions)), windows_subsystem = "windows")]

mod components;
pub mod utils;
mod application_state;

slint::include_modules!();

use crate::components::handle_component_events;
use color_eyre::eyre::Context;
use color_eyre::Result;
use slint::{PhysicalSize, WindowSize};
use std::process::ExitCode;

fn main() -> Result<ExitCode> {
    color_eyre::install()?;
    tracing_subscriber::fmt().with_max_level(tracing::Level::TRACE).with_thread_names(true).init();
    if std::env::args().len() > 1 {
        // This would indicate that the user is running the application with command-line arguments
        return quay_cli::run();
    }

    let app = MainWindow::new().with_context(|| "Failed to create main window")?;
    app.window().set_size(WindowSize::Physical(PhysicalSize::new(1280, 720)));
    app.as_weak().upgrade_in_event_loop(|win| {
        utils::center_win::center_window(win.window());
    })?;
    application_state::setup_application_state(&app);
    handle_component_events(&app);
    
    app.run()?;
    Ok(ExitCode::SUCCESS)
}
