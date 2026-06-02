use crate::app::{Message, QuayApp};
use crate::theme::layout::fonts::JETBRAINS_MONO;
use iced::font::Weight;
use iced::widget::{button, mouse_area, row, text};
use iced::{window, Element, Font, Length, Task};

#[derive(Debug, Clone)]
pub enum TitlebarMessage {
    Minimize,
	ToggleMaximize,
    Close,
    DragStart,
}

pub fn titlebar() -> Element<'static, TitlebarMessage> {
    row![
	     row![
        mouse_area(text(format!("{} - {}", QuayApp::TITLE, QuayApp::VERSION)).font(Font{weight: Weight::Normal, ..JETBRAINS_MONO})).on_press(TitlebarMessage::DragStart),
        button("—").on_press(TitlebarMessage::Minimize),
        button("□").on_press(TitlebarMessage::ToggleMaximize),
        button("✕").on_press(TitlebarMessage::Close),
    ]
    ]
    .width(Length::Fill)
    .into()
}

pub fn update(msg: TitlebarMessage, state: &mut QuayApp) -> Task<Message> {

	match msg {

		TitlebarMessage::Close => {
			if let Some(id) = state.window_id {
				window::close(id)
			} else {
				Task::none()
			}
		}
		TitlebarMessage::ToggleMaximize => {
			if let Some(id) = state.window_id {
				window::toggle_maximize(id)
			} else {
				Task::none()
			}
		}
		TitlebarMessage::Minimize => {
			if let Some(id) = state.window_id {
				window::minimize(id, true)
			} else {
				Task::none()
			}
		},
		TitlebarMessage::DragStart => {
			if let Some(id) = state.window_id {
				window::drag(id)
			}else{
				Task::none()
			}
		}
	}
}