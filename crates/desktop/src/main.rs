#![cfg_attr(all(target_os = "windows", not(debug_assertions)), windows_subsystem = "windows")]

mod app;

use crate::app::QuayApp;

fn main() -> iced::Result {
    color_eyre::install().expect("color_eyre setup failed");
    tracing_subscriber::fmt().with_max_level(tracing::Level::TRACE).with_thread_names(true).init();
    iced::application(QuayApp::default, QuayApp::update, QuayApp::view)
        .title(QuayApp::TITLE)
        .subscription(QuayApp::subscription)
        .window(QuayApp::window_settings())
        .centered()
        .run()
}
