'use client';

import React, { useState } from 'react';
import { 
  HomeIcon, 
  CurrencyDollarIcon, 
  MapPinIcon, 
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  HeartIcon,
  GlobeAltIcon,
  ChartBarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';

interface PlantedTree {
  id: number;
  species: string;
  location: string;
  coordinates: string;
  plantingDate: string;
  airCoinCost: number;
  co2Compensation: number;
  status: 'planted';
  image?: string;
}

interface PendingTree {
  id: number;
  species: string;
  location: string;
  coordinates: string;
  expectedDate: string;
  airCoinCost: number;
  co2Compensation: number;
  status: 'pending';
}

export default function TreePlantingReport() {
  const { language } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<'planted' | 'pending'>('planted');

  // Mock data for tree planting report
  const treeData = {
    summary: {
      totalPlanted: 47,
      totalPending: 23,
      totalAirCoinSpent: 1250,
      totalCO2Compensated: 9.4,
      totalCO2Pending: 4.6
    },
    plantedTrees: [
      {
        id: 1,
        species: language === 'ru' ? 'Дуб черешчатый' : 'English Oak',
        location: language === 'ru' ? 'Национальный парк "Лосиный остров"' : 'Losiny Ostrov National Park',
        coordinates: '55.7558° N, 37.6176° E',
        plantingDate: '2024-03-15',
        airCoinCost: 25,
        co2Compensation: 0.2,
        status: 'planted',
        image: '/api/placeholder/200/150'
      },
      {
        id: 2,
        species: language === 'ru' ? 'Сосна обыкновенная' : 'Scots Pine',
        location: language === 'ru' ? 'Заповедник "Брянский лес"' : 'Bryansky Les Nature Reserve',
        coordinates: '52.5200° N, 33.3800° E',
        plantingDate: '2024-03-20',
        airCoinCost: 20,
        co2Compensation: 0.15,
        status: 'planted',
        image: '/api/placeholder/200/150'
      },
      {
        id: 3,
        species: language === 'ru' ? 'Береза повислая' : 'Silver Birch',
        location: language === 'ru' ? 'Парк "Сокольники"' : 'Sokolniki Park',
        coordinates: '55.7900° N, 37.6800° E',
        plantingDate: '2024-04-05',
        airCoinCost: 15,
        co2Compensation: 0.12,
        status: 'planted',
        image: '/api/placeholder/200/150'
      },
      {
        id: 4,
        species: language === 'ru' ? 'Ель европейская' : 'Norway Spruce',
        location: language === 'ru' ? 'Лесопарк "Кузьминки"' : 'Kuzminki Forest Park',
        coordinates: '55.6900° N, 37.7800° E',
        plantingDate: '2024-04-12',
        airCoinCost: 30,
        co2Compensation: 0.25,
        status: 'planted',
        image: '/api/placeholder/200/150'
      },
      {
        id: 5,
        species: language === 'ru' ? 'Липа мелколистная' : 'Small-leaved Lime',
        location: language === 'ru' ? 'Парк "Коломенское"' : 'Kolomenskoye Park',
        coordinates: '55.6670° N, 37.6700° E',
        plantingDate: '2024-04-18',
        airCoinCost: 22,
        co2Compensation: 0.18,
        status: 'planted',
        image: '/api/placeholder/200/150'
      }
    ],
    pendingTrees: [
      {
        id: 6,
        species: language === 'ru' ? 'Клен остролистный' : 'Norway Maple',
        location: language === 'ru' ? 'Парк "Царицыно"' : 'Tsaritsyno Park',
        coordinates: '55.6150° N, 37.6850° E',
        expectedDate: '2024-05-15',
        airCoinCost: 18,
        co2Compensation: 0.14,
        status: 'pending'
      },
      {
        id: 7,
        species: language === 'ru' ? 'Ясень обыкновенный' : 'Common Ash',
        location: language === 'ru' ? 'Парк "Измайлово"' : 'Izmaylovo Park',
        coordinates: '55.7900° N, 37.7700° E',
        expectedDate: '2024-05-20',
        airCoinCost: 28,
        co2Compensation: 0.22,
        status: 'pending'
      },
      {
        id: 8,
        species: language === 'ru' ? 'Вяз гладкий' : 'Smooth Elm',
        location: language === 'ru' ? 'Парк "Битцевский лес"' : 'Bitsevsky Forest Park',
        coordinates: '55.6000° N, 37.5500° E',
        expectedDate: '2024-05-25',
        airCoinCost: 24,
        co2Compensation: 0.19,
        status: 'pending'
      }
    ],
    statistics: {
      bySpecies: [
        { species: language === 'ru' ? 'Дуб' : 'Oak', count: 12, percentage: 25.5 },
        { species: language === 'ru' ? 'Сосна' : 'Pine', count: 15, percentage: 31.9 },
        { species: language === 'ru' ? 'Береза' : 'Birch', count: 8, percentage: 17.0 },
        { species: language === 'ru' ? 'Ель' : 'Spruce', count: 7, percentage: 14.9 },
        { species: language === 'ru' ? 'Липа' : 'Lime', count: 5, percentage: 10.6 }
      ],
      byLocation: [
        { location: language === 'ru' ? 'Национальные парки' : 'National Parks', count: 18, percentage: 38.3 },
        { location: language === 'ru' ? 'Городские парки' : 'Urban Parks', count: 16, percentage: 34.0 },
        { location: language === 'ru' ? 'Заповедники' : 'Nature Reserves', count: 8, percentage: 17.0 },
        { location: language === 'ru' ? 'Лесопарки' : 'Forest Parks', count: 5, percentage: 10.6 }
      ]
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <HomeIcon className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-800">
          {language === 'ru' ? 'Отчет о высаженных деревьях' : 'Tree Planting Report'}
        </h3>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-green-800">
              {language === 'ru' ? 'Высажено деревьев' : 'Trees Planted'}
            </h4>
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{treeData.summary.totalPlanted}</p>
          <p className="text-xs text-green-600">
            {language === 'ru' ? 'Компенсировано' : 'Compensated'} {treeData.summary.totalCO2Compensated} т CO₂
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-yellow-800">
              {language === 'ru' ? 'Ожидают высадки' : 'Pending Planting'}
            </h4>
            <ClockIcon className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">{treeData.summary.totalPending}</p>
          <p className="text-xs text-yellow-600">
            {language === 'ru' ? 'Будет компенсировано' : 'Will compensate'} {treeData.summary.totalCO2Pending} т CO₂
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-blue-800">
              {language === 'ru' ? 'Потрачено AirCoin' : 'AirCoin Spent'}
            </h4>
            <CurrencyDollarIcon className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{treeData.summary.totalAirCoinSpent}</p>
          <p className="text-xs text-blue-600">
            {language === 'ru' ? 'За все время' : 'Total spent'}
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-purple-800">
              {language === 'ru' ? 'Общая компенсация' : 'Total Compensation'}
            </h4>
            <HeartIcon className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {treeData.summary.totalCO2Compensated + treeData.summary.totalCO2Pending} т CO₂
          </p>
          <p className="text-xs text-purple-600">
            {language === 'ru' ? 'Включая ожидающие' : 'Including pending'}
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setSelectedTab('planted')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'planted'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <CheckCircleIcon className="w-4 h-4" />
            {language === 'ru' ? 'Высаженные' : 'Planted'}
          </div>
        </button>
        <button
          onClick={() => setSelectedTab('pending')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'pending'
              ? 'bg-white text-yellow-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <ClockIcon className="w-4 h-4" />
            {language === 'ru' ? 'Ожидающие' : 'Pending'}
          </div>
        </button>
      </div>

      {/* Tree List */}
      <div className="space-y-4">
        {(selectedTab === 'planted' ? treeData.plantedTrees : treeData.pendingTrees).map((tree) => (
          <div key={tree.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <HomeIcon className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-800">{tree.species}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tree.status === 'planted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {tree.status === 'planted' 
                      ? (language === 'ru' ? 'Высажено' : 'Planted')
                      : (language === 'ru' ? 'Ожидает' : 'Pending')
                    }
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{tree.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GlobeAltIcon className="w-4 h-4" />
                    <span>{tree.coordinates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {tree.status === 'planted' 
                        ? `${language === 'ru' ? 'Высажено' : 'Planted'}: ${formatDate((tree as PlantedTree).plantingDate)}`
                        : `${language === 'ru' ? 'Ожидается' : 'Expected'}: ${formatDate((tree as PendingTree).expectedDate)}`
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CurrencyDollarIcon className="w-4 h-4" />
                    <span>{tree.airCoinCost} AirCoin</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">
                    {language === 'ru' ? 'Компенсация CO₂' : 'CO₂ Compensation'}
                  </p>
                  <p className="text-lg font-bold text-green-700">
                    {tree.co2Compensation} т
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Species Distribution */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-green-600" />
            {language === 'ru' ? 'Распределение по видам' : 'Distribution by Species'}
          </h4>
          <div className="space-y-3">
            {treeData.statistics.bySpecies.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.species}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-800 w-12 text-right">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Distribution */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-green-600" />
            {language === 'ru' ? 'Распределение по локациям' : 'Distribution by Locations'}
          </h4>
          <div className="space-y-3">
            {treeData.statistics.byLocation.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.location}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-800 w-12 text-right">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <div className="flex items-center gap-2 mb-3">
          <SparklesIcon className="w-5 h-5 text-green-600" />
          <h4 className="font-semibold text-green-800">
            {language === 'ru' ? 'Ваш экологический вклад' : 'Your Environmental Impact'}
          </h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          {language === 'ru' 
            ? 'Благодаря вашим инвестициям в AirCoin, вы помогли высадить деревья, которые компенсируют углеродный след от ваших путешествий. Каждое дерево поглощает в среднем 0.2 тонны CO₂ в год и продолжает расти десятилетиями.'
            : 'Thanks to your AirCoin investments, you have helped plant trees that compensate for the carbon footprint of your travels. Each tree absorbs an average of 0.2 tons of CO₂ per year and continues to grow for decades.'
          }
        </p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-green-600">🌱</span>
            <span className="text-gray-600">
              {language === 'ru' ? 'Деревья растут' : 'Trees growing'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-blue-600">💰</span>
            <span className="text-gray-600">
              {language === 'ru' ? 'AirCoin инвестиции' : 'AirCoin investments'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-purple-600">🌍</span>
            <span className="text-gray-600">
              {language === 'ru' ? 'Планета защищена' : 'Planet protected'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
