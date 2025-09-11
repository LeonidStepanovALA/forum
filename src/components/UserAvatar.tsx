'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CameraIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';

interface UserAvatarProps {
  className?: string;
}

export default function UserAvatar({ className = '' }: UserAvatarProps) {
  const { language } = useLanguage();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const mockUserData = {
    name: language === 'ru' ? 'Анна Петрова' : 'Anna Petrova',
    level: 'Gold',
    points: 1250,
    badges: 8
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-2 border-green-100 ${className}`}>
      <div className="flex items-center space-x-4">
        {/* Аватарка */}
        <div className="relative group">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
            {avatar ? (
              <Image 
                src={avatar} 
                alt="User Avatar" 
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-10 h-10 text-white" />
            )}
          </div>
          
          {/* Кнопка изменения фото */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute -bottom-1 -right-1 bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <CameraIcon className="w-4 h-4" />
          </button>
          
          {/* Индикатор уровня */}
          <div className="absolute -top-1 -left-1 bg-yellow-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold border-2 border-white">
            {mockUserData.level.charAt(0)}
          </div>
        </div>

        {/* Информация о пользователе */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            {mockUserData.name}
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-yellow-600">{mockUserData.level}</span>
              <span>•</span>
              <span>{mockUserData.points} {language === 'ru' ? 'баллов' : 'points'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < 4 ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {mockUserData.badges} {language === 'ru' ? 'бейджей' : 'badges'}
            </span>
          </div>
        </div>

        {/* Статус онлайн и кнопка настроек */}
        <div className="text-right">
          <div className="flex items-center justify-end space-x-3 mb-2">
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                {language === 'ru' ? 'Онлайн' : 'Online'}
              </span>
            </div>
            <button
              onClick={() => window.location.href = '/settings/account'}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
              title={language === 'ru' ? 'Настройки' : 'Settings'}
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500">
            {language === 'ru' ? 'Активен 2 часа назад' : 'Active 2 hours ago'}
          </p>
        </div>
      </div>

      {/* Скрытый input для загрузки фото */}
      {isEditing && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          <p className="text-xs text-gray-500 mt-2">
            {language === 'ru' 
              ? 'Выберите фото для аватарки (JPG, PNG до 5MB)' 
              : 'Choose avatar photo (JPG, PNG up to 5MB)'
            }
          </p>
        </div>
      )}
    </div>
  );
}
