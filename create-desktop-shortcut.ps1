# Скрипт для создания ярлыка на рабочем столе
# Автор: AI Assistant

$WshShell = New-Object -comObject WScript.Shell
$DesktopPath = [Environment]::GetFolderPath("Desktop")
$ShortcutPath = Join-Path $DesktopPath "Travel Companion Server.lnk"
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = "powershell.exe"
$Shortcut.Arguments = "-ExecutionPolicy Bypass -File `"$PSScriptRoot\start-server-silent.ps1`""
$Shortcut.WorkingDirectory = $PSScriptRoot
$Shortcut.Description = "Запуск сервера Travel Companion"
$Shortcut.IconLocation = "powershell.exe,0"
$Shortcut.Save()

Write-Host "✅ Ярлык 'Travel Companion Server' создан на рабочем столе!" -ForegroundColor Green
Write-Host "📍 Расположение: $ShortcutPath" -ForegroundColor Cyan