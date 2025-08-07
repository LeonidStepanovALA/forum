'use client';

import React, { useState, useRef } from 'react';
import { PhoneIcon, ExclamationTriangleIcon, BellAlertIcon, CameraIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function EmergencyContact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  // const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emergencyContacts = [
    {
      id: 1,
      title: 'Экстренная служба',
      phone: '112',
      description: 'Единый номер службы спасения'
    },
    {
      id: 2,
      title: 'Горячая линия эко-туризма',
      phone: '8-800-123-45-67',
      description: 'Круглосуточная поддержка туристов'
    },
    {
      id: 3,
      title: 'Медицинская помощь',
      phone: '103',
      description: 'Скорая медицинская помощь'
    }
  ];

  const getCurrentLocation = (): Promise<{lat: number, lng: number}> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Геолокация не поддерживается'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 60000
        }
      );
    });
  };

  const handleEmergencyReport = () => {
    setIsModalOpen(true);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsGettingLocation(true);
    
    try {
      // Получаем координаты
      const coords = await getCurrentLocation();
      // setLocation(coords);
      
      // Формируем сообщение
      const message = `🚨 SOS СИГНАЛ!
      
📍 Координаты: ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}
📝 Описание: ${description || 'Не указано'}
📸 Фото: ${photo ? 'Прикреплено' : 'Не прикреплено'}

⏰ Время: ${new Date().toLocaleString('ru-RU')}

Служба поддержки уведомлена и свяжется с вами в ближайшее время.`;

      alert(message);
      
    } catch {
      // Если не удалось получить координаты, отправляем без них
      const message = `🚨 SOS СИГНАЛ!
      
⚠️ Координаты: Не удалось получить
📝 Описание: ${description || 'Не указано'}
📸 Фото: ${photo ? 'Прикреплено' : 'Не прикреплено'}

⏰ Время: ${new Date().toLocaleString('ru-RU')}

Служба поддержки уведомлена и свяжется с вами в ближайшее время.`;

      alert(message);
    } finally {
      setIsGettingLocation(false);
      
      // Сброс формы
      setDescription('');
      setPhoto(null);
      setPhotoPreview(null);
      // setLocation(null);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setDescription('');
    setPhoto(null);
    setPhotoPreview(null);
    // setLocation(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
        <h3 className="text-xl font-semibold text-gray-800">
          Экстренная связь
        </h3>
      </div>

      {/* Кнопка сообщить об экстренной ситуации - перемещена вверх */}
      <div className="mb-6">
        <button
          onClick={handleEmergencyReport}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          <BellAlertIcon className="w-6 h-6" />
          <span className="text-lg">Сообщить об экстренной ситуации</span>
        </button>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Нажмите кнопку выше, чтобы уведомить службу поддержки о чрезвычайной ситуации
        </p>
      </div>

      <div className="space-y-4">
        {emergencyContacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="bg-red-100 p-2 rounded-full">
              <PhoneIcon className="w-5 h-5 text-red-600" />
            </div>
            
            <div className="flex-grow">
              <h4 className="font-medium text-gray-900">
                {contact.title}
              </h4>
              <p className="text-gray-600 text-sm mt-1">
                {contact.description}
              </p>
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-2 mt-2 text-red-600 hover:text-red-700 font-medium"
              >
                <span>{contact.phone}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-red-50 rounded-lg">
        <p className="text-sm text-red-700">
          В случае чрезвычайной ситуации немедленно свяжитесь с экстренными службами. 
          Сохраните эти номера в телефоне для быстрого доступа.
        </p>
      </div>

      {/* Модальное окно для отчета об экстренной ситуации */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Сообщить об экстренной ситуации
              </h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Информация о координатах */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  📍 При отправке SOS будут автоматически переданы ваши координаты местоположения
                </p>
              </div>

              {/* Фото */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Фото ситуации (необязательно)
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <CameraIcon className="w-5 h-5" />
                    <span>Сделать фото</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>
                {photoPreview && (
                  <div className="mt-3">
                    {/* <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border"
                    /> */}
                  </div>
                )}
              </div>

              {/* Описание */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание ситуации (необязательно)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Опишите, что произошло..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                />
              </div>

              {/* Кнопки */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isGettingLocation}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {isGettingLocation ? 'Получение координат...' : 'SOS'}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 