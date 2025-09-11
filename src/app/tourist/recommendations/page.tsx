'use client';

import React from 'react';
import PersonalizedRecommendations from '@/components/PersonalizedRecommendations';
import { useLanguage } from '@/hooks/useLanguage';

export default function RecommendationsPage() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        {language === 'ru' ? 'Персонализированные рекомендации' : 'Personalized Recommendations'}
      </h2>
      <PersonalizedRecommendations />
    </div>
  );
} 