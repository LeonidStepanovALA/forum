'use client';

import { useState, useEffect } from 'react';
import { Language } from '@/translations/index';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('ru');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Проверяем доступность localStorage перед использованием
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
          setLanguage(savedLanguage);
        }
      }
    } catch (error) {
      console.warn('localStorage недоступен:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('language', newLanguage);
      }
    } catch (error) {
      console.warn('Не удалось сохранить язык в localStorage:', error);
    }
  };

  return { language, changeLanguage, isInitialized };
} 