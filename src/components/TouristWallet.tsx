'use client';

import React, { useState } from 'react';
import { 
  WalletIcon, 
  CurrencyDollarIcon, 
  GiftIcon, 
  HeartIcon,
  PlusIcon,
  ArrowPathIcon,
  CreditCardIcon,
  BanknotesIcon,
  SparklesIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';

export default function TouristWallet() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'balance' | 'buy' | 'exchange' | 'donate'>('balance');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'buy' | 'exchange' | 'donate'>('buy');
  const [amount, setAmount] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');

  // Mock wallet data
  const walletData = {
    airCoinBalance: 1250,
    pointsBalance: 3400,
    totalSpent: 2800,
    treesFunded: 47,
    co2Compensated: 9.4
  };

  const buyPackages = [
    { id: 'starter', name: language === 'ru' ? 'Стартовый' : 'Starter', coins: 100, price: 10, bonus: 0 },
    { id: 'popular', name: language === 'ru' ? 'Популярный' : 'Popular', coins: 500, price: 45, bonus: 50 },
    { id: 'premium', name: language === 'ru' ? 'Премиум' : 'Premium', coins: 1000, price: 85, bonus: 150 },
    { id: 'pro', name: language === 'ru' ? 'Профи' : 'Pro', coins: 2500, price: 200, bonus: 500 }
  ];

  const exchangeRates = [
    { points: 100, coins: 10, description: language === 'ru' ? 'Базовый обмен' : 'Basic exchange' },
    { points: 500, coins: 60, description: language === 'ru' ? 'Выгодный обмен' : 'Good exchange' },
    { points: 1000, coins: 130, description: language === 'ru' ? 'Премиум обмен' : 'Premium exchange' }
  ];

  const donationOptions = [
    { amount: 50, trees: 2, description: language === 'ru' ? '2 дерева' : '2 trees' },
    { amount: 100, trees: 5, description: language === 'ru' ? '5 деревьев' : '5 trees' },
    { amount: 250, trees: 12, description: language === 'ru' ? '12 деревьев' : '12 trees' },
    { amount: 500, trees: 25, description: language === 'ru' ? '25 деревьев' : '25 trees' }
  ];

  const handleOpenModal = (type: 'buy' | 'exchange' | 'donate') => {
    setModalType(type);
    setIsModalOpen(true);
    setAmount('');
    setSelectedPackage('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAmount('');
    setSelectedPackage('');
  };

  const handleTransaction = () => {
    // Mock transaction logic
    alert(language === 'ru' 
      ? `Транзакция выполнена! ${modalType === 'buy' ? 'AirCoin зачислены' : modalType === 'exchange' ? 'Баллы обменены' : 'Донат отправлен'}`
      : `Transaction completed! ${modalType === 'buy' ? 'AirCoin credited' : modalType === 'exchange' ? 'Points exchanged' : 'Donation sent'}`
    );
    handleCloseModal();
  };

  return (
    <div className="bg-white rounded-lg p-6">

      {/* Balance Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-green-800">
              {language === 'ru' ? 'AirCoin баланс' : 'AirCoin Balance'}
            </h4>
            <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-700">{walletData.airCoinBalance}</p>
          <p className="text-xs text-green-600">
            {language === 'ru' ? 'Доступно для трат' : 'Available to spend'}
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-blue-800">
              {language === 'ru' ? 'Баллы' : 'Points'}
            </h4>
            <GiftIcon className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-700">{walletData.pointsBalance}</p>
          <p className="text-xs text-blue-600">
            {language === 'ru' ? 'Заработано за активность' : 'Earned from activity'}
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-purple-800">
              {language === 'ru' ? 'Высажено деревьев' : 'Trees Planted'}
            </h4>
            <HeartIcon className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-700">{walletData.treesFunded}</p>
          <p className="text-xs text-purple-600">
            {language === 'ru' ? 'Благодаря вашим инвестициям' : 'Thanks to your investments'}
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-orange-800">
              {language === 'ru' ? 'CO₂ компенсировано' : 'CO₂ Compensated'}
            </h4>
            <SparklesIcon className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-700">{walletData.co2Compensated} т</p>
          <p className="text-xs text-orange-600">
            {language === 'ru' ? 'Углеродный след' : 'Carbon footprint'}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => handleOpenModal('buy')}
          className="flex items-center justify-center gap-2 p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="font-medium">
            {language === 'ru' ? 'Купить AirCoin' : 'Buy AirCoin'}
          </span>
        </button>

        <button
          onClick={() => handleOpenModal('exchange')}
          className="flex items-center justify-center gap-2 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <ArrowPathIcon className="w-5 h-5" />
          <span className="font-medium">
            {language === 'ru' ? 'Обменять баллы' : 'Exchange Points'}
          </span>
        </button>

        <button
          onClick={() => handleOpenModal('donate')}
          className="flex items-center justify-center gap-2 p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <HeartIcon className="w-5 h-5" />
          <span className="font-medium">
            {language === 'ru' ? 'Донат на деревья' : 'Donate Trees'}
          </span>
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">
          {language === 'ru' ? 'Последние транзакции' : 'Recent Transactions'}
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-white rounded">
            <div className="flex items-center gap-2">
              <CurrencyDollarIcon className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">
                {language === 'ru' ? 'Покупка AirCoin' : 'AirCoin Purchase'}
              </span>
            </div>
            <span className="text-sm font-medium text-green-600">+500</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-white rounded">
            <div className="flex items-center gap-2">
              <HeartIcon className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-600">
                {language === 'ru' ? 'Донат на деревья' : 'Tree Donation'}
              </span>
            </div>
            <span className="text-sm font-medium text-purple-600">-100</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-white rounded">
            <div className="flex items-center gap-2">
              <ArrowPathIcon className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">
                {language === 'ru' ? 'Обмен баллов' : 'Points Exchange'}
              </span>
            </div>
            <span className="text-sm font-medium text-blue-600">+60</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {modalType === 'buy' && (language === 'ru' ? 'Купить AirCoin' : 'Buy AirCoin')}
                {modalType === 'exchange' && (language === 'ru' ? 'Обменять баллы' : 'Exchange Points')}
                {modalType === 'donate' && (language === 'ru' ? 'Донат на деревья' : 'Donate Trees')}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {modalType === 'buy' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    {language === 'ru' ? 'Выберите пакет AirCoin:' : 'Choose AirCoin package:'}
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {buyPackages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                          selectedPackage === pkg.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                        onClick={() => setSelectedPackage(pkg.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-gray-800">{pkg.name}</h4>
                            <p className="text-sm text-gray-600">
                              {pkg.coins} AirCoin {pkg.bonus > 0 && `+ ${pkg.bonus} бонус`}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">${pkg.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalType === 'exchange' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    {language === 'ru' ? 'Выберите количество баллов для обмена:' : 'Choose points to exchange:'}
                  </p>
                  <div className="space-y-3">
                    {exchangeRates.map((rate, index) => (
                      <div
                        key={index}
                        className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
                        onClick={() => setAmount(rate.points.toString())}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-800">
                              {rate.points} {language === 'ru' ? 'баллов' : 'points'}
                            </p>
                            <p className="text-sm text-gray-600">{rate.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600">→ {rate.coins} AirCoin</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalType === 'donate' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    {language === 'ru' ? 'Выберите сумму доната:' : 'Choose donation amount:'}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {donationOptions.map((option, index) => (
                      <div
                        key={index}
                        className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors text-center"
                        onClick={() => setAmount(option.amount.toString())}
                      >
                        <p className="font-bold text-purple-600">{option.amount} AirCoin</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleTransaction}
                  disabled={!selectedPackage && !amount}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {modalType === 'buy' && (language === 'ru' ? 'Купить' : 'Buy')}
                  {modalType === 'exchange' && (language === 'ru' ? 'Обменять' : 'Exchange')}
                  {modalType === 'donate' && (language === 'ru' ? 'Донатить' : 'Donate')}
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {language === 'ru' ? 'Отмена' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
