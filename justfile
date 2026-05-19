set shell := ["bash", "-c"]
set windows-shell := ["powershell.exe", "-NoProfile", "-NoLogo", "-Command"]

default:
    just --list

# This will update the version of the application in the cargo.toml tauri config files and the package.json files. Then commit those changes, create a tag with that version, ex: `v{version}` and push the changes and tag to git.
publish version="":
    uv -g commit-push-tag {{ version }}

# Installs rust and node dependencies.
install:
    cargo install update-version --locked
    cargo install tauri-cli --locked
    pnpm i

# Builds the application and its installers for the host platform
build: install
    cargo tauri build

# Opens the app in developer mode, allowing for hot-reloading and debugging
dev: install
    cargo tauri dev

# This will clean the project and install dependencies
refresh: clean install

# This will clean the rust target directory and remove the node_modules directory
clean: _clean-node
    cargo clean

[windows]
_clean-node:
    Remove-Item ./node_modules -Recurse -Force

[linux]
[macos]
_clean-node:
    rm ./node_modules -rf

# Generates the various icon sizes and formats for the different platforms
gen-icons:
    cargo tauri icon .\src\img\logo.svg --ios-color "#00CFFF"
