use chrono::Timelike;

fn main() {
    slint_build();
    icon();
    generate_build_number();
}

fn slint_build() {
    let path = "ui/main_window.slint";
    println!("cargo:rerun-if-changed=ui");
    unsafe {
        std::env::set_var("SLINT_BACKEND", "winit-skia");
    }
    slint_build::compile(path).unwrap();
}

fn icon() {
    #[cfg(windows)]
    {
        let path = "../../res/icons/icon.ico";
        println!("cargo:rerun-if-changed={}", path);
        let mut res = winresource::WindowsResource::new();
        res.set_icon(path);

        res.compile().unwrap();
    }
}

fn generate_build_number() {
    let seconds_past_in_day = chrono::Local::now().num_seconds_from_midnight();
    let build = chrono::Local::now().format("%Y.%m.%d").to_string();
    let build = format!("{}.{:06}", build, seconds_past_in_day);
    println!("cargo:rustc-env=BUILD={build}");
}
