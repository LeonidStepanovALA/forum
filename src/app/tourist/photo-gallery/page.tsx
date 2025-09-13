'use client';

import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import PhotoGallery from '@/components/PhotoGallery';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function PhotoGalleryPage() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link 
            href="/tourist" 
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">
            {language === 'ru' ? 'Фотогалерея' : 'Photo Gallery'}
          </h1>
        </div>
        <LanguageSwitcher 
          currentLanguage={language} 
          onLanguageChange={changeLanguage}
        />
      </div>

      {/* Photo Gallery Component */}
      <PhotoGallery />
    </div>
  );
}
