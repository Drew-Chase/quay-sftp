#![cfg_attr(all(target_os = "windows", not(debug_assertions)), windows_subsystem = "windows")]

use iced::widget::text;
use iced::{Element, Task};

#[derive(Default)]
struct App;
#[derive(Debug, Clone)]
enum Message {}

impl App {
    pub(crate) fn update(_state: &mut App, _message: Message) -> Task<Message> {
        Task::none()
    }
    pub(crate) fn view(_state: &'_ App) -> Element<'_, Message> {
        text("Hello world!").into()
    }
}

fn main() -> iced::Result {
    color_eyre::install().expect("color_eyre setup failed");
    tracing_subscriber::fmt().with_max_level(tracing::Level::TRACE).with_thread_names(true).init();
    iced::application(move || App, App::update, App::view)
        .title("quay sftp")
        .decorations(false)
        .centered()
        .run()
}
