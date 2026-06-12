use crate::{QuayConnector, QuayError};

pub struct FTPConnection;

impl QuayConnector for FTPConnection {
    fn list(&self) -> Result<Vec<String>, QuayError> {
        todo!()
    }

    fn upload(&self, bytes: &[u8], remote_path: &str) -> Result<(), QuayError> {
        todo!()
    }

    fn get_bytes(&self, remote_path: &str) -> Result<Vec<u8>, QuayError> {
        todo!()
    }

    fn connect(&self) -> Result<(), QuayError> {
        // TODO: Handle connection setup
        self.mount()
    }
}
