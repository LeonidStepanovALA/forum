'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { StarIcon, MapPinIcon, CalendarIcon, ClockIcon, CurrencyDollarIcon, EyeIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import RouteMap from './RouteMap';

interface SearchResult {
  id: number;
  type: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  difficulty: string;
  startPoint: string;
  endPoint: string;
  startDate: string;
  endDate: string;
  rating: number;
  reviews: number;
  ecoRating: number;
  guide?: {
    name: string;
    rating: number;
    experience: string;
    languages: string[];
    avatar: string;
  };
  status?: 'confirmed' | 'pending' | 'available';
  confirmationDate?: string | null;
  maxParticipants?: number;
  currentParticipants?: number;
  transport?: string;
  accommodation?: string;
  meals?: string;
  highlights?: string[];
}

interface SearchResultsProps {
  results: SearchResult[];
  searchQuery?: string;
}

export default function SearchResults({ results, searchQuery }: SearchResultsProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [confirmedTours, setConfirmedTours] = useState<Set<number>>(new Set([1, 4])); // Туры 1 и 4 уже подтверждены
  const [pendingConfirmations, setPendingConfirmations] = useState<Set<number>>(new Set([2, 5])); // Туры 2 и 5 ожидают подтверждения
  const [bookedTours, setBookedTours] = useState<Set<number>>(new Set()); // Забронированные туры
  const [selectedCompetingTours, setSelectedCompetingTours] = useState<Set<number>>(new Set()); // Выбранные конкурирующие туры
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'confirmed' | 'pending' | 'available' | 'booked'>('all');

  console.log('🎯 SearchResults рендерится:', { 
    results: results.length, 
    searchQuery, 
    selectedTour,
    resultsIds: results.map(r => r.id),
    confirmedTours: Array.from(confirmedTours),
    pendingConfirmations: Array.from(pendingConfirmations),
    timelineFilter
  });

  // Перемещаем mockResults внутрь компонента
  const mockResults: SearchResult[] = [
    {
      id: 1,
      type: 'tour',
      title: language === 'ru' ? 'Экспедиция Алматы → Чолпон-Ата (Вариант А)' : 'Almaty → Cholpon-Ata Expedition (Option A)',
      description: language === 'ru' ? 'Пятидневное путешествие от гор Алматы до берегов Иссык-Куль с посещением древних памятников и природных достопримечательностей' : 'Five-day journey from Almaty mountains to Issyk-Kul shores with visits to ancient monuments and natural attractions',
      image: '/next.svg',
      price: 85000,
      rating: 4.9,
      reviews: 24,
      ecoRating: 4.9,
      startPoint: 'Алматы',
      endPoint: 'Чолпон-Ата',
      startDate: '2024-08-15',
      endDate: '2024-08-19',
      duration: '5 дней',
      difficulty: 'Средняя',
      guide: {
        name: 'Алексей Петров',
        rating: 4.8,
        experience: '8 лет',
        languages: ['Русский', 'Английский'],
        avatar: '/next.svg'
      },
      status: 'confirmed',
      confirmationDate: '2024-08-10',
      maxParticipants: 12,
      currentParticipants: 8,
      transport: 'Микроавтобус',
      accommodation: 'Отели и гостевые дома',
      meals: 'Полупансион',
      highlights: [
        'Перевал Тюе-Ашуу',
        'Озеро Иссык-Куль',
        'Петроглифы Чолпон-Ата',
        'Горячие источники',
        'Этнографический музей'
      ]
    },
    {
      id: 2,
      type: 'tour',
      title: language === 'ru' ? 'Экспедиция Алматы → Чолпон-Ата (Вариант Б)' : 'Almaty → Cholpon-Ata Expedition (Option B)',
      description: language === 'ru' ? 'Альтернативный пятидневный маршрут с акцентом на активный отдых и экстремальные виды спорта' : 'Alternative five-day route focusing on active recreation and extreme sports',
      image: '/next.svg',
      price: 95000,
      rating: 4.7,
      reviews: 18,
      ecoRating: 4.6,
      startPoint: 'Алматы',
      endPoint: 'Чолпон-Ата',
      startDate: '2024-08-15',
      endDate: '2024-08-19',
      duration: '5 дней',
      difficulty: 'Сложная',
      guide: {
        name: 'Дмитрий Волков',
        rating: 4.7,
        experience: '12 лет',
        languages: ['Русский', 'Английский', 'Немецкий'],
        avatar: '/next.svg'
      },
      status: 'pending',
      confirmationDate: null,
      maxParticipants: 8,
      currentParticipants: 6,
      transport: 'Внедорожники',
      accommodation: 'Палатки и горные приюты',
      meals: 'Полевая кухня',
      highlights: [
        'Треккинг в горах Тянь-Шань',
        'Рафтинг по реке Чу',
        'Скалолазание',
        'Парапланеризм',
        'Ночлег в юртах'
      ]
    },
    {
      id: 3,
      type: 'tour',
      title: language === 'ru' ? 'Культурный тур Алматы → Чолпон-Ата (Классический)' : 'Cultural Tour Almaty → Cholpon-Ata (Classic)',
      description: language === 'ru' ? 'Трехдневный культурный тур с акцентом на историю и традиции региона, включая мастер-классы и дегустации' : 'Three-day cultural tour focusing on regional history and traditions, including workshops and tastings',
      image: '/next.svg',
      price: 65000,
      rating: 4.7,
      reviews: 18,
      ecoRating: 4.7,
      startPoint: 'Алматы',
      endPoint: 'Чолпон-Ата',
      startDate: '2024-08-20',
      endDate: '2024-08-22',
      duration: '3 дня',
      difficulty: 'Легкая',
      guide: {
        name: 'Мария Козлова',
        rating: 4.9,
        experience: '5 лет',
        languages: ['Русский', 'Кыргызский', 'Английский'],
        avatar: '/next.svg'
      },
      status: 'pending',
      confirmationDate: null,
      maxParticipants: 8,
      currentParticipants: 6,
      transport: 'Комфортабельный автобус',
      accommodation: 'Отели 3-4 звезды',
      meals: 'Полный пансион',
      highlights: [
        'Музей народных инструментов',
        'Мастер-класс по войлоку',
        'Дегустация кумыса',
        'Фольклорный вечер',
        'Посещение ремесленных мастерских'
      ]
    },
    {
      id: 4,
      type: 'tour',
      title: language === 'ru' ? 'Культурный тур Алматы → Чолпон-Ата (Премиум)' : 'Cultural Tour Almaty → Cholpon-Ata (Premium)',
      description: language === 'ru' ? 'Премиум версия культурного тура с VIP-обслуживанием, эксклюзивными экскурсиями и дегустациями' : 'Premium version of cultural tour with VIP service, exclusive excursions and tastings',
      image: '/next.svg',
      price: 120000,
      rating: 4.9,
      reviews: 12,
      ecoRating: 4.8,
      startPoint: 'Алматы',
      endPoint: 'Чолпон-Ата',
      startDate: '2024-08-20',
      endDate: '2024-08-22',
      duration: '3 дня',
      difficulty: 'Легкая',
      guide: {
        name: 'Елена Соколова',
        rating: 4.8,
        experience: '6 лет',
        languages: ['Русский', 'Английский', 'Французский'],
        avatar: '/next.svg'
      },
      status: 'available',
      confirmationDate: null,
      maxParticipants: 4,
      currentParticipants: 2,
      transport: 'Лимузин',
      accommodation: 'Отели 5 звезд',
      meals: 'Полный пансион + вино',
      highlights: [
        'Приватные экскурсии',
        'VIP-дегустации',
        'Встреча с местными мастерами',
        'Эксклюзивные мастер-классы',
        'Персональный фотограф'
      ]
    },
    {
      id: 5,
      type: 'tour',
      title: language === 'ru' ? 'Эко-тур Алматы → Чолпон-Ата (Стандарт)' : 'Eco Tour Almaty → Cholpon-Ata (Standard)',
      description: language === 'ru' ? 'Четырехдневный экологический тур с акцентом на сохранение природы и экологическое образование' : 'Four-day ecological tour focusing on nature conservation and environmental education',
      image: '/next.svg',
      price: 75000,
      rating: 4.6,
      reviews: 15,
      ecoRating: 4.9,
      startPoint: 'Алматы',
      endPoint: 'Чолпон-Ата',
      startDate: '2024-09-05',
      endDate: '2024-09-08',
      duration: '4 дня',
      difficulty: 'Легкая',
      guide: {
        name: 'Археолог Иван Медведев',
        rating: 4.9,
        experience: '15 лет',
        languages: ['Русский', 'Английский', 'Китайский'],
        avatar: '/next.svg'
      },
      status: 'confirmed',
      confirmationDate: '2024-08-28',
      maxParticipants: 10,
      currentParticipants: 7,
      transport: 'Электромобиль',
      accommodation: 'Эко-отели',
      meals: 'Вегетарианское питание',
      highlights: [
        'Экологический заповедник',
        'Мастер-класс по переработке',
        'Посадка деревьев',
        'Экологическая лаборатория',
        'Встреча с местными экологами'
      ]
    },
    {
      id: 6,
      type: 'tour',
      title: language === 'ru' ? 'Эко-тур Алматы → Чолпон-Ата (Интенсив)' : 'Eco Tour Almaty → Cholpon-Ata (Intensive)',
      description: language === 'ru' ? 'Интенсивный экологический тур с глубоким погружением в экологические проблемы и их решения' : 'Intensive ecological tour with deep immersion into environmental issues and their solutions',
      image: '/next.svg',
      price: 95000,
      rating: 4.8,
      reviews: 8,
      ecoRating: 5.0,
      startPoint: 'Алматы',
      endPoint: 'Чолпон-Ата',
      startDate: '2024-09-05',
      endDate: '2024-09-08',
      duration: '4 дня',
      difficulty: 'Средняя',
      guide: {
        name: 'Фотограф Анна Климова',
        rating: 4.8,
        experience: '10 лет',
        languages: ['Русский', 'Английский', 'Испанский'],
        avatar: '/next.svg'
      },
      status: 'available',
      confirmationDate: null,
      maxParticipants: 6,
      currentParticipants: 3,
      transport: 'Велосипеды + электромобиль',
      accommodation: 'Эко-домики',
      meals: 'Строго вегетарианское + органическое',
      highlights: [
        'Экологический мониторинг',
        'Участие в научных исследованиях',
        'Волонтерская работа',
        'Экологическая экспертиза',
        'Создание экологического отчета'
      ]
    }
  ];

  // Моковые данные для гостиниц/отелей
  const mockHotels = [
    {
      id: 101,
      name: 'Эко-отель "Зеленые горы"',
      location: 'Чолпон-Ата, ул. Озерная, 15',
      description: 'Современный эко-отель с видом на озеро Иссык-Куль. Все номера оборудованы экологичными материалами.',
      priceRange: '15 000 - 25 000 ₸',
      rating: 4.8,
      ecoRating: 4.9,
      reviews: 156,
      amenities: ['Wi-Fi', 'Парковка', 'Ресторан', 'Спа', 'Эко-материалы']
    },
    {
      id: 102,
      name: 'Гостиница "Озерный берег"',
      location: 'Чолпон-Ата, ул. Пляжная, 8',
      description: 'Уютная гостиница в центре города с собственным пляжем и рестораном местной кухни.',
      priceRange: '12 000 - 20 000 ₸',
      rating: 4.6,
      ecoRating: 4.7,
      reviews: 89,
      amenities: ['Wi-Fi', 'Пляж', 'Ресторан', 'Трансфер', 'Экскурсии']
    }
  ];

  // Состояние для выбранных отелей
  const [selectedHotels, setSelectedHotels] = useState<Set<number>>(new Set());
  const [fadingHotels, setFadingHotels] = useState<Set<number>>(new Set());
  
  // Добавляем состояние для отслеживания выбранных отелей по датам
  const [selectedHotelsByDate, setSelectedHotelsByDate] = useState<{ [key: string]: number }>({});
  
  // Добавляем состояние для отслеживания статуса бронирования туров
  const [bookingStatus, setBookingStatus] = useState<{ [key: number]: 'available' | 'booking' | 'waiting' | 'confirmed' }>({});
  const [bookingTimers, setBookingTimers] = useState<{ [key: number]: NodeJS.Timeout }>({});
  const [hotelBookingStatus, setHotelBookingStatus] = useState<{ [key: number]: 'available' | 'booking' | 'checkin' }>({});
  const [hotelBookingTimers, setHotelBookingTimers] = useState<{ [key: number]: NodeJS.Timeout }>({});
  const [hotelQRCodes, setHotelQRCodes] = useState<{ [key: number]: string }>({});
  const [showQRModal, setShowQRModal] = useState<{ [key: number]: boolean }>({});

  // Очистка таймеров при размонтировании компонента
  useEffect(() => {
    return () => {
      Object.values(bookingTimers).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
      Object.values(hotelBookingTimers).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, [bookingTimers, hotelBookingTimers]);

  // Функция для выбора отеля с анимацией
  const handleSelectHotelWithAnimation = (hotelId: number, date: string) => {
    // Если отель уже выбран для этой даты, отменяем выбор
    if (selectedHotelsByDate[date] === hotelId) {
      setSelectedHotelsByDate(prev => {
        const newState = { ...prev };
        delete newState[date];
        return newState;
      });
      return;
    }

    // Убираем предыдущий выбор для этой даты
    const previousSelection = selectedHotelsByDate[date];
    if (previousSelection) {
      setFadingHotels(prev => new Set([...prev, previousSelection]));
      setTimeout(() => {
        setFadingHotels(prev => {
          const newSet = new Set(prev);
          newSet.delete(previousSelection);
          return newSet;
        });
      }, 300);
    }

    // Выбираем новый отель для этой даты
    setSelectedHotelsByDate(prev => ({
      ...prev,
      [date]: hotelId
    }));

    // Добавляем анимацию для нового выбора
    setFadingHotels(prev => new Set([...prev, hotelId]));
    setTimeout(() => {
      setFadingHotels(prev => {
        const newSet = new Set(prev);
        newSet.delete(hotelId);
        return newSet;
      });
    }, 300);
  };

  // Функция для проверки, должен ли отель отображаться
  const shouldShowHotel = (hotelId: number, date: string) => {
    const selectedForDate = selectedHotelsByDate[date];
    return !selectedForDate || selectedForDate === hotelId;
  };

  // Используем mockResults для демонстрации всех туров
  const displayResults = mockResults;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString(language === 'ru' ? 'ru-RU' : 'en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const handleGuideConfirmation = (tourId: number) => {
    console.log('✅ Гид подтвердил тур:', tourId);
    setConfirmedTours(prev => new Set([...prev, tourId]));
    setPendingConfirmations(prev => {
      const newSet = new Set(prev);
      newSet.delete(tourId);
      return newSet;
    });
  };

  const handleStartTour = (tourId: number) => {
    console.log('🚀 Начинаем тур:', tourId);
    alert(`Тур ${tourId} начался! Добро пожаловать в путешествие!`);
  };

  // Функция для бронирования тура
  const handleBookTour = (tourId: number) => {
    if (bookingStatus[tourId] === 'waiting' || bookingStatus[tourId] === 'confirmed') {
      return;
    }
    
    console.log('🎫 Бронируем тур:', tourId);
    
    setBookingStatus(prev => ({
      ...prev,
      [tourId]: 'booking'
    }));
    
    // Через 1 секунду меняем на "Ждем подтверждения"
    setTimeout(() => {
      console.log('⏳ Ждем подтверждения для тура:', tourId);
      setBookingStatus(prev => ({
        ...prev,
        [tourId]: 'waiting'
      }));
      
      // Через 4 секунды подтверждаем тур
      const timer = setTimeout(() => {
        console.log('✅ Подтверждаем тур:', tourId);
        setBookingStatus(prev => ({
          ...prev,
          [tourId]: 'confirmed'
        }));
        setConfirmedTours(prev => new Set([...prev, tourId]));
        
        // Очищаем таймер
        setBookingTimers(prev => {
          const newTimers = { ...prev };
          delete newTimers[tourId];
          return newTimers;
        });
      }, 4000); // 4 секунды для подтверждения
      
      setBookingTimers(prev => ({
        ...prev,
        [tourId]: timer
      }));
    }, 1000); // 1 секунда для "Бронируем..."
  };

  const handleBookHotel = (hotelId: number) => {
    if (hotelBookingStatus[hotelId] === 'checkin') {
      return;
    }
    setHotelBookingStatus(prev => ({
      ...prev,
      [hotelId]: 'booking'
    }));
    setTimeout(() => {
      setHotelBookingStatus(prev => ({
        ...prev,
        [hotelId]: 'checkin'
      }));
      setHotelBookingTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[hotelId];
        return newTimers;
      });
    }, 3000); // 3 seconds for check-in
  };

  const generateHotelQR = async (hotelId: number) => {
    try {
      const hotel = mockHotels.find(h => h.id === hotelId);
      if (!hotel) return;

      const qrData = {
        hotelId: hotelId,
        hotelName: hotel.name,
        checkInTime: new Date().toISOString(),
        bookingId: `BK-${hotelId}-${Date.now()}`,
        guestInfo: {
          name: 'Турист',
          phone: '+7 XXX XXX XX XX'
        }
      };

      const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrData), {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      setHotelQRCodes(prev => ({
        ...prev,
        [hotelId]: qrCodeDataURL
      }));
    } catch (error) {
      console.error('Ошибка генерации QR-кода:', error);
    }
  };

  const showQRCode = (hotelId: number) => {
    if (!hotelQRCodes[hotelId]) {
      generateHotelQR(hotelId);
    }
    setShowQRModal(prev => ({
      ...prev,
      [hotelId]: true
    }));
  };

  // Функция для проверки, должен ли тур отображаться
  const shouldShowTour = (tour: SearchResult) => {
    // Если тур выбран в конкурирующей группе, показываем его
    if (selectedCompetingTours.has(tour.id)) {
      return true;
    }
    
    // Если тур не в конкурирующей группе, показываем его
    if (![1, 2, 3, 4, 5, 6].includes(tour.id)) {
      return true;
    }
    
    // Для конкурирующих туров: если ни один из группы не выбран, показываем первый
    if ([1, 2].includes(tour.id)) {
      const hasSelectedFromGroup = selectedCompetingTours.has(1) || selectedCompetingTours.has(2);
      return !hasSelectedFromGroup || selectedCompetingTours.has(tour.id);
    }
    if ([3, 4].includes(tour.id)) {
      const hasSelectedFromGroup = selectedCompetingTours.has(3) || selectedCompetingTours.has(4);
      return !hasSelectedFromGroup || selectedCompetingTours.has(tour.id);
    }
    if ([5, 6].includes(tour.id)) {
      const hasSelectedFromGroup = selectedCompetingTours.has(5) || selectedCompetingTours.has(6);
      return !hasSelectedFromGroup || selectedCompetingTours.has(tour.id);
    }
    
    return true;
  };

  // Состояние для анимации исчезновения
  const [fadingTours, setFadingTours] = useState<Set<number>>(new Set());

  // Обновленная функция выбора конкурирующего тура с анимацией
  const handleSelectCompetingTourWithAnimation = (tourId: number) => {
    console.log('🏆 Выбран конкурирующий тур:', tourId);
    
    // Определяем группу конкурирующих туров
    let competingGroup: number[] = [];
    if ([1, 2].includes(tourId)) {
      competingGroup = [1, 2]; // Экспедиции
    } else if ([3, 4].includes(tourId)) {
      competingGroup = [3, 4]; // Культурные туры
    } else if ([5, 6].includes(tourId)) {
      competingGroup = [5, 6]; // Эко-туры
    }
    
    // Добавляем туры в состояние анимации исчезновения
    const toursToFade = competingGroup.filter(id => id !== tourId);
    setFadingTours(prev => new Set([...prev, ...toursToFade]));
    
    // Запускаем анимацию исчезновения
    setTimeout(() => {
      // Удаляем все туры из группы и добавляем только выбранный
      setSelectedCompetingTours(prev => {
        const newSet = new Set(prev);
        competingGroup.forEach(id => newSet.delete(id));
        newSet.add(tourId);
        return newSet;
      });
      
      // Очищаем состояние анимации
      setFadingTours(new Set());
    }, 300); // 300ms для плавной анимации
  };

  const getTourStatus = (tourId: number) => {
    if (confirmedTours.has(tourId)) {
      return 'confirmed';
    } else if (pendingConfirmations.has(tourId)) {
      return 'pending';
    } else if (bookedTours.has(tourId)) {
      return 'booked';
    } else {
      return 'available';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'available':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'booked':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'легкая':
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'средняя':
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'сложная':
      case 'hard':
        return 'bg-orange-100 text-orange-800';
      case 'эксперт':
      case 'expert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '✅ Подтвержден гидом';
      case 'pending':
        return '⏳ Ожидает подтверждения';
      case 'available':
        return '📋 Доступен для бронирования';
      case 'booked':
        return '🎫 Забронирован';
      default:
        return '❓ Неизвестный статус';
    }
  };

  // Компонент таймлайна
  const TimelineView = ({ tours }: { tours: SearchResult[] }) => {
    const sortedTours = [...tours].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    
    // Функция для группировки конкурирующих туров
    const groupCompetingTours = (tours: SearchResult[]) => {
      const grouped: { [key: string]: SearchResult[] } = {};
      
      tours.forEach(tour => {
        let groupKey = '';
        if ([1, 2].includes(tour.id)) {
          groupKey = '2024-08-15'; // Экспедиции
        } else if ([3, 4].includes(tour.id)) {
          groupKey = '2024-08-20'; // Культурные туры
        } else if ([5, 6].includes(tour.id)) {
          groupKey = '2024-09-05'; // Эко-туры
        } else {
          groupKey = tour.startDate; // Обычные туры
        }
        
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        grouped[groupKey].push(tour);
      });
      
      return grouped;
    };
    
    // Функция для определения дат отелей (на день раньше до следующего тура)
    const getHotelDates = (tourDates: string[]) => {
      const hotelDates: { [key: string]: string } = {};
      
      tourDates.forEach((tourDate, index) => {
        const currentDate = new Date(tourDate);
        const previousDate = new Date(currentDate);
        previousDate.setDate(previousDate.getDate() - 1);
        
        const hotelDate = previousDate.toISOString().split('T')[0];
        hotelDates[tourDate] = hotelDate;
      });
      
      return hotelDates;
    };
    
    const groupedTours = groupCompetingTours(sortedTours);
    const timelineDates = Object.keys(groupedTours).sort();
    const hotelDates = getHotelDates(timelineDates);
    
    return (
      <div className="col-span-full mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">🗓️ Таймлайн туров и отелей по маршруту Алматы → Чолпон-Ата</h3>
          
          {/* Фильтры */}
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'Все', color: 'gray' },
              { key: 'confirmed', label: 'Подтвержденные', color: 'green' },
              { key: 'pending', label: 'Ожидающие', color: 'yellow' },
              { key: 'available', label: 'Доступные', color: 'blue' },
              { key: 'booked', label: 'Забронированные', color: 'purple' }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => setTimelineFilter(filter.key as any)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  timelineFilter === filter.key
                    ? `bg-${filter.color}-100 text-${filter.color}-700 border-${filter.color}-300`
                    : `bg-white text-gray-600 border-gray-300 hover:bg-gray-50`
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="relative">
          {/* Временная линия */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
          
          <div className="space-y-6">
            {timelineDates.map((date, dateIndex) => {
              const toursForDate = groupedTours[date];
              const filteredToursForDate = toursForDate.filter(tour => {
                if (timelineFilter === 'all') return shouldShowTour(tour);
                return getTourStatus(tour.id) === timelineFilter && shouldShowTour(tour);
              });
              
              if (filteredToursForDate.length === 0) return null;
              
              const hotelDate = hotelDates[date];
              
              return (
                <div key={date} className="relative">
                  {/* Отели на день раньше */}
                  {dateIndex > 0 && (
                    <div className="relative mb-6">
                      {/* Точка на таймлайне для отелей */}
                      <div className="absolute left-2 w-4 h-4 rounded-full border-2 border-white shadow-sm bg-green-500 flex items-center justify-center">
                        {selectedHotelsByDate[hotelDate] && (
                          <span className="text-white text-xs">✅</span>
                        )}
                      </div>
                      
                      {/* Дата отелей */}
                      <div className="ml-8 mb-3">
                        <div className="text-sm font-medium text-gray-700">
                          🏨 Размещение для {formatDate(hotelDate)}
                        </div>
                      </div>
                      
                      {/* Отели */}
                      <div className="ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockHotels.filter(hotel => shouldShowHotel(hotel.id, hotelDate)).map((hotel) => (
                          <div 
                            key={hotel.id} 
                            className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300 ease-in-out ${
                              fadingHotels.has(hotel.id) 
                                ? 'opacity-0 transform scale-95 -translate-y-2' 
                                : 'opacity-100 transform scale-100 translate-y-0'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                                  <div>
                                    <span className="font-medium">Цена:</span>
                                    <div className="text-green-600 font-semibold">{hotel.priceRange}</div>
                                  </div>
                                  <div>
                                    <span className="font-medium">Рейтинг:</span>
                                    <div>⭐ {hotel.rating}</div>
                                  </div>
                                  <div>
                                    <span className="font-medium">Эко-рейтинг:</span>
                                    <div>🌱 {hotel.ecoRating}</div>
                                  </div>
                                  <div>
                                    <span className="font-medium">Отзывы:</span>
                                    <div>{hotel.reviews}</div>
                                  </div>
                                </div>
                                
                                <div className="text-sm text-gray-600 mb-3">
                                  <div className="font-medium mb-1">📍 {hotel.location}</div>
                                  <div className="text-gray-500">{hotel.description}</div>
                                </div>
                                
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {hotel.amenities.map((amenity, index) => (
                                    <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                      {amenity}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex flex-col gap-2">
                                {/* Кнопка выбора в верхнем правом углу */}
                                {[101, 102].includes(hotel.id) && (
                                  <button 
                                    onClick={() => handleSelectHotelWithAnimation(hotel.id, hotelDate)}
                                    className={`px-2 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
                                      selectedHotelsByDate[hotelDate] === hotel.id
                                        ? 'bg-orange-500 text-white border border-orange-600'
                                        : 'bg-orange-100 text-orange-700 border border-orange-300 hover:bg-orange-200'
                                    }`}
                                  >
                                    {selectedHotelsByDate[hotelDate] === hotel.id ? '✅ Выбрано' : '🏨 Выбрать'}
                                  </button>
                                )}
                                
                                {/* Остальные кнопки под кнопкой выбора */}
                                {(!hotelBookingStatus[hotel.id] || hotelBookingStatus[hotel.id] === 'available') && (
                                  <button 
                                    onClick={() => handleBookHotel(hotel.id)}
                                    className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                                  >
                                    🏨 Забронировать
                                  </button>
                                )}
                                
                                {hotelBookingStatus[hotel.id] === 'booking' && (
                                  <button 
                                    className="px-3 py-1 text-xs font-medium bg-yellow-500 text-white rounded transition-colors duration-200"
                                    disabled
                                  >
                                    ⏳ Бронируем...
                                  </button>
                                )}
                                
                                {hotelBookingStatus[hotel.id] === 'checkin' && (
                                  <button 
                                    onClick={() => showQRCode(hotel.id)}
                                    className="px-3 py-1 text-xs font-medium bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
                                  >
                                    ✅ Check-in
                                  </button>
                                )}
                                
                                <button 
                                  className="px-3 py-1 text-xs font-medium border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors duration-200"
                                >
                                  ℹ️ Подробнее
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Дата туров */}
                  <div className="ml-8 mb-3">
                    <div className="text-sm font-medium text-gray-700">
                      🎯 {formatDate(date)}
                    </div>
                  </div>
                  
                  {/* Конкурирующие туры в горизонтальном расположении */}
                  <div className="ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredToursForDate.map((tour, tourIndex) => (
                      <div key={tour.id} className="relative">
                        {/* Галочка посередине напротив карточки */}
                        {bookingStatus[tour.id] === 'confirmed' && (
                          <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                              <span className="text-white text-xs">✅</span>
                            </div>
                          </div>
                        )}
                        
                        <div 
                          className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300 ease-in-out ${
                            fadingTours.has(tour.id) 
                              ? 'opacity-0 transform scale-95 -translate-y-2' 
                              : 'opacity-100 transform scale-100 translate-y-0'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 pr-6">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-gray-900">{tour.title}</h4>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-600 mb-4">
                                <div className="space-y-1">
                                  <div className="font-medium text-xs text-gray-500">Продолжительность:</div>
                                  <div className="text-sm">{tour.duration}</div>
                                </div>
                                <div className="space-y-1">
                                  <div className="font-medium text-xs text-gray-500">Цена:</div>
                                  <div className="text-sm text-green-600 font-semibold">{formatPrice(tour.price)} ₸</div>
                                </div>
                                <div className="space-y-1">
                                  <div className="font-medium text-xs text-gray-500">Участники:</div>
                                  <div className="text-sm">{tour.currentParticipants}/{tour.maxParticipants}</div>
                                </div>
                                <div className="space-y-1">
                                  <div className="font-medium text-xs text-gray-500">Рейтинг:</div>
                                  <div className="text-sm">⭐ {tour.rating}</div>
                                </div>
                              </div>
                              
                              {tour.guide && (
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                  <img 
                                    src={tour.guide.avatar} 
                                    alt={tour.guide.name}
                                    className="w-6 h-6 rounded-full"
                                  />
                                  <span>Гид: {tour.guide.name}</span>
                                  <span>⭐ {tour.guide.rating}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-col gap-3 min-w-fit">
                              {/* Кнопка выбора в верхнем правом углу */}
                              {[1, 2].includes(tour.id) && (
                                <button 
                                  onClick={() => handleSelectCompetingTourWithAnimation(tour.id)}
                                  className={`px-2 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
                                    selectedCompetingTours.has(tour.id)
                                      ? 'bg-orange-500 text-white border border-orange-600'
                                      : 'bg-orange-100 text-orange-700 border border-orange-300 hover:bg-orange-200'
                                  }`}
                                >
                                  {selectedCompetingTours.has(tour.id) ? '✅ Выбрано' : '🎯 Выбрать'}
                                </button>
                              )}
                              {[3, 4].includes(tour.id) && (
                                <button 
                                  onClick={() => handleSelectCompetingTourWithAnimation(tour.id)}
                                  className={`px-2 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
                                    selectedCompetingTours.has(tour.id)
                                      ? 'bg-purple-500 text-white border border-purple-600'
                                      : 'bg-purple-100 text-purple-700 border border-purple-300 hover:bg-purple-200'
                                  }`}
                                >
                                  {selectedCompetingTours.has(tour.id) ? '✅ Выбрано' : '🎯 Выбрать'}
                                </button>
                              )}
                              {[5, 6].includes(tour.id) && (
                                <button 
                                  onClick={() => handleSelectCompetingTourWithAnimation(tour.id)}
                                  className={`px-2 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
                                    selectedCompetingTours.has(tour.id)
                                      ? 'bg-green-500 text-white border border-green-600'
                                      : 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200'
                                  }`}
                                >
                                  {selectedCompetingTours.has(tour.id) ? '✅ Выбрано' : '🎯 Выбрать'}
                                </button>
                              )}
                              
                              {/* Кнопка бронирования/статуса */}
                              {(!bookingStatus[tour.id] || bookingStatus[tour.id] === 'available') && (
                                <button 
                                  onClick={() => handleBookTour(tour.id)}
                                  className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                                >
                                  📅 Забронировать
                                </button>
                              )}
                              
                              {bookingStatus[tour.id] === 'booking' && (
                                <button 
                                  className="px-3 py-1 text-xs font-medium bg-yellow-500 text-white rounded transition-colors duration-200"
                                  disabled
                                >
                                  ⏳ Бронируем...
                                </button>
                              )}
                              
                              {bookingStatus[tour.id] === 'waiting' && (
                                <button 
                                  className="px-3 py-1 text-xs font-medium bg-purple-600 text-white rounded transition-colors duration-200"
                                  disabled
                                >
                                  🎫 Ждем подтверждения
                                </button>
                              )}
                              
                              {bookingStatus[tour.id] === 'confirmed' && (
                                <button 
                                  onClick={() => handleStartTour(tour.id)}
                                  className="px-3 py-1 text-xs font-medium bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
                                >
                                  🚀 Начать тур
                                </button>
                              )}
                              
                              {/* Дополнительная информация */}
                              <div className="mt-4 pt-3 border-t border-gray-100">
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <span>🌱 Эко-рейтинг: {tour.ecoRating}</span>
                                  <span>⭐ {tour.rating} ({tour.reviews} отзывов)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          {timelineDates.every(date => {
            const toursForDate = groupedTours[date];
            const filteredToursForDate = toursForDate.filter(tour => {
              if (timelineFilter === 'all') return shouldShowTour(tour);
              return getTourStatus(tour.id) === timelineFilter && shouldShowTour(tour);
            });
            return filteredToursForDate.length === 0;
          }) && (
            <div className="ml-8 p-4 text-center text-gray-500">
              Нет туров для отображения с выбранным фильтром
            </div>
          )}
        </div>
        
        {/* Кнопка "Забронировать все" */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              console.log('🎯 Начинаем массовое бронирование...');
              
              // Бронируем все доступные туры с задержкой
              const availableTours = displayResults.filter(tour => 
                !bookingStatus[tour.id] || bookingStatus[tour.id] === 'available'
              );
              
              availableTours.forEach((tour, index) => {
                setTimeout(() => {
                  console.log(`🎫 Бронируем тур ${tour.id} (${index + 1}/${availableTours.length})`);
                  handleBookTour(tour.id);
                }, index * 500); // Задержка 500мс между каждым туром
              });
              
              // Бронируем все выбранные отели с задержкой
              const selectedHotels = Object.entries(selectedHotelsByDate).filter(([date, hotelId]) => 
                !hotelBookingStatus[hotelId] || hotelBookingStatus[hotelId] === 'available'
              );
              
              selectedHotels.forEach(([date, hotelId], index) => {
                setTimeout(() => {
                  console.log(`🏨 Бронируем отель ${hotelId} (${index + 1}/${selectedHotels.length})`);
                  handleBookHotel(hotelId);
                }, (availableTours.length + index) * 500); // Задержка после всех туров
              });
              
              const totalItems = availableTours.length + selectedHotels.length;
              console.log(`📊 Всего элементов для бронирования: ${totalItems}`);
              
              // Показываем уведомление через некоторое время
              setTimeout(() => {
                alert(`🎉 Бронирование запущено!\n\nТуры: ${availableTours.length}\nОтели: ${selectedHotels.length}\n\nПроверьте статус бронирования через несколько секунд.`);
              }, 1000);
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            🎯 Забронировать все туры и отели
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Бронирует все доступные туры и выбранные отели с задержкой
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Заголовок результатов */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">
          Найдено туров: {displayResults.length}
        </h3>
        {searchQuery && (
          <div className="text-sm text-gray-600">
            По запросу: "{searchQuery}"
          </div>
        )}
      </div>

      {/* Список результатов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Отладочная информация о состоянии */}
        <div className="col-span-full p-2 bg-gray-100 rounded text-xs">
          🔍 Состояние: selectedTour = {selectedTour}, результатов = {displayResults.length}
          <br />
          ✅ Подтвержденные туры: {Array.from(confirmedTours).join(', ')}
          <br />
          ⏳ Ожидающие подтверждения: {Array.from(pendingConfirmations).join(', ')}
          <br />
          🎫 Забронированные туры: {Array.from(bookedTours).join(', ')}
          <br />
          🏆 Выбранные конкурирующие туры: {Array.from(selectedCompetingTours).join(', ')}
          <br />
          📊 Всего туров в mockResults: {mockResults.length}
          <br />
          🆔 ID туров: {displayResults.map(r => r.id).join(', ')}
        </div>
        
        {/* Таймлайн туров */}
        <TimelineView tours={displayResults} />
        
        {/* Карта маршрута */}
        {selectedTour && (
          <div className="col-span-full">
            <RouteMap 
              startPoint="Алматы"
              endPoint="Чолпон-Ата"
              waypoints={[
                { id: '1', name: 'Бишкек', description: 'Столица Кыргызстана', coordinates: [42.8746, 74.5698], type: 'waypoint' },
                { id: '2', name: 'Балыкчи', description: 'Город на берегу озера', coordinates: [42.4608, 76.1872], type: 'waypoint' }
              ]}
              startDate="2024-08-15"
              endDate="2024-08-20"
              duration="5 дней"
            />
          </div>
        )}
        
        {/* Отладочная информация */}
        {selectedTour !== null && (
          <div className="col-span-full border-t border-gray-200 p-2 bg-red-50 text-xs text-red-700">
            🔍 Отладка: selectedTour = {selectedTour}
          </div>
        )}
      </div>

      {/* Модальные окна для QR-кодов отелей */}
      {Object.entries(showQRModal).map(([hotelId, isVisible]) => {
        if (!isVisible) return null;
        const hotel = mockHotels.find(h => h.id === parseInt(hotelId));
        const qrCode = hotelQRCodes[parseInt(hotelId)];
        
        return (
          <div key={hotelId} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  QR-код для заселения
                </h3>
                <button
                  onClick={() => setShowQRModal(prev => ({ ...prev, [hotelId]: false }))}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              {hotel && (
                <div className="text-center">
                  <h4 className="text-md font-medium text-gray-800 mb-2">
                    {hotel.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Предъявите этот QR-код на ресепшене
                  </p>
                  
                  {qrCode ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={qrCode} 
                        alt="QR-код для заселения" 
                        className="w-48 h-48 border-2 border-gray-200 rounded-lg"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Сгенерирован: {new Date().toLocaleString('ru-RU')}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-48">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-2 text-gray-600">Генерация QR-кода...</span>
                    </div>
                  )}
                  
                  <div className="mt-4 text-xs text-gray-500">
                    <p>• QR-код содержит информацию о бронировании</p>
                    <p>• Действителен только для данного отеля</p>
                    <p>• Покажите на ресепшене для заселения</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
} 