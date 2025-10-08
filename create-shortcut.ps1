# Create desktop shortcut for Travel Companion Server
$WshShell = New-Object -comObject WScript.Shell
$DesktopPath = [Environment]::GetFolderPath("Desktop")
$ShortcutPath = Join-Path $DesktopPath "Travel Companion Server.lnk"
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = "powershell.exe"
$Shortcut.Arguments = "-ExecutionPolicy Bypass -File `"$PSScriptRoot\start-server-silent.ps1`""
$Shortcut.WorkingDirectory = $PSScriptRoot
$Shortcut.Description = "Travel Companion Server"
$Shortcut.IconLocation = "powershell.exe,0"
$Shortcut.Save()

Write-Host "Shortcut created on desktop: Travel Companion Server" -ForegroundColor Green
