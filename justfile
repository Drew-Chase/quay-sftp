set shell := ["bash", "-c"]
set windows-shell := ["powershell.exe", "-NoProfile", "-NoLogo", "-Command"]

default:
    @just --list

# This will update the version of the application in the cargo.toml tauri config files and the package.json files. Then commit those changes, create a tag with that version, ex: `v{version}` and push the changes and tag to git.
publish version="":
    uv -g commit-push-tag {{ version }}

# Installs rust and node dependencies.
install:
    cargo install update-version --locked

# Builds the application and its installers for the host platform
build: install
    cargo build --workspace --release

# This will clean the rust target directory and remove the node_modules directory
clean:
    cargo clean

installer: build
    makensis ./nsis/_entrypoint.nsi

# Runs either the desktop or cli with the specified arguments
dev platform="desktop" args="":
    cargo run --bin {{ if platform == "desktop" { "quay_sftp" } else { "quay" } }} -- {{ args }}
