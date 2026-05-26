fn main() {
    unsafe {
        std::env::set_var("SLINT_BACKEND", "winit-skia");
    }
    slint_build::compile("ui/main_window.slint").unwrap();
}
