'use client';

import React from 'react';
import { CloudIcon, StarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <span className="text-red-500 text-lg">↗</span>;
      case 'down':
        return <span className="text-green-500 text-lg">↘</span>;
      default:
        return <ChartBarIcon className="w-5 h-5 text-blue-500" />;
    }
  };

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
      {/* Основная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{t.ecoRating}</p>
              <p className="text-2xl font-bold text-green-600">⭐ {mockTouristData.ecoRating.current}</p>
            </div>
            <StarIcon className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="mt-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(mockTouristData.ecoRating.level)}`}>
              {mockTouristData.ecoRating.level}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-green-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-500">{t.ecoPoints}</p>
              <p className="text-2xl font-bold text-green-600">{mockTouristData.ecoRating.points}</p>
            </div>
            <div className="text-center">
              <div className="relative">
                <StarIcon className="w-8 h-8 text-yellow-500" />
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {mockTouristData.ecoRating.badges}
                </div>
              </div>
            </div>
          </div>
          
          {/* Прогресс-бар до следующего уровня */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Gold</span>
              <span>Platinum (1500)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(mockTouristData.ecoRating.points / 1500) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">
              {250} {language === 'ru' ? 'баллов до Platinum' : 'points to Platinum'}
            </p>
          </div>
          
          {/* Рейтинг звездами */}
          <div className="flex items-center justify-center mt-3 space-x-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon 
                key={i} 
                className={`w-4 h-4 ${i < 4 ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{t.ecoTours}</p>
              <p className="text-2xl font-bold text-green-600">{mockTouristData.stats.ecoTours}</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">
              {t.fromTours} {mockTouristData.stats.toursCompleted} {t.tourist}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
} 