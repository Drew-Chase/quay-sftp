use std::path::PathBuf;

use quay_lib::SupportedProtocals::SupportedProtocols;

#[derive(Debug, clap::Parser)]
#[command(name = "quay", about = "A multi-protocol file transfer CLI", author, version)]
pub(crate) struct Args {
    #[command(subcommand)]
    pub command: Command,
}

#[derive(Debug, clap::Subcommand)]
pub(crate) enum Command {
    /// List files and directories on the remote server
    List {
        #[command(flatten)]
        connection: ConnectionOptions,

        /// Remote directory path to list
        #[arg(default_value = "/")]
        remote_path: String,
    },

    /// Open an interactive connection to the remote server
    Connect {
        #[command(flatten)]
        connection: ConnectionOptions,
    },

    /// Upload a local file to the remote server
    Upload {
        #[command(flatten)]
        connection: ConnectionOptions,

        /// Local file path to upload
        #[arg(short, long)]
        local_path: PathBuf,

        /// Remote destination path
        #[arg(short, long)]
        remote_path: String,
    },

    /// Delete a file or directory on the remote server
    Delete {
        #[command(flatten)]
        connection: ConnectionOptions,

        /// Remote path to delete
        remote_path: String,
    },

    /// Download a file from the remote server
    Download {
        #[command(flatten)]
        connection: ConnectionOptions,

        /// Remote file path to download
        #[arg(short, long)]
        remote_path: String,

        /// Local destination path
        #[arg(short, long)]
        local_path: PathBuf,
    },
}

#[derive(Debug, clap::Args)]
pub(crate) struct ConnectionOptions {
    /// Hostname or IP address of the remote server
    #[arg(short = 'H', long)]
    pub host: String,

    /// Port number for the connection
    #[arg(short, long, default_value_t = 22)]
    pub port: u16,

    /// Username for authentication
    #[arg(short, long)]
    pub username: String,

    /// Passphrase for the key file (if required)
    #[arg(short = 'P', long)]
    pub passphrase: Option<String>,

    /// Path to the private key file for authentication
    #[arg(short, long)]
    pub key_file: Option<PathBuf>,

    /// Protocol to use for the connection
    #[arg(long, value_enum, default_value_t = Protocol::Sftp)]
    pub protocol: Protocol,
}

#[derive(Debug, Clone, Copy, clap::ValueEnum)]
pub(crate) enum Protocol {
    Sftp,
    Ftp,
    S3,
}

impl From<Protocol> for SupportedProtocols {
    fn from(p: Protocol) -> Self {
        match p {
            Protocol::Sftp => SupportedProtocols::Sftp,
            Protocol::Ftp => SupportedProtocols::Ftp,
            Protocol::S3 => SupportedProtocols::S3,
        }
    }
}