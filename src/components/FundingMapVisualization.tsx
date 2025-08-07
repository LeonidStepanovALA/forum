'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import { 
  MapIcon, 
  LightBulbIcon, 
  CloudIcon, 
  TrashIcon, 
  ChartBarIcon, 
  TruckIcon 
} from '@heroicons/react/24/outline';

interface FundingAllocation {
  region: string;
  totalAllocated: number;
  categories: {
    energy: { amount: number; percentage: number };
    water: { amount: number; percentage: number };
    waste: { amount: number; percentage: number };
    food: { amount: number; percentage: number };
    transport: { amount: number; percentage: number };
  };
  impact: {
    emissionsReduction: number;
    ecoRatingImprovement: number;
    projectsCount: number;
  };
}

interface FundingMapVisualizationProps {
  allocations: FundingAllocation[];
  onRegionClick?: (region: string) => void;
}

export default function FundingMapVisualization({ 
  allocations, 
  onRegionClick 
}: FundingMapVisualizationProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const categoryIcons = {
    energy: LightBulbIcon,
    water: CloudIcon,
    waste: TrashIcon,
    food: ChartBarIcon,
    transport: TruckIcon
  };

  const categoryNames = {
    energy: language === 'ru' ? 'Энергетика' : 'Energy',
    water: language === 'ru' ? 'Вода' : 'Water',
    waste: language === 'ru' ? 'Отходы' : 'Waste',
    food: language === 'ru' ? 'Питание' : 'Food',
    transport: language === 'ru' ? 'Транспорт' : 'Transport'
  };

  const categoryColors = {
    energy: 'bg-yellow-500',
    water: 'bg-blue-500',
    waste: 'bg-red-500',
    food: 'bg-green-500',
    transport: 'bg-purple-500'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getIntensityColor = (amount: number) => {
    const maxAmount = Math.max(...allocations.map(a => a.totalAllocated));
    const intensity = (amount / maxAmount) * 100;
    
    if (intensity >= 80) return 'bg-red-500';
    if (intensity >= 60) return 'bg-orange-500';
    if (intensity >= 40) return 'bg-yellow-500';
    if (intensity >= 20) return 'bg-green-500';
    return 'bg-blue-500';
  };

  const getRegionPosition = (regionName: string) => {
    const positions: { [key: string]: { top: string; left: string; size: string } } = {
      'Алматы': { top: '60%', left: '25%', size: 'w-16 h-16' },
      'Almaty': { top: '60%', left: '25%', size: 'w-16 h-16' },
      'Астана': { top: '30%', left: '45%', size: 'w-14 h-14' },
      'Astana': { top: '30%', left: '45%', size: 'w-14 h-14' },
      'Шымкент': { top: '75%', left: '35%', size: 'w-12 h-12' },
      'Shymkent': { top: '75%', left: '35%', size: 'w-12 h-12' },
      'Алматинская область': { top: '50%', left: '20%', size: 'w-20 h-20' },
      'Almaty Region': { top: '50%', left: '20%', size: 'w-20 h-20' },
      'Актау': { top: '40%', left: '15%', size: 'w-10 h-10' },
      'Aktau': { top: '40%', left: '15%', size: 'w-10 h-10' }
    };
    
    return positions[regionName] || { top: '50%', left: '50%', size: 'w-12 h-12' };
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <MapIcon className="w-6 h-6 text-green-600" />
          <h4 className="text-lg font-semibold text-gray-800">
            🗺️ Визуализация распределения финансирования
          </h4>
        </div>

        {/* Карта Казахстана с регионами */}
        <div className="relative bg-gray-100 rounded-lg p-8 min-h-[400px] mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Карта Казахстана</div>
          </div>
          
          {/* Регионы на карте */}
          {allocations.map((allocation, index) => {
            const position = getRegionPosition(allocation.region);
            const intensityColor = getIntensityColor(allocation.totalAllocated);
            
            return (
              <div
                key={index}
                className={`absolute ${position.size} ${intensityColor} rounded-full flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform shadow-lg`}
                style={{ top: position.top, left: position.left }}
                onClick={() => onRegionClick?.(allocation.region)}
                title={`${allocation.region}: ${formatCurrency(allocation.totalAllocated)}`}
              >
                <span className="text-white text-xs font-bold text-center">
                  {allocation.region.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Легенда */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h5 className="font-semibold text-gray-800 mb-3">Легенда:</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Высокое финансирование</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Среднее финансирование</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Умеренное финансирование</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Низкое финансирование</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Минимальное финансирование</span>
            </div>
          </div>
        </div>
      </div>

      {/* Детальная статистика по категориям */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          📊 Распределение по категориям
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categoryNames).map(([category, name]) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            const totalAmount = allocations.reduce((sum, alloc) => 
              sum + alloc.categories[category as keyof typeof alloc.categories].amount, 0
            );
            const averagePercentage = allocations.reduce((sum, alloc) => 
              sum + alloc.categories[category as keyof typeof alloc.categories].percentage, 0
            ) / allocations.length;
            
            return (
              <div key={category} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon className="w-6 h-6 text-gray-600" />
                  <h5 className="font-semibold text-gray-800">{name}</h5>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Общая сумма:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Средний %:</span>
                    <span className="font-semibold text-blue-600">
                      {averagePercentage.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${categoryColors[category as keyof typeof categoryColors]}`}
                      style={{ width: `${averagePercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Топ регионов по финансированию */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          🏆 Топ регионов по объему финансирования
        </h4>
        
        <div className="space-y-3">
          {allocations
            .sort((a, b) => b.totalAllocated - a.totalAllocated)
            .map((allocation, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                  <div>
                    <h5 className="font-semibold text-gray-800">{allocation.region}</h5>
                    <p className="text-sm text-gray-600">
                      {allocation.impact.projectsCount} проектов • 
                      Снижение выбросов: {allocation.impact.emissionsReduction.toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(allocation.totalAllocated)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Эко-рейтинг: {allocation.impact.ecoRatingImprovement.toFixed(1)}/10
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
