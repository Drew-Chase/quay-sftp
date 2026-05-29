use crate::{MainWindow, WindowControls};
use slint::{ComponentHandle, ToSharedString};
use slint_borderless_windows::TitlebarSetup;

pub fn handle_titlebar_events(app: &MainWindow) {
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
    app.global::<WindowControls>().set_version(
        format!("{}{}", env!("CARGO_PKG_VERSION"),
                {
                    #[cfg(debug_assertions)]
                    { "-dev" }
                    #[cfg(not(debug_assertions))]
                    { "" }
                }
        )
        .to_shared_string(),
    )
}
