# Скрипт для перезапуска сервера Travel Companion
# Автор: AI Assistant
# Дата создания: $(Get-Date)

Write-Host "🔄 Перезапуск сервера Travel Companion..." -ForegroundColor Magenta

# Сначала останавливаем сервер
Write-Host "🛑 Остановка текущего сервера..." -ForegroundColor Yellow
& "$PSScriptRoot\stop-server.ps1"

# Ждем немного для полной остановки
Start-Sleep -Seconds 2

# Запускаем сервер заново
Write-Host "🚀 Запуск нового сервера..." -ForegroundColor Green
& "$PSScriptRoot\start-server-silent.ps1"
