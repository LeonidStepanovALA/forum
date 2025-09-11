'use client';

import React, { useState } from 'react';
import { TagIcon, NewspaperIcon, SparklesIcon, GiftIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';

interface NewsItem {
  id: number;
  type: 'news' | 'promotion';
  title: string;
  description: string;
  date: string;
  discount?: string;
  validUntil?: string;
  isActive?: boolean;
  pointsReward?: number;
  progress?: number;
  maxProgress?: number;
}



export default function NewsAndPromotions() {
  const { language } = useLanguage();
  const t = translations[language];
  const [ecoActivityProgress, setEcoActivityProgress] = useState(7); // Текущий прогресс
  const [ecoActivityMax, setEcoActivityMax] = useState(10); // Максимальный прогресс
  const [isEcoActivityClaimed, setIsEcoActivityClaimed] = useState(false);

  // Mock news with bilingual support
  const mockNews: NewsItem[] = [
    {
      id: 1,
      type: 'promotion',
      title: language === 'ru' ? 'Скидка 20% на эко-туры в горы' : '20% discount on eco-tours in mountains',
      description: language === 'ru'
        ? 'Забронируйте тур в горы с проживанием в эко-отеле и получите скидку 20%'
        : 'Book a mountain tour with accommodation in eco-hotel and get 20% discount',
      date: '2024-03-15',
      discount: '20%',
      validUntil: '2024-04-15'
    },
    {
      id: 2,
      type: 'news',
      title: language === 'ru' ? 'Новый эко-маршрут открыт' : 'New eco-route opened',
      description: language === 'ru'
        ? 'В заповеднике открылся новый маршрут для наблюдения за птицами'
        : 'A new route for bird watching opened in the nature reserve',
      date: '2024-03-10'
    },
    {
      id: 3,
      type: 'promotion',
      title: language === 'ru' ? 'Бонусы за эко-активность' : 'Bonuses for eco-activity',
      description: language === 'ru'
        ? 'Получайте дополнительные баллы за использование многоразовой посуды в турах'
        : 'Get additional points for using reusable dishes on tours',
      date: '2024-03-08',
      validUntil: '2024-12-31',
      isActive: true,
      pointsReward: 50,
      progress: ecoActivityProgress,
      maxProgress: ecoActivityMax
    }
  ];

  const handleClaimEcoBonus = () => {
    if (ecoActivityProgress >= ecoActivityMax && !isEcoActivityClaimed) {
      setIsEcoActivityClaimed(true);
      // Здесь можно добавить логику начисления баллов
      alert(language === 'ru' 
        ? `🎉 Поздравляем! Вы получили ${mockNews[2].pointsReward} эко-баллов за активность!`
        : `🎉 Congratulations! You earned ${mockNews[2].pointsReward} eco-points for activity!`
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-green-800">
          {t.promotionsAndNews}
        </h3>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
          {t.showAll}
        </button>
      </div>

      <div className="space-y-4">
        {mockNews.map((item) => (
          <div
            key={item.id}
            className={`rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 ${
              item.isActive 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-300' 
                : 'bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              {item.isActive ? (
                <div className="relative">
                  <SparklesIcon className="w-6 h-6 text-green-600 flex-shrink-0 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                </div>
              ) : item.type === 'promotion' ? (
                <TagIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : (
                <NewspaperIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
              )}
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className={`text-lg font-semibold ${item.isActive ? 'text-green-800' : 'text-gray-800'}`}>
                    {item.title}
                    {item.isActive && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        {language === 'ru' ? 'АКТИВНО' : 'ACTIVE'}
                      </span>
                    )}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">
                  {item.description}
                </p>
                
                {/* Специальная секция для активной эко-активности */}
                {item.isActive && (
                  <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <GiftIcon className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          {language === 'ru' ? 'Награда' : 'Reward'}: {item.pointsReward} {language === 'ru' ? 'эко-баллов' : 'eco-points'}
                        </span>
                      </div>
                      <TrophyIcon className="w-5 h-5 text-yellow-500" />
                    </div>
                    
                    {/* Прогресс-бар */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{language === 'ru' ? 'Прогресс' : 'Progress'}</span>
                        <span>{item.progress}/{item.maxProgress}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(item.progress! / item.maxProgress!) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Кнопка получения награды */}
                    <button
                      onClick={handleClaimEcoBonus}
                      disabled={item.progress! < item.maxProgress! || isEcoActivityClaimed}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                        item.progress! >= item.maxProgress! && !isEcoActivityClaimed
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 shadow-lg'
                          : isEcoActivityClaimed
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isEcoActivityClaimed ? (
                        <span className="flex items-center justify-center gap-2">
                          <TrophyIcon className="w-4 h-4" />
                          {language === 'ru' ? 'Награда получена!' : 'Reward claimed!'}
                        </span>
                      ) : item.progress! >= item.maxProgress! ? (
                        <span className="flex items-center justify-center gap-2">
                          <GiftIcon className="w-4 h-4" />
                          {language === 'ru' ? 'Получить награду' : 'Claim reward'}
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <span>{language === 'ru' ? 'Продолжайте активность' : 'Keep being active'}</span>
                          <span className="text-xs">({item.maxProgress! - item.progress!} {language === 'ru' ? 'осталось' : 'left'})</span>
                        </span>
                      )}
                    </button>
                  </div>
                )}
                
                {item.type === 'promotion' && !item.isActive && (
                  <div className="mt-2 flex items-center gap-4">
                    {item.discount && (
                      <span className="text-green-600 font-semibold">
                        {language === 'ru' ? 'Скидка' : 'Discount'}: {item.discount}
                      </span>
                    )}
                    {item.validUntil && (
                      <span className="text-sm text-gray-500">
                        {language === 'ru' ? 'Действует до' : 'Valid until'}: {new Date(item.validUntil).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 