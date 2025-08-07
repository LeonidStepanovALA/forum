'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
// import { translations } from '@/translations';
import { 
  ChartBarIcon, 
  LightBulbIcon, 
  CloudIcon, 
  TrashIcon, 
  TruckIcon,
  CalculatorIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import FundingMapVisualization from './FundingMapVisualization';
import AccommodationFundingList from './AccommodationFundingList';

interface RegionData {
  name: string;
  population: number;
  currentEcoRating: number;
  emissionsReduction: number;
  ecoMeasures: number;
  intensity: number;
  categories: {
    energy: { current: number; needed: number; priority: number };
    water: { current: number; needed: number; priority: number };
    waste: { current: number; needed: number; priority: number };
    food: { current: number; needed: number; priority: number };
    transport: { current: number; needed: number; priority: number };
  };
}

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

interface AutoFundingDistributionProps {
  totalBudget?: number;
  onAllocationComplete?: (allocations: FundingAllocation[]) => void;
}

export default function AutoFundingDistribution({ 
  totalBudget = 500000000, 
  onAllocationComplete 
}: AutoFundingDistributionProps) {
  const { language } = useLanguage();
  // const t = translations[language];

  const [allocations, setAllocations] = useState<FundingAllocation[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showAccommodations, setShowAccommodations] = useState(false);

  // Моковые данные регионов с детальной информацией по категориям
  const regionsData: RegionData[] = [
    {
      name: language === 'ru' ? 'Алматы' : 'Almaty',
      population: 2000000,
      currentEcoRating: 8.5,
      emissionsReduction: 78.5,
      ecoMeasures: 15,
      intensity: 85,
      categories: {
        energy: { current: 65, needed: 85, priority: 8 },
        water: { current: 70, needed: 90, priority: 7 },
        waste: { current: 55, needed: 80, priority: 9 },
        food: { current: 60, needed: 85, priority: 6 },
        transport: { current: 45, needed: 75, priority: 10 }
      }
    },
    {
      name: language === 'ru' ? 'Астана' : 'Astana',
      population: 1200000,
      currentEcoRating: 7.8,
      emissionsReduction: 65.2,
      ecoMeasures: 12,
      intensity: 72,
      categories: {
        energy: { current: 60, needed: 80, priority: 7 },
        water: { current: 65, needed: 85, priority: 6 },
        waste: { current: 50, needed: 75, priority: 8 },
        food: { current: 55, needed: 80, priority: 5 },
        transport: { current: 40, needed: 70, priority: 9 }
      }
    },
    {
      name: language === 'ru' ? 'Шымкент' : 'Shymkent',
      population: 1000000,
      currentEcoRating: 6.9,
      emissionsReduction: 45.8,
      ecoMeasures: 8,
      intensity: 58,
      categories: {
        energy: { current: 45, needed: 70, priority: 9 },
        water: { current: 50, needed: 75, priority: 8 },
        waste: { current: 35, needed: 65, priority: 10 },
        food: { current: 40, needed: 70, priority: 7 },
        transport: { current: 30, needed: 60, priority: 10 }
      }
    },
    {
      name: language === 'ru' ? 'Алматинская область' : 'Almaty Region',
      population: 800000,
      currentEcoRating: 9.2,
      emissionsReduction: 92.1,
      ecoMeasures: 18,
      intensity: 95,
      categories: {
        energy: { current: 80, needed: 90, priority: 5 },
        water: { current: 85, needed: 95, priority: 4 },
        waste: { current: 75, needed: 85, priority: 6 },
        food: { current: 80, needed: 90, priority: 3 },
        transport: { current: 70, needed: 80, priority: 7 }
      }
    },
    {
      name: language === 'ru' ? 'Актау' : 'Aktau',
      population: 500000,
      currentEcoRating: 7.1,
      emissionsReduction: 35.4,
      ecoMeasures: 6,
      intensity: 42,
      categories: {
        energy: { current: 40, needed: 65, priority: 8 },
        water: { current: 45, needed: 70, priority: 7 },
        waste: { current: 30, needed: 60, priority: 9 },
        food: { current: 35, needed: 65, priority: 6 },
        transport: { current: 25, needed: 55, priority: 10 }
      }
    }
  ];

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

  // const categoryColors = {
  //   energy: 'bg-yellow-100 text-yellow-800',
  //   water: 'bg-blue-100 text-blue-800',
  //   waste: 'bg-red-100 text-red-800',
  //   food: 'bg-green-100 text-green-800',
  //   transport: 'bg-purple-100 text-purple-800'
  // };

  // Алгоритм автоматического распределения финансирования
  const calculateFundingAllocation = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const newAllocations: FundingAllocation[] = regionsData.map(region => {
        // Рассчитываем приоритет региона на основе интенсивности и потребностей
        const regionPriority = region.intensity / 100;
        const totalNeeds = Object.values(region.categories).reduce((sum, cat) => sum + cat.needed, 0);
        const currentLevel = Object.values(region.categories).reduce((sum, cat) => sum + cat.current, 0);
        const improvementNeeded = totalNeeds - currentLevel;
        
        // Базовое распределение по регионам
        const regionBudget = (totalBudget * regionPriority * (improvementNeeded / 100)) / regionsData.length;
        
        // Распределение по категориям внутри региона
        const categoryAllocations = {
          energy: { amount: 0, percentage: 0 },
          water: { amount: 0, percentage: 0 },
          waste: { amount: 0, percentage: 0 },
          food: { amount: 0, percentage: 0 },
          transport: { amount: 0, percentage: 0 }
        };

        const totalPriority = Object.values(region.categories).reduce((sum, cat) => sum + cat.priority, 0);
        
        Object.entries(region.categories).forEach(([category, data]) => {
          const categoryPriority = data.priority / totalPriority;
          const categoryBudget = regionBudget * categoryPriority;
          
          categoryAllocations[category as keyof typeof categoryAllocations] = {
            amount: Math.round(categoryBudget),
            percentage: Math.round(categoryPriority * 100)
          };
        });

        // Рассчитываем ожидаемый эффект
        const totalAllocated = Object.values(categoryAllocations).reduce((sum, cat) => sum + cat.amount, 0);
        const emissionsReduction = region.emissionsReduction + (totalAllocated / 10000000) * 5; // 5% улучшение на 10M
        const ecoRatingImprovement = region.currentEcoRating + (totalAllocated / 10000000) * 0.3; // 0.3 улучшение на 10M
        const projectsCount = Math.round(totalAllocated / 5000000); // 1 проект на 5M

        return {
          region: region.name,
          totalAllocated,
          categories: categoryAllocations,
          impact: {
            emissionsReduction: Math.min(emissionsReduction, 100),
            ecoRatingImprovement: Math.min(ecoRatingImprovement, 10),
            projectsCount
          }
        };
      });

      setAllocations(newAllocations);
      setIsCalculating(false);
      setShowResults(true);
      
      if (onAllocationComplete) {
        onAllocationComplete(newAllocations);
      }
    }, 2000); // Имитация расчета
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // const getPriorityColor = (priority: number) => {
  //   if (priority >= 9) return 'text-red-600';
  //   if (priority >= 7) return 'text-orange-600';
  //   if (priority >= 5) return 'text-yellow-600';
  //   return 'text-green-600';
  // };

  return (
    <div className="space-y-6">
      {/* Заголовок и кнопка расчета */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-green-800">
            🎯 Автоматическое распределение финансирования
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Общий бюджет: {formatCurrency(totalBudget)}
          </p>
        </div>
        <button
          onClick={calculateFundingAllocation}
          disabled={isCalculating}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isCalculating
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <CalculatorIcon className="w-5 h-5" />
          <span>
            {isCalculating ? 'Рассчитываем...' : 'Рассчитать распределение'}
          </span>
        </button>
      </div>



      {/* Результаты распределения */}
      {showResults && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
              <h4 className="text-lg font-semibold text-green-800">
                ✅ Распределение финансирования завершено
              </h4>
            </div>
            <p className="text-sm text-green-700 mt-2">
              Общая сумма распределена: {formatCurrency(allocations.reduce((sum, alloc) => sum + alloc.totalAllocated, 0))}
            </p>
            
            {/* Кнопки переключения */}
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowMap(false);
                  setShowAccommodations(false);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !showMap && !showAccommodations
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📊 Детальные результаты
              </button>
              <button
                onClick={() => {
                  setShowMap(true);
                  setShowAccommodations(false);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showMap && !showAccommodations
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🗺️ Карта распределения
              </button>
              <button
                onClick={() => {
                  setShowMap(false);
                  setShowAccommodations(true);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showAccommodations
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Необходимо финансирование
              </button>
            </div>
          </div>

          {/* Детальные результаты по регионам */}
          {!showMap && !showAccommodations ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {allocations.map((allocation, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <h5 className="text-lg font-semibold text-gray-800">{allocation.region}</h5>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Выделено</div>
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(allocation.totalAllocated)}
                      </div>
                    </div>
                  </div>

                  {/* Распределение по категориям */}
                  <div className="space-y-3 mb-4">
                    {Object.entries(allocation.categories).map(([category, data]) => {
                      const Icon = categoryIcons[category as keyof typeof categoryIcons];
                      return (
                        <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-700">
                              {categoryNames[category as keyof typeof categoryNames]}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-green-600">
                              {formatCurrency(data.amount)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {data.percentage}% от бюджета региона
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Ожидаемый эффект */}
                  <div className="border-t border-gray-200 pt-4">
                    <h6 className="font-semibold text-gray-700 mb-3">Ожидаемый эффект:</h6>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">
                          {allocation.impact.emissionsReduction.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">Снижение выбросов</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          {allocation.impact.ecoRatingImprovement.toFixed(1)}/10
                        </div>
                        <div className="text-xs text-gray-500">Эко-рейтинг</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">
                          {allocation.impact.projectsCount}
                        </div>
                        <div className="text-xs text-gray-500">Проектов</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : showMap ? (
            <FundingMapVisualization 
              allocations={allocations}
              onRegionClick={(region) => {
                console.log('Выбран регион:', region);
                // Здесь можно добавить дополнительную логику
              }}
            />
          ) : (
            <AccommodationFundingList 
              allocations={allocations}
              onAccommodationSelect={(accommodation) => {
                console.log('Выбрана гостиница:', accommodation);
                alert(`Выбрана гостиница: ${accommodation.name}\nПотребность в финансировании: ${formatCurrency(accommodation.fundingNeeded)}`);
              }}
            />
          )}

          {/* Общая статистика */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              📈 Общая статистика распределения
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(allocations.reduce((sum, alloc) => sum + alloc.totalAllocated, 0))}
                </div>
                <div className="text-sm text-gray-600">Общий бюджет</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {allocations.length}
                </div>
                <div className="text-sm text-gray-600">Регионов</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {allocations.reduce((sum, alloc) => sum + alloc.impact.projectsCount, 0)}
                </div>
                <div className="text-sm text-gray-600">Проектов</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(allocations.reduce((sum, alloc) => sum + alloc.impact.emissionsReduction, 0) / allocations.length)}%
                </div>
                <div className="text-sm text-gray-600">Среднее снижение выбросов</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
