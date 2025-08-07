'use client';

import React from 'react';

interface AIAnalyticsProps {
  searchQuery?: string;
  searchResults?: unknown[];
  onInsightClick?: (insight: string) => void;
}

export default function AIAnalytics({ searchQuery, onInsightClick }: AIAnalyticsProps) {
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  // Имитация AI-анализа поискового запроса
  React.useEffect(() => {
    if (searchQuery && searchQuery.length > 3) {
      setIsAnalyzing(true);
      
      // Имитируем анализ
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 2000);
    }
  }, [searchQuery]);

  const getSearchInsights = () => {
    const insights = [];
    
    if (searchQuery) {
      if (searchQuery.toLowerCase().includes('горы')) {
        insights.push({
          type: 'trend',
          text: '🔥 Поиски горных туров выросли на 23% в этом месяце',
          icon: '🔥'
        });
      }
      
      if (searchQuery.toLowerCase().includes('эко')) {
        insights.push({
          type: 'recommendation',
          text: '🌱 Попробуйте также: "Эко-отели с солнечными панелями"',
          icon: '🌱'
        });
      }
      
      if (searchQuery.toLowerCase().includes('питание')) {
        insights.push({
          type: 'trend',
          text: '📈 Органическое питание - тренд сезона',
          icon: '📈'
        });
      }
    }
    
    return insights;
  };

  const insights = getSearchInsights();

  return (
    <div className="space-y-6">
      {/* AI-аналитика поиска */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h3 className="text-lg font-semibold text-gray-800">AI-аналитика поиска</h3>
          {isAnalyzing && (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span className="text-sm text-blue-600">Анализ...</span>
            </div>
          )}
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">1247</div>
            <div className="text-xs text-gray-600">Всего поисков</div>
          </div>
          <div className="bg-white p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">94%</div>
            <div className="text-xs text-gray-600">Точность AI</div>
          </div>
        </div>

        {/* AI-инсайты */}
        {insights.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">💡</span>
              <span className="font-medium text-gray-700">AI-инсайты</span>
            </div>
            <div className="space-y-2">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-lg border-l-4 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => onInsightClick?.(insight.text)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{insight.icon}</span>
                    <span className="text-sm text-gray-700">{insight.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Популярные запросы */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📈</span>
            <span className="font-medium text-gray-700">Популярные запросы</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Эко-туры в горы', 'Органические фермы', 'Электровелосипеды', 'Гид-натуралист'].map((query, index) => (
              <span
                key={index}
                className="bg-white px-3 py-1 rounded-full text-xs text-gray-600 border border-gray-200 hover:border-green-300 cursor-pointer"
              >
                {query}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
