use std::path::PathBuf;
use std::sync::{Arc, Mutex};

pub mod ftp;
pub mod s3;
pub mod sftp;

/// Errors produced by [`QuayConnector`] operations.
#[derive(thiserror::Error, Debug)]
pub enum QuayError {
    /// Remote listing failed due to an I/O error.
    #[error("Enumeration error: {0}")]
    EnumerationError(#[from] std::io::Error),

    /// Upload failed. Fields: bytes attempted, remote path, underlying error.
    #[error("Failed to upload {0} bytes to remote path '{1}': {2}")]
    UploadError(usize, String, std::io::Error),

    /// A general local I/O error (e.g. writing the downloaded file to disk).
    #[error("{0}")]
    IoError(std::io::Error),

    /// The global connection mutex was poisoned by a panicking thread.
    #[error("Lock poisoned")]
    LockError,
    #[error("{0}\n{1}")]
    ConnectionError(String, Option<std::io::Error>),
}

impl<T> From<std::sync::PoisonError<T>> for QuayError {
    fn from(_: std::sync::PoisonError<T>) -> Self {
        QuayError::LockError
    }
}

static CURRENT_CONNECTION: Arc<Mutex<Option<impl QuayConnector>>> = Arc::new(Mutex::new(None));

/// A unified interface for remote file storage backends (FTP, SFTP, S3, etc.).
///
/// Implementors provide protocol-specific connection and transfer logic.
/// The trait supplies default implementations for [`download`](QuayConnector::download),
/// [`mount`](QuayConnector::mount), [`unmount`](QuayConnector::unmount), and
/// [`current`](QuayConnector::current) on top of the four required primitives.
///
/// # Connection lifecycle
///
/// 1. Call [`connect`](QuayConnector::connect) to establish the underlying session.
/// 2. Optionally call [`mount`](QuayConnector::mount) to register this connector as the
///    process-wide active connection, accessible via [`current`](QuayConnector::current).
/// 3. Transfer files with [`upload`], [`get_bytes`], or [`download`].
/// 4. Call [`unmount`](QuayConnector::unmount) to deregister when done.
pub trait QuayConnector {
    /// Returns the list of paths/entries available at the remote root.
    fn list(&self, remote_path: Option<impl AsRef<str>>) -> Result<Vec<String>, QuayError>;
    
    /// Changes the remote working directory to `remote_path`.
    ///
    /// Subsequent relative-path operations on the connection resolve against this directory.
    /// Has no effect on the local filesystem.
    fn set_cwd(&self, remote_path: impl AsRef<str>) -> Result<(), QuayError>;

    /// Returns the current remote working directory as a [`PathBuf`].
    ///
    /// The returned path is the server-reported absolute path; its separator style is
    /// protocol- and server-defined (typically `/` for FTP/SFTP, implementation-defined for S3).
    fn cwd(&self) -> Result<PathBuf, QuayError>;

    /// Renames (or moves) a remote file or directory from `og_path` to `new_path`.
    ///
    /// Both paths must exist on the same remote; cross-server moves are not supported.
    /// Whether `new_path` may cross remote directory boundaries is protocol-dependent.
    fn rename(&self, og_path: impl AsRef<str>, new_path: impl AsRef<str>) -> Result<(), QuayError>;

    /// Creates a directory at `remote_path` on the remote.
    ///
    /// Behaviour when intermediate directories are missing (i.e. `mkdir -p` semantics)
    /// is implementation-defined. Check the concrete backend's docs if you need recursive creation.
    fn mkdir(&self, remote_path: impl AsRef<str>) -> Result<(), QuayError>;

    /// Removes the directory at `remote_path` on the remote.
    ///
    /// Most backends require the directory to be empty before removal; attempting to remove
    /// a non-empty directory will return an error. For recursive deletion, call [`list`](QuayConnector::list)
    /// and remove contents first.
    fn rmdir(&self, remote_path: impl AsRef<str>) -> Result<(), QuayError>;

    /// Uploads `bytes` to `remote_path` on the remote.
    ///
    /// `remote_path` must be an absolute path on the remote filesystem.
    fn upload(&self, bytes: impl Into<[u8]>, remote_path: impl AsRef<str>) -> Result<(), QuayError>;

    /// Downloads the file at `remote_path` and returns its raw bytes.
    fn get_bytes(&self, remote_path: impl AsRef<str>) -> Result<Vec<u8>, QuayError>;

    /// Establishes the underlying protocol connection.
    ///
    /// Must be called before any transfer method. Calling it on an already-connected
    /// instance is implementation-defined (re-connect vs no-op).
    fn connect(&self) -> Result<(), QuayError>;

    /// Downloads `remote_path` and writes it to `host_path` on the local filesystem.
    ///
    /// This is a convenience wrapper around [`get_bytes`](QuayConnector::get_bytes) +
    /// [`std::fs::write`]. The entire file is buffered in memory before being written.
    /// For large files, prefer streaming via [`get_bytes`](QuayConnector::get_bytes)
    /// directly if the implementor exposes one.
    fn download(
        &self,
        host_path: impl Into<PathBuf>,
        remote_path: impl AsRef<str>,
    ) -> Result<(), QuayError> {
        let bytes = self.get_bytes(remote_path)?;
        std::fs::write(host_path, bytes)?;
        Ok(())
    }
    /// Closes the connection and unmounts
    fn close(self) -> Result<(), QuayError>;
    /// Deregisters the current process-wide active connection, setting it to `None`.
    fn unmount(&self) -> Result<(), QuayError> {
        *CURRENT_CONNECTION.lock()? = None;
        Ok(())
    }
    /// Registers this connector as the process-wide active connection.
    ///
    /// Only one connector can be mounted at a time; calling this again replaces the
    /// previous one. Pair with [`unmount`](QuayConnector::unmount) to clean up.
    fn mount(&self) -> Result<(), QuayError> {
        *CURRENT_CONNECTION.lock()? = Some(self);
        Ok(())
    }
    /// Returns the currently mounted connector, or `None` if none is mounted.
    fn current() -> Option<Arc<Mutex<Self>>> {
        CURRENT_CONNECTION.lock().unwrap().clone()
    }
}
