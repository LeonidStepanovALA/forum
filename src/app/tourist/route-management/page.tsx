'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  MapIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface Route {
  id: string;
  name: string;
  description: string;
  duration: string;
  distance: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'hiking' | 'cycling' | 'cultural' | 'nature';
  locations: string[];
  guide?: string;
  rating: number;
  isFavorite: boolean;
  createdAt: string;
}

export default function RouteManagementPage() {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [routeCreationStep, setRouteCreationStep] = useState<'start' | 'points' | 'photos' | 'finish'>('start');
  const [routePoints, setRoutePoints] = useState<Array<{id: string, name: string, lat: number, lng: number, description: string}>>([]);
  const [routePhotos, setRoutePhotos] = useState<Array<{id: string, url: string, description: string, pointId?: string}>>([]);

  // Mock route data (bilingual)
  const mockRoutes: Route[] = [
    {
      id: '1',
      name: language === 'ru' ? 'Эко-маршрут по горам Алматы' : 'Eco Route in Almaty Mountains',
      description: language === 'ru' 
        ? 'Живописный маршрут через горные тропы с видами на город'
        : 'A scenic route through mountain trails with city views',
      duration: language === 'ru' ? '4-6 часов' : '4-6 hours',
      distance: language === 'ru' ? '12 км' : '12 km',
      difficulty: 'medium',
      type: 'hiking',
      locations: language === 'ru' 
        ? ['Парк Первого Президента', 'Водопад Медвежий', 'Пик Фурманова']
        : ['First President Park', 'Bear Waterfall', 'Furmanov Peak'],
      guide: language === 'ru' ? 'Айгуль Сатпаева' : 'Aigul Satpayeva',
      rating: 4.8,
      isFavorite: true,
      createdAt: '2024-07-15'
    },
    {
      id: '2',
      name: language === 'ru' ? 'Велосипедный тур по Астане' : 'Astana Cycling Tour',
      description: language === 'ru'
        ? 'Обзорная экскурсия на велосипеде по главным достопримечательностям'
        : 'Sightseeing bike tour of the main attractions',
      duration: language === 'ru' ? '3-4 часа' : '3-4 hours',
      distance: language === 'ru' ? '25 км' : '25 km',
      difficulty: 'easy',
      type: 'cycling',
      locations: language === 'ru'
        ? ['Байтерек', 'Хан Шатыр', 'Ак Орда', 'Мечеть Нур-Астана']
        : ['Baiterek', 'Khan Shatyr', 'Ak Orda', 'Nur-Astana Mosque'],
      rating: 4.6,
      isFavorite: false,
      createdAt: '2024-07-20'
    },
    {
      id: '3',
      name: language === 'ru' ? 'Культурный тур по Шымкенту' : 'Cultural Tour in Shymkent',
      description: language === 'ru'
        ? 'Знакомство с историей и культурой южной столицы'
        : 'Discover the history and culture of the southern capital',
      duration: language === 'ru' ? '5-6 часов' : '5-6 hours',
      distance: language === 'ru' ? '8 км' : '8 km',
      difficulty: 'easy',
      type: 'cultural',
      locations: language === 'ru'
        ? ['Центральная площадь', 'Музей истории', 'Старый город']
        : ['Central Square', 'History Museum', 'Old Town'],
      guide: language === 'ru' ? 'Марат Жумабаев' : 'Marat Zhumabayev',
      rating: 4.7,
      isFavorite: true,
      createdAt: '2024-07-25'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return language === 'ru' ? 'Легкий' : 'Easy';
      case 'medium':
        return language === 'ru' ? 'Средний' : 'Medium';
      case 'hard':
        return language === 'ru' ? 'Сложный' : 'Hard';
      default:
        return language === 'ru' ? 'Неизвестно' : 'Unknown';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hiking':
        return '🏔️';
      case 'cycling':
        return '🚴';
      case 'cultural':
        return '🏛️';
      case 'nature':
        return '🌿';
      default:
        return '🗺️';
    }
  };

  const filteredRoutes = mockRoutes.filter(route => {
    const typeMatch = filterType === 'all' || route.type === filterType;
    const difficultyMatch = filterDifficulty === 'all' || route.difficulty === filterDifficulty;
    return typeMatch && difficultyMatch;
  });

  const addRoutePoint = (point: {name: string, lat: number, lng: number, description: string}) => {
    const newPoint = {
      id: Date.now().toString(),
      ...point
    };
    setRoutePoints([...routePoints, newPoint]);
  };

  const addRoutePhoto = (photo: {url: string, description: string, pointId?: string}) => {
    const newPhoto = {
      id: Date.now().toString(),
      ...photo
    };
    setRoutePhotos([...routePhotos, newPhoto]);
  };

  const removeRoutePoint = (pointId: string) => {
    setRoutePoints(routePoints.filter(point => point.id !== pointId));
  };

  const removeRoutePhoto = (photoId: string) => {
    setRoutePhotos(routePhotos.filter(photo => photo.id !== photoId));
  };

  const resetRouteCreation = () => {
    setRouteCreationStep('start');
    setRoutePoints([]);
    setRoutePhotos([]);
    setShowAddModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Language Switcher */}
      <div className="flex justify-end mb-4">
        <LanguageSwitcher 
          currentLanguage={language} 
          onLanguageChange={changeLanguage}
        />
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/tourist"
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">
            {t.routeManagement}
          </h1>
          <p className="text-gray-600 mt-1">
            {t.createAndEditRoutes}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.routeType}
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">{t.allTypes}</option>
            <option value="hiking">{t.hiking}</option>
            <option value="cycling">{t.cycling}</option>
            <option value="cultural">{t.cultural}</option>
            <option value="nature">{t.nature}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.difficulty}
          </label>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">{t.anyDifficulty}</option>
            <option value="easy">{t.easy}</option>
            <option value="medium">{t.medium}</option>
            <option value="hard">{t.hard}</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          {t.createRoute}
        </button>
        <button
          onClick={() => setShowSelectModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <CheckIcon className="w-5 h-5" />
          {language === 'ru' ? 'Выбрать маршрут' : 'Select Route'}
        </button>
      </div>

      {/* Routes List */}
      <div className="grid gap-4">
        {filteredRoutes.map((route) => (
          <div 
            key={route.id}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="text-2xl">
                  {getTypeIcon(route.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {route.name}
                    </h3>
                    {route.isFavorite && (
                      <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">
                    {route.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4" />
                      <span>{route.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{route.distance}</span>
                    </div>
                    {route.guide && (
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4" />
                        <span>{route.guide}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(route.difficulty)}`}>
                      {getDifficultyText(route.difficulty)}
                    </span>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{route.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <strong>{t.routePoints}</strong> {route.locations.join(', ')}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedRoute(route)}
                  className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRoutes.length === 0 && (
        <div className="text-center py-12">
          <MapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {t.noRoutes}
          </h3>
          <p className="text-gray-500 mb-4">
            {t.noRoutesYet}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            {t.createFirstRoute}
          </button>
        </div>
      )}

      {/* Route Creation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">
                {language === 'ru' ? 'Создание маршрута' : 'Route Creation'}
              </h3>
              <button
                onClick={resetRouteCreation}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                {[
                  { key: 'start', label: language === 'ru' ? 'Начать' : 'Start' },
                  { key: 'points', label: language === 'ru' ? 'Точки' : 'Points' },
                  { key: 'photos', label: language === 'ru' ? 'Фото' : 'Photos' },
                  { key: 'finish', label: language === 'ru' ? 'Завершить' : 'Finish' }
                ].map((step, index) => (
                  <div key={step.key} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      routeCreationStep === step.key 
                        ? 'bg-green-500 text-white' 
                        : routeCreationStep === 'start' && index === 0
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`ml-2 text-sm ${
                      routeCreationStep === step.key ? 'text-green-600 font-medium' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                    {index < 3 && (
                      <div className={`w-12 h-0.5 mx-4 ${
                        routeCreationStep === step.key ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            {routeCreationStep === 'start' && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <MapIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {language === 'ru' ? 'Начните создание маршрута' : 'Start Route Creation'}
                  </h4>
                  <p className="text-gray-600 mb-6">
                    {language === 'ru' 
                      ? 'Создайте свой уникальный маршрут, добавив точки интереса и фотографии'
                      : 'Create your unique route by adding points of interest and photos'
                    }
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h5 className="font-semibold text-green-800 mb-2">
                      {language === 'ru' ? 'Основная информация' : 'Basic Information'}
                    </h5>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === 'ru' ? 'Название маршрута' : 'Route Name'}
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder={language === 'ru' ? 'Введите название' : 'Enter name'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === 'ru' ? 'Описание' : 'Description'}
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          rows={3}
                          placeholder={language === 'ru' ? 'Опишите маршрут' : 'Describe the route'}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h5 className="font-semibold text-blue-800 mb-2">
                      {language === 'ru' ? 'Параметры маршрута' : 'Route Parameters'}
                    </h5>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'ru' ? 'Тип' : 'Type'}
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="hiking">{t.hiking}</option>
                            <option value="cycling">{t.cycling}</option>
                            <option value="cultural">{t.cultural}</option>
                            <option value="nature">{t.nature}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'ru' ? 'Сложность' : 'Difficulty'}
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="easy">{t.easy}</option>
                            <option value="medium">{t.medium}</option>
                            <option value="hard">{t.hard}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setRouteCreationStep('points')}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {language === 'ru' ? 'Продолжить' : 'Continue'}
                  </button>
                </div>
              </div>
            )}

            {routeCreationStep === 'points' && (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {language === 'ru' ? 'Добавьте точки маршрута' : 'Add Route Points'}
                  </h4>
                  <p className="text-gray-600">
                    {language === 'ru' 
                      ? 'Отметьте на карте ключевые точки вашего маршрута'
                      : 'Mark key points of your route on the map'
                    }
                  </p>
                </div>
                
                {/* Map Placeholder */}
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">
                    {language === 'ru' ? 'Интерактивная карта' : 'Interactive Map'}
                  </p>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    {language === 'ru' ? 'Открыть карту' : 'Open Map'}
                  </button>
                </div>
                
                {/* Route Points List */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-800">
                    {language === 'ru' ? 'Точки маршрута' : 'Route Points'} ({routePoints.length})
                  </h5>
                  {routePoints.map((point, index) => (
                    <div key={point.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <h6 className="font-medium text-gray-800">{point.name}</h6>
                            <p className="text-sm text-gray-600">{point.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeRoutePoint(point.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {routePoints.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MapPinIcon className="w-8 h-8 mx-auto mb-2" />
                      <p>{language === 'ru' ? 'Пока нет точек маршрута' : 'No route points yet'}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setRouteCreationStep('start')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {language === 'ru' ? 'Назад' : 'Back'}
                  </button>
                  <button
                    onClick={() => setRouteCreationStep('photos')}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {language === 'ru' ? 'Продолжить' : 'Continue'}
                  </button>
                </div>
              </div>
            )}

            {routeCreationStep === 'photos' && (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {language === 'ru' ? 'Добавьте фотографии' : 'Add Photos'}
                  </h4>
                  <p className="text-gray-600">
                    {language === 'ru' 
                      ? 'Загрузите фотографии для вашего маршрута'
                      : 'Upload photos for your route'
                    }
                  </p>
                </div>
                
                {/* Photo Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                  <div className="text-4xl mb-4">📸</div>
                  <p className="text-gray-600 mb-4">
                    {language === 'ru' ? 'Перетащите фото сюда или нажмите для выбора' : 'Drag photos here or click to select'}
                  </p>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                    {language === 'ru' ? 'Выбрать файлы' : 'Select Files'}
                  </button>
                </div>
                
                {/* Photos Grid */}
                {routePhotos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {routePhotos.map((photo) => (
                      <div key={photo.id} className="relative bg-gray-100 rounded-lg p-4">
                        <div className="aspect-square bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                          <span className="text-gray-500">📷</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{photo.description}</p>
                        <button
                          onClick={() => removeRoutePhoto(photo.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setRouteCreationStep('points')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {language === 'ru' ? 'Назад' : 'Back'}
                  </button>
                  <button
                    onClick={() => setRouteCreationStep('finish')}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {language === 'ru' ? 'Продолжить' : 'Continue'}
                  </button>
                </div>
              </div>
            )}

            {routeCreationStep === 'finish' && (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {language === 'ru' ? 'Завершение маршрута' : 'Finish Route'}
                  </h4>
                  <p className="text-gray-600">
                    {language === 'ru' 
                      ? 'Проверьте информацию и поделитесь маршрутом'
                      : 'Review information and share your route'
                    }
                  </p>
                </div>
                
                {/* Route Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-800 mb-4">
                    {language === 'ru' ? 'Сводка маршрута' : 'Route Summary'}
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{routePoints.length}</div>
                      <div className="text-sm text-gray-600">
                        {language === 'ru' ? 'Точек маршрута' : 'Route Points'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{routePhotos.length}</div>
                      <div className="text-sm text-gray-600">
                        {language === 'ru' ? 'Фотографий' : 'Photos'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">4.8</div>
                      <div className="text-sm text-gray-600">
                        {language === 'ru' ? 'Рейтинг' : 'Rating'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Share Options */}
                <div className="space-y-4">
                  <h5 className="font-semibold text-gray-800">
                    {language === 'ru' ? 'Поделиться маршрутом' : 'Share Route'}
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-center">
                      <div className="text-lg mb-1">📱</div>
                      <div className="text-xs">WhatsApp</div>
                    </button>
                    <button className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-lg text-center">
                      <div className="text-lg mb-1">📘</div>
                      <div className="text-xs">Facebook</div>
                    </button>
                    <button className="bg-blue-300 hover:bg-blue-400 text-white p-3 rounded-lg text-center">
                      <div className="text-lg mb-1">🐦</div>
                      <div className="text-xs">Twitter</div>
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-lg text-center">
                      <div className="text-lg mb-1">📋</div>
                      <div className="text-xs">{language === 'ru' ? 'Скопировать' : 'Copy'}</div>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setRouteCreationStep('photos')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {language === 'ru' ? 'Назад' : 'Back'}
                  </button>
                  <button
                    onClick={resetRouteCreation}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {language === 'ru' ? 'Создать маршрут' : 'Create Route'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Select Route Modal */}
      {showSelectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ru' ? 'Выбрать маршрут' : 'Select Route'}
            </h3>
            <div className="space-y-4">
              {mockRoutes.map((route) => (
                <div 
                  key={route.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedRoute(route);
                    setShowSelectModal(false);
                    // Здесь можно добавить логику выбора маршрута
                    alert(language === 'ru' 
                      ? `Выбран маршрут: ${route.name}` 
                      : `Selected route: ${route.name}`
                    );
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {getTypeIcon(route.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {route.name}
                        </h4>
                        {route.isFavorite && (
                          <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">
                        {route.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{route.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{route.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{route.rating}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(route.difficulty)}`}>
                          {getDifficultyText(route.difficulty)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowSelectModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 