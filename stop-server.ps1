# Скрипт для остановки сервера Travel Companion
# Автор: AI Assistant
# Дата создания: $(Get-Date)

Write-Host "🛑 Остановка сервера Travel Companion..." -ForegroundColor Red

# Находим и останавливаем процессы Node.js, связанные с нашим проектом
$processes = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -like "*next*" -or $_.CommandLine -like "*npm*"
}

if ($processes) {
    Write-Host "🔍 Найдено процессов Node.js: $($processes.Count)" -ForegroundColor Yellow
    
    foreach ($process in $processes) {
        try {
            Write-Host "⏹️ Остановка процесса PID: $($process.Id)" -ForegroundColor Yellow
            Stop-Process -Id $process.Id -Force
            Write-Host "✅ Процесс $($process.Id) остановлен." -ForegroundColor Green
        } catch {
            Write-Host "❌ Не удалось остановить процесс $($process.Id): $($_.Exception.Message)" -ForegroundColor Red
        }
    }
} else {
    Write-Host "ℹ️ Процессы Node.js не найдены." -ForegroundColor Cyan
}

# Проверяем, освобожден ли порт 3000
$portInUse = netstat -an | findstr ":3000"
if ($portInUse) {
    Write-Host "⚠️ Порт 3000 все еще используется:" -ForegroundColor Yellow
    Write-Host $portInUse -ForegroundColor Gray
} else {
    Write-Host "✅ Порт 3000 освобожден." -ForegroundColor Green
}

Write-Host "🏁 Остановка сервера завершена." -ForegroundColor Green
Write-Host "Сервер остановлен!" -ForegroundColor Green 