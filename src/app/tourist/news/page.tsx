'use client';

import React from 'react';
import NewsAndPromotions from '@/components/NewsAndPromotions';
import { useLanguage } from '@/hooks/useLanguage';

export default function NewsPage() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        {language === 'ru' ? 'Сообщения' : 'Messages'}
      </h2>
      <NewsAndPromotions />
    </div>
  );
} 