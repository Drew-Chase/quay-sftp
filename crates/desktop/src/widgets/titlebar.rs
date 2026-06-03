use crate::app::{Message, QuayApp};
use crate::theme::layout::fonts::JETBRAINS_MONO;
use crate::theme::{icon, Icon};
use crate::widgets::components::button::{button, ButtonRadius};
use iced::font::Weight;
use iced::widget::{mouse_area, row, text};
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
        mouse_area(
            text(format!("{} - {}", QuayApp::TITLE, QuayApp::VERSION))
                .font(Font { weight: Weight::Normal, ..JETBRAINS_MONO })
        )
        .on_press(TitlebarMessage::DragStart),
        button(icon(Icon::material_symbols().minimize_rounded(), 18, None))
            .on_press(TitlebarMessage::Minimize)
            .ghost()
            .radius(ButtonRadius::None)
            .icon_only(),
        button(icon(Icon::material_symbols().square_outline_rounded(), 18, None))
            .on_press(TitlebarMessage::ToggleMaximize)
            .ghost()
            .radius(ButtonRadius::None)
            .icon_only(),
        button(icon(Icon::material_symbols().close_rounded(), 18, None))
            .on_press(TitlebarMessage::Close)
            .danger_soft()
            .radius(ButtonRadius::None)
            .icon_only(),
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
        }
        TitlebarMessage::DragStart => {
            if let Some(id) = state.window_id {
                window::drag(id)
            } else {
                Task::none()
            }
        }
    }
}
