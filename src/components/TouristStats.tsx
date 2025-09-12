'use client';

import React from 'react';
import { StarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations/index';

interface TouristStatsProps {
  className?: string;
}

const mockTouristData = {
  carbonFootprint: {
    total: 2.1,
    saved: 1.8,
    reduction: 46,
    equivalent: 9,
    monthly: 0.3,
    trend: 'down'
  },
  ecoRating: {
    current: 4.7,
    level: 'Gold',
    points: 1250,
    badges: 8,
    achievements: [
      'ecoTraveler',
      'natureProtector',
      'recyclingExpert',
      'energyMaster'
    ]
  },
  stats: {
    toursCompleted: 12,
    ecoTours: 8,
    carbonSaved: 1.8,
    treesPlanted: 9,
    ecoActions: 25
  }
};

export default function TouristStats({ className = '' }: TouristStatsProps) {
  const { language, isInitialized } = useLanguage();
  
  // Показываем загрузку, пока хук не инициализирован
  if (!isInitialized) {
    return (
      <div className={`p-4 bg-blue-50 border border-blue-200 rounded-lg ${className}`}>
        <p className="text-blue-800">Загрузка...</p>
      </div>
    );
  }
  
  // Проверяем, что переводы доступны
  if (!translations || !translations[language]) {
    console.warn('Переводы недоступны для языка:', language);
    return (
      <div className={`p-4 bg-yellow-50 border border-yellow-200 rounded-lg ${className}`}>
        <p className="text-yellow-800">Загрузка переводов...</p>
      </div>
    );
  }
  
  const t = translations[language];

  // const getTrendIcon = (trend: string) => {
  //   switch (trend) {
  //     case 'up':
  //       return <span className="text-red-500 text-lg">↗</span>;
  //     case 'down':
  //       return <span className="text-green-500 text-lg">↘</span>;
  //     default:
  //       return <ChartBarIcon className="w-5 h-5 text-blue-500" />;
  //   }
  // };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bronze':
        return 'text-amber-600 bg-amber-100';
      case 'Silver':
        return 'text-gray-600 bg-gray-100';
      case 'Gold':
        return 'text-yellow-600 bg-yellow-100';
      case 'Platinum':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Дополнительная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{language === 'ru' ? 'Всего туров' : 'Total Tours'}</p>
              <p className="text-2xl font-bold text-green-600">{mockTouristData.stats.toursCompleted}</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">
              {t.fromTours} {mockTouristData.stats.toursCompleted} {t.tourist}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{language === 'ru' ? 'Сэкономлено CO₂' : 'CO₂ Saved'}</p>
              <p className="text-2xl font-bold text-green-600">{mockTouristData.stats.carbonSaved}т</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">
              {language === 'ru' ? 'Эквивалент' : 'Equivalent'} {mockTouristData.carbonFootprint.equivalent} {language === 'ru' ? 'деревьев' : 'trees'}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{language === 'ru' ? 'Эко-действия' : 'Eco Actions'}</p>
              <p className="text-2xl font-bold text-green-600">{mockTouristData.stats.ecoActions}</p>
            </div>
            <StarIcon className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">
              {language === 'ru' ? 'Выполнено в этом месяце' : 'Completed this month'}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
} 