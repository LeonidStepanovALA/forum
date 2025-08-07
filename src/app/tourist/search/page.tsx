import React from 'react';
import SearchSection from '@/components/SearchSection';
import AISettings from '@/components/AISettings';

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800">
          AI-поиск
        </h2>
        <AISettings />
      </div>
      
      <SearchSection />
    </div>
  );
} 