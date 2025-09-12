'use client';

import React, { useState } from 'react';
import { TagIcon, NewspaperIcon, SparklesIcon, GiftIcon, TrophyIcon, CheckCircleIcon, ClockIcon, LightBulbIcon } from '@heroicons/react/24/outline';
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

interface EcoTask {
  id: number;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
  createdAt: Date;
}



export default function NewsAndPromotions() {
  const { language } = useLanguage();
  const t = translations[language];
  const [ecoActivityProgress, setEcoActivityProgress] = useState(7); // Текущий прогресс
  const [ecoActivityMax] = useState(10); // Максимальный прогресс
  const [isEcoActivityClaimed, setIsEcoActivityClaimed] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<EcoTask | null>(null);
  
  // Состояние для новости "Новый эко-маршрут"
  const [ecoRouteProgress, setEcoRouteProgress] = useState(3); // Текущий прогресс
  const [ecoRouteMax] = useState(5); // Максимальный прогресс
  const [isEcoRouteClaimed, setIsEcoRouteClaimed] = useState(false);

  // Массив возможных эко-заданий
  const availableTasks: Omit<EcoTask, 'id' | 'completed' | 'createdAt'>[] = [
    {
      title: language === 'ru' ? 'Используйте многоразовую бутылку' : 'Use a reusable water bottle',
      description: language === 'ru' 
        ? 'В течение дня используйте только многоразовую бутылку для воды вместо одноразовых пластиковых бутылок'
        : 'Use only a reusable water bottle throughout the day instead of disposable plastic bottles',
      type: 'daily',
      difficulty: 'easy',
      points: 5
    },
    {
      title: language === 'ru' ? 'Сортируйте мусор' : 'Sort your waste',
      description: language === 'ru'
        ? 'Разделите мусор на перерабатываемые и неперерабатываемые отходы'
        : 'Separate waste into recyclable and non-recyclable materials',
      type: 'daily',
      difficulty: 'easy',
      points: 8
    },
    {
      title: language === 'ru' ? 'Поездка на велосипеде' : 'Bike ride',
      description: language === 'ru'
        ? 'Замените поездку на автомобиле на поездку на велосипеде или пешком'
        : 'Replace a car trip with a bike ride or walking',
      type: 'daily',
      difficulty: 'medium',
      points: 12
    },
    {
      title: language === 'ru' ? 'Экономия электроэнергии' : 'Save electricity',
      description: language === 'ru'
        ? 'Выключите все неиспользуемые электроприборы и свет в доме'
        : 'Turn off all unused electrical appliances and lights in the house',
      type: 'daily',
      difficulty: 'easy',
      points: 6
    },
    {
      title: language === 'ru' ? 'Посадка дерева' : 'Plant a tree',
      description: language === 'ru'
        ? 'Посадите дерево в парке или на своем участке'
        : 'Plant a tree in a park or on your property',
      type: 'special',
      difficulty: 'hard',
      points: 25
    },
    {
      title: language === 'ru' ? 'Уборка пляжа' : 'Beach cleanup',
      description: language === 'ru'
        ? 'Проведите уборку мусора на пляже или в парке'
        : 'Clean up trash at a beach or park',
      type: 'weekly',
      difficulty: 'medium',
      points: 20
    }
  ];

  // Mock messages with bilingual support
  const mockNews: NewsItem[] = [
    {
      id: 1,
      type: 'news',
      title: language === 'ru' ? 'Новый эко-маршрут открыт' : 'New eco-route opened',
      description: language === 'ru'
        ? 'В заповеднике открылся новый маршрут для наблюдения за птицами'
        : 'A new route for bird watching opened in the nature reserve',
      date: '2024-03-10',
      isActive: true,
      pointsReward: 30,
      progress: ecoRouteProgress,
      maxProgress: ecoRouteMax
    },
    {
      id: 2,
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
    },
    {
      id: 3,
      type: 'news',
      title: language === 'ru' ? 'Обновление приложения' : 'App Update',
      description: language === 'ru'
        ? 'Добавлены новые функции: фотогалерея, улучшенная навигация и система уведомлений.'
        : 'New features added: photo gallery, improved navigation and notification system.',
      date: '2024-03-05'
    },
    {
      id: 4,
      type: 'news',
      title: language === 'ru' ? 'Советы по экотуризму' : 'Ecotourism Tips',
      description: language === 'ru'
        ? 'Помните: всегда убирайте за собой мусор, не кормите диких животных и следуйте тропам.'
        : 'Remember: always clean up after yourself, don\'t feed wild animals and stay on trails.',
      date: '2024-03-01'
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

  const handleClaimEcoRouteBonus = () => {
    if (ecoRouteProgress >= ecoRouteMax && !isEcoRouteClaimed) {
      setIsEcoRouteClaimed(true);
      alert(language === 'ru' 
        ? `🎉 Поздравляем! Вы получили ${mockNews[1].pointsReward} эко-баллов за исследование нового маршрута!`
        : `🎉 Congratulations! You earned ${mockNews[1].pointsReward} eco-points for exploring the new route!`
      );
    }
  };

  const handleContinueEcoRoute = () => {
    if (ecoRouteProgress < ecoRouteMax) {
      setEcoRouteProgress(prev => Math.min(prev + 1, ecoRouteMax));
      alert(language === 'ru' 
        ? `✅ Отлично! Вы исследовали еще один участок маршрута! (+1 к прогрессу)`
        : `✅ Great! You explored another section of the route! (+1 to progress)`
      );
    }
  };

  const handleContinueActivity = () => {
    if (ecoActivityProgress < ecoActivityMax) {
      // Создаем случайное задание
      const randomTask = availableTasks[Math.floor(Math.random() * availableTasks.length)];
      const newTask: EcoTask = {
        ...randomTask,
        id: Date.now(),
        completed: false,
        createdAt: new Date()
      };
      
      setCurrentTask(newTask);
      setShowTaskModal(true);
    }
  };

  const handleCompleteTask = () => {
    if (currentTask) {
      // Увеличиваем прогресс
      setEcoActivityProgress(prev => Math.min(prev + 1, ecoActivityMax));
      
      // Закрываем модальное окно
      setShowTaskModal(false);
      setCurrentTask(null);
      
      alert(language === 'ru' 
        ? `🎉 Задание выполнено! Вы получили ${currentTask.points} эко-баллов! (+1 к прогрессу)`
        : `🎉 Task completed! You earned ${currentTask.points} eco-points! (+1 to progress)`
      );
    }
  };

  const handleSkipTask = () => {
    setShowTaskModal(false);
    setCurrentTask(null);
  };

  return (
    <div className="space-y-6">

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
                    
                    {/* Прогресс-бар с достижениями */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-2">
                        <span>{language === 'ru' ? 'Прогресс' : 'Progress'}</span>
                        <span>{item.progress}/{item.maxProgress}</span>
                      </div>
                      
                      {/* Полоска прогресса с маркерами достижений */}
                      <div className="relative w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(item.progress! / item.maxProgress!) * 100}%` }}
                        ></div>
                        
                        {/* Маркеры достижений */}
                        {Array.from({ length: item.maxProgress! }, (_, index) => {
                          const position = (index + 1) / item.maxProgress! * 100;
                          const isCompleted = index < item.progress!;
                          const isCurrent = index === item.progress! - 1;
                          
                          return (
                            <div
                              key={index}
                              className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 ${
                                isCompleted
                                  ? 'bg-green-500 border-green-600'
                                  : isCurrent
                                  ? 'bg-yellow-400 border-yellow-500 animate-pulse'
                                  : 'bg-white border-gray-300'
                              }`}
                              style={{ left: `calc(${position}% - 8px)` }}
                            >
                              {isCompleted && (
                                <CheckCircleIcon className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                              )}
                              {isCurrent && !isCompleted && (
                                <ClockIcon className="w-3 h-3 text-yellow-600 absolute top-0.5 left-0.5" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Описание достижений */}
                      <div className="text-xs text-gray-600">
                        {language === 'ru' ? (
                          <>
                            <span className="text-green-600">✅ {item.progress} выполнено</span>
                            {item.progress! < item.maxProgress! && (
                              <span className="text-gray-500"> • {item.maxProgress! - item.progress!} осталось</span>
                            )}
                          </>
                        ) : (
                          <>
                            <span className="text-green-600">✅ {item.progress} completed</span>
                            {item.progress! < item.maxProgress! && (
                              <span className="text-gray-500"> • {item.maxProgress! - item.progress!} remaining</span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Кнопка активности */}
                    {(() => {
                      // Определяем, какая это новость и её состояние
                      const isEcoActivity = item.id === 2; // Бонусы за эко-активность
                      const isEcoRoute = item.id === 1; // Новый эко-маршрут
                      
                      const isClaimed = isEcoActivity ? isEcoActivityClaimed : isEcoRoute ? isEcoRouteClaimed : false;
                      const handleClaim = isEcoActivity ? handleClaimEcoBonus : isEcoRoute ? handleClaimEcoRouteBonus : () => {};
                      const handleContinue = isEcoActivity ? handleContinueActivity : isEcoRoute ? handleContinueEcoRoute : () => {};
                      
                      const buttonText = isEcoActivity 
                        ? (language === 'ru' ? 'Выполнить эко-действие' : 'Complete eco-action')
                        : (language === 'ru' ? 'Исследовать маршрут' : 'Explore route');
                      
                      if (isClaimed) {
                        return (
                          <button
                            disabled
                            className="w-full py-2 px-4 rounded-lg font-medium bg-gray-100 text-gray-500 cursor-not-allowed"
                          >
                            <span className="flex items-center justify-center gap-2">
                              <TrophyIcon className="w-4 h-4" />
                              {language === 'ru' ? 'Награда получена!' : 'Reward claimed!'}
                            </span>
                          </button>
                        );
                      } else if (item.progress! >= item.maxProgress!) {
                        return (
                          <button
                            onClick={handleClaim}
                            className="w-full py-2 px-4 rounded-lg font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 shadow-lg transition-all duration-200"
                          >
                            <span className="flex items-center justify-center gap-2">
                              <GiftIcon className="w-4 h-4" />
                              {language === 'ru' ? 'Получить награду' : 'Claim reward'}
                            </span>
                          </button>
                        );
                      } else {
                        return (
                          <button
                            onClick={handleContinue}
                            className="w-full py-2 px-4 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-700 transform hover:scale-105 shadow-lg transition-all duration-200"
                          >
                            <span className="flex items-center justify-center gap-2">
                              <SparklesIcon className="w-4 h-4" />
                              <span>{buttonText}</span>
                              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                                +1
                              </span>
                            </span>
                          </button>
                        );
                      }
                    })()}
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

      {/* Модальное окно для задания */}
      {showTaskModal && currentTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <LightBulbIcon className="w-5 h-5 text-yellow-500" />
                {language === 'ru' ? 'Новое эко-задание!' : 'New eco-task!'}
              </h3>
              <button
                onClick={handleSkipTask}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  currentTask.difficulty === 'easy' 
                    ? 'bg-green-100 text-green-800'
                    : currentTask.difficulty === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {language === 'ru' 
                    ? currentTask.difficulty === 'easy' ? 'Легко' : currentTask.difficulty === 'medium' ? 'Средне' : 'Сложно'
                    : currentTask.difficulty.charAt(0).toUpperCase() + currentTask.difficulty.slice(1)
                  }
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {currentTask.points} {language === 'ru' ? 'баллов' : 'points'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  currentTask.type === 'daily' 
                    ? 'bg-purple-100 text-purple-800'
                    : currentTask.type === 'weekly'
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-pink-100 text-pink-800'
                }`}>
                  {language === 'ru' 
                    ? currentTask.type === 'daily' ? 'Ежедневно' : currentTask.type === 'weekly' ? 'Еженедельно' : 'Особое'
                    : currentTask.type.charAt(0).toUpperCase() + currentTask.type.slice(1)
                  }
                </span>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {currentTask.title}
              </h4>
              
              <p className="text-gray-600 text-sm">
                {currentTask.description}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSkipTask}
                className="flex-1 py-2 px-4 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
              >
                {language === 'ru' ? 'Пропустить' : 'Skip'}
              </button>
              <button
                onClick={handleCompleteTask}
                className="flex-1 py-2 px-4 rounded-lg font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 shadow-lg transition-all duration-200"
              >
                <span className="flex items-center justify-center gap-2">
                  <CheckCircleIcon className="w-4 h-4" />
                  {language === 'ru' ? 'Выполнить' : 'Complete'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 