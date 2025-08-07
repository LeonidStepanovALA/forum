'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, SparklesIcon, LightBulbIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import { aiSearchService, type AISearchRequest, type AISearchResponse, type AISuggestion } from '@/services/aiSearchService';

interface AISearchProps {
  onSearch: (query: string, filters?: any) => void;
  onSuggestionSelect: (suggestion: AISuggestion) => void;
  isLoading?: boolean;
}

export default function AISearch({ onSearch, onSuggestionSelect, isLoading = false }: AISearchProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState<AISearchResponse | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Обработка изменения запроса с AI-анализом
  const handleQueryChange = async (value: string) => {
    setQuery(value);
    setShowSuggestions(true);
    
    if (value.length > 2) {
      setAiThinking(true);
      
      try {
        const request: AISearchRequest = {
          query: value,
          language: language,
          context: 'eco-tourism'
        };
        
        const response = await aiSearchService.search(request);
        setAiResponse(response);
        setSuggestions(response.suggestions);
        
        // Сохраняем в историю
        if (value.length > 3) {
          setSearchHistory(prev => [...prev, value].slice(-10));
        }
      } catch (error) {
        console.error('AI Search Error:', error);
        // Fallback к базовым подсказкам
        setSuggestions([
          { id: 'fallback-1', text: 'Эко-туры в горы', type: 'search', confidence: 0.8, category: 'tour', relevance: 0.7 },
          { id: 'fallback-2', text: 'Органические фермы', type: 'search', confidence: 0.8, category: 'food', relevance: 0.7 }
        ]);
      } finally {
        setAiThinking(false);
      }
    } else {
      setSuggestions([]);
      setAiResponse(null);
    }
  };

  // Обработка выбора подсказки
  const handleSuggestionSelect = (suggestion: AISuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    onSuggestionSelect(suggestion);
  };

  // Обработка поиска
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  // Обработка клавиш
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Клик вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-4">
      {/* AI-поисковая строка */}
      <div className="relative">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="AI-поиск: опишите, что вы ищете..."
              className="w-full pl-12 pr-12 py-3 rounded-lg border-2 border-green-100 focus:border-green-500 focus:outline-none text-sm md:text-base"
              disabled={isLoading}
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-600" />
            <SparklesIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
          </div>
        </form>

        {/* AI-подсказки */}
        {showSuggestions && (suggestions.length > 0 || aiResponse?.recommendations.length) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
            {/* AI-подсказки */}
            {suggestions.length > 0 && (
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <LightBulbIcon className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">AI-подсказки</span>
                  {aiThinking && (
                    <div className="flex items-center gap-1">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
                      <span className="text-xs text-gray-500">Анализ...</span>
                    </div>
                  )}
                </div>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="w-full text-left p-2 hover:bg-gray-50 rounded flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-700">{suggestion.text}</span>
                    <span className="text-xs text-gray-400">
                      {Math.round(suggestion.confidence * 100)}%
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* AI-рекомендации */}
            {aiResponse?.recommendations && aiResponse.recommendations.length > 0 && (
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <SparklesIcon className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">AI-рекомендации</span>
                </div>
                {aiResponse.recommendations.map((recommendation) => (
                  <div
                    key={recommendation.id}
                    className="p-2 hover:bg-blue-50 rounded border-l-2 border-blue-200"
                  >
                    <div className="text-sm font-medium text-gray-700">{recommendation.title}</div>
                    <div className="text-xs text-gray-600">{recommendation.description}</div>
                    <div className="text-xs text-blue-500 mt-1">
                      AI: {Math.round(recommendation.confidence * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Умные фильтры */}
            {aiResponse?.filters && aiResponse.filters.length > 0 && (
              <div className="p-3 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🔧</span>
                  <span className="text-sm font-medium text-gray-700">Умные фильтры</span>
                </div>
                {aiResponse.filters.map((filter) => (
                  <div
                    key={filter.id}
                    className="p-2 hover:bg-green-50 rounded border-l-2 border-green-200"
                  >
                    <div className="text-sm font-medium text-gray-700">{filter.name}</div>
                    <div className="text-xs text-gray-600">{filter.reasoning}</div>
                    <div className="text-xs text-green-500 mt-1">
                      Уверенность: {Math.round(filter.confidence * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI-статистика поиска */}
      {query.length > 0 && aiResponse && (
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <SparklesIcon className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">AI-анализ запроса</span>
          </div>
          <div className="text-xs text-blue-600 space-y-1">
            <div>🔍 Поисковый запрос: "{query}"</div>
            <div>📊 Найдено подсказок: {suggestions.length}</div>
            <div>🤖 AI-рекомендаций: {aiResponse.recommendations.length}</div>
            <div>🔧 Умных фильтров: {aiResponse.filters.length}</div>
            <div>💡 Уверенность AI: {Math.round(aiResponse.confidence * 100)}%</div>
            <div>⏱️ Время обработки: {aiResponse.processingTime}ms</div>
          </div>
        </div>
      )}

      {/* История поиска */}
      {searchHistory.length > 0 && !showSuggestions && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📚</span>
            <span className="text-sm font-medium text-gray-700">История поиска</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.slice(-5).map((item, index) => (
              <button
                key={index}
                onClick={() => handleQueryChange(item)}
                className="bg-white px-2 py-1 rounded text-xs text-gray-600 border border-gray-200 hover:border-blue-300"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
