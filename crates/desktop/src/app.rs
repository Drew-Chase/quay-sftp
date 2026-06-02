use crate::widgets::titlebar::{titlebar, TitlebarMessage};
use iced::widget::{column, mouse_area};
use iced::window::Direction;
use iced::window::settings::PlatformSpecific;
use iced::window::settings::platform::CornerPreference;
use iced::{Element, Event, Point, Size, Subscription, Task, event, mouse, window};
use crate::widgets::titlebar;

#[derive(Default)]
pub struct QuayApp {
    pub window_id: Option<window::Id>,
    window_size: Size,
    cursor: Point,
    resize_dir: Option<Direction>,
}
#[derive(Debug, Clone)]
pub enum Message {
    WindowOpened(window::Id),
    CursorMoved(Point),
    Resized(Size),
    LeftClick,
    Titlebar(TitlebarMessage)
}

impl QuayApp {
    pub const TITLE: &str = "quay sftp";
    pub const VERSION: &str = env!("CARGO_PKG_VERSION");
    pub const BUILD: &str = env!("BUILD");
    const BORDER: f32 = 8.0;

    pub fn update(state: &mut QuayApp, message: Message) -> Task<Message> {
        match message {
            Message::WindowOpened(id) => {
                state.window_id = Some(id);
                Task::none()
            }
            Message::CursorMoved(pos) => {
                state.cursor = pos;
                state.resize_dir = Self::resize_direction(pos, state.window_size, Self::BORDER);
                Task::none()
            }
            Message::Resized(size) => {
                state.window_size = size;
                Task::none()
            }
            Message::LeftClick => {
                if let Some(id) = state.window_id {
                    return if let Some(dir) =
                        Self::resize_direction(state.cursor, state.window_size, Self::BORDER)
                    {
                        window::drag_resize(id, dir)
                    } else {
                        Task::none()
                    };
                }
                Task::none()
            },
            Message::Titlebar(message) => {
                titlebar::update(message, state)
            }
        }
    }
    pub fn view(state: &'_ QuayApp) -> Element<'_, Message> {
        let interaction = match state.resize_dir {
            Some(Direction::North | Direction::South) => mouse::Interaction::ResizingVertically,
            Some(Direction::East | Direction::West) => mouse::Interaction::ResizingHorizontally,
            Some(Direction::NorthEast | Direction::SouthWest) => {
                mouse::Interaction::ResizingDiagonallyUp
            }

            Some(Direction::NorthWest | Direction::SouthEast) => {
                mouse::Interaction::ResizingDiagonallyDown
            }

            None => mouse::Interaction::Idle,
        };
        mouse_area(column![titlebar().map(Message::Titlebar)]).interaction(interaction).into()
    }

    pub fn subscription(_state: &QuayApp) -> Subscription<Message> {
        Subscription::batch([
            window::open_events().map(Message::WindowOpened),
            event::listen_raw(|event, _status, _id| match event {
                Event::Mouse(mouse::Event::CursorMoved { position }) => {
                    Some(Message::CursorMoved(position))
                }
                Event::Mouse(mouse::Event::ButtonPressed(mouse::Button::Left)) => {
                    Some(Message::LeftClick)
                }
                Event::Window(window::Event::Resized(size)) => Some(Message::Resized(size)),
                _ => None,
            }),
        ])
    }

    fn resize_direction(cursor: Point, size: Size, border: f32) -> Option<Direction> {
        let left = cursor.x <= border;
        let right = cursor.x >= size.width - border;
        let top = cursor.y <= border;
        let bottom = cursor.y >= size.height - border;

        match (top, bottom, left, right) {
            (true, _, true, _) => Some(Direction::NorthWest),
            (true, _, _, true) => Some(Direction::NorthEast),
            (_, true, true, _) => Some(Direction::SouthWest),
            (_, true, _, true) => Some(Direction::SouthEast),
            (true, _, _, _) => Some(Direction::North),
            (_, true, _, _) => Some(Direction::South),
            (_, _, true, _) => Some(Direction::West),
            (_, _, _, true) => Some(Direction::East),
            _ => None,
        }
    }

    pub fn window_settings() -> window::Settings {
        window::Settings {
            decorations: false,
            resizable: true,
            platform_specific: PlatformSpecific {
                corner_preference: CornerPreference::Default,
                undecorated_shadow: true,
                drag_and_drop: true,
                skip_taskbar: false,
            },
            ..window::Settings::default()
        }
    }
}
