'use client';

import React from 'react';
import { CloudIcon, SparklesIcon, ArrowTrendingDownIcon, CalendarIcon, CalculatorIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import TreePlantingReport from '@/components/TreePlantingReport';
import LanguageSwitcher from '@/components/LanguageSwitcher';



export default function CarbonReportPage() {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  // Mock carbon data with bilingual support
  const mockCarbonData = {
    summary: {
      totalFootprint: 2.1,
      savedFootprint: 1.8,
      reductionPercentage: 46,
      treesEquivalent: 9,
      monthlyAverage: 0.3
    },
    breakdown: {
      transport: {
        total: 0.8,
        saved: 0.6,
        percentage: 25
      },
      accommodation: {
        total: 0.5,
        saved: 0.4,
        percentage: 20
      },
      activities: {
        total: 0.4,
        saved: 0.3,
        percentage: 15
      },
      food: {
        total: 0.3,
        saved: 0.2,
        percentage: 10
      },
      waste: {
        total: 0.1,
        saved: 0.1,
        percentage: 5
      }
    },
    timeline: [
      { month: language === 'ru' ? 'Январь' : 'January', footprint: 0.4, saved: 0.3 },
      { month: language === 'ru' ? 'Февраль' : 'February', footprint: 0.3, saved: 0.2 },
      { month: language === 'ru' ? 'Март' : 'March', footprint: 0.5, saved: 0.4 },
      { month: language === 'ru' ? 'Апрель' : 'April', footprint: 0.2, saved: 0.1 },
      { month: language === 'ru' ? 'Май' : 'May', footprint: 0.4, saved: 0.3 },
      { month: language === 'ru' ? 'Июнь' : 'June', footprint: 0.3, saved: 0.2 }
    ],
    achievements: [
      { 
        title: language === 'ru' ? 'Эко-транспорт' : 'Eco Transport', 
        description: language === 'ru' ? 'Использовал велосипед и электромобили' : 'Used bicycles and electric cars', 
        impact: language === 'ru' ? 'Сократил выбросы на 25%' : 'Reduced emissions by 25%' 
      },
      { 
        title: language === 'ru' ? 'Эко-отели' : 'Eco Hotels', 
        description: language === 'ru' ? 'Выбирал отели с эко-сертификатами' : 'Chose hotels with eco-certificates', 
        impact: language === 'ru' ? 'Сократил выбросы на 20%' : 'Reduced emissions by 20%' 
      },
      { 
        title: language === 'ru' ? 'Эко-туры' : 'Eco Tours', 
        description: language === 'ru' ? 'Участвовал в экологических турах' : 'Participated in environmental tours', 
        impact: language === 'ru' ? 'Сократил выбросы на 15%' : 'Reduced emissions by 15%' 
      },
      { 
        title: language === 'ru' ? 'Эко-питание' : 'Eco Food', 
        description: language === 'ru' ? 'Выбирал местные органические продукты' : 'Chose local organic products', 
        impact: language === 'ru' ? 'Сократил выбросы на 10%' : 'Reduced emissions by 10%' 
      },
      { 
        title: language === 'ru' ? 'Переработка' : 'Recycling', 
        description: language === 'ru' ? 'Сортировал отходы во время путешествий' : 'Sorted waste during travels', 
        impact: language === 'ru' ? 'Сократил выбросы на 5%' : 'Reduced emissions by 5%' 
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher 
            currentLanguage={language} 
            onLanguageChange={changeLanguage}
          />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 md:mb-8">
          {t.carbonFootprintReport}
        </h1>

        {/* Основная статистика */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-2 border-green-100">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-base md:text-lg font-semibold text-green-800">{t.totalFootprint}</h3>
              <CloudIcon className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-green-600">{mockCarbonData.summary.totalFootprint} т CO₂</p>
            <p className="text-xs md:text-sm text-gray-600 mt-2">{t.forEntirePeriod}</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-2 border-green-100">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-base md:text-lg font-semibold text-green-800">{language === 'ru' ? 'Сэкономлено' : 'Saved'}</h3>
              <ArrowTrendingDownIcon className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-green-600">{mockCarbonData.summary.savedFootprint} т CO₂</p>
            <p className="text-xs md:text-sm text-gray-600 mt-2">{language === 'ru' ? 'Благодаря эко-действиям' : 'Thanks to eco-actions'}</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-2 border-green-100">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-base md:text-lg font-semibold text-green-800">{language === 'ru' ? 'Сокращение' : 'Reduction'}</h3>
              <CalculatorIcon className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-green-600">{mockCarbonData.summary.reductionPercentage}%</p>
            <p className="text-xs md:text-sm text-gray-600 mt-2">{language === 'ru' ? 'По сравнению с обычными туристами' : 'Compared to regular tourists'}</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-2 border-green-100">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-base md:text-lg font-semibold text-green-800">{language === 'ru' ? 'Деревья' : 'Trees'}</h3>
              <SparklesIcon className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-green-600">{mockCarbonData.summary.treesEquivalent}</p>
            <p className="text-xs md:text-sm text-gray-600 mt-2">{language === 'ru' ? 'Эквивалент посаженных деревьев' : 'Equivalent of planted trees'}</p>
          </div>
        </div>

        {/* Детальная разбивка */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4 md:mb-6">{language === 'ru' ? 'Детальная разбивка по категориям' : 'Detailed breakdown by categories'}</h2>
          
          <div className="space-y-4">
            {Object.entries(mockCarbonData.breakdown).map(([category, data]) => (
              <div key={category} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-green-800 capitalize text-sm md:text-base">
                    {category === 'transport' ? (language === 'ru' ? 'Транспорт' : 'Transport') : 
                     category === 'accommodation' ? (language === 'ru' ? 'Размещение' : 'Accommodation') :
                     category === 'activities' ? (language === 'ru' ? 'Активности' : 'Activities') :
                     category === 'food' ? (language === 'ru' ? 'Питание' : 'Food') : (language === 'ru' ? 'Отходы' : 'Waste')}
                  </h3>
                  <span className="text-xs md:text-sm text-gray-600">
                    {language === 'ru' ? 'Сокращение на' : 'Reduction by'} {data.percentage}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(data.saved / data.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-xs md:text-sm text-gray-600">{language === 'ru' ? 'Было' : 'Was'}: {data.total} т</p>
                    <p className="text-xs md:text-sm text-green-600">{language === 'ru' ? 'Стало' : 'Now'}: {data.total - data.saved} т</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Достижения */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4 md:mb-6">{language === 'ru' ? 'Ваши эко-достижения' : 'Your eco-achievements'}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {mockCarbonData.achievements.map((achievement, index) => (
              <div key={index} className="p-3 md:p-4 border-2 border-green-100 rounded-lg hover:border-green-300 transition-colors">
                <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">{achievement.title}</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2">{achievement.description}</p>
                <p className="text-xs md:text-sm text-green-600 font-medium">{achievement.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Временная шкала */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4 md:mb-6">{language === 'ru' ? 'Динамика по месяцам' : 'Monthly dynamics'}</h2>
          
          <div className="space-y-3 md:space-y-4">
            {mockCarbonData.timeline.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  <span className="font-medium text-green-800 text-sm md:text-base">{month.month}</span>
                </div>
                <div className="flex items-center space-x-4 md:space-x-6">
                  <div className="text-center">
                    <p className="text-xs md:text-sm text-gray-600">{language === 'ru' ? 'Общий след' : 'Total footprint'}</p>
                    <p className="font-semibold text-gray-800 text-sm md:text-base">{month.footprint} т</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs md:text-sm text-gray-600">{language === 'ru' ? 'Сэкономлено' : 'Saved'}</p>
                    <p className="font-semibold text-green-600 text-sm md:text-base">{month.saved} т</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Отчет о высаженных деревьях */}
        <div className="mb-6 md:mb-8">
          <TreePlantingReport />
        </div>

        {/* Рекомендации */}
        <div className="bg-green-50 rounded-lg p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{language === 'ru' ? 'Рекомендации для дальнейшего сокращения' : 'Recommendations for further reduction'}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="p-3 md:p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">🚲 {language === 'ru' ? 'Больше велосипедных туров' : 'More bicycle tours'}</h3>
              <p className="text-xs md:text-sm text-gray-600">{language === 'ru' ? 'Может сократить транспортные выбросы еще на 15%' : 'Can reduce transport emissions by another 15%'}</p>
            </div>
            
            <div className="p-3 md:p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">🏨 {language === 'ru' ? 'Выбирайте эко-отели' : 'Choose eco-hotels'}</h3>
              <p className="text-xs md:text-sm text-gray-600">{language === 'ru' ? 'Отели с сертификатами сокращают выбросы на 20%' : 'Certified hotels reduce emissions by 20%'}</p>
            </div>
            
            <div className="p-3 md:p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">🌱 {language === 'ru' ? 'Инвестируйте в AirCoin для посадки деревьев' : 'Invest in AirCoin for tree planting'}</h3>
              <p className="text-xs md:text-sm text-gray-600">{language === 'ru' ? 'Каждое дерево компенсирует 0.2 т CO₂ в год. Используйте AirCoin для автоматической компенсации углеродного следа при бронировании туров.' : 'Each tree compensates 0.2 tons of CO₂ per year. Use AirCoin for automatic carbon footprint compensation when booking tours.'}</p>
            </div>
            
            <div className="p-3 md:p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">♻️ {language === 'ru' ? 'Сортируйте отходы' : 'Sort waste'}</h3>
              <p className="text-xs md:text-sm text-gray-600">{language === 'ru' ? 'Переработка сокращает выбросы на 5-10%' : 'Recycling reduces emissions by 5-10%'}</p>
            </div>
            
            <div className="p-3 md:p-4 bg-white rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">🌿 {language === 'ru' ? 'Поддерживайте лесные проекты' : 'Support forest projects'}</h3>
              <p className="text-xs md:text-sm text-gray-600">{language === 'ru' ? 'Финансируйте восстановление лесов и заповедников через AirCoin' : 'Fund forest and reserve restoration through AirCoin'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 