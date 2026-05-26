InstallDir "$PROGRAMFILES64\${APP_NAME}"
OutFile "..\target\release\${APP_NAME}Setup.exe"
InstallDirRegKey HKLM "Software\${APP_NAME}" "InstallPath"
RequestExecutionLevel admin

Section "Core Application" SecCore
	SetOutPath "$INSTDIR"
	
    File "..\target\release\${BIN_NAME}"
	File "..\LICENSE"

    WriteUninstaller "$INSTDIR\uninstall.exe"
SectionEnd

Section "Desktop Shortcut" SecShortcut
	CreateShortcut "$Desktop\${APP_NAME}.lnk" "$INSTDIR\${BIN_NAME}"
SectionEnd

Section "Install"
	WriteRegStr HKLM "Software\${APP_NAME}" "InstallPath" "$INSTDIR"
SectionEnd
