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
  CheckIcon
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

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {selectedRoute ? t.editRoute : t.createRoute}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.routeName}
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={t.enterName}
                  defaultValue={selectedRoute?.name || ''}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.description}
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                  placeholder={t.describeRoute}
                  defaultValue={selectedRoute?.description || ''}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.duration}
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={t.durationExample}
                    defaultValue={selectedRoute?.duration || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.distance}
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={t.distanceExample}
                    defaultValue={selectedRoute?.distance || ''}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.typeField}
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    defaultValue={selectedRoute?.type || 'hiking'}
                  >
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    defaultValue={selectedRoute?.difficulty || 'medium'}
                  >
                    <option value="easy">{t.easy}</option>
                    <option value="medium">{t.medium}</option>
                    <option value="hard">{t.hard}</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedRoute(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  {selectedRoute ? t.save : t.create}
                </button>
              </div>
            </form>
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