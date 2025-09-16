'use client';

import React from 'react';
import Link from 'next/link';
import { 
  XMarkIcon
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
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  
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

  const navigationButtons: NavigationButton[] = [];

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
        <UserAvatar 
          onWalletClick={() => setIsWalletOpen(true)}
          onSearchClick={() => window.location.href = '/tourist/search'}
          onRouteManagementClick={() => window.location.href = '/tourist/route-management'}
          onBookingCalendarClick={() => window.location.href = '/tourist/booking-calendar'}
          onPhotoGalleryClick={() => window.location.href = '/tourist/photo-gallery'}
          onEmergencyClick={() => window.location.href = '/tourist/emergency'}
          onQRScanClick={() => setIsQRScannerOpen(true)}
        />
      </div>

      {/* Статистика туриста */}
      <div className="mb-8">
        <TouristStats />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {navigationButtons.map((button) => {
          const IconComponent = button.icon;
          return (
            <Link 
              key={button.href} 
              href={button.href}
              className={`${button.color} text-white rounded-lg p-3 sm:p-4 md:p-6 transition-transform transform hover:scale-105 hover:shadow-lg`}
            >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <div className="min-w-0 flex-1 text-left">
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 truncate text-left">
                      {button.title}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-white/90 line-clamp-2 text-left">
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

      {/* QR Scanner Modal */}
      {isQRScannerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {language === 'ru' ? 'QR-сканер' : 'QR Scanner'}
              </h3>
              <button
                onClick={() => setIsQRScannerOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <div className="text-center">
                <div className="bg-gray-100 rounded-lg p-8 mb-6">
                  <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {language === 'ru' ? 'Наведите камеру на QR-код для сканирования' : 'Point your camera at the QR code to scan'}
                  </p>
                  <button
                    onClick={() => {
                      // Здесь будет логика активации камеры
                      alert(language === 'ru' ? 'Активация камеры...' : 'Activating camera...');
                    }}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    {language === 'ru' ? 'Активировать камеру' : 'Activate Camera'}
                  </button>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {language === 'ru' ? 'Что можно сканировать:' : 'What you can scan:'}
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1 text-left">
                    <li>• {language === 'ru' ? 'QR-коды достопримечательностей' : 'Landmark QR codes'}</li>
                    <li>• {language === 'ru' ? 'Оплатить проезд' : 'Pay for transport'}</li>
                    <li>• {language === 'ru' ? 'Взять в аренду транспорт' : 'Rent transport'}</li>
                    <li>• {language === 'ru' ? 'Информационные коды' : 'Information codes'}</li>
                    <li>• {language === 'ru' ? 'Коды для эко-баллов' : 'Eco points codes'}</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'ru' ? 'Последние сканирования:' : 'Recent scans:'}
                  </h4>
                  <div className="space-y-2 text-sm text-green-700">
                    <div className="flex justify-between">
                      <span>{language === 'ru' ? 'Парк имени Абая' : 'Abay Park'}</span>
                      <span className="text-xs text-gray-500">2 часа назад</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'ru' ? 'Скидка 15% в кафе' : '15% discount at cafe'}</span>
                      <span className="text-xs text-gray-500">1 день назад</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'ru' ? 'Эко-баллы +50' : 'Eco points +50'}</span>
                      <span className="text-xs text-gray-500">3 дня назад</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 