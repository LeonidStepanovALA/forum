'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, TrophyIcon, CalendarIcon, MapIcon, SparklesIcon, ArrowPathIcon, SunIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface EcoPointsTransaction {
  id: string;
  type: 'earned' | 'spent';
  amount: number;
  description: string;
  descriptionRu: string;
  category: 'tour' | 'eco_action' | 'bonus' | 'referral' | 'achievement';
  date: string;
  icon: React.ElementType;
  color: string;
}

export default function EcoPointsHistoryPage() {
  const { language, changeLanguage } = useLanguage();

  const mockTransactions: EcoPointsTransaction[] = [
    {
      id: '1',
      type: 'earned',
      amount: 150,
      description: 'Completed eco-tour "Mountain Hiking"',
      descriptionRu: 'Завершен эко-тур "Горный поход"',
      category: 'tour',
      date: '2024-01-15',
      icon: MapIcon,
      color: 'text-green-500'
    },
    {
      id: '2',
      type: 'earned',
      amount: 75,
      description: 'Used public transport instead of car',
      descriptionRu: 'Использовал общественный транспорт вместо автомобиля',
      category: 'eco_action',
      date: '2024-01-14',
      icon: ArrowPathIcon,
      color: 'text-blue-500'
    },
    {
      id: '3',
      type: 'earned',
      amount: 200,
      description: 'Planted 5 trees in eco-project',
      descriptionRu: 'Посадил 5 деревьев в эко-проекте',
      category: 'eco_action',
      date: '2024-01-12',
      icon: SparklesIcon,
      color: 'text-emerald-500'
    },
    {
      id: '4',
      type: 'earned',
      amount: 100,
      description: 'Weekly eco-challenge completed',
      descriptionRu: 'Завершен недельный эко-челлендж',
      category: 'achievement',
      date: '2024-01-10',
      icon: TrophyIcon,
      color: 'text-yellow-500'
    },
    {
      id: '5',
      type: 'earned',
      amount: 50,
      description: 'Friend referral bonus',
      descriptionRu: 'Бонус за приглашение друга',
      category: 'referral',
      date: '2024-01-08',
      icon: SunIcon,
      color: 'text-orange-500'
    },
    {
      id: '6',
      type: 'spent',
      amount: -80,
      description: 'Purchased eco-friendly water bottle',
      descriptionRu: 'Купил экологичную бутылку для воды',
      category: 'eco_action',
      date: '2024-01-05',
      icon: ArrowPathIcon,
      color: 'text-red-500'
    },
    {
      id: '7',
      type: 'earned',
      amount: 120,
      description: 'Completed bike tour "City Eco Route"',
      descriptionRu: 'Завершен велосипедный тур "Городской эко-маршрут"',
      category: 'tour',
      date: '2024-01-03',
      icon: MapIcon,
      color: 'text-green-500'
    },
    {
      id: '8',
      type: 'earned',
      amount: 90,
      description: 'Monthly eco-report submitted',
      descriptionRu: 'Подан месячный эко-отчет',
      category: 'achievement',
      date: '2024-01-01',
      icon: TrophyIcon,
      color: 'text-yellow-500'
    }
  ];

  const getCategoryName = (category: string) => {
    if (language === 'ru') {
      switch (category) {
        case 'tour': return 'Эко-тур';
        case 'eco_action': return 'Эко-действие';
        case 'bonus': return 'Бонус';
        case 'referral': return 'Реферал';
        case 'achievement': return 'Достижение';
        default: return 'Другое';
      }
    } else {
      switch (category) {
        case 'tour': return 'Eco Tour';
        case 'eco_action': return 'Eco Action';
        case 'bonus': return 'Bonus';
        case 'referral': return 'Referral';
        case 'achievement': return 'Achievement';
        default: return 'Other';
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'ru') {
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  };

  const totalEarned = mockTransactions
    .filter(t => t.type === 'earned')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = Math.abs(mockTransactions
    .filter(t => t.type === 'spent')
    .reduce((sum, t) => sum + t.amount, 0));

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link 
            href="/tourist" 
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">
            {language === 'ru' ? 'История эко-баллов' : 'Eco Points History'}
          </h1>
        </div>
        <LanguageSwitcher 
          currentLanguage={language} 
          onLanguageChange={changeLanguage}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center space-x-3">
            <TrophyIcon className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">
                {language === 'ru' ? 'Всего заработано' : 'Total Earned'}
              </p>
              <p className="text-2xl font-bold text-green-700">
                +{totalEarned.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center space-x-3">
            <ArrowPathIcon className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">
                {language === 'ru' ? 'Потрачено' : 'Total Spent'}
              </p>
              <p className="text-2xl font-bold text-red-700">
                -{totalSpent.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-3">
            <SunIcon className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">
                {language === 'ru' ? 'Текущий баланс' : 'Current Balance'}
              </p>
              <p className="text-2xl font-bold text-blue-700">
                {(totalEarned - totalSpent).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {language === 'ru' ? 'История транзакций' : 'Transaction History'}
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {mockTransactions.map((transaction) => {
            const IconComponent = transaction.icon;
            return (
              <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full bg-gray-100 ${transaction.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {language === 'ru' ? transaction.descriptionRu : transaction.description}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {getCategoryName(transaction.category)}
                        </span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{formatDate(transaction.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'earned' ? '+' : ''}{transaction.amount}
                    </p>
                    <p className="text-xs text-gray-500">
                      {language === 'ru' ? 'эко-баллов' : 'eco points'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3">
          {language === 'ru' ? 'Как зарабатывать эко-баллы?' : 'How to earn eco points?'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => window.location.href = '/tourist/route-management'}
            className="flex items-center space-x-2 p-3 bg-white hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors duration-200 text-left"
          >
            <MapIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-sm text-blue-700">
              {language === 'ru' ? 'Участвуйте в эко-турах' : 'Participate in eco-tours'}
            </span>
          </button>
          
          <button
            onClick={() => window.location.href = '/tourist/carbon-report'}
            className="flex items-center space-x-2 p-3 bg-white hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors duration-200 text-left"
          >
            <ArrowPathIcon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="text-sm text-blue-700">
              {language === 'ru' ? 'Выполняйте экологические действия' : 'Perform eco-friendly actions'}
            </span>
          </button>
          
          <button
            onClick={() => window.location.href = '/tourist/recommendations'}
            className="flex items-center space-x-2 p-3 bg-white hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors duration-200 text-left"
          >
            <TrophyIcon className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <span className="text-sm text-blue-700">
              {language === 'ru' ? 'Достигайте целей и получайте бонусы' : 'Achieve goals and earn bonuses'}
            </span>
          </button>
          
          <button
            onClick={() => window.location.href = '/tourist/news'}
            className="flex items-center space-x-2 p-3 bg-white hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors duration-200 text-left"
          >
            <SunIcon className="w-5 h-5 text-orange-600 flex-shrink-0" />
            <span className="text-sm text-blue-700">
              {language === 'ru' ? 'Приглашайте друзей в приложение' : 'Invite friends to the app'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
