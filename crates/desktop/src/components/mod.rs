use crate::MainWindow;
use crate::components::connections_page::handle_connections_page_events;
use crate::components::titlebar::handle_titlebar_events;

mod connections_page;
mod titlebar;

pub fn handle_component_events(app: &MainWindow) {
    handle_titlebar_events(app);
    handle_connections_page_events(app);
}
