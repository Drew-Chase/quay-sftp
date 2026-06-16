use std::path::PathBuf;
use crate::{QuayConnector, QuayError};
use suppaftp::FtpStream;

pub struct FTPConnection {
    pub host: String,
    pub port: u16,
    pub user: String,
    pub password: String,
    pub secure: bool,
    _stream: Option<FtpStream>,
}

impl Default for FTPConnection {
    fn default() -> Self {
        Self {
            port: 22,
            ..Default::default()
        }
    }
}

impl FTPConnection {
    pub fn new(host: impl Into<String>) -> Self {
        Self {
            host: host.into(),
            ..Self::default()
        }
    }
    pub fn with_port(mut self, port: impl From<u16>) -> Self {
        self.port = port;
        self
    }
    pub fn with_user(mut self, user: impl Into<String>) -> Self {
        self.user = user;
        self
    }
    pub fn with_password(mut self, password: impl Into<String>) -> Self {
        self.password = password;
        self
    }
    pub fn secure(mut self) -> Self {
        self.secure = true;
        self
    }

    pub fn stream(self) -> Option<FtpStream> {
        self._stream
    }

}

impl QuayConnector for FTPConnection {
    fn list(&self, remote_path: Option<impl AsRef<str>>) -> Result<Vec<String>, QuayError> {
        match self._stream {
                   Some(mut stream)=>{
                       stream.list(remote_path).map_err(QuayError::from)
                   },
            None=>{
                Err(QuayError::ConnectionError("No connection stream found, most likely the connection has not been initiated or the stream has closed".to_string(), None))
            }
        }
    }

    fn set_cwd(&self, remote_path: impl AsRef<str>) -> Result<(), QuayError> {
        todo!()
    }

    fn cwd(&self) -> Result<PathBuf, QuayError> {
        todo!()
    }

    fn rename(&self, og_path: impl AsRef<str>, new_path: impl AsRef<str>) -> Result<(), QuayError> {
        todo!()
    }

    fn mkdir(&self, remote_path: impl AsRef<str>) -> Result<(), QuayError> {
        todo!()
    }

    fn rmdir(&self, remote_path: impl AsRef<str>) -> Result<(), QuayError> {
        todo!()
    }

    fn upload(&self, bytes: &[u8], remote_path: &str) -> Result<(), QuayError> {
        match self._stream {
            Some(stream)=>{},
            None=>{
                Err(QuayError::ConnectionError("No connection stream found, most likely the connection has not been initiated or the stream has closed".to_string(), None))
            }
        }
    }

    fn get_bytes(&self, remote_path: &str) -> Result<Vec<u8>, QuayError> {
        match self._stream {
            Some(stream)=>{},
            None=>{
                Err(QuayError::ConnectionError("No connection stream found, most likely the connection has not been initiated or the stream has closed".to_string(), None))
            }
        }
    }

    fn connect(&mut self) -> Result<(), QuayError> {
        let mut stream = FtpStream::connect(self.host.clone()).map_err(QuayError::ConnectionError)?;
        stream.login(self.user.clone(), self.password.clone()).map_err(QuayError::ConnectionError)?;
        self._stream = Some(stream);
        self.mount()
    }

    fn close(self) -> Result<(), QuayError> {
        match self._stream {
            Some(mut stream)=>{
                stream.quit().map_err(QuayError::ConnectionError)?;
                Ok(())
            },
            None=>{
                Err(QuayError::ConnectionError("No connection stream found, most likely the connection has not been initiated or the stream has closed".to_string(), None))
            }
        }
    }
}
