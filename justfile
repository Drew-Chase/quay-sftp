set shell := ["bash", "-c"]
set windows-shell := ["powershell.exe", "-NoProfile", "-NoLogo","-Command"]


install:
    cargo install tauri-cli --locked
    pnpm i
build: install
    cargo tauri build
dev: install
    cargo tauri dev
