@echo off
REM Скрипт для перезапуска сервера Travel Companion
REM Автор: AI Assistant
REM Дата создания: %date% %time%

echo 🔄 Перезапуск сервера Travel Companion...

REM Сначала останавливаем сервер
echo 🛑 Остановка текущего сервера...
call "%~dp0stop-server.bat"

REM Ждем немного для полной остановки
timeout /t 2 /nobreak >nul

REM Запускаем сервер заново
echo 🚀 Запуск нового сервера...
call "%~dp0start-server-silent.bat"
