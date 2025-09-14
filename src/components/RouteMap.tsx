'use client';

import React, { useState } from 'react';
import { MapPinIcon, ArrowRightIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface RoutePoint {
  id: string;
  name: string;
  coordinates: [number, number];
  arrivalTime?: string;
  departureTime?: string;
  description?: string;
  type: 'start' | 'waypoint' | 'end';
}

interface Hotel {
  id: number;
  name: string;
  ecoRating: number;
  location: string;
}

interface RouteMapProps {
  startPoint: string;
  endPoint: string;
  waypoints?: RoutePoint[];
  startDate: string;
  endDate: string;
  duration: string;
  selectedHotels?: Hotel[];
}

export default function RouteMap({ 
  startPoint, 
  endPoint, 
  waypoints = [], 
  startDate, 
  endDate, 
  duration,
  selectedHotels = []
}: RouteMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [showTreePlantingModal, setShowTreePlantingModal] = useState(false);
  const [selectedTreeOption, setSelectedTreeOption] = useState<string | null>(null);
  const [compensatedEmissions, setCompensatedEmissions] = useState(0);
  const [isCompensated, setIsCompensated] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getPointIcon = (type: string) => {
    switch (type) {
      case 'start':
        return '🟢';
      case 'end':
        return '🔴';
      case 'waypoint':
        return '🟡';
      default:
        return '📍';
    }
  };

  const getPointColor = (type: string) => {
    switch (type) {
      case 'start':
        return 'border-green-500 bg-green-50';
      case 'end':
        return 'border-red-500 bg-red-50';
      case 'waypoint':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  // Функция для расчета углеродного следа
  const calculateCarbonFootprint = () => {
    const baseTransportEmissions = 45; // кг CO2 на человека для стандартного транспорта
    const ecoTransportReduction = 0.6; // 60% снижение для эко-транспорта
    const ecoTransportEmissions = baseTransportEmissions * ecoTransportReduction;
    
    const averageEcoRating = selectedHotels.length > 0 
      ? selectedHotels.reduce((sum, hotel) => sum + hotel.ecoRating, 0) / selectedHotels.length 
      : 0;
    
    const hotelEmissionReduction = averageEcoRating >= 4.5 ? 0.3 : 0.1; // 30% или 10% снижение
    const totalEmissions = ecoTransportEmissions * (1 - hotelEmissionReduction);
    
    const emissionsSaved = baseTransportEmissions - totalEmissions;
    
    // Учитываем компенсацию через высадку деревьев
    const remainingEmissions = Math.max(0, totalEmissions - compensatedEmissions);
    
    return {
      totalEmissions: Math.round(totalEmissions),
      remainingEmissions: Math.round(remainingEmissions),
      emissionsSaved: Math.round(emissionsSaved),
      compensatedEmissions: Math.round(compensatedEmissions),
      reductionPercentage: Math.round((emissionsSaved / baseTransportEmissions) * 100),
      averageEcoRating: Math.round(averageEcoRating * 10) / 10,
      hasHighEcoHotels: averageEcoRating >= 4.5,
      isFullyCompensated: isCompensated && remainingEmissions === 0
    };
  };

  const carbonData = calculateCarbonFootprint();

  // Варианты высадки деревьев для компенсации углеродного следа
  const treePlantingOptions = [
    {
      id: 'local',
      name: 'Местная высадка',
      description: 'Высадка деревьев в регионе тура',
      treesNeeded: Math.ceil(carbonData.totalEmissions / 22), // 22 кг CO2 поглощает одно дерево в год
      cost: Math.ceil(carbonData.totalEmissions / 22) * 25, // 25 AIRCOIN за дерево
      timeToCompensate: '1 год',
      icon: '🌳',
      benefits: ['Поддержка местных экосистем', 'Участие в местных проектах', 'Видимый результат']
    },
    {
      id: 'global',
      name: 'Глобальная компенсация',
      description: 'Высадка деревьев в тропических лесах',
      treesNeeded: Math.ceil(carbonData.totalEmissions / 30), // 30 кг CO2 поглощает одно тропическое дерево в год
      cost: Math.ceil(carbonData.totalEmissions / 30) * 15, // 15 AIRCOIN за дерево
      timeToCompensate: '8 месяцев',
      icon: '🌴',
      benefits: ['Высокая эффективность поглощения CO2', 'Быстрая компенсация', 'Глобальное воздействие']
    },
    {
      id: 'mixed',
      name: 'Смешанный подход',
      description: 'Комбинация местной и глобальной высадки',
      treesNeeded: Math.ceil(carbonData.totalEmissions / 25), // 25 кг CO2 в среднем
      cost: Math.ceil(carbonData.totalEmissions / 25) * 20, // 20 AIRCOIN за дерево
      timeToCompensate: '10 месяцев',
      icon: '🌲',
      benefits: ['Баланс местного и глобального воздействия', 'Оптимальная стоимость', 'Максимальная эффективность']
    }
  ];

  const handleTreePlanting = (optionId: string) => {
    setSelectedTreeOption(optionId);
    setShowTreePlantingModal(true);
  };

  const handleConfirmTreePlanting = () => {
    if (selectedTreeOption) {
      const option = treePlantingOptions.find(opt => opt.id === selectedTreeOption);
      
      // Устанавливаем компенсацию
      setCompensatedEmissions(carbonData.totalEmissions);
      setIsCompensated(true);
      
      alert(`🌱 Спасибо за ваш вклад в экологию!\n\nВы выбрали: ${option?.name}\nКоличество деревьев: ${option?.treesNeeded}\nСтоимость: ${option?.cost} AIRCOIN\nВремя компенсации: ${option?.timeToCompensate}\n\nВаш углеродный след будет полностью компенсирован!`);
      setShowTreePlantingModal(false);
      setSelectedTreeOption(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPinIcon className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">{language === 'ru' ? 'Маршрут тура' : 'Tour Route'}</h3>
      </div>

      {/* Даты и продолжительность */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <CalendarIcon className="w-4 h-4 text-blue-500" />
          <div>
            <div className="text-xs text-gray-500">{language === 'ru' ? 'Дата начала' : 'Start Date'}</div>
            <div className="text-sm font-medium">{formatDate(startDate)}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
          <CalendarIcon className="w-4 h-4 text-green-500" />
          <div>
            <div className="text-xs text-gray-500">{language === 'ru' ? 'Дата окончания' : 'End Date'}</div>
            <div className="text-sm font-medium">{formatDate(endDate)}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
          <ClockIcon className="w-4 h-4 text-purple-500" />
          <div>
            <div className="text-xs text-gray-500">{language === 'ru' ? 'Продолжительность' : 'Duration'}</div>
            <div className="text-sm font-medium">{duration}</div>
          </div>
        </div>
      </div>

      {/* Карта маршрута */}
      <div className="relative">
        {/* Заглушка для карты */}
        <div className="bg-gray-100 rounded-lg h-64 mb-4 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <div className="text-gray-600">{language === 'ru' ? 'Интерактивная карта маршрута' : 'Interactive Route Map'}</div>
            <div className="text-sm text-gray-500">{language === 'ru' ? 'Здесь будет отображаться карта с маршрутом' : 'Route map will be displayed here'}</div>
          </div>
        </div>

        {/* Точки маршрута */}
        <div className="space-y-3">
          {/* Начальная точка */}
          <div 
            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${getPointColor('start')} ${selectedPoint === 'start' ? 'ring-2 ring-blue-300' : ''}`}
            onClick={() => setSelectedPoint(selectedPoint === 'start' ? null : 'start')}
          >
            <div className="text-2xl">{getPointIcon('start')}</div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">{startPoint}</div>
              <div className="text-sm text-gray-600">{language === 'ru' ? 'Начальная точка маршрута' : 'Route Start Point'}</div>
            </div>
            <ArrowRightIcon className="w-4 h-4 text-gray-400" />
          </div>

          {/* Промежуточные точки */}
          {waypoints.map((point) => (
            <div 
              key={point.id}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${getPointColor(point.type)} ${selectedPoint === point.id ? 'ring-2 ring-blue-300' : ''}`}
              onClick={() => setSelectedPoint(selectedPoint === point.id ? null : point.id)}
            >
              <div className="text-2xl">{getPointIcon(point.type)}</div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">{point.name}</div>
                <div className="text-sm text-gray-600">{point.description}</div>
                {point.arrivalTime && (
                  <div className="text-xs text-gray-500">
                    Прибытие: {point.arrivalTime}
                  </div>
                )}
              </div>
              <ArrowRightIcon className="w-4 h-4 text-gray-400" />
            </div>
          ))}

          {/* Конечная точка */}
          <div 
            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${getPointColor('end')} ${selectedPoint === 'end' ? 'ring-2 ring-blue-300' : ''}`}
            onClick={() => setSelectedPoint(selectedPoint === 'end' ? null : 'end')}
          >
            <div className="text-2xl">{getPointIcon('end')}</div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">{endPoint}</div>
              <div className="text-sm text-gray-600">{language === 'ru' ? 'Конечная точка маршрута' : 'Route End Point'}</div>
            </div>
          </div>
        </div>

        {/* Детали выбранной точки */}
        {selectedPoint && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Детали точки маршрута' : 'Route Point Details'}</h4>
            <div className="text-sm text-gray-600">
              {selectedPoint === 'start' && (
                <div>
                  <p><strong>{language === 'ru' ? 'Место:' : 'Location:'}</strong> {startPoint}</p>
                  <p><strong>{language === 'ru' ? 'Тип:' : 'Type:'}</strong> {language === 'ru' ? 'Начальная точка' : 'Start Point'}</p>
                  <p><strong>{language === 'ru' ? 'Дата:' : 'Date:'}</strong> {formatDate(startDate)}</p>
                  <p><strong>{language === 'ru' ? 'Описание:' : 'Description:'}</strong> {language === 'ru' ? 'Место сбора группы и начала тура' : 'Group meeting place and tour start'}</p>
                </div>
              )}
              {selectedPoint === 'end' && (
                <div>
                  <p><strong>{language === 'ru' ? 'Место:' : 'Location:'}</strong> {endPoint}</p>
                  <p><strong>{language === 'ru' ? 'Тип:' : 'Type:'}</strong> {language === 'ru' ? 'Конечная точка' : 'End Point'}</p>
                  <p><strong>{language === 'ru' ? 'Дата:' : 'Date:'}</strong> {formatDate(endDate)}</p>
                  <p><strong>{language === 'ru' ? 'Описание:' : 'Description:'}</strong> {language === 'ru' ? 'Место завершения тура' : 'Tour completion place'}</p>
                </div>
              )}
              {waypoints.find(p => p.id === selectedPoint) && (
                <div>
                  <p><strong>{language === 'ru' ? 'Место:' : 'Location:'}</strong> {waypoints.find(p => p.id === selectedPoint)?.name}</p>
                  <p><strong>{language === 'ru' ? 'Описание:' : 'Description:'}</strong> {waypoints.find(p => p.id === selectedPoint)?.description}</p>
                  {waypoints.find(p => p.id === selectedPoint)?.arrivalTime && (
                    <p><strong>{language === 'ru' ? 'Прибытие:' : 'Arrival:'}</strong> {waypoints.find(p => p.id === selectedPoint)?.arrivalTime}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Отчет о углеродном следе */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
          🌱 Отчет о углеродном следе
          {carbonData.hasHighEcoHotels && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Эко-преимущество
            </span>
          )}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-lg border border-green-200">
            <div className="text-gray-600 text-xs">
              {isCompensated ? 'Оставшийся углеродный след' : 'Общий углеродный след'}
            </div>
            <div className={`font-bold text-lg ${isCompensated ? 'text-green-600' : 'text-gray-800'}`}>
              {isCompensated ? carbonData.remainingEmissions : carbonData.totalEmissions} кг CO₂
            </div>
            <div className="text-xs text-green-600">{language === 'ru' ? 'на человека' : 'per person'}</div>
            {isCompensated && carbonData.remainingEmissions === 0 && (
              <div className="text-xs text-green-600 font-medium mt-1">✅ Полностью компенсирован</div>
            )}
          </div>
          
          <div className="bg-white p-3 rounded-lg border border-green-200">
            <div className="text-gray-600 text-xs">{language === 'ru' ? 'Сэкономлено выбросов' : 'Emissions Saved'}</div>
            <div className="font-bold text-lg text-green-600">-{carbonData.emissionsSaved} кг CO₂</div>
            <div className="text-xs text-green-600">{language === 'ru' ? 'по сравнению со стандартным туром' : 'compared to standard tour'}</div>
          </div>
          
          <div className="bg-white p-3 rounded-lg border border-green-200">
            <div className="text-gray-600 text-xs">
              {isCompensated ? 'Компенсировано деревьями' : 'Снижение выбросов'}
            </div>
            <div className="font-bold text-lg text-green-600">
              {isCompensated ? carbonData.compensatedEmissions : carbonData.reductionPercentage}
              {isCompensated ? ' кг CO₂' : '%'}
            </div>
            <div className="text-xs text-green-600">
              {isCompensated ? 'через высадку деревьев' : 'благодаря эко-выбору'}
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg border border-green-200">
            <div className="text-gray-600 text-xs">{language === 'ru' ? 'Средний эко-рейтинг' : 'Average Eco-rating'}</div>
            <div className="font-bold text-lg text-blue-600">⭐ {carbonData.averageEcoRating}</div>
            <div className="text-xs text-gray-600">{language === 'ru' ? 'выбранных отелей' : 'selected hotels'}</div>
          </div>
        </div>
        
                 {selectedHotels.length > 0 && (
           <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
             <div className="text-sm font-medium text-gray-700 mb-2">{language === 'ru' ? 'Выбранные отели с высоким эко-рейтингом:' : 'Selected hotels with high eco-rating:'}</div>
             <div className="space-y-2">
               {selectedHotels
                 .filter((hotel, index, self) => 
                   index === self.findIndex(h => h.id === hotel.id)
                 )
                 .map((hotel) => (
                   <div key={hotel.id} className="flex items-center justify-between text-sm">
                     <span className="text-gray-600">{hotel.name}</span>
                     <div className="flex items-center gap-2">
                       <span className="text-green-600 font-medium">⭐ {hotel.ecoRating}</span>
                       {hotel.ecoRating >= 4.5 && (
                         <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                           Высокий эко-рейтинг
                         </span>
                       )}
                     </div>
                   </div>
                 ))}
             </div>
           </div>
         )}
        
        {carbonData.hasHighEcoHotels && (
          <div className="mt-3 p-3 bg-green-100 rounded-lg border border-green-300">
            <div className="flex items-center gap-2 text-sm text-green-800">
              <span>🎉</span>
              <span className="font-medium">{language === 'ru' ? 'Дополнительное снижение углеродного следа на 30%' : 'Additional 30% carbon footprint reduction'}</span>
            </div>
            <div className="text-xs text-green-700 mt-1">
              Благодаря выбору отелей с высоким эко-рейтингом (4.5+), ваш тур стал еще более экологичным!
            </div>
          </div>
        )}

        {/* Кнопка сокращения углеродного следа */}
        <div className="mt-4 text-center">
          {isCompensated ? (
            <div className="p-4 bg-green-100 rounded-lg border border-green-300">
              <div className="flex items-center justify-center gap-2 text-green-800 mb-2">
                <span className="text-2xl">🌱</span>
                <span className="font-semibold">{language === 'ru' ? 'Углеродный след компенсирован!' : 'Carbon footprint compensated!'}</span>
              </div>
              <p className="text-sm text-green-700">
                Ваш углеродный след полностью компенсирован высадкой {treePlantingOptions[2].treesNeeded} деревьев
              </p>
              <button
                onClick={() => {
                  setCompensatedEmissions(0);
                  setIsCompensated(false);
                }}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Сбросить компенсацию
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => handleTreePlanting('mixed')}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium flex items-center justify-center gap-2 mx-auto"
              >
                🌱 Сократить углеродный след
                <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                  {treePlantingOptions[2].treesNeeded} деревьев
                </span>
              </button>
              <p className="text-xs text-gray-600 mt-2">
                Компенсируйте ваш углеродный след высадкой деревьев
              </p>
            </>
          )}
        </div>
      </div>

      {/* Модальное окно выбора вариантов высадки деревьев */}
      {showTreePlantingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                🌱 Сокращение углеродного следа
              </h3>
              <button
                onClick={() => setShowTreePlantingModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-800">
                <strong>{language === 'ru' ? 'Ваш углеродный след:' : 'Your carbon footprint:'}</strong> {carbonData.totalEmissions} кг CO₂
                <br />
                <strong>{language === 'ru' ? 'Рекомендуемое количество деревьев:' : 'Recommended number of trees:'}</strong> {treePlantingOptions[2].treesNeeded} шт.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {treePlantingOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedTreeOption === option.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-25'
                  }`}
                  onClick={() => setSelectedTreeOption(option.id)}
                >
                  <div className="text-center mb-3">
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <h4 className="font-semibold text-gray-800">{option.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{language === 'ru' ? 'Деревьев:' : 'Trees:'}</span>
                      <span className="font-semibold text-green-600">{option.treesNeeded}</span>
                    </div>
                                         <div className="flex justify-between">
                       <span className="text-gray-600">{language === 'ru' ? 'Стоимость:' : 'Cost:'}</span>
                       <span className="font-semibold text-blue-600">{option.cost} AIRCOIN</span>
                     </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{language === 'ru' ? 'Компенсация:' : 'Compensation:'}</span>
                      <span className="font-semibold text-purple-600">{option.timeToCompensate}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-600 font-medium mb-1">{language === 'ru' ? 'Преимущества:' : 'Benefits:'}</div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {option.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-green-500 mt-0.5">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowTreePlantingModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleConfirmTreePlanting}
                disabled={!selectedTreeOption}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  selectedTreeOption
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Подтвердить выбор
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
