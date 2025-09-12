'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CameraIcon, UserIcon, Cog6ToothIcon, EnvelopeIcon, StarIcon, TrophyIcon, MapIcon } from '@heroicons/react/24/outline';
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
    badges: 8,
    ecoRating: 4.7,
    ecoPoints: 1250,
    ecoTours: 8
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 md:p-6 border-2 border-green-100 ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Аватарка */}
        <div className="relative group flex-shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
            {avatar ? (
              <Image 
                src={avatar} 
                alt="User Avatar" 
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            )}
          </div>
          
          {/* Кнопка изменения фото */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute -bottom-1 -right-1 bg-green-500 hover:bg-green-600 text-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <CameraIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          
          {/* Индикатор уровня */}
          <div className="absolute -top-1 -left-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-bold border-2 border-white">
            {mockUserData.level.charAt(0)}
          </div>
        </div>

        {/* Информация о пользователе */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 truncate">
            {mockUserData.name}
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-600">
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
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
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

        {/* Статус онлайн и кнопки */}
        <div className="flex items-center justify-between w-full sm:w-auto sm:text-right">
          <div className="flex items-center space-x-2 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              {language === 'ru' ? 'Онлайн' : 'Online'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => window.location.href = '/tourist/news'}
              className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors duration-200 relative"
              title={language === 'ru' ? 'Акции и новости' : 'News and Promotions'}
            >
              <EnvelopeIcon className="w-5 h-5" />
              {/* Индикатор новых уведомлений */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </button>
            <button
              onClick={() => window.location.href = '/settings/account'}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
              title={language === 'ru' ? 'Настройки' : 'Settings'}
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Эко-статистика */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Эко-рейтинг */}
          <div className="flex items-center space-x-2 bg-green-50 rounded-lg p-2 sm:p-3">
            <div className="flex-shrink-0">
              <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-600 truncate">
                {language === 'ru' ? 'Эко-рейтинг' : 'Eco Rating'}
              </p>
              <p className="text-sm font-semibold text-green-700 truncate">
                {mockUserData.ecoRating}/5.0
              </p>
            </div>
          </div>

          {/* Эко-баллы */}
          <div className="flex items-center space-x-2 bg-blue-50 rounded-lg p-2 sm:p-3">
            <div className="flex-shrink-0">
              <TrophyIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-600 truncate">
                {language === 'ru' ? 'Эко-баллы' : 'Eco Points'}
              </p>
              <p className="text-sm font-semibold text-blue-700 truncate">
                {mockUserData.ecoPoints.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Эко-туры */}
          <div className="flex items-center space-x-2 bg-purple-50 rounded-lg p-2 sm:p-3">
            <div className="flex-shrink-0">
              <MapIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-600 truncate">
                {language === 'ru' ? 'Эко-туры' : 'Eco Tours'}
              </p>
              <p className="text-sm font-semibold text-purple-700 truncate">
                {mockUserData.ecoTours}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-2 sm:hidden">
        {language === 'ru' ? 'Активен 2 часа назад' : 'Active 2 hours ago'}
      </p>

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
