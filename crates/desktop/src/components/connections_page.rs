use crate::{ConnectionsPageEvents, MainWindow};
use slint::ComponentHandle;
use tracing::info;

pub fn handle_connections_page_events(app: &MainWindow) {
    app.global::<ConnectionsPageEvents>().on_button_clicked(|| {
        info!("Received button clicked on connections_page events.");
    });
}
