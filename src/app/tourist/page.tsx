'use client';

import React from 'react';
import Link from 'next/link';
import { 
  StarIcon, 
  NewspaperIcon, 
  MagnifyingGlassIcon, 
  PhoneIcon,
  CloudIcon,
  CalendarIcon,
  MapIcon,
  WalletIcon,
  XMarkIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

import TouristStats from '@/components/TouristStats';
import TouristWallet from '@/components/TouristWallet';
import UserAvatar from '@/components/UserAvatar';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations/index';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useState } from 'react';

interface NavigationButton {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

export default function TouristPage() {
  const { language, changeLanguage, isInitialized } = useLanguage();
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  
  // Показываем загрузку, пока хук не инициализирован
  if (!isInitialized) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">{language === 'ru' ? 'Загрузка...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }
  
  // Проверяем, что переводы доступны
  if (!translations || !translations[language]) {
    console.warn(language === 'ru' ? 'Переводы недоступны для языка:' : 'Translations not available for language:', language);
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">{language === 'ru' ? 'Загрузка переводов...' : 'Loading translations...'}</p>
        </div>
      </div>
    );
  }
  
  const t = translations[language];

  const navigationButtons: NavigationButton[] = [
    {
      href: '#wallet',
      icon: WalletIcon,
      title: language === 'ru' ? 'Мой кошелек' : 'My Wallet',
      description: language === 'ru' ? 'Управление AirCoin и донаты' : 'Manage AirCoin and donations',
      color: 'bg-emerald-500 hover:bg-emerald-600'
    },
    {
      href: '/tourist/recommendations',
      icon: StarIcon,
      title: t.personalizedRecommendations,
      description: t.personalizedRecommendationsDesc,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      href: '/tourist/news',
      icon: NewspaperIcon,
      title: t.news,
      description: t.newsDesc,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      href: '/tourist/search',
      icon: MagnifyingGlassIcon,
      title: t.search,
      description: t.searchDesc,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      href: '/tourist/emergency',
      icon: PhoneIcon,
      title: t.emergency,
      description: t.emergencyDesc,
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      href: '/tourist/carbon-report',
      icon: CloudIcon,
      title: t.carbonReport,
      description: t.carbonReportDesc,
      color: 'bg-teal-500 hover:bg-teal-600'
    },
    {
      href: '/tourist/booking-calendar',
      icon: CalendarIcon,
      title: t.bookingCalendar,
      description: t.bookingCalendarDesc,
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      href: '/tourist/route-management',
      icon: MapIcon,
      title: t.routeManagement,
      description: t.routeManagementDesc,
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
    {
      href: '/tourist/photo-gallery',
      icon: PhotoIcon,
      title: language === 'ru' ? 'Фотогалерея' : 'Photo Gallery',
      description: language === 'ru' ? 'Загружайте и делитесь фото из путешествий' : 'Upload and share travel photos',
      color: 'bg-pink-500 hover:bg-pink-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Language Switcher */}
      <div className="flex justify-end mb-4">
        <LanguageSwitcher 
          currentLanguage={language} 
          onLanguageChange={changeLanguage}
        />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 md:mb-8">
        {t.touristDashboard}
      </h1>

      {/* Аватарка пользователя */}
      <div className="mb-6">
        <UserAvatar />
      </div>

      {/* Статистика туриста */}
      <div className="mb-8">
        <TouristStats />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {navigationButtons.map((button) => {
          if (button.href === '#wallet') {
            return (
              <button
                key={button.href}
                onClick={() => setIsWalletOpen(true)}
                className={`${button.color} text-white rounded-lg p-3 sm:p-4 md:p-6 transition-transform transform hover:scale-105 hover:shadow-lg`}
              >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <button.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 truncate">
                      {button.title}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-white/90 line-clamp-2">
                      {button.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          }
          
          return (
            <Link 
              key={button.href} 
              href={button.href}
              className={`${button.color} text-white rounded-lg p-3 sm:p-4 md:p-6 transition-transform transform hover:scale-105 hover:shadow-lg`}
            >
              <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                <button.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 truncate">
                    {button.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-white/90 line-clamp-2">
                    {button.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>


      {/* Wallet Modal */}
      {isWalletOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {language === 'ru' ? 'Мой кошелек' : 'My Wallet'}
              </h3>
              <button
                onClick={() => setIsWalletOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <TouristWallet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 