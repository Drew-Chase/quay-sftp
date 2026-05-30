use crate::{ApplicationState, MainWindow};
use i_slint_backend_winit::{EventResult, WinitWindowAccessor};
use slint::{ComponentHandle, ToSharedString};

pub fn setup_application_state(app: &MainWindow) {
    app.global::<ApplicationState>().set_version(
        format!("{}{}", env!("CARGO_PKG_VERSION"), {
            #[cfg(debug_assertions)]
            {
                "-dev"
            }
            #[cfg(not(debug_assertions))]
            {
                ""
            }
        })
        .to_shared_string(),
    );
    app.global::<ApplicationState>().set_build(env!("BUILD").to_shared_string());
    app.global::<ApplicationState>().on_open_url(|url| {
        open::that(url).ok();
    });
    let app_weak = app.as_weak();
    app.window().on_winit_window_event(move |winit_window, event| {
        if let winit::event::WindowEvent::Resized(size) = event
            && let Some(app) = app_weak.upgrade()
        {
            let scale = winit_window.scale_factor();
            app.global::<ApplicationState>().set_window_width(size.width as f32 / scale);
            app.global::<ApplicationState>().set_window_height(size.height as f32 / scale);
        }
        EventResult::Propagate
    });
}
