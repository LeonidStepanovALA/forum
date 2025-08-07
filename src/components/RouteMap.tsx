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

interface RouteMapProps {
  startPoint: string;
  endPoint: string;
  waypoints?: RoutePoint[];
  startDate: string;
  endDate: string;
  duration: string;
}

export default function RouteMap({ 
  startPoint, 
  endPoint, 
  waypoints = [], 
  startDate, 
  endDate, 
  duration 
}: RouteMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPinIcon className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">Маршрут тура</h3>
      </div>

      {/* Даты и продолжительность */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <CalendarIcon className="w-4 h-4 text-blue-500" />
          <div>
            <div className="text-xs text-gray-500">Дата начала</div>
            <div className="text-sm font-medium">{formatDate(startDate)}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
          <CalendarIcon className="w-4 h-4 text-green-500" />
          <div>
            <div className="text-xs text-gray-500">Дата окончания</div>
            <div className="text-sm font-medium">{formatDate(endDate)}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
          <ClockIcon className="w-4 h-4 text-purple-500" />
          <div>
            <div className="text-xs text-gray-500">Продолжительность</div>
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
            <div className="text-gray-600">Интерактивная карта маршрута</div>
            <div className="text-sm text-gray-500">Здесь будет отображаться карта с маршрутом</div>
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
              <div className="text-sm text-gray-600">Начальная точка маршрута</div>
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
              <div className="text-sm text-gray-600">Конечная точка маршрута</div>
            </div>
          </div>
        </div>

        {/* Детали выбранной точки */}
        {selectedPoint && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-gray-800 mb-2">Детали точки маршрута</h4>
            <div className="text-sm text-gray-600">
              {selectedPoint === 'start' && (
                <div>
                  <p><strong>Место:</strong> {startPoint}</p>
                  <p><strong>Тип:</strong> Начальная точка</p>
                  <p><strong>Дата:</strong> {formatDate(startDate)}</p>
                  <p><strong>Описание:</strong> Место сбора группы и начала тура</p>
                </div>
              )}
              {selectedPoint === 'end' && (
                <div>
                  <p><strong>Место:</strong> {endPoint}</p>
                  <p><strong>Тип:</strong> Конечная точка</p>
                  <p><strong>Дата:</strong> {formatDate(endDate)}</p>
                  <p><strong>Описание:</strong> Место завершения тура</p>
                </div>
              )}
              {waypoints.find(p => p.id === selectedPoint) && (
                <div>
                  <p><strong>Место:</strong> {waypoints.find(p => p.id === selectedPoint)?.name}</p>
                  <p><strong>Описание:</strong> {waypoints.find(p => p.id === selectedPoint)?.description}</p>
                  {waypoints.find(p => p.id === selectedPoint)?.arrivalTime && (
                    <p><strong>Прибытие:</strong> {waypoints.find(p => p.id === selectedPoint)?.arrivalTime}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Информация о транспорте */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Информация о транспорте</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600">Тип транспорта:</div>
            <div className="font-medium">Эко-транспорт (электромобили, велосипеды)</div>
          </div>
          <div>
            <div className="text-gray-600">Включено в стоимость:</div>
            <div className="font-medium">Трансфер от начальной до конечной точки</div>
          </div>
        </div>
      </div>
    </div>
  );
}
