#![cfg_attr(all(target_os = "windows", not(debug_assertions)), windows_subsystem = "windows")]

mod app;
pub mod theme;
pub mod widgets;

use crate::app::QuayApp;
use crate::theme::FontFamily;

fn main() -> iced::Result {
    color_eyre::install().expect("color_eyre setup failed");
    tracing_subscriber::fmt().with_max_level(tracing::Level::TRACE).with_thread_names(true).init();
    iced::application(QuayApp::default, QuayApp::update, QuayApp::view)
        .title(QuayApp::TITLE)
        .subscription(QuayApp::subscription)
        .font(FontFamily::jetbrains_mono().regular())
        .font(FontFamily::jetbrains_mono().medium())
        .font(FontFamily::jetbrains_mono().semi_bold())
        .font(FontFamily::jetbrains_mono().bold())
        .font(FontFamily::inter().regular())
        .font(FontFamily::inter().medium())
        .font(FontFamily::inter().semi_bold())
        .font(FontFamily::inter().bold())
        .window(QuayApp::window_settings())
        .centered()
        .run()
}
