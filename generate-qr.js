const QRCode = require('qrcode');

// URL для Expo Go - используем локальный адрес приложения
const expoUrl = 'exp://172.20.10.2:3000'; // IP адрес из консоли сервера

async function generateQRCode() {
  try {
    // Генерируем QR-код
    const qrCodeDataUrl = await QRCode.toDataURL(expoUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    console.log('QR-код сгенерирован успешно!');
    console.log('URL для Expo Go:', expoUrl);
    console.log('QR-код (Data URL):', qrCodeDataUrl);
    
    // Создаем HTML файл для отображения QR-кода
    const htmlContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR-код для Eco Tourism App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: #2c5aa0;
            margin-bottom: 1rem;
        }
        .qr-code {
            margin: 1rem 0;
        }
        .instructions {
            margin-top: 1rem;
            color: #666;
            max-width: 400px;
        }
        .url {
            background: #f0f0f0;
            padding: 0.5rem;
            border-radius: 5px;
            font-family: monospace;
            margin: 1rem 0;
            word-break: break-all;
        }
        .note {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 1rem;
            border-radius: 5px;
            margin: 1rem 0;
            color: #856404;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌿 Eco Tourism App</h1>
        <p>Отсканируйте QR-код в приложении Expo Go</p>
        
        <div class="qr-code">
            <img src="${qrCodeDataUrl}" alt="QR Code for Expo Go" />
        </div>
        
        <div class="url">
            ${expoUrl}
        </div>
        
        <div class="note">
            <strong>Важно:</strong> Убедитесь, что ваш телефон и компьютер находятся в одной сети Wi-Fi
        </div>
        
        <div class="instructions">
            <h3>Инструкции:</h3>
            <ol style="text-align: left;">
                <li>Установите приложение Expo Go на ваш телефон</li>
                <li>Откройте Expo Go</li>
                <li>Нажмите "Scan QR Code"</li>
                <li>Отсканируйте QR-код выше</li>
                <li>Приложение загрузится автоматически</li>
            </ol>
            
            <h3>Альтернативные URL:</h3>
            <ul style="text-align: left;">
                <li>exp://localhost:3000</li>
                <li>exp://127.0.0.1:3000</li>
                <li>exp://172.20.10.2:3001 (если порт 3000 занят)</li>
            </ul>
        </div>
    </div>
</body>
</html>`;

    // Записываем HTML файл
    const fs = require('fs');
    fs.writeFileSync('qr-code.html', htmlContent);
    
    console.log('HTML файл с QR-кодом создан: qr-code.html');
    console.log('Откройте qr-code.html в браузере для просмотра QR-кода');
    
  } catch (error) {
    console.error('Ошибка при генерации QR-кода:', error);
  }
}

generateQRCode();
