#![cfg_attr(all(target_os = "windows", not(debug_assertions)), windows_subsystem = "windows")]

mod components;
pub mod utils;

slint::include_modules!();

use color_eyre::Result;
use color_eyre::eyre::Context;
use slint::{PhysicalSize, WindowSize};
use slint_borderless_windows::{TitlebarSetup};
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

    let frame = app.as_weak().setup_borderless().expect("Failed to setup custom frame");
    let frame_maximize = frame.clone();
    let frame_close = frame.clone();
    let frame_drag = frame.clone();
    let frame_dblclick = frame.clone();

    app.global::<WindowControls>().on_maximize(move || frame_maximize.toggle_maximized());
    app.global::<WindowControls>().on_close(move || frame_close.close());
    app.global::<WindowControls>().on_drag(move || frame_drag.drag());
    app.global::<WindowControls>().on_double_click(move || frame_dblclick.toggle_maximized());
    app.global::<WindowControls>().on_minimize(move || frame.minimize());

    app.run()?;
    Ok(ExitCode::SUCCESS)
}
