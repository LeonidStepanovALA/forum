'use client';

import React from 'react';
import SearchSection from '@/components/SearchSection';
import AISettings from '@/components/AISettings';
import { useLanguage } from '@/hooks/useLanguage';

export default function SearchPage() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800">
          {language === 'ru' ? 'AI-поиск' : 'AI Search'}
        </h2>
        <AISettings />
      </div>
      
      <SearchSection />
    </div>
  );
} 