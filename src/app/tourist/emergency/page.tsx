'use client';

import React from 'react';
import EmergencyContact from '@/components/EmergencyContact';
import { useLanguage } from '@/hooks/useLanguage';

export default function EmergencyPage() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        {language === 'ru' ? 'Экстренная связь' : 'Emergency Contact'}
      </h2>
      <EmergencyContact />
    </div>
  );
} 