'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import { 
  BuildingOfficeIcon, 
  HomeIcon, 
  MapPinIcon, 
  StarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  CloudIcon,
  TrashIcon,
  ChartBarIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

interface Accommodation {
  id: number;
  name: string;
  type: 'hotel' | 'eco-lodge' | 'guesthouse' | 'camping' | 'resort';
  region: string;
  currentEcoRating: number;
  currentCapacity: number;
  maxCapacity: number;
  fundingNeeded: number;
  ecoImprovements: {
    energy: { current: number; needed: number; cost: number };
    water: { current: number; needed: number; cost: number };
    waste: { current: number; needed: number; cost: number };
    food: { current: number; needed: number; cost: number };
    transport: { current: number; needed: number; cost: number };
  };
  priority: number;
  estimatedImpact: {
    emissionsReduction: number;
    ecoRatingImprovement: number;
    additionalCapacity: number;
  };
}

interface AccommodationFundingListProps {
  allocations: any[];
  onAccommodationSelect?: (accommodation: Accommodation) => void;
}

export default function AccommodationFundingList({ 
  allocations, 
  onAccommodationSelect 
}: AccommodationFundingListProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('priority');

  // Моковые данные гостиниц/отелей
  const accommodations: Accommodation[] = [
    {
      id: 1,
      name: language === 'ru' ? 'Эко-отель "Зеленые горы"' : 'Eco Hotel "Green Mountains"',
      type: 'eco-lodge',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      currentEcoRating: 7.8,
      currentCapacity: 45,
      maxCapacity: 60,
      fundingNeeded: 25000000,
      ecoImprovements: {
        energy: { current: 65, needed: 85, cost: 8000000 },
        water: { current: 70, needed: 90, cost: 6000000 },
        waste: { current: 55, needed: 80, cost: 4000000 },
        food: { current: 60, needed: 85, cost: 3000000 },
        transport: { current: 45, needed: 75, cost: 4000000 }
      },
      priority: 9,
      estimatedImpact: {
        emissionsReduction: 25,
        ecoRatingImprovement: 1.2,
        additionalCapacity: 15
      }
    },
    {
      id: 2,
      name: language === 'ru' ? 'Гостиница "Алматы Центр"' : 'Hotel "Almaty Center"',
      type: 'hotel',
      region: language === 'ru' ? 'Алматы' : 'Almaty',
      currentEcoRating: 6.5,
      currentCapacity: 120,
      maxCapacity: 150,
      fundingNeeded: 35000000,
      ecoImprovements: {
        energy: { current: 50, needed: 80, cost: 12000000 },
        water: { current: 55, needed: 85, cost: 8000000 },
        waste: { current: 40, needed: 75, cost: 6000000 },
        food: { current: 45, needed: 80, cost: 5000000 },
        transport: { current: 35, needed: 70, cost: 4000000 }
      },
      priority: 8,
      estimatedImpact: {
        emissionsReduction: 30,
        ecoRatingImprovement: 1.5,
        additionalCapacity: 30
      }
    },
    {
      id: 3,
      name: language === 'ru' ? 'Эко-лагерь "Лесная сказка"' : 'Eco Camp "Forest Tale"',
      type: 'camping',
      region: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      currentEcoRating: 8.2,
      currentCapacity: 30,
      maxCapacity: 40,
      fundingNeeded: 18000000,
      ecoImprovements: {
        energy: { current: 75, needed: 90, cost: 4000000 },
        water: { current: 80, needed: 95, cost: 3000000 },
        waste: { current: 70, needed: 85, cost: 2000000 },
        food: { current: 75, needed: 90, cost: 3000000 },
        transport: { current: 65, needed: 80, cost: 6000000 }
      },
      priority: 7,
      estimatedImpact: {
        emissionsReduction: 20,
        ecoRatingImprovement: 0.8,
        additionalCapacity: 10
      }
    },
    {
      id: 4,
      name: language === 'ru' ? 'Курорт "Бурабай"' : 'Resort "Burabay"',
      type: 'resort',
      region: language === 'ru' ? 'Астана' : 'Astana',
      currentEcoRating: 7.1,
      currentCapacity: 200,
      maxCapacity: 250,
      fundingNeeded: 45000000,
      ecoImprovements: {
        energy: { current: 60, needed: 85, cost: 15000000 },
        water: { current: 65, needed: 90, cost: 10000000 },
        waste: { current: 50, needed: 80, cost: 8000000 },
        food: { current: 55, needed: 85, cost: 7000000 },
        transport: { current: 45, needed: 75, cost: 5000000 }
      },
      priority: 8,
      estimatedImpact: {
        emissionsReduction: 35,
        ecoRatingImprovement: 1.8,
        additionalCapacity: 50
      }
    },
    {
      id: 5,
      name: language === 'ru' ? 'Гостевой дом "Уют"' : 'Guesthouse "Cozy"',
      type: 'guesthouse',
      region: language === 'ru' ? 'Шымкент' : 'Shymkent',
      currentEcoRating: 6.8,
      currentCapacity: 15,
      maxCapacity: 20,
      fundingNeeded: 12000000,
      ecoImprovements: {
        energy: { current: 45, needed: 75, cost: 4000000 },
        water: { current: 50, needed: 80, cost: 3000000 },
        waste: { current: 35, needed: 70, cost: 2000000 },
        food: { current: 40, needed: 75, cost: 1500000 },
        transport: { current: 30, needed: 65, cost: 1500000 }
      },
      priority: 6,
      estimatedImpact: {
        emissionsReduction: 15,
        ecoRatingImprovement: 1.0,
        additionalCapacity: 5
      }
    }
  ];

  const typeIcons = {
    hotel: BuildingOfficeIcon,
    'eco-lodge': HomeIcon,
    guesthouse: HomeIcon,
    camping: MapPinIcon,
    resort: BuildingOfficeIcon
  };

  const typeNames = {
    hotel: language === 'ru' ? 'Гостиница' : 'Hotel',
    'eco-lodge': language === 'ru' ? 'Эко-лодж' : 'Eco Lodge',
    guesthouse: language === 'ru' ? 'Гостевой дом' : 'Guesthouse',
    camping: language === 'ru' ? 'Кемпинг' : 'Camping',
    resort: language === 'ru' ? 'Курорт' : 'Resort'
  };

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 9) return 'text-red-600 bg-red-50';
    if (priority >= 7) return 'text-orange-600 bg-orange-50';
    if (priority >= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getEcoRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredAccommodations = accommodations.filter(acc => {
    const typeMatch = selectedType === 'all' || acc.type === selectedType;
    const regionMatch = selectedRegion === 'all' || acc.region === selectedRegion;
    return typeMatch && regionMatch;
  });

  const sortedAccommodations = [...filteredAccommodations].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        return b.priority - a.priority;
      case 'funding':
        return b.fundingNeeded - a.fundingNeeded;
      case 'rating':
        return b.currentEcoRating - a.currentEcoRating;
      case 'impact':
        return b.estimatedImpact.emissionsReduction - a.estimatedImpact.emissionsReduction;
      default:
        return 0;
    }
  });

  const totalFundingNeeded = sortedAccommodations.reduce((sum, acc) => sum + acc.fundingNeeded, 0);
  const totalImpact = sortedAccommodations.reduce((sum, acc) => sum + acc.estimatedImpact.emissionsReduction, 0);

  return (
    <div className="space-y-6">
      {/* Заголовок и статистика */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-green-800">
            🏨 Список точек размещения для финансирования
          </h3>
          <div className="text-right">
            <div className="text-sm text-gray-600">Общая потребность в финансировании</div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalFundingNeeded)}
            </div>
          </div>
        </div>

        {/* Фильтры */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Тип размещения</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">Все типы</option>
              <option value="hotel">Гостиницы</option>
              <option value="eco-lodge">Эко-лоджи</option>
              <option value="guesthouse">Гостевые дома</option>
              <option value="camping">Кемпинги</option>
              <option value="resort">Курорты</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Регион</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">Все регионы</option>
              <option value="Алматы">Алматы</option>
              <option value="Астана">Астана</option>
              <option value="Шымкент">Шымкент</option>
              <option value="Алматинская область">Алматинская область</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Сортировка</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="priority">По приоритету</option>
              <option value="funding">По финансированию</option>
              <option value="rating">По эко-рейтингу</option>
              <option value="impact">По влиянию</option>
            </select>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{sortedAccommodations.length}</div>
            <div className="text-sm text-gray-600">Точек размещения</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalFundingNeeded)}</div>
            <div className="text-sm text-gray-600">Потребность в финансировании</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{Math.round(totalImpact)}%</div>
            <div className="text-sm text-gray-600">Снижение выбросов</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(sortedAccommodations.reduce((sum, acc) => sum + acc.estimatedImpact.ecoRatingImprovement, 0) * 10) / 10}
            </div>
            <div className="text-sm text-gray-600">Улучшение эко-рейтинга</div>
          </div>
        </div>
      </div>

      {/* Список точек размещения */}
      <div className="space-y-4">
        {sortedAccommodations.map((accommodation) => {
          const TypeIcon = typeIcons[accommodation.type as keyof typeof typeIcons];
          return (
            <div key={accommodation.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <TypeIcon className="w-8 h-8 text-green-600" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{accommodation.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{typeNames[accommodation.type as keyof typeof typeNames]}</span>
                      <span>•</span>
                      <span>{accommodation.region}</span>
                      <span>•</span>
                      <span className={`font-semibold ${getEcoRatingColor(accommodation.currentEcoRating)}`}>
                        ⭐ {accommodation.currentEcoRating}/10
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(accommodation.priority)}`}>
                    Приоритет: {accommodation.priority}
                  </div>
                  <div className="text-lg font-bold text-green-600 mt-2">
                    {formatCurrency(accommodation.fundingNeeded)}
                  </div>
                </div>
              </div>

              {/* Детали финансирования */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">Эко-улучшения:</h5>
                  <div className="space-y-2">
                    {Object.entries(accommodation.ecoImprovements).map(([category, data]) => {
                      const Icon = categoryIcons[category as keyof typeof categoryIcons];
                      return (
                        <div key={category} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">
                              {categoryNames[category as keyof typeof categoryNames]}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">
                              {data.current}% → {data.needed}%
                            </div>
                            <div className="text-sm font-semibold text-green-600">
                              {formatCurrency(data.cost)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">Ожидаемый эффект:</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="text-sm text-gray-600">Снижение выбросов:</span>
                      <span className="font-semibold text-blue-600">
                        {accommodation.estimatedImpact.emissionsReduction}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-sm text-gray-600">Улучшение эко-рейтинга:</span>
                      <span className="font-semibold text-green-600">
                        +{accommodation.estimatedImpact.ecoRatingImprovement}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                      <span className="text-sm text-gray-600">Дополнительная вместимость:</span>
                      <span className="font-semibold text-purple-600">
                        +{accommodation.estimatedImpact.additionalCapacity}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <span className="text-sm text-gray-600">Текущая загрузка:</span>
                      <span className="font-semibold text-orange-600">
                        {accommodation.currentCapacity}/{accommodation.maxCapacity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Кнопка выбора */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => onAccommodationSelect?.(accommodation)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Выбрать для финансирования</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Рекомендации */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">
          💡 Рекомендации по финансированию
        </h4>
        <div className="space-y-2 text-sm text-blue-700">
          <p>• Приоритет отдается объектам с высоким потенциалом улучшения эко-рейтинга</p>
          <p>• Учитывается текущая загрузка и возможность увеличения вместимости</p>
          <p>• Финансирование распределяется по категориям: энергетика, вода, отходы, питание, транспорт</p>
          <p>• Ожидаемый эффект рассчитывается на основе инвестиций в эко-улучшения</p>
        </div>
      </div>
    </div>
  );
}
