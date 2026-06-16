use quay_lib::ftp::FTPConnection;
use quay_lib::{QuayConnector, QuayError};

fn main()->Result<(), QuayError> {
    let ftp = FTPConnection::new("127.0.0.1")
		.with_user("root")
		.with_password("password123")
		.with_port(22)    // Defaults at 22
		.secure();                          // Enables FTPS, which is different from SFTP using ftp via ssl/tls instead of ssh
	ftp.connect()?;                         // This will actually create the connection to the server and returns a result in case of failure.

	// ...
	// Then you interact with the connection like any other type of connection.

	Ok(())
}
