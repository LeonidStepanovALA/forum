'use client';

import React, { useState } from 'react';
import { 
  DocumentTextIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';

interface GreenFinancingApplication {
  id: string;
  hotelName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  submissionDate: string;
  implementationPeriod: string;
  description: string;
  ecoRating: number;
  expectedROI: number;
  contactPerson: string;
  email: string;
  phone: string;
}

export default function GreenFinancingApplications() {
  const { language } = useLanguage();
  const [selectedApplication, setSelectedApplication] = useState<GreenFinancingApplication | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data for green financing applications
  const applications: GreenFinancingApplication[] = [
    {
      id: 'GF-001',
      hotelName: language === 'ru' ? 'Эко-отель "Зеленый Алматы"' : 'Eco Hotel "Green Almaty"',
      amount: 10500000,
      currency: language === 'ru' ? 'тенге' : 'tenge',
      status: 'pending',
      submissionDate: '2024-01-15',
      implementationPeriod: language === 'ru' ? '2 года' : '2 years',
      description: language === 'ru' ? 'Установка солнечных панелей, система умного орошения, рекуперация тепла' : 'Solar panel installation, smart irrigation system, heat recovery',
      ecoRating: 4.7,
      expectedROI: 18.5,
      contactPerson: language === 'ru' ? 'Анна Петрова' : 'Anna Petrova',
      email: 'anna.petrova@greenalmaty.kz',
      phone: '+7 777 123 4567'
    },
    {
      id: 'GF-002',
      hotelName: language === 'ru' ? 'Горный курорт "Эко-Лодж"' : 'Mountain Resort "Eco-Lodge"',
      amount: 8500000,
      currency: language === 'ru' ? 'тенге' : 'tenge',
      status: 'under-review',
      submissionDate: '2024-01-12',
      implementationPeriod: language === 'ru' ? '1 год' : '1 year',
      description: language === 'ru' ? 'Система очистки сточных вод, компостирование, зеленая крыша' : 'Wastewater treatment system, composting, green roof',
      ecoRating: 4.5,
      expectedROI: 15.2,
      contactPerson: language === 'ru' ? 'Максим Козлов' : 'Maxim Kozlov',
      email: 'maxim.kozlov@ecolodge.kz',
      phone: '+7 777 234 5678'
    },
    {
      id: 'GF-003',
      hotelName: language === 'ru' ? 'Семейный отель "Природа"' : 'Family Hotel "Nature"',
      amount: 6200000,
      currency: language === 'ru' ? 'тенге' : 'tenge',
      status: 'approved',
      submissionDate: '2024-01-08',
      implementationPeriod: language === 'ru' ? '1.5 года' : '1.5 years',
      description: language === 'ru' ? 'LED освещение, датчики движения, система сбора дождевой воды' : 'LED lighting, motion sensors, rainwater collection system',
      ecoRating: 4.3,
      expectedROI: 12.8,
      contactPerson: language === 'ru' ? 'Елена Смирнова' : 'Elena Smirnova',
      email: 'elena.smirnova@naturehotel.kz',
      phone: '+7 777 345 6789'
    },
    {
      id: 'GF-004',
      hotelName: language === 'ru' ? 'Бизнес-отель "Эко-Стиль"' : 'Business Hotel "Eco-Style"',
      amount: 12800000,
      currency: language === 'ru' ? 'тенге' : 'tenge',
      status: 'rejected',
      submissionDate: '2024-01-05',
      implementationPeriod: language === 'ru' ? '3 года' : '3 years',
      description: language === 'ru' ? 'Полная модернизация энергосистемы, умное управление зданием' : 'Complete energy system modernization, smart building management',
      ecoRating: 4.1,
      expectedROI: 8.5,
      contactPerson: language === 'ru' ? 'Дмитрий Волков' : 'Dmitry Volkov',
      email: 'dmitry.volkov@ecostyle.kz',
      phone: '+7 777 456 7890'
    }
  ];


  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return language === 'ru' ? 'Одобрено' : 'Approved';
      case 'rejected':
        return language === 'ru' ? 'Отклонено' : 'Rejected';
      case 'under-review':
        return language === 'ru' ? 'На рассмотрении' : 'Under Review';
      default:
        return language === 'ru' ? 'Ожидает' : 'Pending';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under-review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  const handleViewApplication = (application: GreenFinancingApplication) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleApprove = (id: string) => {
    // Handle approval logic
    console.log('Approving application:', id);
  };

  const handleReject = (id: string) => {
    // Handle rejection logic
    console.log('Rejecting application:', id);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApplication(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <DocumentTextIcon className="w-8 h-8 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            {language === 'ru' ? 'Заявки на зеленое финансирование' : 'Green Financing Applications'}
          </h2>
        </div>
        <div className="text-sm text-gray-500">
          {language === 'ru' ? 'Всего заявок:' : 'Total applications:'} {applications.length}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">
              {language === 'ru' ? 'Ожидают' : 'Pending'}
            </span>
          </div>
          <div className="text-2xl font-bold text-yellow-600 mt-1">
            {applications.filter(app => app.status === 'pending').length}
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <EyeIcon className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              {language === 'ru' ? 'На рассмотрении' : 'Under Review'}
            </span>
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-1">
            {applications.filter(app => app.status === 'under-review').length}
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              {language === 'ru' ? 'Одобрено' : 'Approved'}
            </span>
          </div>
          <div className="text-2xl font-bold text-green-600 mt-1">
            {applications.filter(app => app.status === 'approved').length}
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <XCircleIcon className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-red-800">
              {language === 'ru' ? 'Отклонено' : 'Rejected'}
            </span>
          </div>
          <div className="text-2xl font-bold text-red-600 mt-1">
            {applications.filter(app => app.status === 'rejected').length}
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((application) => (
          <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <BuildingOfficeIcon className="w-5 h-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {application.hotelName}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                    {getStatusText(application.status)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CurrencyDollarIcon className="w-4 h-4" />
                    <span>
                      <strong>{language === 'ru' ? 'Сумма:' : 'Amount:'}</strong> {formatAmount(application.amount, application.currency)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      <strong>{language === 'ru' ? 'Срок:' : 'Period:'}</strong> {application.implementationPeriod}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span>
                      <strong>{language === 'ru' ? 'Эко-рейтинг:' : 'Eco-rating:'}</strong> {application.ecoRating}/5.0
                    </span>
                  </div>
                </div>
                
                <div className="mt-2 text-sm text-gray-600">
                  <strong>{language === 'ru' ? 'Описание:' : 'Description:'}</strong> {application.description}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleViewApplication(application)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  title={language === 'ru' ? 'Просмотреть' : 'View'}
                >
                  <EyeIcon className="w-5 h-5" />
                </button>
                
                {application.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(application.id)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title={language === 'ru' ? 'Одобрить' : 'Approve'}
                    >
                      <CheckCircleIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleReject(application.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title={language === 'ru' ? 'Отклонить' : 'Reject'}
                    >
                      <XCircleIcon className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for detailed view */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'ru' ? 'Детали заявки' : 'Application Details'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ru' ? 'ID заявки:' : 'Application ID:'}
                  </label>
                  <p className="text-sm text-gray-900">{selectedApplication.id}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ru' ? 'Статус:' : 'Status:'}
                  </label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApplication.status)}`}>
                    {getStatusText(selectedApplication.status)}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ru' ? 'Название отеля:' : 'Hotel Name:'}
                  </label>
                  <p className="text-sm text-gray-900">{selectedApplication.hotelName}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ru' ? 'Запрашиваемая сумма:' : 'Requested Amount:'}
                  </label>
                  <p className="text-sm text-gray-900">{formatAmount(selectedApplication.amount, selectedApplication.currency)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ru' ? 'Срок реализации:' : 'Implementation Period:'}
                  </label>
                  <p className="text-sm text-gray-900">{selectedApplication.implementationPeriod}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ru' ? 'Ожидаемый ROI:' : 'Expected ROI:'}
                  </label>
                  <p className="text-sm text-gray-900">{selectedApplication.expectedROI}%</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ru' ? 'Эко-рейтинг:' : 'Eco Rating:'}
                  </label>
                  <p className="text-sm text-gray-900">{selectedApplication.ecoRating}/5.0</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ru' ? 'Дата подачи:' : 'Submission Date:'}
                  </label>
                  <p className="text-sm text-gray-900">{selectedApplication.submissionDate}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ru' ? 'Описание проекта:' : 'Project Description:'}
                </label>
                <p className="text-sm text-gray-900">{selectedApplication.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ru' ? 'Контактное лицо:' : 'Contact Person:'}
                  </label>
                  <p className="text-sm text-gray-900">{selectedApplication.contactPerson}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ru' ? 'Email:' : 'Email:'}
                  </label>
                  <p className="text-sm text-gray-900">{selectedApplication.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ru' ? 'Телефон:' : 'Phone:'}
                  </label>
                  <p className="text-sm text-gray-900">{selectedApplication.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {language === 'ru' ? 'Закрыть' : 'Close'}
              </button>
              
              {selectedApplication.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleApprove(selectedApplication.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {language === 'ru' ? 'Одобрить' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleReject(selectedApplication.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    {language === 'ru' ? 'Отклонить' : 'Reject'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
