@echo off
REM Скрипт для остановки сервера Travel Companion
REM Автор: AI Assistant
REM Дата создания: %date% %time%

echo 🛑 Остановка сервера Travel Companion...

REM Находим и останавливаем процессы Node.js
echo 🔍 Поиск процессов Node.js...
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" /fo csv ^| find "node.exe"') do (
    echo ⏹️ Остановка процесса Node.js: %%i
    taskkill /f /pid %%i >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ Процесс %%i остановлен.
    ) else (
        echo ❌ Не удалось остановить процесс %%i.
    )
)

REM Проверяем, освобожден ли порт 3000
echo 🔍 Проверка порта 3000...
netstat -an | findstr ":3000" >nul
if %errorlevel% equ 0 (
    echo ⚠️ Порт 3000 все еще используется.
    netstat -an | findstr ":3000"
) else (
    echo ✅ Порт 3000 освобожден.
)

echo 🏁 Остановка сервера завершена.
pause
