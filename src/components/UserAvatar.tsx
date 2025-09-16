'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CameraIcon, UserIcon, Cog6ToothIcon, EnvelopeIcon, StarIcon, TrophyIcon, MapIcon, WalletIcon, MagnifyingGlassIcon, CalendarIcon, PhotoIcon, PhoneIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';

interface UserAvatarProps {
  className?: string;
  onWalletClick?: () => void;
  onSearchClick?: () => void;
  onRouteManagementClick?: () => void;
  onBookingCalendarClick?: () => void;
  onPhotoGalleryClick?: () => void;
  onEmergencyClick?: () => void;
  onQRScanClick?: () => void;
}

export default function UserAvatar({ className = '', onWalletClick, onSearchClick, onRouteManagementClick, onBookingCalendarClick, onPhotoGalleryClick, onEmergencyClick, onQRScanClick }: UserAvatarProps) {
  const { language } = useLanguage();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showEcoToursStats, setShowEcoToursStats] = useState(false);

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

  const ecoToursStats = {
    totalTours: 8,
    completedTours: 6,
    favoriteTours: 3,
    totalDistance: 156,
    totalDuration: 42,
    averageRating: 4.8,
    categories: {
      hiking: 3,
      cycling: 2,
      cultural: 2,
      nature: 1
    },
    recentTours: [
      {
        name: language === 'ru' ? 'Горный поход в Алматы' : 'Mountain Hiking in Almaty',
        date: '2024-01-15',
        rating: 5.0,
        distance: 12,
        duration: 6
      },
      {
        name: language === 'ru' ? 'Велосипедный тур по Астане' : 'Cycling Tour in Astana',
        date: '2024-01-10',
        rating: 4.5,
        distance: 25,
        duration: 4
      },
      {
        name: language === 'ru' ? 'Культурный тур по Шымкенту' : 'Cultural Tour in Shymkent',
        date: '2024-01-05',
        rating: 4.8,
        distance: 8,
        duration: 5
      }
    ]
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
            <Link
              href="/settings/account"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
              title={language === 'ru' ? 'Настройки' : 'Settings'}
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Кнопка экстренной связи */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={onEmergencyClick}
          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg p-3 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <PhoneIcon className="w-5 h-5" />
          <span className="font-semibold">
            {language === 'ru' ? '🚨 Экстренная связь' : '🚨 Emergency Contact'}
          </span>
        </button>
      </div>

      {/* Кнопка QR-сканера */}
      <div className="mt-3">
        <button
          onClick={onQRScanClick}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-3 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <QrCodeIcon className="w-5 h-5" />
          <span className="font-semibold">
            {language === 'ru' ? '📱 Сканировать QR' : '📱 Scan QR Code'}
          </span>
        </button>
      </div>

      {/* Эко-статистика */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Эко-рейтинг */}
          <Link
            href="/tourist/carbon-report"
            className="flex items-center space-x-2 bg-green-50 hover:bg-green-100 rounded-lg p-2 sm:p-3 transition-colors duration-200 cursor-pointer w-full text-left"
          >
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
          </Link>

          {/* Эко-баллы */}
          <Link
            href="/tourist/eco-points-history"
            className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 rounded-lg p-2 sm:p-3 transition-colors duration-200 cursor-pointer w-full text-left"
          >
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
          </Link>

          {/* Эко-туры */}
          <button
            onClick={() => setShowEcoToursStats(true)}
            className="flex items-center space-x-2 bg-purple-50 hover:bg-purple-100 rounded-lg p-2 sm:p-3 transition-colors duration-200 cursor-pointer w-full text-left"
          >
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
          </button>
        </div>
      </div>

      {/* Дополнительные кнопки навигации */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onSearchClick}
            className="flex items-center justify-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-3 transition-colors duration-200"
            title={language === 'ru' ? 'Поиск' : 'Search'}
          >
            <MagnifyingGlassIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'ru' ? 'Поиск' : 'Search'}</span>
          </button>
          <button
            onClick={onRouteManagementClick}
            className="flex items-center justify-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-3 transition-colors duration-200"
            title={language === 'ru' ? 'Управление маршрутами' : 'Route Management'}
          >
            <MapIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'ru' ? 'Маршруты' : 'Routes'}</span>
          </button>
          <button
            onClick={onBookingCalendarClick}
            className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-3 transition-colors duration-200"
            title={language === 'ru' ? 'Календарь бронирования' : 'Booking Calendar'}
          >
            <CalendarIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'ru' ? 'Календарь' : 'Calendar'}</span>
          </button>
          <button
            onClick={onWalletClick}
            className="flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg p-3 transition-colors duration-200 relative"
            title={language === 'ru' ? 'Мой кошелек' : 'My Wallet'}
          >
            <WalletIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'ru' ? 'Кошелек' : 'Wallet'}</span>
            {/* Индикатор AirCoin */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">🌱</span>
            </div>
          </button>
          <Link
            href="/tourist/news"
            className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-3 transition-colors duration-200 relative"
            title={language === 'ru' ? 'Сообщения' : 'Messages'}
          >
            <EnvelopeIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'ru' ? 'Сообщения' : 'Messages'}</span>
            {/* Индикатор новых уведомлений */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </Link>
          <button
            onClick={onPhotoGalleryClick}
            className="flex items-center justify-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg p-3 transition-colors duration-200"
            title={language === 'ru' ? 'Фотогалерея' : 'Photo Gallery'}
          >
            <PhotoIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'ru' ? 'Галерея' : 'Gallery'}</span>
          </button>
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

      {/* Модальное окно статистики эко-туров */}
      {showEcoToursStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                {language === 'ru' ? 'Статистика эко-туров' : 'Eco Tours Statistics'}
              </h3>
              <button
                onClick={() => setShowEcoToursStats(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {/* Общая статистика */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-700">{ecoToursStats.totalTours}</div>
                  <div className="text-sm text-gray-600">
                    {language === 'ru' ? 'Всего туров' : 'Total Tours'}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-700">{ecoToursStats.completedTours}</div>
                  <div className="text-sm text-gray-600">
                    {language === 'ru' ? 'Завершено' : 'Completed'}
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-700">{ecoToursStats.favoriteTours}</div>
                  <div className="text-sm text-gray-600">
                    {language === 'ru' ? 'Избранные' : 'Favorites'}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">{ecoToursStats.averageRating}</div>
                  <div className="text-sm text-gray-600">
                    {language === 'ru' ? 'Средний рейтинг' : 'Avg Rating'}
                  </div>
                </div>
              </div>

              {/* Детальная статистика */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    {language === 'ru' ? 'Общие показатели' : 'Overall Metrics'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'ru' ? 'Общее расстояние:' : 'Total Distance:'}
                      </span>
                      <span className="font-semibold">{ecoToursStats.totalDistance} км</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'ru' ? 'Общее время:' : 'Total Duration:'}
                      </span>
                      <span className="font-semibold">{ecoToursStats.totalDuration} ч</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    {language === 'ru' ? 'По категориям' : 'By Categories'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">🏔️ {language === 'ru' ? 'Походы:' : 'Hiking:'}</span>
                      <span className="font-semibold">{ecoToursStats.categories.hiking}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">🚴 {language === 'ru' ? 'Велосипед:' : 'Cycling:'}</span>
                      <span className="font-semibold">{ecoToursStats.categories.cycling}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">🏛️ {language === 'ru' ? 'Культурные:' : 'Cultural:'}</span>
                      <span className="font-semibold">{ecoToursStats.categories.cultural}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">🌿 {language === 'ru' ? 'Природа:' : 'Nature:'}</span>
                      <span className="font-semibold">{ecoToursStats.categories.nature}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Последние туры */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  {language === 'ru' ? 'Последние туры' : 'Recent Tours'}
                </h4>
                <div className="space-y-3">
                  {ecoToursStats.recentTours.map((tour, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-900">{tour.name}</h5>
                          <p className="text-sm text-gray-500">{tour.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-semibold">{tour.rating}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {tour.distance} км • {tour.duration} ч
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
