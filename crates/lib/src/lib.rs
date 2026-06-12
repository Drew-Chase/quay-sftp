use std::path::PathBuf;
use std::sync::{Arc, Mutex};
use crate::ftp::FTPConnection;

pub mod ftp;
pub mod sftp;
pub mod s3;

#[derive(thiserror::Error, Debug)]
pub enum QuayError {
    #[error("Enumeration error: {0}")]
    EnumerationError(#[from] std::io::Error),
    #[error("Failed to upload {0} bytes to remote path '{1}': {2}")]
    UploadError(usize, String, std::io::Error),
    #[error("{0}")]
    IoError(std::io::Error),
    #[error("Lock poisoned")]
    LockError,
}

static CURRENT_CONNECTION: Arc<Mutex<Option<impl QuayConnector>>> = Arc::new(Mutex::new(None));

trait QuayConnector {
    fn list(&self) -> Result<Vec<String>, QuayError>;
    fn upload(&self, bytes: &[u8], remote_path: &str)->Result<(), QuayError>;
    fn get_bytes(&self, remote_path: &str)->Result<Vec<u8>, QuayError>;
    fn connect(&self)->Result<(), QuayError>;
    fn download(&self, host_path: impl Into<PathBuf>, remote_path: &str)->Result<(), QuayError>{
        let bytes = self.get_bytes(remote_path)?;
        std::fs::write(host_path, bytes)?;
        Ok(())
    }
    
    fn unmount(&self)->Result<(), QuayError>{
        *CURRENT_CONNECTION.lock()? = None;
        Ok(())
    }
    fn mount(&self)->Result<(),QuayError>{
        *CURRENT_CONNECTION.lock()? = Some(FTPConnection{});
        Ok(())
    }
    fn current()->Option<Arc<Mutex<Self>>>{
        CURRENT_CONNECTION.lock().unwrap().clone()
    }
}