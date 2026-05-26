mod args;

use args::{Args, Command};
use clap::Parser;
use color_eyre::Result;
use std::process::ExitCode;

pub fn run() -> Result<ExitCode> {
    let args = Args::parse();

    match args.command {
        Command::List {
            connection,
            remote_path,
        } => {
            tracing::info!(host = %connection.host, port = connection.port, path = %remote_path, "Listing remote directory");
            // TODO: implement list
        }
        Command::Connect { connection } => {
            tracing::info!(host = %connection.host, port = connection.port, "Opening interactive connection");
            // TODO: implement connect
        }
        Command::Upload {
            connection,
            local_path,
            remote_path,
        } => {
            tracing::info!(host = %connection.host, local = %local_path.display(), remote = %remote_path, "Uploading file");
            // TODO: implement upload
        }
        Command::Delete {
            connection,
            remote_path,
        } => {
            tracing::info!(host = %connection.host, path = %remote_path, "Deleting remote path");
            // TODO: implement delete
        }
        Command::Download {
            connection,
            remote_path,
            local_path,
        } => {
            tracing::info!(host = %connection.host, remote = %remote_path, local = %local_path.display(), "Downloading file");
            // TODO: implement download
        }
    }

    Ok(ExitCode::SUCCESS)
}
