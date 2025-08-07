'use client';

import React, { useState } from 'react';
import { MagnifyingGlassIcon, SparklesIcon, CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import AISearch from './AISearch';
import SearchResults from './SearchResults';

interface SearchFilters {
  category: string;
  startDate: string;
  endDate: string;
  startPoint: string;
  endPoint: string;
  duration: string;
  priceRange: string;
  difficulty: string;
}

interface SearchResult {
  id: number;
  type: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  difficulty: string;
  startPoint: string;
  endPoint: string;
  startDate: string;
  endDate: string;
  rating: number;
  reviews: number;
  ecoRating: number;
}

export default function SearchSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    startDate: '',
    endDate: '',
    startPoint: '',
    endPoint: '',
    duration: '',
    priceRange: '',
    difficulty: ''
  });

  const handleSearch = async (query: string, additionalFilters?: any) => {
    console.log('🔍 Поиск запущен:', { query, additionalFilters });
    setIsLoading(true);
    setSearchQuery(query);
    
    // Имитация поиска с учетом фильтров
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Здесь будет реальный поиск с API
    const mockResults = [
      {
        id: 1,
        type: 'tour',
        title: language === 'ru' ? 'Треккинг в горах Алматы' : 'Trekking in Almaty Mountains',
        description: language === 'ru'
          ? 'Двухдневный поход по живописным маршрутам с профессиональным гидом и экологическим обучением'
          : 'Two-day hike through scenic routes with professional guide and environmental education',
        image: '/guide.jpg',
        price: 45000,
        duration: '2 дня',
        difficulty: 'Средняя',
        startPoint: 'Алматы',
        endPoint: 'Алматы',
        startDate: '2024-08-15',
        endDate: '2024-08-16',
        rating: 4.8,
        reviews: 24,
        ecoRating: 4.9
      },
      {
        id: 2,
        type: 'tour',
        title: language === 'ru' ? 'Эко-тур по озерам' : 'Eco-tour around lakes',
        description: language === 'ru'
          ? 'Трехдневный тур по живописным озерам с ночевкой в эко-домиках'
          : 'Three-day tour around scenic lakes with overnight stays in eco-lodges',
        image: '/equipment.jpg',
        price: 65000,
        duration: '3 дня',
        difficulty: 'Легкая',
        startPoint: 'Астана',
        endPoint: 'Астана',
        startDate: '2024-08-20',
        endDate: '2024-08-22',
        rating: 4.6,
        reviews: 18,
        ecoRating: 4.7
      }
    ];
    
    console.log('📋 Найдено результатов:', mockResults.length);
    setSearchResults(mockResults);
    setIsLoading(false);
  };

  const handleSuggestionSelect = (suggestion: any) => {
    // Применяем фильтры на основе AI-предложения
    if (suggestion.category) {
      setFilters(prev => ({ ...prev, category: suggestion.category }));
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    if (type === 'start') {
      setFilters(prev => ({ ...prev, startDate: value }));
      // Автоматически устанавливаем конечную дату через день
      if (value) {
        const endDate = new Date(value);
        endDate.setDate(endDate.getDate() + 1);
        setFilters(prev => ({ 
          ...prev, 
          endDate: endDate.toISOString().split('T')[0] 
        }));
      }
    } else {
      setFilters(prev => ({ ...prev, endDate: value }));
    }
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      startDate: '',
      endDate: '',
      startPoint: '',
      endPoint: '',
      duration: '',
      priceRange: '',
      difficulty: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* AI-поиск */}
      <AISearch 
        onSearch={handleSearch}
        onSuggestionSelect={handleSuggestionSelect}
        isLoading={isLoading}
      />

      {/* Фильтры поиска */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Фильтры поиска
          </h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {showFilters ? 'Скрыть' : 'Показать'} фильтры
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Категория */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Все категории</option>
                <option value="tour">Туры</option>
                <option value="accommodation">Размещение</option>
                <option value="transport">Транспорт</option>
                <option value="guide">Гиды</option>
                <option value="equipment">Снаряжение</option>
              </select>
            </div>

            {/* Дата начала */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CalendarIcon className="inline w-4 h-4 mr-1" />
                Дата начала
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleDateChange('start', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Дата окончания */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CalendarIcon className="inline w-4 h-4 mr-1" />
                Дата окончания
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleDateChange('end', e.target.value)}
                min={filters.startDate || new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Начальная точка */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPinIcon className="inline w-4 h-4 mr-1" />
                Начальная точка
              </label>
              <input
                type="text"
                value={filters.startPoint}
                onChange={(e) => handleFilterChange('startPoint', e.target.value)}
                placeholder="Например: Алматы"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Конечная точка */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPinIcon className="inline w-4 h-4 mr-1" />
                Конечная точка
              </label>
              <input
                type="text"
                value={filters.endPoint}
                onChange={(e) => handleFilterChange('endPoint', e.target.value)}
                placeholder="Например: Астана"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Продолжительность */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ClockIcon className="inline w-4 h-4 mr-1" />
                Продолжительность
              </label>
              <select
                value={filters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Любая</option>
                <option value="1">1 день</option>
                <option value="2">2 дня</option>
                <option value="3">3 дня</option>
                <option value="4">4 дня</option>
                <option value="5">5 дней</option>
                <option value="6">6 дней</option>
                <option value="7">7 дней</option>
                <option value="8+">8+ дней</option>
              </select>
            </div>

            {/* Ценовой диапазон */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ценовой диапазон
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Любая цена</option>
                <option value="0-25000">До 25,000 ₸</option>
                <option value="25000-50000">25,000 - 50,000 ₸</option>
                <option value="50000-100000">50,000 - 100,000 ₸</option>
                <option value="100000-200000">100,000 - 200,000 ₸</option>
                <option value="200000+">От 200,000 ₸</option>
              </select>
            </div>

            {/* Сложность */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Сложность
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Любая</option>
                <option value="easy">Легкая</option>
                <option value="medium">Средняя</option>
                <option value="hard">Сложная</option>
                <option value="expert">Эксперт</option>
              </select>
            </div>
          </div>
        )}

        {/* Кнопки действий */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => handleSearch(searchQuery || 'туры', filters)}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SparklesIcon className="w-4 h-4" />
            {isLoading ? 'Поиск...' : 'Найти туры'}
          </button>
          
          <button
            onClick={() => handleSearch('тест', filters)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Тест результатов
          </button>
          
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Очистить
          </button>
        </div>
      </div>

      {/* Результаты поиска */}
      {searchResults.length > 0 && (
        <div>
          <div className="mb-4 p-2 bg-blue-50 rounded text-sm text-blue-700">
            🔍 Найдено результатов: {searchResults.length}
          </div>
          <SearchResults 
            results={searchResults}
            searchQuery={searchQuery}
          />
        </div>
      )}

      {/* Сообщение об отсутствии результатов */}
      {searchQuery && searchResults.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-2">По вашему запросу ничего не найдено</div>
          <div className="text-sm text-gray-400">
            Попробуйте изменить параметры поиска или использовать другие ключевые слова
          </div>
        </div>
      )}
    </div>
  );
} 