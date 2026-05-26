!include "MUI2.nsh"

; Window Details
Name "${APP_NAME} - ${APP_VERSION}"
BrandingText "quay_sftp"
Caption "${APP_NAME} v${APP_VERSION} - Installation Wizard"

; Icons
Icon "..\res\icons\icon.ico"
UninstallIcon "..\res\icons\icon.ico"

;  VI Version Key's
VIProductVersion "${APP_VERSION}.0"
VIAddVersionKey "ProductName" "${APP_NAME}"
VIAddVersionKey "CompanyName" "${APP_PUBLISHER}"
VIAddVersionKey "LegalCopyright" "Copyright (c) 2026 ${APP_PUBLISHER}"
VIAddVersionKey "FileDescription" "${APP_NAME} Installer"
VIAddVersionKey "FileVersion" "${APP_VERSION}"
VIAddVersionKey "ProductVersion" "${APP_VERSION}"