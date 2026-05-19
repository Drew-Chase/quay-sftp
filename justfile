set shell := ["bash", "-c"]
set windows-shell := ["powershell.exe", "-NoProfile", "-NoLogo", "-Command"]

# Installs rust and node dependencies.
install:
    cargo install tauri-cli --locked
    pnpm i

# Builds the application and its installers for the host platform
build: install
    cargo tauri build

# Opens the app in developer mode, allowing for hot-reloading and debugging
dev: install
    cargo tauri dev

# Generates the various icon sizes and formats for the different platforms
gen-icons:
    cargo tauri icon .\src\img\logo.svg --ios-color "#00CFFF"
