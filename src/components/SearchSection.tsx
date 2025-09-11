'use client';

import React, { useState } from 'react';
import { SparklesIcon, CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
// import { translations } from '@/translations';
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
  // const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
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

  const handleSearch = async (query: string, additionalFilters?: unknown) => {
    console.log(language === 'ru' ? '🔍 Поиск запущен:' : '🔍 Search started:', { query, additionalFilters });
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
        duration: language === 'ru' ? '2 дня' : '2 days',
        difficulty: language === 'ru' ? 'Средняя' : 'Medium',
        startPoint: language === 'ru' ? 'Алматы' : 'Almaty',
        endPoint: language === 'ru' ? 'Алматы' : 'Almaty',
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
        duration: language === 'ru' ? '3 дня' : '3 days',
        difficulty: language === 'ru' ? 'Легкая' : 'Easy',
        startPoint: language === 'ru' ? 'Астана' : 'Astana',
        endPoint: language === 'ru' ? 'Астана' : 'Astana',
        startDate: '2024-08-20',
        endDate: '2024-08-22',
        rating: 4.6,
        reviews: 18,
        ecoRating: 4.7
      }
    ];
    
    console.log(language === 'ru' ? '📋 Найдено результатов:' : '📋 Results found:', mockResults.length);
    setSearchResults(mockResults);
    setIsLoading(false);
  };

  const handleSuggestionSelect = () => {
    // Применяем фильтры на основе AI-предложения
    // if (suggestion.category) {
    //   setFilters(prev => ({ ...prev, category: suggestion.category }));
    // }
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
{language === 'ru' ? 'Фильтры поиска' : 'Search Filters'}
          </h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
{showFilters ? (language === 'ru' ? 'Скрыть' : 'Hide') : (language === 'ru' ? 'Показать' : 'Show')} {language === 'ru' ? 'фильтры' : 'filters'}
          </button>
          </div>

        {/* Фильтры */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Категория */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
{language === 'ru' ? 'Категория' : 'Category'}
              </label>
              <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  <option value="">{language === 'ru' ? 'Все категории' : 'All categories'}</option>
                  <option value="trekking">{language === 'ru' ? 'Треккинг' : 'Trekking'}</option>
                  <option value="cycling">{language === 'ru' ? 'Велотуры' : 'Cycling Tours'}</option>
                  <option value="water">{language === 'ru' ? 'Водные туры' : 'Water Tours'}</option>
                  <option value="cultural">{language === 'ru' ? 'Культурные туры' : 'Cultural Tours'}</option>
                  <option value="heritage">{language === 'ru' ? 'Культурное наследие' : 'Cultural Heritage'}</option>
                  <option value="wildlife">{language === 'ru' ? 'Наблюдение за дикой природой' : 'Wildlife Watching'}</option>
              </select>
            </div>

              {/* Дата начала */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CalendarIcon className="inline w-4 h-4 mr-1" />
{language === 'ru' ? 'Дата начала' : 'Start Date'}
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Дата окончания */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CalendarIcon className="inline w-4 h-4 mr-1" />
{language === 'ru' ? 'Дата окончания' : 'End Date'}
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                  min={filters.startDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Начальная точка */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPinIcon className="inline w-4 h-4 mr-1" />
{language === 'ru' ? 'Начальная точка' : 'Start Point'}
                </label>
                <input
                  type="text"
                  value={filters.startPoint}
                  onChange={(e) => handleFilterChange('startPoint', e.target.value)}
                  placeholder={language === 'ru' ? 'Например: Алматы' : 'e.g. Almaty'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Конечная точка */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPinIcon className="inline w-4 h-4 mr-1" />
{language === 'ru' ? 'Конечная точка' : 'End Point'}
              </label>
                <input
                  type="text"
                  value={filters.endPoint}
                  onChange={(e) => handleFilterChange('endPoint', e.target.value)}
                  placeholder={language === 'ru' ? 'Например: Астана' : 'e.g. Astana'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
            </div>

              {/* Продолжительность */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ClockIcon className="inline w-4 h-4 mr-1" />
{language === 'ru' ? 'Продолжительность' : 'Duration'}
                </label>
                <select
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  <option value="">{language === 'ru' ? 'Любая' : 'Any'}</option>
                  <option value="1">1 {language === 'ru' ? 'день' : 'day'}</option>
                  <option value="2">2 {language === 'ru' ? 'дня' : 'days'}</option>
                  <option value="3">3 {language === 'ru' ? 'дня' : 'days'}</option>
                  <option value="4">4 {language === 'ru' ? 'дня' : 'days'}</option>
                  <option value="5">5 {language === 'ru' ? 'дней' : 'days'}</option>
                  <option value="6">6 {language === 'ru' ? 'дней' : 'days'}</option>
                  <option value="7">7 {language === 'ru' ? 'дней' : 'days'}</option>
                  <option value="8+">8+ {language === 'ru' ? 'дней' : 'days'}</option>
                </select>
              </div>

              {/* Ценовой диапазон */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
{language === 'ru' ? 'Ценовой диапазон' : 'Price Range'}
              </label>
              <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  <option value="">{language === 'ru' ? 'Любая цена' : 'Any price'}</option>
                  <option value="0-25000">{language === 'ru' ? 'До 25,000 ₸' : 'Up to 25,000 ₸'}</option>
                  <option value="25000-50000">25,000 - 50,000 ₸</option>
                  <option value="50000-100000">50,000 - 100,000 ₸</option>
                  <option value="100000-200000">100,000 - 200,000 ₸</option>
                  <option value="200000+">{language === 'ru' ? 'От 200,000 ₸' : 'From 200,000 ₸'}</option>
              </select>
            </div>

              {/* Сложность */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
{language === 'ru' ? 'Сложность' : 'Difficulty'}
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                >
                  <option value="">{language === 'ru' ? 'Любая' : 'Any'}</option>
                  <option value="easy">{language === 'ru' ? 'Легкая' : 'Easy'}</option>
                  <option value="medium">{language === 'ru' ? 'Средняя' : 'Medium'}</option>
                  <option value="hard">{language === 'ru' ? 'Сложная' : 'Hard'}</option>
                  <option value="expert">{language === 'ru' ? 'Эксперт' : 'Expert'}</option>
              </select>
            </div>
          </div>
        </div>
        )}

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => handleSearch(searchQuery || 'туры', filters)}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            <SparklesIcon className="w-4 h-4" />
{isLoading ? (language === 'ru' ? 'Поиск...' : 'Searching...') : (language === 'ru' ? 'Найти туры' : 'Find Tours')}
          </button>

        <button 
            onClick={clearFilters}
            className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
          >
{language === 'ru' ? 'Очистить' : 'Clear'}
        </button>
        </div>
      </div>

      {/* Результаты поиска */}
      {searchResults.length > 0 && (
        <div>
          <div className="mb-4 p-2 bg-blue-50 rounded text-sm text-blue-700">
            🔍 {language === 'ru' ? 'Найдено результатов' : 'Results found'}: {searchResults.length}
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
          <div className="text-gray-500 mb-2">{language === 'ru' ? 'По вашему запросу ничего не найдено' : 'No results found for your query'}</div>
          <div className="text-sm text-gray-400">
            {language === 'ru' ? 'Попробуйте изменить параметры поиска или использовать другие ключевые слова' : 'Try changing search parameters or using different keywords'}
          </div>
        </div>
      )}
    </div>
  );
} 