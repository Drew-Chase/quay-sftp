set shell := ["bash", "-c"]
set windows-shell := ["powershell.exe", "-NoProfile", "-NoLogo", "-Command"]

default:
    just --list

# This will update the version of the application in the cargo.toml tauri config files and the package.json files. Then commit those changes, create a tag with that version, ex: `v{version}` and push the changes and tag to git.
publish version="":
    uv -g commit-push-tag {{ version }}

# Installs rust and node dependencies.
[working-directory('crates/app')]
install:
    cargo install update-version --locked
    cargo install tauri-cli --locked
    pnpm i

# Builds the application and its installers for the host platform
[working-directory('crates/app')]
build: install
    cargo tauri build

# Opens the app in developer mode, allowing for hot-reloading and debugging
[working-directory('crates/app')]
dev: install
    cargo tauri dev

# This will clean the project and install dependencies
refresh: clean install

# This will clean the rust target directory and remove the node_modules directory
clean: _clean-node
    cargo clean

[windows]
[working-directory('crates/app')]
_clean-node:
    if (Test-Path ./node_modules) { Remove-Item ./node_modules -Recurse -Force }

[linux]
[working-directory('crates/app')]
_clean-node:
    rm -rf ./node_modules ./dist ./target

[macos]
[working-directory('crates/app')]
_clean-node:
    rm -fdr ./node_modules ./dist ./target



# Generates the various icon sizes and formats for the different platforms
[working-directory('crates/app')]
gen-icons:
    cargo tauri icon crates/app/src/img/logo.svg --ios-color "#00CFFF"
