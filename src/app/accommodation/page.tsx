'use client';

import React, { useState } from 'react';
import { HomeIcon, LightBulbIcon, DocumentCheckIcon, CalendarIcon, ChartBarIcon, XMarkIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function AccommodationDashboard() {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

const menuItems = [
  {
    id: 'info',
      title: t.basicInfo,
    icon: HomeIcon,
    items: [
        { 
          name: t.nameAndDescription, 
          action: 'edit-info',
          subItems: [
            { name: t.editName, action: 'edit-name' },
            { name: t.changeDescription, action: 'edit-description' },
            { name: t.addKeywords, action: 'add-keywords' }
          ]
        },
        { 
          name: t.photosAndVideos, 
          action: 'upload-media',
          subItems: [
            { name: t.uploadPhotos, action: 'upload-photos' },
            { name: t.addVideos, action: 'upload-videos' },
            { name: t.manageGallery, action: 'manage-gallery' }
          ]
        },
        { 
          name: t.location, 
          action: 'set-location',
          subItems: [
            { name: t.setCoordinates, action: 'set-coordinates' },
            { name: t.addAddress, action: 'add-address' },
            { name: t.mapAndRoutes, action: 'map-routes' }
          ]
        },
        { 
          name: t.category, 
          action: 'set-category',
          subItems: [
            { name: t.selectType, action: 'select-type' },
            { name: t.setStars, action: 'set-stars' },
            { name: t.specialization, action: 'specialization' }
          ]
        },
        { 
          name: t.ecoStatus, 
          action: 'eco-status',
          subItems: [
            { name: t.checkEcoRating, action: 'check-eco-rating' },
            { name: t.improveMetrics, action: 'improve-metrics' },
            { name: t.getCertificate, action: 'get-certificate' }
          ]
        }
    ]
  },
  {
    id: 'eco-measures',
      title: t.ecoMeasures,
    icon: LightBulbIcon,
    items: [
        { 
          name: t.energy, 
          action: 'energy-measures',
          subItems: [
            { name: t.solarPanels, action: 'solar-panels' },
            { name: t.energySaving, action: 'energy-saving' },
            { name: t.smartSystems, action: 'smart-systems' }
          ]
        },
        { 
          name: t.water, 
          action: 'water-measures',
          subItems: [
            { name: t.waterPurification, action: 'water-purification' },
            { name: t.rainwaterHarvesting, action: 'rainwater-harvesting' },
            { name: t.waterConservation, action: 'water-conservation' }
          ]
        },
        { 
          name: t.waste, 
          action: 'waste-measures',
          subItems: [
            { name: t.recycling, action: 'recycling' },
            { name: t.composting, action: 'composting' },
            { name: t.wasteSorting, action: 'waste-sorting' }
          ]
        },
        { 
          name: t.food, 
          action: 'food-measures',
          subItems: [
            { name: t.organicFood, action: 'organic-food' },
            { name: t.localSuppliers, action: 'local-suppliers' },
            { name: t.zeroWasteKitchen, action: 'zero-waste-kitchen' }
          ]
        },
        { 
          name: t.transport, 
          action: 'transport-measures',
          subItems: [
            { name: t.electricCars, action: 'electric-cars' },
            { name: t.bicycles, action: 'bicycles' },
            { name: t.ecoTransfer, action: 'eco-transfer' }
          ]
        }
    ]
  },
  {
    id: 'certificates',
      title: t.certificates,
    icon: DocumentCheckIcon,
    items: [
        { 
          name: 'LEED', 
          action: 'leed-cert',
          subItems: [
            { name: t.applyLeed, action: 'apply-leed' },
            { name: t.prepareLeedDocs, action: 'prepare-leed-docs' },
            { name: t.leedAudit, action: 'leed-audit' }
          ]
        },
        { 
          name: 'Green Key', 
          action: 'green-key-cert',
          subItems: [
            { name: t.registerGreenKey, action: 'register-green-key' },
            { name: t.fillGreenKeyForm, action: 'fill-green-key-form' },
            { name: t.getGreenKeyAssessment, action: 'get-green-key-assessment' }
          ]
        },
        { 
          name: 'Biosphere', 
          action: 'biosphere-cert',
          subItems: [
            { name: t.applyBiosphere, action: 'apply-biosphere' },
            { name: t.prepareBiosphereReport, action: 'prepare-biosphere-report' },
            { name: t.biosphereInspection, action: 'biosphere-inspection' }
          ]
        },
        { 
          name: t.uploadDocs, 
          action: 'upload-docs',
          subItems: [
            { name: t.uploadCertificates, action: 'upload-certificates' },
            { name: t.addReports, action: 'add-reports' },
            { name: t.manageFiles, action: 'manage-files' }
          ]
        }
    ]
  },
  {
    id: 'bookings',
      title: t.bookingManagement,
    icon: CalendarIcon,
    items: [
        { 
          name: t.availabilityCalendar, 
          action: 'calendar',
          subItems: [
            { name: t.setPrices, action: 'set-prices' },
            { name: t.blockDates, action: 'block-dates' },
            { name: t.specialOffers, action: 'special-offers' }
          ]
        },
        { 
          name: t.confirmBookings, 
          action: 'confirm-bookings',
          subItems: [
            { name: t.autoConfirm, action: 'auto-confirm' },
            { name: t.manualConfirm, action: 'manual-confirm' },
            { name: t.bookingRules, action: 'booking-rules' }
          ]
        },
        { 
          name: t.cancelBookings, 
          action: 'cancel-bookings',
          subItems: [
            { name: t.cancellationPolicy, action: 'cancellation-policy' },
            { name: t.refundProcess, action: 'refund-process' },
            { name: t.cancellationNotifications, action: 'cancellation-notifications' }
          ]
        },
        { 
          name: t.guestChat, 
          action: 'guest-chat',
          subItems: [
            { name: t.openChat, action: 'open-chat' },
            { name: t.messageTemplates, action: 'message-templates' },
            { name: t.chatHistory, action: 'chat-history' }
          ]
        }
    ]
  },
  {
    id: 'analytics',
      title: t.analytics,
    icon: ChartBarIcon,
    items: [
        { 
          name: language === 'ru' ? 'Статистика бронирований' : 'Booking Statistics', 
          action: 'booking-stats',
          subItems: [
            { name: t.monthlyOccupancy, action: 'monthly-occupancy' },
            { name: t.averageBill, action: 'average-bill' },
            { name: t.popularDates, action: 'popular-dates' }
          ]
        },
        { 
          name: language === 'ru' ? 'Отзывы гостей' : 'Guest Reviews', 
          action: 'guest-reviews',
          subItems: [
            { name: t.ratingByCategory, action: 'rating-by-category' },
            { name: t.textReviews, action: 'text-reviews' },
            { name: t.reviewResponses, action: 'review-responses' }
          ]
        },
        { 
          name: language === 'ru' ? 'Эко-метрики' : 'Eco Metrics', 
          action: 'eco-metrics',
          subItems: [
            { name: t.energySavings, action: 'energy-savings' },
            { name: t.wasteReduction, action: 'waste-reduction' },
            { name: t.ecoRating, action: 'eco-rating' }
          ]
        },
        { 
          name: language === 'ru' ? 'Маркетинговый отчет' : 'Marketing Report', 
          action: 'marketing-report',
          subItems: [
            { name: language === 'ru' ? 'Анализ конкурентов' : 'Competitor Analysis', action: 'competitor-analysis' },
            { name: language === 'ru' ? 'Ценовая стратегия' : 'Pricing Strategy', action: 'pricing-strategy' },
            { name: language === 'ru' ? 'Рыночная доля' : 'Market Share', action: 'market-share' },
            { name: language === 'ru' ? 'Тренды бронирований' : 'Booking Trends', action: 'booking-trends' }
          ]
        },
        { 
          name: language === 'ru' ? 'Маркетинговые рекомендации' : 'Marketing Recommendations', 
          action: 'marketing-recommendations',
          subItems: [
            { name: language === 'ru' ? 'Улучшение видимости' : 'Improve Visibility', action: 'improve-visibility' },
            { name: language === 'ru' ? 'Оптимизация цен' : 'Price Optimization', action: 'price-optimization' },
            { name: language === 'ru' ? 'Продвижение услуг' : 'Service Promotion', action: 'service-promotion' },
            { name: language === 'ru' ? 'Целевая аудитория' : 'Target Audience', action: 'target-audience' }
          ]
        },
        { 
          name: language === 'ru' ? 'Сформировать сводный отчет' : 'Generate Summary Report', 
          action: 'summary-report',
          subItems: [
            { name: language === 'ru' ? 'Полная сводка по отелю' : 'Complete Hotel Summary', action: 'complete-summary' },
            { name: language === 'ru' ? 'Анализ эко-потенциала' : 'Eco Potential Analysis', action: 'eco-potential' },
            { name: language === 'ru' ? 'Рекомендации по улучшению' : 'Improvement Recommendations', action: 'improvement-recommendations' },
            { name: language === 'ru' ? 'Подать заявку на финансирование' : 'Apply for Green Financing', action: 'green-financing' }
          ]
        }
      ]
    }
  ];

  const [activeSection, setActiveSection] = useState('info');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAction = (action: string) => {
    setSelectedAction(action);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAction(null);
  };

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const renderModalContent = () => {
    if (!selectedAction) return null;

    // Маркетинговый отчет
    if (selectedAction === 'competitor-analysis') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Анализ конкурентов' : 'Competitor Analysis'}
          </h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Топ-5 конкурентов в регионе:' : 'Top 5 competitors in the region:'}
              </h5>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Eco Hotel Almaty - 4.8★' : 'Eco Hotel Almaty - 4.8★'}</li>
                <li>• {language === 'ru' ? 'Green Resort Astana - 4.7★' : 'Green Resort Astana - 4.7★'}</li>
                <li>• {language === 'ru' ? 'Nature Lodge Shymkent - 4.6★' : 'Nature Lodge Shymkent - 4.6★'}</li>
                <li>• {language === 'ru' ? 'Sustainable Inn Aktobe - 4.5★' : 'Sustainable Inn Aktobe - 4.5★'}</li>
                <li>• {language === 'ru' ? 'Eco Villa Taraz - 4.4★' : 'Eco Villa Taraz - 4.4★'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Ваши преимущества:' : 'Your advantages:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Выше средний рейтинг на 0.3★, лучшие эко-услуги' : 'Above average rating by 0.3★, best eco-services'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Управление бронированиями — Календарь доступности
    if (selectedAction === 'calendar') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Календарь доступности' : 'Availability Calendar'}
          </h4>
          <p className="text-sm text-gray-700">
            {language === 'ru' 
              ? 'Управляйте ценами, блокируйте даты и запускайте спецпредложения.' 
              : 'Manage prices, block dates and run special offers.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button onClick={() => setSelectedAction('set-prices')} className="bg-green-50 hover:bg-green-100 p-4 rounded-lg border border-green-200 text-left">
              <div className="font-medium text-green-800">{language === 'ru' ? 'Установить цены' : 'Set prices'}</div>
              <div className="text-xs text-green-700 mt-1">{language === 'ru' ? 'По дням/категориям' : 'By day/category'}</div>
            </button>
            <button onClick={() => setSelectedAction('block-dates')} className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg border border-yellow-200 text-left">
              <div className="font-medium text-yellow-800">{language === 'ru' ? 'Блокировать даты' : 'Block dates'}</div>
              <div className="text-xs text-yellow-700 mt-1">{language === 'ru' ? 'Ремонт/выходные' : 'Maintenance/holidays'}</div>
            </button>
            <button onClick={() => setSelectedAction('special-offers')} className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg border border-blue-200 text-left">
              <div className="font-medium text-blue-800">{language === 'ru' ? 'Спецпредложения' : 'Special offers'}</div>
              <div className="text-xs text-blue-700 mt-1">{language === 'ru' ? 'Акции/промо' : 'Sales/Promos'}</div>
            </button>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-700 mb-2">{language === 'ru' ? 'Пример (макет) календаря:' : 'Calendar mockup:'}</div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="h-10 rounded-md flex items-center justify-center text-xs bg-white border">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Управление бронированиями — Подтверждение заказов
    if (selectedAction === 'confirm-bookings') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Подтверждение заказов' : 'Confirm Orders'}
          </h4>
          <p className="text-sm text-gray-700">
            {language === 'ru' 
              ? 'Выберите автоматическое или ручное подтверждение. Настройте правила.' 
              : 'Choose automatic or manual confirmation. Configure rules.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button onClick={() => setSelectedAction('auto-confirm')} className="bg-green-50 hover:bg-green-100 p-4 rounded-lg border border-green-200 text-left">
              <div className="font-medium text-green-800">{language === 'ru' ? 'Автоподтверждение' : 'Auto confirm'}</div>
              <div className="text-xs text-green-700 mt-1">{language === 'ru' ? 'Моментальное подтверждение' : 'Instant approval'}</div>
            </button>
            <button onClick={() => setSelectedAction('manual-confirm')} className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg border border-blue-200 text-left">
              <div className="font-medium text-blue-800">{language === 'ru' ? 'Ручное подтверждение' : 'Manual confirm'}</div>
              <div className="text-xs text-blue-700 mt-1">{language === 'ru' ? 'После проверки заявки' : 'After review'}</div>
            </button>
            <button onClick={() => setSelectedAction('booking-rules')} className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg border border-yellow-200 text-left">
              <div className="font-medium text-yellow-800">{language === 'ru' ? 'Правила бронирования' : 'Booking rules'}</div>
              <div className="text-xs text-yellow-700 mt-1">{language === 'ru' ? 'Часы заезда, предоплата' : 'Check-in time, prepayment'}</div>
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Последние заявки:' : 'Recent requests:'}</div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• {language === 'ru' ? 'Номер 203 — 2 ночи — требуется подтверждение' : 'Room 203 — 2 nights — awaiting confirmation'}</li>
              <li>• {language === 'ru' ? 'Коттедж A — 3 ночи — оплата получена' : 'Cottage A — 3 nights — payment received'}</li>
            </ul>
          </div>
        </div>
      );
    }

    // Управление бронированиями — Отмена заказов
    if (selectedAction === 'cancel-bookings') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Отмена заказов' : 'Cancel Orders'}
          </h4>
          <p className="text-sm text-gray-700">
            {language === 'ru' 
              ? 'Настройте политику отмен, возвраты и уведомления для гостей.' 
              : 'Configure cancellation policy, refunds and notifications.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button onClick={() => setSelectedAction('cancellation-policy')} className="bg-red-50 hover:bg-red-100 p-4 rounded-lg border border-red-200 text-left">
              <div className="font-medium text-red-800">{language === 'ru' ? 'Политика отмен' : 'Cancellation policy'}</div>
              <div className="text-xs text-red-700 mt-1">{language === 'ru' ? 'Гибкая/строгая' : 'Flexible/strict'}</div>
            </button>
            <button onClick={() => setSelectedAction('refund-process')} className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg border border-blue-200 text-left">
              <div className="font-medium text-blue-800">{language === 'ru' ? 'Процесс возврата' : 'Refund process'}</div>
              <div className="text-xs text-blue-700 mt-1">{language === 'ru' ? 'Сроки, статусы' : 'Timelines, statuses'}</div>
            </button>
            <button onClick={() => setSelectedAction('cancellation-notifications')} className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg border border-yellow-200 text-left">
              <div className="font-medium text-yellow-800">{language === 'ру' ? 'Уведомления' : 'Notifications'}</div>
              <div className="text-xs text-yellow-700 mt-1">{language === 'ru' ? 'Шаблоны писем' : 'Email templates'}</div>
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Последние отмены:' : 'Recent cancellations:'}</div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• {language === 'ru' ? 'Стандартный номер — возврат 100%' : 'Standard room — 100% refund'}</li>
              <li>• {language === 'ru' ? 'Люкс — удержано 10% комиссии' : 'Suite — 10% fee retained'}</li>
            </ul>
          </div>
        </div>
      );
    }

    // Управление бронированиями — Чат с гостями
    if (selectedAction === 'guest-chat') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Чат с гостями' : 'Guest Chat'}
          </h4>
          <p className="text-sm text-gray-700">
            {language === 'ru' 
              ? 'Отвечайте на вопросы, отправляйте шаблоны, просматривайте историю переписки.' 
              : 'Answer questions, use templates, view conversation history.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button onClick={() => setSelectedAction('open-chat')} className="bg-green-50 hover:bg-green-100 p-4 rounded-lg border border-green-200 text-left">
              <div className="font-medium text-green-800">{language === 'ru' ? 'Открыть чат' : 'Open chat'}</div>
              <div className="text-xs text-green-700 mt-1">{language === 'ru' ? 'Новый диалог' : 'New dialog'}</div>
            </button>
            <button onClick={() => setSelectedAction('message-templates')} className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg border border-blue-200 text-left">
              <div className="font-medium text-blue-800">{language === 'ru' ? 'Шаблоны сообщений' : 'Message templates'}</div>
              <div className="text-xs text-blue-700 mt-1">{language === 'ru' ? 'Быстрые ответы' : 'Quick replies'}</div>
            </button>
            <button onClick={() => setSelectedAction('chat-history')} className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg border border-yellow-200 text-left">
              <div className="font-medium text-yellow-800">{language === 'ru' ? 'История чатов' : 'Chat history'}</div>
              <div className="text-xs text-yellow-700 mt-1">{language === 'ru' ? 'Последние диалоги' : 'Recent dialogs'}</div>
            </button>
          </div>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-800">{language === 'ru' ? 'Иван С.' : 'Ivan S.'}</div>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">{language === 'ru' ? 'Новое' : 'New'}</span>
              </div>
              <div className="text-sm text-gray-700">{language === 'ru' ? 'Здравствуйте! Есть ли парковка?' : 'Hello! Is there parking?'}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-800">{language === 'ru' ? 'Анна П.' : 'Anna P.'}</div>
                <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{language === 'ru' ? 'Прочитано' : 'Read'}</span>
              </div>
              <div className="text-sm text-gray-700">{language === 'ru' ? 'Спасибо за заселение, все понравилось!' : 'Thanks for the stay, everything was great!'}</div>
            </div>
          </div>
        </div>
      );
    }

    // Подкнопки для Календаря доступности
    if (selectedAction === 'set-prices') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Установить цены' : 'Set prices'}
          </h4>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Цены по дням недели:' : 'Prices by day of week:'}</h5>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Пн-Чт:' : 'Mon-Thu:'}</span>
                  <span className="font-medium">15,000 ₸</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Пт-Вс:' : 'Fri-Sun:'}</span>
                  <span className="font-medium">18,000 ₸</span>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Сезонные цены:' : 'Seasonal prices:'}</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Низкий сезон:' : 'Low season:'}</span>
                  <span className="font-medium">12,000 ₸</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Высокий сезон:' : 'High season:'}</span>
                  <span className="font-medium">22,000 ₸</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
            {language === 'ru' ? 'Сохранить цены' : 'Save prices'}
          </button>
        </div>
      );
    }

    if (selectedAction === 'block-dates') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Блокировать даты' : 'Block dates'}
          </h4>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Заблокированные периоды:' : 'Blocked periods:'}</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Ремонт (15-20 янв):' : 'Maintenance (Jan 15-20):'}</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">{language === 'ru' ? 'Заблокировано' : 'Blocked'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Личный отпуск (1-7 фев):' : 'Personal vacation (Feb 1-7):'}</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">{language === 'ru' ? 'Заблокировано' : 'Blocked'}</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
            {language === 'ru' ? 'Добавить блокировку' : 'Add block'}
          </button>
        </div>
      );
    }

    if (selectedAction === 'special-offers') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Спецпредложения' : 'Special offers'}
          </h4>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Активные акции:' : 'Active promotions:'}</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Раннее бронирование:' : 'Early booking:'}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">{language === 'ru' ? '-20%' : '-20%'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Длинные выходные:' : 'Long weekends:'}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{language === 'ru' ? '-15%' : '-15%'}</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
            {language === 'ru' ? 'Создать акцию' : 'Create promotion'}
          </button>
        </div>
      );
    }

    // Подкнопки для Подтверждения заказов
    if (selectedAction === 'auto-confirm') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Автоподтверждение' : 'Auto confirm'}
          </h4>
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h5 className="font-medium text-green-800 mb-2">{language === 'ru' ? 'Настройки автоподтверждения:' : 'Auto-confirm settings:'}</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Автоподтверждение включено:' : 'Auto-confirm enabled:'}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">{language === 'ru' ? 'Да' : 'Yes'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Время подтверждения:' : 'Confirm time:'}</span>
                  <span className="text-sm font-medium">{language === 'ru' ? 'Мгновенно' : 'Instant'}</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
            {language === 'ru' ? 'Настроить автоподтверждение' : 'Configure auto-confirm'}
          </button>
        </div>
      );
    }

    if (selectedAction === 'manual-confirm') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Ручное подтверждение' : 'Manual confirm'}
          </h4>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Ожидающие подтверждения:' : 'Pending confirmations:'}</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Номер 203 — 2 ночи:' : 'Room 203 — 2 nights:'}</span>
                  <button className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">
                    {language === 'ru' ? 'Подтвердить' : 'Confirm'}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Коттедж A — 3 ночи:' : 'Cottage A — 3 nights:'}</span>
                  <button className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">
                    {language === 'ru' ? 'Подтвердить' : 'Confirm'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'booking-rules') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Правила бронирования' : 'Booking rules'}
          </h4>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Текущие правила:' : 'Current rules:'}</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Время заезда:' : 'Check-in time:'}</span>
                  <span className="text-sm font-medium">{language === 'ru' ? '14:00' : '2:00 PM'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Время выезда:' : 'Check-out time:'}</span>
                  <span className="text-sm font-medium">{language === 'ru' ? '12:00' : '12:00 PM'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Предоплата:' : 'Prepayment:'}</span>
                  <span className="text-sm font-medium">{language === 'ru' ? '30%' : '30%'}</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
            {language === 'ru' ? 'Изменить правила' : 'Change rules'}
          </button>
        </div>
      );
    }

    // Подкнопки для Отмены заказов
    if (selectedAction === 'cancellation-policy') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Политика отмен' : 'Cancellation policy'}
          </h4>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Текущая политика:' : 'Current policy:'}</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Отмена за 24 часа:' : 'Cancel within 24h:'}</span>
                  <span className="text-sm font-medium text-green-600">{language === 'ru' ? '100% возврат' : '100% refund'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Отмена за 12 часов:' : 'Cancel within 12h:'}</span>
                  <span className="text-sm font-medium text-yellow-600">{language === 'ru' ? '50% возврат' : '50% refund'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Отмена в день заезда:' : 'Cancel on check-in day:'}</span>
                  <span className="text-sm font-medium text-red-600">{language === 'ru' ? 'Без возврата' : 'No refund'}</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
            {language === 'ru' ? 'Изменить политику' : 'Change policy'}
          </button>
        </div>
      );
    }

    if (selectedAction === 'refund-process') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Процесс возврата' : 'Refund process'}
          </h4>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Статусы возвратов:' : 'Refund statuses:'}</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Заявка на возврат #001:' : 'Refund request #001:'}</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">{language === 'ru' ? 'В обработке' : 'Processing'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Заявка на возврат #002:' : 'Refund request #002:'}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">{language === 'ru' ? 'Выполнен' : 'Completed'}</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
            {language === 'ru' ? 'Обработать возвраты' : 'Process refunds'}
          </button>
        </div>
      );
    }

    if (selectedAction === 'cancellation-notifications') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Уведомления об отмене' : 'Cancellation notifications'}
          </h4>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Шаблоны уведомлений:' : 'Notification templates:'}</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Подтверждение отмены:' : 'Cancellation confirmation:'}</span>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
                    {language === 'ru' ? 'Редактировать' : 'Edit'}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Информация о возврате:' : 'Refund information:'}</span>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
                    {language === 'ru' ? 'Редактировать' : 'Edit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg">
            {language === 'ru' ? 'Создать шаблон' : 'Create template'}
          </button>
        </div>
      );
    }

    // Подкнопки для Чата с гостями
    if (selectedAction === 'open-chat') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Открыть чат' : 'Open chat'}
          </h4>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Активные диалоги:' : 'Active dialogs:'}</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Иван С. — Вопрос о парковке' : 'Ivan S. — Parking question'}</span>
                  <button className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">
                    {language === 'ru' ? 'Ответить' : 'Reply'}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Анна П. — Благодарность' : 'Anna P. — Thank you'}</span>
                  <button className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">
                    {language === 'ru' ? 'Ответить' : 'Reply'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
            {language === 'ru' ? 'Начать новый чат' : 'Start new chat'}
          </button>
        </div>
      );
    }

    if (selectedAction === 'message-templates') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Шаблоны сообщений' : 'Message templates'}
          </h4>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Готовые шаблоны:' : 'Ready templates:'}</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Приветствие:' : 'Greeting:'}</span>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
                    {language === 'ru' ? 'Использовать' : 'Use'}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Информация о заезде:' : 'Check-in info:'}</span>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
                    {language === 'ru' ? 'Использовать' : 'Use'}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Благодарность:' : 'Thank you:'}</span>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
                    {language === 'ru' ? 'Использовать' : 'Use'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
            {language === 'ru' ? 'Создать шаблон' : 'Create template'}
          </button>
        </div>
      );
    }

    if (selectedAction === 'chat-history') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'История чатов' : 'Chat history'}
          </h4>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-800 mb-2">{language === 'ru' ? 'Последние диалоги:' : 'Recent dialogs:'}</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Иван С. — 2 часа назад' : 'Ivan S. — 2 hours ago'}</span>
                  <button className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600">
                    {language === 'ru' ? 'Просмотреть' : 'View'}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Анна П. — 1 день назад' : 'Anna P. — 1 day ago'}</span>
                  <button className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600">
                    {language === 'ru' ? 'Просмотреть' : 'View'}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{language === 'ru' ? 'Михаил К. — 3 дня назад' : 'Mikhail K. — 3 days ago'}</span>
                  <button className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600">
                    {language === 'ru' ? 'Просмотреть' : 'View'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg">
            {language === 'ru' ? 'Показать всю историю' : 'Show full history'}
          </button>
        </div>
      );
    }

    if (selectedAction === 'pricing-strategy') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Ценовая стратегия' : 'Pricing Strategy'}
          </h4>
          <div className="space-y-3">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h5 className="font-medium text-yellow-800">
                {language === 'ru' ? 'Рекомендуемые цены:' : 'Recommended prices:'}
              </h5>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Стандарт: 15,000-18,000 тенге' : 'Standard: 15,000-18,000 tenge'}</li>
                <li>• {language === 'ru' ? 'Премиум: 22,000-25,000 тенге' : 'Premium: 22,000-25,000 tenge'}</li>
                <li>• {language === 'ru' ? 'Люкс: 30,000-35,000 тенге' : 'Luxury: 30,000-35,000 tenge'}</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Динамическое ценообразование:' : 'Dynamic pricing:'}
              </h5>
              <p className="text-sm text-blue-700 mt-1">
                {language === 'ru' ? '+15% в выходные, +25% в праздники, -10% в будни' : '+15% on weekends, +25% on holidays, -10% on weekdays'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'market-share') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Рыночная доля' : 'Market Share'}
          </h4>
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h5 className="font-medium text-purple-800">
                {language === 'ru' ? 'Ваша доля рынка:' : 'Your market share:'}
              </h5>
              <div className="text-2xl font-bold text-purple-600 mt-2">
                {language === 'ru' ? '12.5%' : '12.5%'}
              </div>
              <p className="text-sm text-purple-700 mt-1">
                {language === 'ru' ? 'Эко-отели в регионе' : 'Eco-hotels in the region'}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Потенциал роста:' : 'Growth potential:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Можно увеличить до 18% за 6 месяцев' : 'Can increase to 18% in 6 months'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'booking-trends') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Тренды бронирований' : 'Booking Trends'}
          </h4>
          <div className="space-y-3">
            <div className="bg-indigo-50 p-3 rounded-lg">
              <h5 className="font-medium text-indigo-800">
                {language === 'ru' ? 'Популярные периоды:' : 'Popular periods:'}
              </h5>
              <ul className="text-sm text-indigo-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Май-сентябрь: +40% бронирований' : 'May-September: +40% bookings'}</li>
                <li>• {language === 'ru' ? 'Выходные: +25% загрузка' : 'Weekends: +25% occupancy'}</li>
                <li>• {language === 'ru' ? 'Праздники: +60% спрос' : 'Holidays: +60% demand'}</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <h5 className="font-medium text-orange-800">
                {language === 'ru' ? 'Средний срок бронирования:' : 'Average booking lead time:'}
              </h5>
              <p className="text-sm text-orange-700 mt-1">
                {language === 'ru' ? '14 дней (рост на 3 дня за год)' : '14 days (increased by 3 days this year)'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Маркетинговые рекомендации
    if (selectedAction === 'improve-visibility') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Улучшение видимости' : 'Improve Visibility'}
          </h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'SEO оптимизация:' : 'SEO optimization:'}
              </h5>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Добавить ключевые слова: "эко-отель", "устойчивый туризм"' : 'Add keywords: "eco-hotel", "sustainable tourism"'}</li>
                <li>• {language === 'ru' ? 'Улучшить описания на 3 языках' : 'Improve descriptions in 3 languages'}</li>
                <li>• {language === 'ru' ? 'Добавить больше фото и видео' : 'Add more photos and videos'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Социальные сети:' : 'Social media:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Активность в Instagram и Facebook увеличит видимость на 35%' : 'Activity on Instagram and Facebook will increase visibility by 35%'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'price-optimization') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Оптимизация цен' : 'Price Optimization'}
          </h4>
          <div className="space-y-3">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h5 className="font-medium text-yellow-800">
                {language === 'ru' ? 'Рекомендации по ценам:' : 'Price recommendations:'}
              </h5>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Снизить цены на 5% в низкий сезон' : 'Reduce prices by 5% in low season'}</li>
                <li>• {language === 'ru' ? 'Добавить пакетные предложения' : 'Add package deals'}</li>
                <li>• {language === 'ru' ? 'Внедрить раннее бронирование со скидкой' : 'Implement early booking discounts'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Ожидаемый эффект:' : 'Expected effect:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Увеличение загрузки на 20% и выручки на 15%' : 'Increase occupancy by 20% and revenue by 15%'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'service-promotion') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Продвижение услуг' : 'Service Promotion'}
          </h4>
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h5 className="font-medium text-purple-800">
                {language === 'ru' ? 'Уникальные услуги:' : 'Unique services:'}
              </h5>
              <ul className="text-sm text-purple-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Эко-туры и экскурсии' : 'Eco-tours and excursions'}</li>
                <li>• {language === 'ru' ? 'Органическое питание' : 'Organic dining'}</li>
                <li>• {language === 'ru' ? 'Йога и медитация на природе' : 'Yoga and meditation in nature'}</li>
                <li>• {language === 'ru' ? 'Мастер-классы по экологии' : 'Ecology workshops'}</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Маркетинговые каналы:' : 'Marketing channels:'}
              </h5>
              <p className="text-sm text-blue-700 mt-1">
                {language === 'ru' ? 'Партнерство с туроператорами, блогерами, эко-сообществами' : 'Partnership with tour operators, bloggers, eco-communities'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'target-audience') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Целевая аудитория' : 'Target Audience'}
          </h4>
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Основная аудитория:' : 'Primary audience:'}
              </h5>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Эко-туристы (35-45 лет)' : 'Eco-tourists (35-45 years)'}</li>
                <li>• {language === 'ru' ? 'Семьи с детьми (30-40 лет)' : 'Families with children (30-40 years)'}</li>
                <li>• {language === 'ru' ? 'Корпоративные клиенты' : 'Corporate clients'}</li>
                <li>• {language === 'ru' ? 'Международные туристы' : 'International tourists'}</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <h5 className="font-medium text-orange-800">
                {language === 'ru' ? 'Стратегия привлечения:' : 'Attraction strategy:'}
              </h5>
              <p className="text-sm text-orange-700 mt-1">
                {language === 'ru' ? 'Фокус на экологичности, семейности и уникальном опыте' : 'Focus on sustainability, family-friendliness and unique experience'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Статистика бронирований
    if (selectedAction === 'monthly-occupancy') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Месячная загрузка' : 'Monthly Occupancy'}
          </h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Текущий месяц:' : 'Current month:'}
              </h5>
              <div className="text-2xl font-bold text-blue-600 mt-2">
                {language === 'ru' ? '78%' : '78%'}
              </div>
              <p className="text-sm text-blue-700 mt-1">
                {language === 'ru' ? 'Загрузка отеля' : 'Hotel occupancy'}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Сравнение с прошлым годом:' : 'Comparison with last year:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? '+12% рост загрузки' : '+12% occupancy growth'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'average-bill') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Средний чек' : 'Average Bill'}
          </h4>
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h5 className="font-medium text-purple-800">
                {language === 'ru' ? 'Текущий средний чек:' : 'Current average bill:'}
              </h5>
              <div className="text-2xl font-bold text-purple-600 mt-2">
                {language === 'ru' ? '24,500 тенге' : '24,500 tenge'}
              </div>
              <p className="text-sm text-purple-700 mt-1">
                {language === 'ru' ? 'За ночь проживания' : 'Per night stay'}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <h5 className="font-medium text-orange-800">
                {language === 'ru' ? 'Дополнительные услуги:' : 'Additional services:'}
              </h5>
              <ul className="text-sm text-orange-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Эко-туры: +8,000 тенге' : 'Eco-tours: +8,000 tenge'}</li>
                <li>• {language === 'ru' ? 'Органическое питание: +3,500 тенге' : 'Organic dining: +3,500 tenge'}</li>
                <li>• {language === 'ru' ? 'Спа-услуги: +5,000 тенге' : 'Spa services: +5,000 tenge'}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'popular-dates') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Популярные даты' : 'Popular Dates'}
          </h4>
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Самые загруженные периоды:' : 'Most busy periods:'}
              </h5>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Май-июнь: 95% загрузка' : 'May-June: 95% occupancy'}</li>
                <li>• {language === 'ru' ? 'Сентябрь: 88% загрузка' : 'September: 88% occupancy'}</li>
                <li>• {language === 'ru' ? 'Новогодние праздники: 100%' : 'New Year holidays: 100%'}</li>
                <li>• {language === 'ru' ? 'Выходные: 85% загрузка' : 'Weekends: 85% occupancy'}</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Рекомендации:' : 'Recommendations:'}
              </h5>
              <p className="text-sm text-blue-700 mt-1">
                {language === 'ru' ? 'Увеличить цены на 15% в пиковые периоды' : 'Increase prices by 15% during peak periods'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Отзывы гостей
    if (selectedAction === 'rating-by-category') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Рейтинг по категориям' : 'Rating by Category'}
          </h4>
          <div className="space-y-3">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h5 className="font-medium text-yellow-800">
                {language === 'ru' ? 'Общий рейтинг:' : 'Overall rating:'}
              </h5>
              <div className="text-3xl font-bold text-yellow-600 mt-2">
                {language === 'ru' ? '4.8/5.0' : '4.8/5.0'}
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Детализация по категориям:' : 'Breakdown by categories:'}
              </h5>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Чистота: 4.9/5' : 'Cleanliness: 4.9/5'}</li>
                <li>• {language === 'ru' ? 'Удобства: 4.7/5' : 'Amenities: 4.7/5'}</li>
                <li>• {language === 'ru' ? 'Персонал: 4.8/5' : 'Staff: 4.8/5'}</li>
                <li>• {language === 'ru' ? 'Расположение: 4.6/5' : 'Location: 4.6/5'}</li>
                <li>• {language === 'ru' ? 'Эко-услуги: 4.9/5' : 'Eco-services: 4.9/5'}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'text-reviews') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Текстовые отзывы' : 'Text Reviews'}
          </h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Последние отзывы:' : 'Recent reviews:'}
              </h5>
              <div className="text-sm text-blue-700 mt-2 space-y-2">
                <p>&ldquo;{language === 'ru' ? 'Потрясающий эко-отель! Очень чистый и экологичный.' : 'Amazing eco-hotel! Very clean and environmentally friendly.'}&rdquo; - 5★</p>
                <p>&ldquo;{language === 'ru' ? 'Отличное расположение и дружелюбный персонал.' : 'Great location and friendly staff.'}&rdquo; - 4★</p>
                <p>&ldquo;{language === 'ru' ? 'Эко-туры были незабываемыми!' : 'Eco-tours were unforgettable!'}&rdquo; - 5★</p>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Статистика отзывов:' : 'Review statistics:'}
              </h5>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Всего отзывов: 247' : 'Total reviews: 247'}</li>
                <li>• {language === 'ru' ? 'Положительных: 94%' : 'Positive: 94%'}</li>
                <li>• {language === 'ru' ? 'Средняя длина отзыва: 85 слов' : 'Average review length: 85 words'}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'review-responses') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Ответы на отзывы' : 'Review Responses'}
          </h4>
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h5 className="font-medium text-purple-800">
                {language === 'ru' ? 'Статистика ответов:' : 'Response statistics:'}
              </h5>
              <ul className="text-sm text-purple-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Ответили на 89% отзывов' : 'Responded to 89% of reviews'}</li>
                <li>• {language === 'ru' ? 'Среднее время ответа: 4 часа' : 'Average response time: 4 hours'}</li>
                <li>• {language === 'ru' ? 'Рейтинг ответов: 4.9/5' : 'Response rating: 4.9/5'}</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <h5 className="font-medium text-orange-800">
                {language === 'ru' ? 'Рекомендации:' : 'Recommendations:'}
              </h5>
              <p className="text-sm text-orange-700 mt-1">
                {language === 'ru' ? 'Увеличить скорость ответов на негативные отзывы' : 'Increase response speed to negative reviews'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Эко-метрики
    if (selectedAction === 'energy-savings') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Энергосбережение' : 'Energy Savings'}
          </h4>
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Текущие показатели:' : 'Current indicators:'}
              </h5>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Экономия электроэнергии: 35%' : 'Electricity savings: 35%'}</li>
                <li>• {language === 'ru' ? 'Солнечные панели: 80% потребления' : 'Solar panels: 80% of consumption'}</li>
                <li>• {language === 'ru' ? 'LED освещение: 100% помещений' : 'LED lighting: 100% of rooms'}</li>
                <li>• {language === 'ru' ? 'Умные системы: 25% экономии' : 'Smart systems: 25% savings'}</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Потенциал улучшения:' : 'Improvement potential:'}
              </h5>
              <p className="text-sm text-blue-700 mt-1">
                {language === 'ru' ? 'Можно увеличить экономию до 45% с помощью дополнительных мер' : 'Can increase savings to 45% with additional measures'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'waste-reduction') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Сокращение отходов' : 'Waste Reduction'}
          </h4>
          <div className="space-y-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <h5 className="font-medium text-orange-800">
                {language === 'ru' ? 'Достижения:' : 'Achievements:'}
              </h5>
              <ul className="text-sm text-orange-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Переработка отходов: 85%' : 'Waste recycling: 85%'}</li>
                <li>• {language === 'ru' ? 'Компостирование: 60% органических отходов' : 'Composting: 60% of organic waste'}</li>
                <li>• {language === 'ru' ? 'Сортировка: 100% помещений' : 'Sorting: 100% of rooms'}</li>
                <li>• {language === 'ru' ? 'Многоразовые материалы: 90%' : 'Reusable materials: 90%'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Экологический эффект:' : 'Environmental impact:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Сокращение выбросов CO2 на 2.5 тонны в месяц' : 'CO2 emissions reduction by 2.5 tons per month'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'eco-rating') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Эко-рейтинг' : 'Eco Rating'}
          </h4>
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Текущий рейтинг:' : 'Current rating:'}
              </h5>
              <div className="text-3xl font-bold text-green-600 mt-2">
                {language === 'ru' ? '4.7/5.0' : '4.7/5.0'}
              </div>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Очень высокий уровень экологичности' : 'Very high level of environmental friendliness'}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Критерии оценки:' : 'Evaluation criteria:'}
              </h5>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Энергоэффективность: 4.8/5' : 'Energy efficiency: 4.8/5'}</li>
                <li>• {language === 'ru' ? 'Управление отходами: 4.6/5' : 'Waste management: 4.6/5'}</li>
                <li>• {language === 'ru' ? 'Водосбережение: 4.7/5' : 'Water conservation: 4.7/5'}</li>
                <li>• {language === 'ru' ? 'Эко-услуги: 4.8/5' : 'Eco-services: 4.8/5'}</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h5 className="font-medium text-yellow-800">
                {language === 'ru' ? 'Следующие шаги:' : 'Next steps:'}
              </h5>
              <p className="text-sm text-yellow-700 mt-1">
                {language === 'ru' ? 'Для достижения рейтинга 5.0 необходимо улучшить водосбережение' : 'To achieve 5.0 rating, water conservation needs improvement'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Eco Measures - Energy
    if (selectedAction === 'solar-panels') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Солнечные панели' : 'Solar Panels'}
          </h4>
          <div className="space-y-3">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h5 className="font-medium text-yellow-800">
                {language === 'ru' ? 'Текущая установка:' : 'Current installation:'}
              </h5>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Мощность: 50 кВт' : 'Power: 50 kW'}</li>
                <li>• {language === 'ru' ? 'Покрытие: 80% потребления' : 'Coverage: 80% of consumption'}</li>
                <li>• {language === 'ru' ? 'Экономия: 2,500 тенге/день' : 'Savings: 2,500 tenge/day'}</li>
                <li>• {language === 'ru' ? 'Окупаемость: 3.5 года' : 'Payback period: 3.5 years'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Рекомендации по расширению:' : 'Expansion recommendations:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Добавить 20 кВт для 100% покрытия потребления' : 'Add 20 kW for 100% consumption coverage'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'energy-saving') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Энергосбережение' : 'Energy Saving'}
          </h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Реализованные меры:' : 'Implemented measures:'}
              </h5>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'LED освещение: 100%' : 'LED lighting: 100%'}</li>
                <li>• {language === 'ru' ? 'Умные термостаты: 90%' : 'Smart thermostats: 90%'}</li>
                <li>• {language === 'ru' ? 'Энергоэффективные приборы: 85%' : 'Energy-efficient appliances: 85%'}</li>
                <li>• {language === 'ru' ? 'Автоматическое управление: 75%' : 'Automatic control: 75%'}</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <h5 className="font-medium text-orange-800">
                {language === 'ru' ? 'Экономический эффект:' : 'Economic impact:'}
              </h5>
              <p className="text-sm text-orange-700 mt-1">
                {language === 'ru' ? 'Экономия 35% на счетах за электроэнергию' : '35% savings on electricity bills'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'smart-systems') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Умные системы' : 'Smart Systems'}
          </h4>
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h5 className="font-medium text-purple-800">
                {language === 'ru' ? 'Установленные системы:' : 'Installed systems:'}
              </h5>
              <ul className="text-sm text-purple-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Умное освещение: 100%' : 'Smart lighting: 100%'}</li>
                <li>• {language === 'ru' ? 'Климат-контроль: 90%' : 'Climate control: 90%'}</li>
                <li>• {language === 'ru' ? 'Управление водой: 80%' : 'Water management: 80%'}</li>
                <li>• {language === 'ru' ? 'Мониторинг энергии: 100%' : 'Energy monitoring: 100%'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Преимущества:' : 'Benefits:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Автоматическая оптимизация потребления энергии' : 'Automatic energy consumption optimization'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Eco Measures - Water
    if (selectedAction === 'water-purification') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Очистка воды' : 'Water Purification'}
          </h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Системы очистки:' : 'Purification systems:'}
              </h5>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Обратный осмос: 100%' : 'Reverse osmosis: 100%'}</li>
                <li>• {language === 'ru' ? 'УФ-стерилизация: 100%' : 'UV sterilization: 100%'}</li>
                <li>• {language === 'ru' ? 'Угольная фильтрация: 100%' : 'Carbon filtration: 100%'}</li>
                <li>• {language === 'ru' ? 'Минерализация: 90%' : 'Mineralization: 90%'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Качество воды:' : 'Water quality:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? '99.9% чистота, соответствует стандартам ВОЗ' : '99.9% purity, meets WHO standards'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'rainwater-harvesting') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Сбор дождевой воды' : 'Rainwater Harvesting'}
          </h4>
          <div className="space-y-3">
            <div className="bg-cyan-50 p-3 rounded-lg">
              <h5 className="font-medium text-cyan-800">
                {language === 'ru' ? 'Система сбора:' : 'Harvesting system:'}
              </h5>
              <ul className="text-sm text-cyan-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Емкость хранения: 50,000 л' : 'Storage capacity: 50,000 L'}</li>
                <li>• {language === 'ru' ? 'Площадь сбора: 2,000 м²' : 'Collection area: 2,000 m²'}</li>
                <li>• {language === 'ru' ? 'Использование: 60% полив' : 'Usage: 60% irrigation'}</li>
                <li>• {language === 'ru' ? 'Экономия: 40% водопотребления' : 'Savings: 40% water consumption'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Экологический эффект:' : 'Environmental impact:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Снижение нагрузки на городскую систему водоснабжения' : 'Reduced load on municipal water system'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'water-conservation') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Водосбережение' : 'Water Conservation'}
          </h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Меры водосбережения:' : 'Water conservation measures:'}
              </h5>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Экономичные душевые: 100%' : 'Water-saving showers: 100%'}</li>
                <li>• {language === 'ru' ? 'Двойные сливы: 100%' : 'Dual-flush toilets: 100%'}</li>
                <li>• {language === 'ru' ? 'Сенсорные краны: 90%' : 'Sensor faucets: 90%'}</li>
                <li>• {language === 'ru' ? 'Система рециркуляции: 80%' : 'Recirculation system: 80%'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Результаты:' : 'Results:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Сокращение водопотребления на 45%' : '45% reduction in water consumption'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Eco Measures - Waste
    if (selectedAction === 'recycling') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Переработка' : 'Recycling'}
          </h4>
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Программа переработки:' : 'Recycling program:'}
              </h5>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Пластик: 85% переработка' : 'Plastic: 85% recycling'}</li>
                <li>• {language === 'ru' ? 'Бумага: 95% переработка' : 'Paper: 95% recycling'}</li>
                <li>• {language === 'ru' ? 'Стекло: 90% переработка' : 'Glass: 90% recycling'}</li>
                <li>• {language === 'ru' ? 'Металл: 80% переработка' : 'Metal: 80% recycling'}</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Партнеры по переработке:' : 'Recycling partners:'}
              </h5>
              <p className="text-sm text-blue-700 mt-1">
                {language === 'ru' ? '3 сертифицированных перерабатывающих предприятия' : '3 certified recycling facilities'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'composting') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Компостирование' : 'Composting'}
          </h4>
          <div className="space-y-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <h5 className="font-medium text-orange-800">
                {language === 'ru' ? 'Система компостирования:' : 'Composting system:'}
              </h5>
              <ul className="text-sm text-orange-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Органические отходы: 60%' : 'Organic waste: 60%'}</li>
                <li>• {language === 'ru' ? 'Вермикомпостирование: 40%' : 'Vermicomposting: 40%'}</li>
                <li>• {language === 'ru' ? 'Термокомпостирование: 60%' : 'Thermal composting: 60%'}</li>
                <li>• {language === 'ru' ? 'Использование компоста: 100%' : 'Compost usage: 100%'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Преимущества:' : 'Benefits:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Удобрение для сада, сокращение отходов на 60%' : 'Garden fertilizer, 60% waste reduction'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'waste-sorting') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Сортировка отходов' : 'Waste Sorting'}
          </h4>
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h5 className="font-medium text-purple-800">
                {language === 'ru' ? 'Система сортировки:' : 'Sorting system:'}
              </h5>
              <ul className="text-sm text-purple-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Цветные контейнеры: 100%' : 'Color-coded bins: 100%'}</li>
                <li>• {language === 'ru' ? 'Обучение персонала: 100%' : 'Staff training: 100%'}</li>
                <li>• {language === 'ru' ? 'Информационные таблички: 100%' : 'Information signs: 100%'}</li>
                <li>• {language === 'ru' ? 'Мониторинг: 100%' : 'Monitoring: 100%'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Эффективность:' : 'Efficiency:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? '95% правильной сортировки отходов' : '95% correct waste sorting'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Eco Measures - Food
    if (selectedAction === 'organic-food') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Органическое питание' : 'Organic Food'}
          </h4>
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Органические продукты:' : 'Organic products:'}
              </h5>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Овощи и фрукты: 90%' : 'Vegetables and fruits: 90%'}</li>
                <li>• {language === 'ru' ? 'Молочные продукты: 85%' : 'Dairy products: 85%'}</li>
                <li>• {language === 'ru' ? 'Мясо и птица: 80%' : 'Meat and poultry: 80%'}</li>
                <li>• {language === 'ru' ? 'Зерновые: 95%' : 'Grains: 95%'}</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Сертификация:' : 'Certification:'}
              </h5>
              <p className="text-sm text-blue-700 mt-1">
                {language === 'ru' ? 'Сертификат органического производства' : 'Organic production certificate'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'local-suppliers') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Местные поставщики' : 'Local Suppliers'}
          </h4>
          <div className="space-y-3">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h5 className="font-medium text-yellow-800">
                {language === 'ru' ? 'Сеть поставщиков:' : 'Supplier network:'}
              </h5>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Местные фермы: 15 партнеров' : 'Local farms: 15 partners'}</li>
                <li>• {language === 'ru' ? 'Радиус поставок: 50 км' : 'Supply radius: 50 km'}</li>
                <li>• {language === 'ru' ? 'Сезонные продукты: 80%' : 'Seasonal products: 80%'}</li>
                <li>• {language === 'ru' ? 'Справедливая торговля: 100%' : 'Fair trade: 100%'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Преимущества:' : 'Benefits:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Свежесть продуктов, поддержка местной экономики' : 'Fresh products, local economy support'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'zero-waste-kitchen') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Кухня без отходов' : 'Zero Waste Kitchen'}
          </h4>
          <div className="space-y-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <h5 className="font-medium text-orange-800">
                {language === 'ru' ? 'Принципы безотходности:' : 'Zero waste principles:'}
              </h5>
              <ul className="text-sm text-orange-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Планирование меню: 100%' : 'Menu planning: 100%'}</li>
                <li>• {language === 'ru' ? 'Использование остатков: 95%' : 'Leftover usage: 95%'}</li>
                <li>• {language === 'ru' ? 'Компостирование: 100%' : 'Composting: 100%'}</li>
                <li>• {language === 'ru' ? 'Многоразовая упаковка: 90%' : 'Reusable packaging: 90%'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Результаты:' : 'Results:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Сокращение пищевых отходов на 85%' : '85% reduction in food waste'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Eco Measures - Transport
    if (selectedAction === 'electric-cars') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Электромобили' : 'Electric Cars'}
          </h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Электропарк:' : 'Electric fleet:'}
              </h5>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Электромобили: 3 единицы' : 'Electric cars: 3 units'}</li>
                <li>• {language === 'ru' ? 'Зарядные станции: 4 точки' : 'Charging stations: 4 points'}</li>
                <li>• {language === 'ru' ? 'Солнечная зарядка: 100%' : 'Solar charging: 100%'}</li>
                <li>• {language === 'ru' ? 'Экономия топлива: 100%' : 'Fuel savings: 100%'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Экологический эффект:' : 'Environmental impact:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Нулевые выбросы CO2, тихая работа' : 'Zero CO2 emissions, quiet operation'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'bicycles') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Велосипеды' : 'Bicycles'}
          </h4>
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Велосипедная инфраструктура:' : 'Bicycle infrastructure:'}
              </h5>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Аренда велосипедов: 20 единиц' : 'Bike rental: 20 units'}</li>
                <li>• {language === 'ru' ? 'Электровелосипеды: 10 единиц' : 'E-bikes: 10 units'}</li>
                <li>• {language === 'ru' ? 'Велосипедные маршруты: 5 маршрутов' : 'Bike routes: 5 routes'}</li>
                <li>• {language === 'ru' ? 'Парковка: 50 мест' : 'Parking: 50 spots'}</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Популярность:' : 'Popularity:'}
              </h5>
              <p className="text-sm text-blue-700 mt-1">
                {language === 'ru' ? '70% гостей используют велосипеды' : '70% of guests use bicycles'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'eco-transfer') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Эко-трансфер' : 'Eco Transfer'}
          </h4>
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h5 className="font-medium text-purple-800">
                {language === 'ru' ? 'Эко-трансфер услуги:' : 'Eco transfer services:'}
              </h5>
              <ul className="text-sm text-purple-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Электромобили: 100%' : 'Electric vehicles: 100%'}</li>
                <li>• {language === 'ru' ? 'Гибридные автомобили: 50%' : 'Hybrid vehicles: 50%'}</li>
                <li>• {language === 'ru' ? 'Маршрутная оптимизация: 100%' : 'Route optimization: 100%'}</li>
                <li>• {language === 'ru' ? 'Совместные поездки: 80%' : 'Shared rides: 80%'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Преимущества:' : 'Benefits:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Снижение выбросов на 90%, комфорт для гостей' : '90% emission reduction, guest comfort'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Сводный отчет
    if (selectedAction === 'complete-summary') {
      return (
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-green-800 text-center">
            {language === 'ru' ? 'Полная сводка по отелю' : 'Complete Hotel Summary'}
          </h4>
          
          {/* Общая статистика */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-2">
                {language === 'ru' ? 'Общие показатели:' : 'General indicators:'}
              </h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• {language === 'ru' ? 'Загрузка: 78%' : 'Occupancy: 78%'}</li>
                <li>• {language === 'ru' ? 'Средний чек: 24,500 тенге' : 'Average bill: 24,500 tenge'}</li>
                <li>• {language === 'ru' ? 'Рейтинг: 4.8/5.0' : 'Rating: 4.8/5.0'}</li>
                <li>• {language === 'ru' ? 'Эко-рейтинг: 4.7/5.0' : 'Eco-rating: 4.7/5.0'}</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-medium text-green-800 mb-2">
                {language === 'ru' ? 'Эко-достижения:' : 'Eco achievements:'}
              </h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• {language === 'ru' ? 'Экономия энергии: 35%' : 'Energy savings: 35%'}</li>
                <li>• {language === 'ru' ? 'Переработка отходов: 85%' : 'Waste recycling: 85%'}</li>
                <li>• {language === 'ru' ? 'Водосбережение: 45%' : 'Water conservation: 45%'}</li>
                <li>• {language === 'ru' ? 'Органические продукты: 90%' : 'Organic products: 90%'}</li>
              </ul>
            </div>
          </div>

          {/* Финансовые показатели */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h5 className="font-medium text-yellow-800 mb-2">
              {language === 'ru' ? 'Финансовые показатели:' : 'Financial indicators:'}
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-yellow-700">
              <div>
                <strong>{language === 'ru' ? 'Месячная выручка:' : 'Monthly revenue:'}</strong><br/>
                {language === 'ru' ? '2,450,000 тенге' : '2,450,000 tenge'}
              </div>
              <div>
                <strong>{language === 'ru' ? 'Экономия на коммунальных:' : 'Utility savings:'}</strong><br/>
                {language === 'ru' ? '75,000 тенге/месяц' : '75,000 tenge/month'}
              </div>
              <div>
                <strong>{language === 'ru' ? 'ROI эко-мер:' : 'Eco measures ROI:'}</strong><br/>
                {language === 'ru' ? '15.2%' : '15.2%'}
              </div>
            </div>
          </div>

          {/* Кнопка подачи заявки */}
          <div className="text-center pt-4">
            <button
              onClick={() => {
                setSelectedAction('green-financing');
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              {language === 'ru' ? 'Подать заявку на зеленое финансирование' : 'Apply for Green Financing'}
            </button>
          </div>
        </div>
      );
    }

    if (selectedAction === 'eco-potential') {
      return (
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-green-800 text-center">
            {language === 'ru' ? 'Анализ эко-потенциала' : 'Eco Potential Analysis'}
          </h4>
          
          {/* Текущий потенциал */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-medium text-green-800 mb-3">
              {language === 'ru' ? 'Текущий эко-потенциал:' : 'Current eco potential:'}
            </h5>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-700">
                  {language === 'ru' ? 'Энергоэффективность' : 'Energy efficiency'}
                </span>
                <span className="text-sm font-medium text-green-800">85%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            
            <div className="space-y-2 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-700">
                  {language === 'ru' ? 'Управление отходами' : 'Waste management'}
                </span>
                <span className="text-sm font-medium text-green-800">90%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '90%'}}></div>
              </div>
            </div>
            
            <div className="space-y-2 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-700">
                  {language === 'ru' ? 'Водосбережение' : 'Water conservation'}
                </span>
                <span className="text-sm font-medium text-green-800">75%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
          </div>

          {/* Потенциал улучшения */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-3">
              {language === 'ru' ? 'Потенциал улучшения:' : 'Improvement potential:'}
            </h5>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• {language === 'ru' ? 'Добавить 20 кВт солнечных панелей (+15% эффективности)' : 'Add 20 kW solar panels (+15% efficiency)'}</li>
              <li>• {language === 'ru' ? 'Внедрить систему умного орошения (+10% водосбережения)' : 'Implement smart irrigation system (+10% water savings)'}</li>
              <li>• {language === 'ru' ? 'Установить систему рекуперации тепла (+8% энергоэффективности)' : 'Install heat recovery system (+8% energy efficiency)'}</li>
              <li>• {language === 'ru' ? 'Расширить программу компостирования (+5% переработки)' : 'Expand composting program (+5% recycling)'}</li>
            </ul>
          </div>

          {/* Ожидаемые результаты */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h5 className="font-medium text-purple-800 mb-2">
              {language === 'ru' ? 'Ожидаемые результаты после улучшений:' : 'Expected results after improvements:'}
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700">
              <div>
                <strong>{language === 'ru' ? 'Эко-рейтинг:' : 'Eco-rating:'}</strong><br/>
                {language === 'ru' ? '4.7 → 5.0' : '4.7 → 5.0'}
              </div>
              <div>
                <strong>{language === 'ru' ? 'Экономия:' : 'Savings:'}</strong><br/>
                {language === 'ru' ? '+40% на коммунальных' : '+40% on utilities'}
              </div>
              <div>
                <strong>{language === 'ru' ? 'Выбросы CO2:' : 'CO2 emissions:'}</strong><br/>
                {language === 'ru' ? '-60% сокращение' : '-60% reduction'}
              </div>
              <div>
                <strong>{language === 'ru' ? 'ROI:' : 'ROI:'}</strong><br/>
                {language === 'ru' ? '15.2% → 22.8%' : '15.2% → 22.8%'}
              </div>
            </div>
          </div>

          {/* Кнопка подачи заявки */}
          <div className="text-center pt-4">
            <button
              onClick={() => {
                setSelectedAction('green-financing');
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              {language === 'ru' ? 'Подать заявку на зеленое финансирование' : 'Apply for Green Financing'}
            </button>
          </div>
        </div>
      );
    }

    if (selectedAction === 'improvement-recommendations') {
      return (
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-green-800 text-center">
            {language === 'ru' ? 'Рекомендации по улучшению' : 'Improvement Recommendations'}
          </h4>
          
          {/* Приоритетные меры */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h5 className="font-medium text-red-800 mb-3">
              {language === 'ru' ? 'Высокий приоритет:' : 'High priority:'}
            </h5>
            <ul className="text-sm text-red-700 space-y-2">
              <li>• {language === 'ru' ? 'Установка дополнительных солнечных панелей (20 кВт) - ROI: 18%' : 'Install additional solar panels (20 kW) - ROI: 18%'}</li>
              <li>• {language === 'ru' ? 'Система умного орошения - экономия воды 30%' : 'Smart irrigation system - 30% water savings'}</li>
              <li>• {language === 'ru' ? 'Рекуперация тепла от вентиляции - экономия энергии 25%' : 'Heat recovery from ventilation - 25% energy savings'}</li>
            </ul>
          </div>

          {/* Средний приоритет */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h5 className="font-medium text-yellow-800 mb-3">
              {language === 'ru' ? 'Средний приоритет:' : 'Medium priority:'}
            </h5>
            <ul className="text-sm text-yellow-700 space-y-2">
              <li>• {language === 'ru' ? 'Расширение программы компостирования - ROI: 12%' : 'Expand composting program - ROI: 12%'}</li>
              <li>• {language === 'ru' ? 'Установка датчиков движения для освещения - экономия 15%' : 'Install motion sensors for lighting - 15% savings'}</li>
              <li>• {language === 'ru' ? 'Система сбора дождевой воды - экономия воды 20%' : 'Rainwater collection system - 20% water savings'}</li>
            </ul>
          </div>

          {/* Низкий приоритет */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-medium text-green-800 mb-3">
              {language === 'ru' ? 'Низкий приоритет:' : 'Low priority:'}
            </h5>
            <ul className="text-sm text-green-700 space-y-2">
              <li>• {language === 'ru' ? 'Зеленая крыша - улучшение изоляции 10%' : 'Green roof - 10% insulation improvement'}</li>
              <li>• {language === 'ru' ? 'Вертикальные сады - улучшение качества воздуха' : 'Vertical gardens - air quality improvement'}</li>
              <li>• {language === 'ru' ? 'Система очистки сточных вод - переработка 100%' : 'Wastewater treatment system - 100% recycling'}</li>
            </ul>
          </div>

          {/* Инвестиционный план */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-3">
              {language === 'ru' ? 'Инвестиционный план (3 года):' : 'Investment plan (3 years):'}
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
              <div>
                <strong>{language === 'ru' ? 'Год 1:' : 'Year 1:'}</strong><br/>
                {language === 'ru' ? '5,000,000 тенге' : '5,000,000 tenge'}<br/>
                <span className="text-xs">{language === 'ru' ? 'Солнечные панели, умное орошение' : 'Solar panels, smart irrigation'}</span>
              </div>
              <div>
                <strong>{language === 'ru' ? 'Год 2:' : 'Year 2:'}</strong><br/>
                {language === 'ru' ? '3,500,000 тенге' : '3,500,000 tenge'}<br/>
                <span className="text-xs">{language === 'ru' ? 'Рекуперация тепла, компостирование' : 'Heat recovery, composting'}</span>
              </div>
              <div>
                <strong>{language === 'ru' ? 'Год 3:' : 'Year 3:'}</strong><br/>
                {language === 'ru' ? '2,000,000 тенге' : '2,000,000 tenge'}<br/>
                <span className="text-xs">{language === 'ru' ? 'Зеленая крыша, датчики' : 'Green roof, sensors'}</span>
              </div>
            </div>
          </div>

          {/* Кнопка подачи заявки */}
          <div className="text-center pt-4">
            <button
              onClick={() => {
                setSelectedAction('green-financing');
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              {language === 'ru' ? 'Подать заявку на зеленое финансирование' : 'Apply for Green Financing'}
            </button>
          </div>
        </div>
      );
    }

    if (selectedAction === 'green-financing') {
      return (
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-green-800 text-center">
            {language === 'ru' ? 'Заявка на зеленое финансирование' : 'Green Financing Application'}
          </h4>
          
          {/* Форма заявки */}
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-medium text-green-800 mb-3">
                {language === 'ru' ? 'Информация о проекте:' : 'Project information:'}
              </h5>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">
                    {language === 'ru' ? 'Название отеля:' : 'Hotel name:'}
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={language === 'ru' ? 'Эко-отель "Зеленый Алматы"' : 'Eco Hotel "Green Almaty"'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">
                    {language === 'ru' ? 'Запрашиваемая сумма:' : 'Requested amount:'}
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={language === 'ru' ? '10,500,000 тенге' : '10,500,000 tenge'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">
                    {language === 'ru' ? 'Срок реализации:' : 'Implementation period:'}
                  </label>
                  <select className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option>{language === 'ru' ? '1 год' : '1 year'}</option>
                    <option>{language === 'ru' ? '2 года' : '2 years'}</option>
                    <option>{language === 'ru' ? '3 года' : '3 years'}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">
                    {language === 'ru' ? 'Описание проекта:' : 'Project description:'}
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={language === 'ru' ? 'Описание планируемых эко-мероприятий...' : 'Description of planned eco-measures...'}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Преимущества финансирования */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-3">
                {language === 'ru' ? 'Преимущества зеленого финансирования:' : 'Green financing benefits:'}
              </h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• {language === 'ru' ? 'Ставка от 3.5% годовых' : 'Interest rate from 3.5% per annum'}</li>
                <li>• {language === 'ru' ? 'Льготный период до 6 месяцев' : 'Grace period up to 6 months'}</li>
                <li>• {language === 'ru' ? 'Срок кредитования до 10 лет' : 'Loan term up to 10 years'}</li>
                <li>• {language === 'ru' ? 'Техническая поддержка проекта' : 'Technical project support'}</li>
                <li>• {language === 'ru' ? 'Сертификация эко-стандартов' : 'Eco-standards certification'}</li>
              </ul>
            </div>

            {/* Кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={closeModal}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                {language === 'ru' ? 'Отправить заявку' : 'Submit Application'}
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                {language === 'ru' ? 'Сохранить черновик' : 'Save Draft'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Сертификаты - LEED
    if (selectedAction === 'apply-leed') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Подача заявки на LEED' : 'LEED Application'}
          </h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Требования для LEED:' : 'LEED Requirements:'}
              </h5>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Энергоэффективность: минимум 20% экономии' : 'Energy efficiency: minimum 20% savings'}</li>
                <li>• {language === 'ru' ? 'Водосбережение: минимум 30% экономии' : 'Water conservation: minimum 30% savings'}</li>
                <li>• {language === 'ru' ? 'Экологические материалы: 50% переработанных' : 'Eco materials: 50% recycled'}</li>
                <li>• {language === 'ru' ? 'Качество воздуха: система вентиляции' : 'Air quality: ventilation system'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Ваш статус:' : 'Your status:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Готовы к подаче заявки - все требования выполнены' : 'Ready to apply - all requirements met'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'prepare-leed-docs') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Подготовка документов LEED' : 'LEED Documentation'}
          </h4>
          <div className="space-y-3">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h5 className="font-medium text-yellow-800">
                {language === 'ru' ? 'Необходимые документы:' : 'Required documents:'}
              </h5>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Энергетический аудит' : 'Energy audit'}</li>
                <li>• {language === 'ru' ? 'Сертификаты материалов' : 'Material certificates'}</li>
                <li>• {language === 'ru' ? 'План управления отходами' : 'Waste management plan'}</li>
                <li>• {language === 'ru' ? 'Фотографии эко-мер' : 'Eco-measures photos'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Прогресс:' : 'Progress:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? '85% документов готовы' : '85% of documents ready'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'leed-audit') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'LEED Аудит' : 'LEED Audit'}
          </h4>
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h5 className="font-medium text-purple-800">
                {language === 'ru' ? 'Результаты аудита:' : 'Audit results:'}
              </h5>
              <ul className="text-sm text-purple-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Энергоэффективность: 4.2/5' : 'Energy efficiency: 4.2/5'}</li>
                <li>• {language === 'ru' ? 'Водосбережение: 4.5/5' : 'Water conservation: 4.5/5'}</li>
                <li>• {language === 'ru' ? 'Материалы: 4.0/5' : 'Materials: 4.0/5'}</li>
                <li>• {language === 'ru' ? 'Качество воздуха: 4.3/5' : 'Air quality: 4.3/5'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Рекомендации:' : 'Recommendations:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'Улучшить изоляцию для повышения энергоэффективности' : 'Improve insulation to increase energy efficiency'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Сертификаты - Green Key
    if (selectedAction === 'register-green-key') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Регистрация Green Key' : 'Green Key Registration'}
          </h4>
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Преимущества Green Key:' : 'Green Key benefits:'}
              </h5>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Международное признание' : 'International recognition'}</li>
                <li>• {language === 'ru' ? 'Повышение рейтинга' : 'Rating improvement'}</li>
                <li>• {language === 'ru' ? 'Привлечение эко-туристов' : 'Eco-tourist attraction'}</li>
                <li>• {language === 'ru' ? 'Снижение операционных расходов' : 'Reduced operational costs'}</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Стоимость сертификации:' : 'Certification cost:'}
              </h5>
              <p className="text-sm text-blue-700 mt-1">
                {language === 'ru' ? '2,500 евро + ежегодный взнос 800 евро' : '2,500 euros + annual fee 800 euros'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'fill-green-key-form') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Заполнение формы Green Key' : 'Green Key Form'}
          </h4>
          <div className="space-y-3">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h5 className="font-medium text-yellow-800">
                {language === 'ru' ? 'Разделы формы:' : 'Form sections:'}
              </h5>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Управление окружающей средой' : 'Environmental management'}</li>
                <li>• {language === 'ru' ? 'Энергосбережение' : 'Energy conservation'}</li>
                <li>• {language === 'ru' ? 'Водосбережение' : 'Water conservation'}</li>
                <li>• {language === 'ru' ? 'Управление отходами' : 'Waste management'}</li>
                <li>• {language === 'ru' ? 'Обучение персонала' : 'Staff training'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Прогресс заполнения:' : 'Completion progress:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? '70% формы заполнено' : '70% of form completed'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'get-green-key-assessment') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Оценка Green Key' : 'Green Key Assessment'}
          </h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Критерии оценки:' : 'Assessment criteria:'}
              </h5>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Экологическая политика: 4.5/5' : 'Environmental policy: 4.5/5'}</li>
                <li>• {language === 'ru' ? 'Энергоэффективность: 4.2/5' : 'Energy efficiency: 4.2/5'}</li>
                <li>• {language === 'ru' ? 'Водосбережение: 4.3/5' : 'Water conservation: 4.3/5'}</li>
                <li>• {language === 'ru' ? 'Управление отходами: 4.4/5' : 'Waste management: 4.4/5'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Общий балл:' : 'Overall score:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? '4.35/5 - Готов к сертификации' : '4.35/5 - Ready for certification'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Сертификаты - Biosphere
    if (selectedAction === 'apply-biosphere') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Заявка на Biosphere' : 'Biosphere Application'}
          </h4>
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Требования Biosphere:' : 'Biosphere requirements:'}
              </h5>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Устойчивое развитие' : 'Sustainable development'}</li>
                <li>• {language === 'ru' ? 'Сохранение биоразнообразия' : 'Biodiversity conservation'}</li>
                <li>• {language === 'ru' ? 'Социальная ответственность' : 'Social responsibility'}</li>
                <li>• {language === 'ru' ? 'Экономическая устойчивость' : 'Economic sustainability'}</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Сроки сертификации:' : 'Certification timeline:'}
              </h5>
              <p className="text-sm text-blue-700 mt-1">
                {language === 'ru' ? '6-12 месяцев с момента подачи заявки' : '6-12 months from application date'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'prepare-biosphere-report') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Подготовка отчета Biosphere' : 'Biosphere Report'}
          </h4>
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h5 className="font-medium text-purple-800">
                {language === 'ru' ? 'Разделы отчета:' : 'Report sections:'}
              </h5>
              <ul className="text-sm text-purple-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Экологический след' : 'Environmental footprint'}</li>
                <li>• {language === 'ru' ? 'Социальное воздействие' : 'Social impact'}</li>
                <li>• {language === 'ru' ? 'Экономические показатели' : 'Economic indicators'}</li>
                <li>• {language === 'ru' ? 'Планы улучшения' : 'Improvement plans'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Статус отчета:' : 'Report status:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? 'В процессе подготовки - 60% готово' : 'In preparation - 60% complete'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'biosphere-inspection') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Инспекция Biosphere' : 'Biosphere Inspection'}
          </h4>
          <div className="space-y-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <h5 className="font-medium text-orange-800">
                {language === 'ru' ? 'План инспекции:' : 'Inspection plan:'}
              </h5>
              <ul className="text-sm text-orange-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Проверка документов' : 'Document review'}</li>
                <li>• {language === 'ru' ? 'Осмотр объекта' : 'Site inspection'}</li>
                <li>• {language === 'ru' ? 'Интервью с персоналом' : 'Staff interviews'}</li>
                <li>• {language === 'ru' ? 'Анализ процессов' : 'Process analysis'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Дата инспекции:' : 'Inspection date:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? '15 марта 2024 года' : 'March 15, 2024'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Загрузка документов
    if (selectedAction === 'upload-certificates') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Загрузка сертификатов' : 'Upload Certificates'}
          </h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-medium text-blue-800">
                {language === 'ru' ? 'Поддерживаемые форматы:' : 'Supported formats:'}
              </h5>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• PDF (до 10 МБ)</li>
                <li>• JPG, PNG (до 5 МБ)</li>
                <li>• DOC, DOCX (до 10 МБ)</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Загруженные сертификаты:' : 'Uploaded certificates:'}
              </h5>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'LEED Gold - 2023' : 'LEED Gold - 2023'}</li>
                <li>• {language === 'ru' ? 'ISO 14001 - 2023' : 'ISO 14001 - 2023'}</li>
                <li>• {language === 'ru' ? 'Green Key - 2022' : 'Green Key - 2022'}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'add-reports') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Добавление отчетов' : 'Add Reports'}
          </h4>
          <div className="space-y-3">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h5 className="font-medium text-yellow-800">
                {language === 'ru' ? 'Типы отчетов:' : 'Report types:'}
              </h5>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Экологический отчет' : 'Environmental report'}</li>
                <li>• {language === 'ru' ? 'Отчет по энергопотреблению' : 'Energy consumption report'}</li>
                <li>• {language === 'ru' ? 'Отчет по отходам' : 'Waste report'}</li>
                <li>• {language === 'ru' ? 'Социальный отчет' : 'Social report'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Последние отчеты:' : 'Recent reports:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? '12 отчетов за 2023 год' : '12 reports for 2023'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedAction === 'manage-files') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-800">
            {language === 'ru' ? 'Управление файлами' : 'File Management'}
          </h4>
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h5 className="font-medium text-purple-800">
                {language === 'ru' ? 'Действия с файлами:' : 'File actions:'}
              </h5>
              <ul className="text-sm text-purple-700 mt-2 space-y-1">
                <li>• {language === 'ru' ? 'Просмотр и скачивание' : 'View and download'}</li>
                <li>• {language === 'ru' ? 'Редактирование метаданных' : 'Edit metadata'}</li>
                <li>• {language === 'ru' ? 'Архивирование старых файлов' : 'Archive old files'}</li>
                <li>• {language === 'ru' ? 'Синхронизация с облаком' : 'Cloud synchronization'}</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">
                {language === 'ru' ? 'Статистика файлов:' : 'File statistics:'}
              </h5>
              <p className="text-sm text-green-700 mt-1">
                {language === 'ru' ? '47 файлов, 2.3 ГБ общий размер' : '47 files, 2.3 GB total size'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Для остальных действий показываем стандартное сообщение
    return (
      <div className="text-green-600">
        {t.functionInDevelopment}
      </div>
    );
  };

  const renderContent = () => {
    const currentSection = menuItems.find(item => item.id === activeSection);
    
    if (!currentSection) return null;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSection.items.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-green-800">{item.name}</h3>
                <button
                  onClick={() => toggleExpanded(item.name)}
                  className="text-green-600 hover:text-green-800"
                >
                  {expandedItems.has(item.name) ? (
                    <ChevronDownIcon className="w-5 h-5" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedItems.has(item.name) && (
                <div className="space-y-2 mt-4">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => handleAction(subItem.action)}
                      className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <span className="text-sm text-green-700">{subItem.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-green-50">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-green-600 text-white p-2 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-green-800">{t.accommodationDashboard}</h1>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <nav>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 p-3 rounded-lg mb-2 transition-all duration-200 ${
                  activeSection === item.id ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-green-50'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Language Switcher */}
          <div className="flex justify-end mb-4">
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={changeLanguage}
            />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
            {menuItems.find(item => item.id === activeSection)?.title}
          </h2>
          
          {renderContent()}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-green-800">
                {selectedAction}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="mb-4">
              {renderModalContent()}
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 