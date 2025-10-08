# Скрипт для запуска приложения Travel Companion на локальном сервере без открытия диалогового окна
# Автор: AI Assistant
# Дата создания: $(Get-Date)

Write-Host "🚀 Запуск Travel Companion на локальном сервере..." -ForegroundColor Green

# Проверяем, установлен ли Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js найден: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js не найден. Пожалуйста, установите Node.js." -ForegroundColor Red
    exit 1
}

# Проверяем, установлен ли npm
try {
    $npmVersion = npm --version
    Write-Host "✅ npm найден: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm не найден. Пожалуйста, установите npm." -ForegroundColor Red
    exit 1
}

# Переходим в директорию проекта
$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectPath
Write-Host "📁 Рабочая директория: $projectPath" -ForegroundColor Cyan

# Проверяем наличие package.json
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Файл package.json не найден в текущей директории." -ForegroundColor Red
    exit 1
}

# Проверяем, установлены ли зависимости
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Установка зависимостей..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Ошибка при установке зависимостей." -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Зависимости установлены успешно." -ForegroundColor Green
}

# Очищаем кэш Next.js (опционально)
Write-Host "🧹 Очистка кэша Next.js..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✅ Кэш очищен." -ForegroundColor Green
}

# Запускаем сервер разработки
Write-Host "🌟 Запуск сервера разработки..." -ForegroundColor Magenta
Write-Host "📍 Приложение будет доступно по адресу: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🛑 Для остановки сервера нажмите Ctrl+C" -ForegroundColor Yellow
Write-Host "=" * 60 -ForegroundColor Gray

# Запускаем npm run dev
npm run dev
