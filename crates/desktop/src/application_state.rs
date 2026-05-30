use crate::{ApplicationState, MainWindow};
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
}
