use color_eyre::Result;
use std::process::ExitCode;

fn main() -> Result<ExitCode> {
    color_eyre::install()?;
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::TRACE)
        .with_thread_names(true)
        .init();
    if std::env::args().len() > 1 {
        // This would indicate that the user is running the application with command-line arguments
        return quay_cli::run();
    }

    Ok(ExitCode::SUCCESS)
}
