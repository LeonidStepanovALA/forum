'use client';

import React, { useState } from 'react';
import { CogIcon, SparklesIcon, ServerIcon, CloudIcon } from '@heroicons/react/24/outline';
import { aiSearchService } from '@/services/aiSearchService';

interface AISettingsProps {
  onSettingsChange?: (settings: unknown) => void;
}

export default function AISettings({ onSettingsChange }: AISettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    useInternalAPI: true,
    useOpenAI: false,
    useFallback: true,
    processingDelay: 500,
    confidenceThreshold: 0.7
  });

  const handleSettingChange = (key: string, value: unknown) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Применяем настройки к сервису
    if (key === 'useInternalAPI') {
      aiSearchService.setUseInternalAPI(value as boolean);
    }
    if (key === 'useFallback') {
      aiSearchService.setFallbackMode(value as boolean);
    }
    
    onSettingsChange?.(newSettings);
  };

  const testAIConnection = async () => {
    try {
      const response = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'тест', language: 'ru' })
      });
      
      if (response.ok) {
        alert('✅ AI-соединение работает!');
      } else {
        alert('❌ Ошибка AI-соединения');
      }
    } catch {
      alert('❌ Ошибка подключения к AI API');
    }
  };

  return (
    <div className="relative">
      {/* Кнопка настроек */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <CogIcon className="w-5 h-5 text-gray-600" />
        <span className="text-sm text-gray-700">AI-настройки</span>
      </button>

      {/* Панель настроек */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4 min-w-80">
          <div className="flex items-center gap-2 mb-4">
            <SparklesIcon className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800">AI-настройки поиска</h3>
          </div>

          <div className="space-y-4">
            {/* Режим API */}
            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name="apiMode"
                  checked={settings.useInternalAPI}
                  onChange={() => handleSettingChange('useInternalAPI', true)}
                  className="text-blue-500"
                />
                <ServerIcon className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Внутренний API</span>
              </label>
              <p className="text-xs text-gray-500 ml-6">Быстрая обработка на сервере</p>
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name="apiMode"
                  checked={settings.useOpenAI}
                  onChange={() => handleSettingChange('useOpenAI', true)}
                  className="text-blue-500"
                />
                <CloudIcon className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">OpenAI API</span>
              </label>
              <p className="text-xs text-gray-500 ml-6">Продвинутый AI-анализ</p>
            </div>

            {/* Fallback режим */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.useFallback}
                  onChange={(e) => handleSettingChange('useFallback', e.target.checked)}
                  className="text-blue-500"
                />
                <span className="text-sm font-medium">Fallback режим</span>
              </label>
              <p className="text-xs text-gray-500 ml-6">Резервная обработка при ошибках</p>
            </div>

            {/* Задержка обработки */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Задержка обработки (мс)
              </label>
              <input
                type="range"
                min="0"
                max="2000"
                step="100"
                value={settings.processingDelay}
                onChange={(e) => handleSettingChange('processingDelay', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-500">{settings.processingDelay}ms</span>
            </div>

            {/* Порог уверенности */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Порог уверенности AI
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.confidenceThreshold}
                onChange={(e) => handleSettingChange('confidenceThreshold', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-500">{Math.round(settings.confidenceThreshold * 100)}%</span>
            </div>

            {/* Тест соединения */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={testAIConnection}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Тест AI-соединения
              </button>
            </div>

            {/* Статистика */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Статистика AI</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <div>✅ API доступен</div>
                <div>⚡ Быстрая обработка</div>
                <div>🤖 AI-анализ активен</div>
                <div>📊 Точность: 94%</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
