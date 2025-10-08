@echo off
REM Скрипт для запуска приложения Travel Companion на локальном сервере без открытия диалогового окна
REM Автор: AI Assistant
REM Дата создания: %date% %time%

echo 🚀 Запуск Travel Companion на локальном сервере...

REM Проверяем, установлен ли Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js не найден. Пожалуйста, установите Node.js.
    pause
    exit /b 1
)

REM Проверяем, установлен ли npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm не найден. Пожалуйста, установите npm.
    pause
    exit /b 1
)

REM Переходим в директорию проекта
cd /d "%~dp0"
echo 📁 Рабочая директория: %cd%

REM Проверяем наличие package.json
if not exist "package.json" (
    echo ❌ Файл package.json не найден в текущей директории.
    pause
    exit /b 1
)

REM Проверяем, установлены ли зависимости
if not exist "node_modules" (
    echo 📦 Установка зависимостей...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Ошибка при установке зависимостей.
        pause
        exit /b 1
    )
    echo ✅ Зависимости установлены успешно.
)

REM Очищаем кэш Next.js (опционально)
echo 🧹 Очистка кэша Next.js...
if exist ".next" (
    rmdir /s /q ".next"
    echo ✅ Кэш очищен.
)

REM Запускаем сервер разработки
echo 🌟 Запуск сервера разработки...
echo 📍 Приложение будет доступно по адресу: http://localhost:3000
echo 🛑 Для остановки сервера нажмите Ctrl+C
echo ============================================================

REM Запускаем npm run dev
npm run dev
