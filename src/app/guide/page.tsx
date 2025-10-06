'use client';

import React, { useState } from 'react';
import { UserIcon, BriefcaseIcon, CalendarIcon, CurrencyDollarIcon, ChartBarIcon, AcademicCapIcon, ChatBubbleLeftIcon, Cog6ToothIcon, StarIcon, XMarkIcon, PlusIcon, PencilIcon, EyeIcon, MapIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  instructor: string;
  status: 'enrolled' | 'completed' | 'available';
  progress: number;
  completionDate: string | null;
}

export default function GuideDashboard() {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  const menuItems = [
    {
      id: 'profile',
      title: t.profile,
      icon: UserIcon,
      items: [
        { name: t.personalData, action: 'edit-profile' },
        { name: t.verification, action: 'verification' },
        { name: t.ecoGuideStatus, action: 'eco-status' },
        { name: t.portfolio, action: 'portfolio' }
      ]
    },
    {
      id: 'tours',
      title: t.myTours,
      icon: BriefcaseIcon,
      items: [
        { name: t.createTour, action: 'create-tour' },
        { name: t.editTours, action: 'edit-tours' },
        { name: t.calendar, action: 'calendar' },
        { name: t.statistics, action: 'statistics' }
      ]
    },
    {
      id: 'bookings',
      title: t.bookings,
      icon: CalendarIcon,
      items: [
        { name: t.currentBookings, action: 'current-bookings' },
        { name: t.completedBookings, action: 'completed-bookings' },
        { name: t.chatWithTourists, action: 'chat' },
        { name: t.emergencyContact, action: 'emergency' }
      ]
    },
    {
      id: 'finance',
      title: t.finance,
      icon: CurrencyDollarIcon,
      items: [
        { name: t.balance, action: 'balance' },
        { name: t.paymentHistory, action: 'payment-history' },
        { name: t.paymentMethods, action: 'payment-methods' },
        { name: t.taxReports, action: 'tax-reports' }
      ]
    },
    {
      id: 'analytics',
      title: t.analytics,
      icon: ChartBarIcon,
      items: [
        { name: t.tourPopularity, action: 'tour-popularity' },
        { name: t.ratings, action: 'ratings' },
        { name: t.recommendations, action: 'recommendations' }
      ]
    },
    {
      id: 'education',
      title: t.education,
      icon: AcademicCapIcon,
      items: [
        { name: t.courses, action: 'courses' },
        { name: t.guides, action: 'guides' },
        { name: t.materials, action: 'materials' }
      ]
    },
    {
      id: 'support',
      title: t.support,
      icon: ChatBubbleLeftIcon,
      items: [
        { name: t.supportChat, action: 'support-chat' },
        { name: t.faq, action: 'faq' }
      ]
    },
    {
      id: 'settings',
      title: t.settings,
      icon: Cog6ToothIcon,
      items: [
        { name: t.notifications, action: 'notifications' },
        { name: t.privacy, action: 'privacy' }
      ]
    },
    {
      id: 'eco-rating',
      title: t.ecoRating,
      icon: StarIcon,
      items: [
        { name: t.ecoPoints, action: 'eco-points' },
        { name: t.ecoBadges, action: 'eco-badges' },
        { name: t.co2Calculator, action: 'co2-calculator' }
      ]
    }
  ];

  // Mock data with bilingual support
  const mockData = {
    profile: {
      name: language === 'ru' ? 'Анна Петрова' : 'Anna Petrova',
      email: 'anna.petrova@example.com',
      phone: '+7 (999) 123-45-67',
      experience: language === 'ru' ? '5 лет' : '5 years',
      ecoStatus: 'EcoGuide Gold',
      rating: 4.8,
      toursCompleted: 127
    },
    tours: [
      { 
        id: 1, 
        name: language === 'ru' ? 'Экотропа "Лесные тропинки"' : 'Eco Trail "Forest Paths"', 
        status: 'active', 
        bookings: 15, 
        rating: 4.9 
      },
      { 
        id: 2, 
        name: language === 'ru' ? 'Велосипедный тур по паркам' : 'Bicycle Tour in Parks', 
        status: 'active', 
        bookings: 8, 
        rating: 4.7 
      },
      { 
        id: 3, 
        name: language === 'ru' ? 'Сплав по реке' : 'River Rafting', 
        status: 'draft', 
        bookings: 0, 
        rating: 0 
      }
    ],
    bookings: [
      { 
        id: 1, 
        tourist: language === 'ru' ? 'Иван Смирнов' : 'Ivan Smirnov', 
        tour: language === 'ru' ? 'Экотропа "Лесные тропинки"' : 'Eco Trail "Forest Paths"', 
        date: '2024-01-15', 
        status: 'confirmed' 
      },
      { 
        id: 2, 
        tourist: language === 'ru' ? 'Мария Козлова' : 'Maria Kozlova', 
        tour: language === 'ru' ? 'Велосипедный тур по паркам' : 'Bicycle Tour in Parks', 
        date: '2024-01-16', 
        status: 'pending' 
      }
    ],
    finance: {
      balance: 45000,
      thisMonth: 12500,
      totalEarnings: 234000
    }
  };

  const [activeSection, setActiveSection] = useState('profile');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  // const [showStatModal, setShowStatModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Состояния для создания тура
  const [tourCreationStep, setTourCreationStep] = useState<'basic' | 'points' | 'photos' | 'route' | 'finish'>('basic');
  const [tourPoints, setTourPoints] = useState<Array<{id: string, name: string, lat: number, lng: number, description: string, type: 'start' | 'checkpoint' | 'end'}>>([]);
  const [tourPhotos, setTourPhotos] = useState<Array<{id: string, url: string, description: string, pointId?: string}>>([]);
  const [autoRouteEnabled, setAutoRouteEnabled] = useState(false);

  // Моковые данные курсов для гидов
  const mockCourses: Course[] = [
    {
      id: 1,
      title: t.courseBasicEcoTourism,
      description: t.courseBasicEcoTourismDesc,
      duration: '40 часов',
      level: t.beginner,
      instructor: t.instructorAigul,
      status: 'enrolled',
      progress: 75,
      completionDate: '2024-12-15'
    },
    {
      id: 2,
      title: t.courseEcoSafety,
      description: t.courseEcoSafetyDesc,
      duration: '60 часов',
      level: t.advanced,
      instructor: t.instructorMarat,
      status: 'completed',
      progress: 100,
      completionDate: '2024-10-20'
    },
    {
      id: 3,
      title: t.courseSustainableDevelopment,
      description: t.courseSustainableDevelopmentDesc,
      duration: '50 часов',
      level: t.intermediate,
      instructor: t.instructorAnna,
      status: 'available',
      progress: 0,
      completionDate: null
    },
    {
      id: 4,
      title: t.courseWildlifeConservation,
      description: t.courseWildlifeConservationDesc,
      duration: '45 часов',
      level: t.intermediate,
      instructor: t.instructorDmitry,
      status: 'available',
      progress: 0,
      completionDate: null
    },
    {
      id: 5,
      title: t.courseCulturalHeritage,
      description: t.courseCulturalHeritageDesc,
      duration: '35 часов',
      level: t.beginner,
      instructor: t.instructorElena,
      status: 'enrolled',
      progress: 30,
      completionDate: null
    },
    {
      id: 6,
      title: t.courseFirstAidWilderness,
      description: t.courseFirstAidWildernessDesc,
      duration: '25 часов',
      level: t.beginner,
      instructor: t.instructorSergey,
      status: 'available',
      progress: 0,
      completionDate: null
    },
    {
      id: 7,
      title: t.coursePhotographyNature,
      description: t.coursePhotographyNatureDesc,
      duration: '30 часов',
      level: t.intermediate,
      instructor: t.instructorOlga,
      status: 'completed',
      progress: 100,
      completionDate: '2024-09-15'
    },
    {
      id: 8,
      title: t.courseLocalCuisine,
      description: t.courseLocalCuisineDesc,
      duration: '20 часов',
      level: t.beginner,
      instructor: t.instructorMarina,
      status: 'available',
      progress: 0,
      completionDate: null
    }
  ];
  
  // Состояние для управления курсами
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalType, setModalType] = useState<'enroll' | 'continue' | 'certificate' | 'view' | null>(null);

  // Рекомендованные курсы с преимуществами
  const recommendedCourses = [
    {
      id: 101,
      title: language === 'ru' ? '🎯 Продвинутый маркетинг для гидов' : '🎯 Advanced Marketing for Guides',
      description: language === 'ru' ? 'Изучите современные методы продвижения туров в социальных сетях и цифровом маркетинге' : 'Learn modern methods of promoting tours in social media and digital marketing',
      duration: '30 часов',
      level: language === 'ru' ? 'Продвинутый' : 'Advanced',
      instructor: language === 'ru' ? 'Эксперт по маркетингу' : 'Marketing Expert',
      benefits: [
        language === 'ru' ? '📈 Увеличение бронирований на 40%' : '📈 40% increase in bookings',
        language === 'ru' ? '💰 Рост дохода на 25%' : '💰 25% revenue growth',
        language === 'ru' ? '🌟 Повышение рейтинга' : '🌟 Rating improvement',
        language === 'ru' ? '🎯 Привлечение новых клиентов' : '🎯 New customer acquisition'
      ],
      price: language === 'ru' ? '150 🌱 AirCoin' : '150 🌱 AirCoin',
      rating: 4.9,
      students: 1247
    },
    {
      id: 102,
      title: language === 'ru' ? '📸 Профессиональная фотография в туризме' : '📸 Professional Tourism Photography',
      description: language === 'ru' ? 'Освойте навыки создания привлекательных фотографий для продвижения туров' : 'Master skills for creating attractive photos for tour promotion',
      duration: '25 часов',
      level: language === 'ru' ? 'Средний' : 'Intermediate',
      instructor: language === 'ru' ? 'Профессиональный фотограф' : 'Professional Photographer',
      benefits: [
        language === 'ru' ? '📱 Качественный контент для соцсетей' : '📱 Quality social media content',
        language === 'ru' ? '🎨 Уникальный визуальный стиль' : '🎨 Unique visual style',
        language === 'ru' ? '⭐ Повышение доверия клиентов' : '⭐ Increased customer trust',
        language === 'ru' ? '📊 Рост конверсии на 35%' : '📊 35% conversion growth'
      ],
      price: language === 'ru' ? '120 🌱 AirCoin' : '120 🌱 AirCoin',
      rating: 4.8,
      students: 892
    },
    {
      id: 103,
      title: language === 'ru' ? '🗣️ Мастерство публичных выступлений' : '🗣️ Public Speaking Mastery',
      description: language === 'ru' ? 'Развивайте навыки общения с группами туристов и проведения презентаций' : 'Develop skills for communicating with tourist groups and conducting presentations',
      duration: '20 часов',
      level: language === 'ru' ? 'Начальный' : 'Beginner',
      instructor: language === 'ru' ? 'Тренер по коммуникациям' : 'Communication Trainer',
      benefits: [
        language === 'ru' ? '🎤 Уверенность в общении' : '🎤 Communication confidence',
        language === 'ru' ? '👥 Лучшее взаимодействие с группами' : '👥 Better group interaction',
        language === 'ru' ? '⭐ Повышение оценок туристов' : '⭐ Higher tourist ratings',
        language === 'ru' ? '💼 Профессиональный рост' : '💼 Professional growth'
      ],
      price: language === 'ru' ? '80 🌱 AirCoin' : '80 🌱 AirCoin',
      rating: 4.7,
      students: 654
    },
    {
      id: 104,
      title: language === 'ru' ? '🌍 Культурная компетентность и этикет' : '🌍 Cultural Competence & Etiquette',
      description: language === 'ru' ? 'Изучите особенности различных культур и правила межкультурного общения' : 'Learn about different cultures and intercultural communication rules',
      duration: '35 часов',
      level: language === 'ru' ? 'Средний' : 'Intermediate',
      instructor: language === 'ru' ? 'Культуролог' : 'Cultural Expert',
      benefits: [
        language === 'ru' ? '🌐 Работа с международными туристами' : '🌐 Working with international tourists',
        language === 'ru' ? '🤝 Улучшение межкультурного понимания' : '🤝 Better intercultural understanding',
        language === 'ru' ? '⭐ Повышение качества обслуживания' : '⭐ Improved service quality',
        language === 'ru' ? '📈 Расширение клиентской базы' : '📈 Client base expansion'
      ],
      price: language === 'ru' ? '180 🌱 AirCoin' : '180 🌱 AirCoin',
      rating: 4.9,
      students: 423
    },
    {
      id: 105,
      title: language === 'ru' ? '💼 Управление бизнесом гида' : '💼 Guide Business Management',
      description: language === 'ru' ? 'Освойте основы ведения бизнеса, финансового планирования и управления клиентами' : 'Master business basics, financial planning and customer management',
      duration: '40 часов',
      level: language === 'ru' ? 'Продвинутый' : 'Advanced',
      instructor: language === 'ru' ? 'Бизнес-консультант' : 'Business Consultant',
      benefits: [
        language === 'ru' ? '💰 Оптимизация доходов' : '💰 Revenue optimization',
        language === 'ru' ? '📊 Эффективное планирование' : '📊 Effective planning',
        language === 'ru' ? '🎯 Стратегическое развитие' : '🎯 Strategic development',
        language === 'ru' ? '📈 Масштабирование бизнеса' : '📈 Business scaling'
      ],
      price: language === 'ru' ? '250 🌱 AirCoin' : '250 🌱 AirCoin',
      rating: 4.8,
      students: 567
    },
    {
      id: 106,
      title: language === 'ru' ? '🚨 Безопасность и первая помощь' : '🚨 Safety & First Aid',
      description: language === 'ru' ? 'Получите сертификацию по оказанию первой помощи и обеспечению безопасности туристов' : 'Get certified in first aid and tourist safety',
      duration: '15 часов',
      level: language === 'ru' ? 'Начальный' : 'Beginner',
      instructor: language === 'ru' ? 'Медицинский инструктор' : 'Medical Instructor',
      benefits: [
        language === 'ru' ? '🛡️ Обеспечение безопасности туристов' : '🛡️ Tourist safety assurance',
        language === 'ru' ? '📜 Официальная сертификация' : '📜 Official certification',
        language === 'ru' ? '⭐ Повышение доверия клиентов' : '⭐ Increased customer trust',
        language === 'ru' ? '💼 Расширение возможностей' : '💼 Expanded opportunities'
      ],
      price: language === 'ru' ? '100 🌱 AirCoin' : '100 🌱 AirCoin',
      rating: 4.9,
      students: 1123
    }
  ];

  const handleAction = (action: string) => {
    setSelectedAction(action);
    setShowModal(true);
    if (action === 'create-tour') {
      setTourCreationStep('basic');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAction(null);
    setTourCreationStep('basic');
    setTourPoints([]);
    setTourPhotos([]);
    setAutoRouteEnabled(false);
  };

  // Функции для работы с точками тура
  const addTourPoint = (point: {name: string, lat: number, lng: number, description: string, type: 'start' | 'checkpoint' | 'end'}) => {
    const newPoint = {
      id: Date.now().toString(),
      ...point
    };
    setTourPoints([...tourPoints, newPoint]);
  };

  const removeTourPoint = (pointId: string) => {
    setTourPoints(tourPoints.filter(point => point.id !== pointId));
  };

  const updateTourPoint = (pointId: string, updates: Partial<{name: string, lat: number, lng: number, description: string, type: 'start' | 'checkpoint' | 'end'}>) => {
    setTourPoints(tourPoints.map(point => 
      point.id === pointId ? { ...point, ...updates } : point
    ));
  };

  // Функции для работы с фотографиями тура
  const addTourPhoto = (photo: {url: string, description: string, pointId?: string}) => {
    const newPhoto = {
      id: Date.now().toString(),
      ...photo
    };
    setTourPhotos([...tourPhotos, newPhoto]);
  };

  const removeTourPhoto = (photoId: string) => {
    setTourPhotos(tourPhotos.filter(photo => photo.id !== photoId));
  };

  // Функция автоматического построения маршрута
  const generateAutoRoute = () => {
    if (tourPoints.length < 2) return;
    
    // Симуляция автоматического построения маршрута
    const sortedPoints = [...tourPoints].sort((a, b) => {
      if (a.type === 'start') return -1;
      if (b.type === 'start') return 1;
      if (a.type === 'end') return 1;
      if (b.type === 'end') return -1;
      return 0;
    });
    
    setTourPoints(sortedPoints);
    setAutoRouteEnabled(true);
  };

  // Функции для работы с курсами
  const handleCourseAction = (course: Course, action: 'enroll' | 'continue' | 'certificate' | 'view') => {
    setSelectedCourse(course);
    setModalType(action);
    setShowCourseModal(true);
  };

  const closeCourseModal = () => {
    setShowCourseModal(false);
    setSelectedCourse(null);
    setModalType(null);
  };

  const handleEnroll = () => {
    if (selectedCourse) {
      const updatedCourses = courses.map(course => 
        course.id === selectedCourse.id 
          ? { ...course, status: 'enrolled' as const, progress: 0 }
          : course
      );
      setCourses(updatedCourses);
      alert(t.courseEnrolledSuccessfully || 'Вы успешно записались на курс!');
      closeCourseModal();
    }
  };

  const handleContinue = () => {
    if (selectedCourse) {
      const newProgress = Math.min(selectedCourse.progress + 25, 100);
      const updatedCourses = courses.map(course => 
        course.id === selectedCourse.id 
          ? { 
              ...course, 
              progress: newProgress,
              status: newProgress === 100 ? 'completed' as const : 'enrolled' as const,
              completionDate: newProgress === 100 ? new Date().toISOString().split('T')[0] : course.completionDate
            }
          : course
      );
      setCourses(updatedCourses);
      alert(t.progressUpdated || 'Прогресс обновлен!');
      closeCourseModal();
    }
  };

  const handleViewCertificate = () => {
    alert(t.certificateDownloaded || 'Сертификат скачан!');
    closeCourseModal();
  };

  const handleViewCourse = () => {
    alert(t.courseDetailsOpened || 'Детали курса открыты!');
    closeCourseModal();
  };

  const renderContent = () => {
    const currentSection = menuItems.find(item => item.id === activeSection);
    
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-800">{mockData.profile.name}</h3>
                  <p className="text-green-600">{mockData.profile.ecoStatus}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t.email}</p>
                  <p className="text-green-800">{mockData.profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.phone}</p>
                  <p className="text-green-800">{mockData.profile.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.experience}</p>
                  <p className="text-green-800">{mockData.profile.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.rating}</p>
                  <p className="text-green-800">⭐ {mockData.profile.rating}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentSection?.items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleAction(item.action)}
                  className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-200 text-left"
                >
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-green-600">
                    {t.clickForDetails}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-8">
            {/* Рекомендованные курсы */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-green-800">
                  {language === 'ru' ? '⭐ Рекомендованные курсы' : '⭐ Recommended Courses'}
                </h3>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  {language === 'ru' ? '🔥 Популярно' : '🔥 Popular'}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCourses.map((course) => (
                  <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300 flex flex-col h-full relative">
                    {/* Бейдж популярности */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {language === 'ru' ? 'ТОП' : 'TOP'}
                    </div>
                    
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-green-800 pr-8">{course.title}</h4>
                    </div>
                    
                    <p className="text-gray-600 mb-4 flex-grow text-sm">{course.description}</p>
                    
                    {/* Преимущества курса */}
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-green-700 mb-2">
                        {language === 'ru' ? '🎯 Преимущества:' : '🎯 Benefits:'}
                      </h5>
                      <ul className="space-y-1">
                        {course.benefits.slice(0, 2).map((benefit, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-start">
                            <span className="text-green-500 mr-1">•</span>
                            {benefit}
                          </li>
                        ))}
                        {course.benefits.length > 2 && (
                          <li className="text-xs text-blue-600 font-medium">
                            +{course.benefits.length - 2} {language === 'ru' ? 'других преимуществ' : 'more benefits'}
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{t.duration}</span>
                        <span className="text-sm font-medium text-green-700">{course.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{t.level}</span>
                        <span className="text-sm font-medium text-blue-700">{course.level}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{language === 'ru' ? 'Стоимость' : 'Price'}</span>
                        <span className="text-lg font-bold text-green-600">{course.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{language === 'ru' ? 'Рейтинг' : 'Rating'}</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm font-medium">{course.rating}</span>
                          <span className="text-xs text-gray-500">({course.students})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 mt-auto">
                      <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-orange-600 font-medium transition-all duration-200 flex items-center justify-center space-x-2">
                        <AcademicCapIcon className="w-4 h-4" />
                        <span>{language === 'ru' ? 'Записаться' : 'Enroll'}</span>
                      </button>
                      <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 text-sm font-medium">
                        {language === 'ru' ? 'Подробнее' : 'Learn More'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Мои курсы */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-green-800">
                  {language === 'ru' ? '📚 Мои курсы' : '📚 My Courses'}
                </h3>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium">
                  {courses.filter(c => c.status === 'enrolled' || c.status === 'completed').length} {language === 'ru' ? 'активных' : 'active'}
                </div>
            </div>
            
                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {courses.map((course) => (
                 <div key={course.id} className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-green-800">{course.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      course.status === 'completed' ? 'bg-green-100 text-green-800' :
                      course.status === 'enrolled' ? 'bg-blue-100 text-blue-800' :
                      course.status === 'available' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {course.status === 'completed' ? t.completed :
                       course.status === 'enrolled' ? t.inProgress :
                       course.status === 'available' ? t.available :
                       t.pending}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow">{course.description}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600"><strong>{t.duration}:</strong> {course.duration}</p>
                    <p className="text-sm text-gray-600"><strong>{t.level}:</strong> {course.level}</p>
                    <p className="text-sm text-gray-600"><strong>{t.instructor}:</strong> {course.instructor}</p>
                    {course.status === 'enrolled' && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>{t.progress}</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    )}
                    {course.status === 'completed' && course.completionDate && (
                      <p className="text-sm text-green-600">
                        <strong>{t.completed}:</strong> {new Date(course.completionDate).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    {course.status === 'available' && (
                      <button 
                        onClick={() => handleCourseAction(course, 'enroll')}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 min-h-[40px]"
                      >
                        <AcademicCapIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{t.enroll}</span>
                      </button>
                    )}
                    {course.status === 'enrolled' && (
                      <button 
                        onClick={() => handleCourseAction(course, 'continue')}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 min-h-[40px]"
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{t.continue}</span>
                      </button>
                    )}
                    {course.status === 'completed' && (
                      <button 
                        onClick={() => handleCourseAction(course, 'certificate')}
                        className="flex-1 bg-green-100 text-green-800 py-2 px-4 rounded-lg hover:bg-green-200 flex items-center justify-center space-x-2 min-h-[40px]"
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{t.viewCertificate}</span>
                      </button>
                    )}
                    <button 
                      onClick={() => handleCourseAction(course, 'view')}
                      className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-2 min-h-[40px]"
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{t.view}</span>
                    </button>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        );

      case 'tours':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-green-800">{t.myTours}</h3>
              <button
                onClick={() => handleAction('create-tour')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <PlusIcon className="w-5 h-5" />
                <span>{t.createTour}</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.tours.map((tour) => (
                <div key={tour.id} className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-green-800">{tour.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tour.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tour.status === 'active' ? t.active : t.draft}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">{t.bookings}: {tour.bookings}</p>
                    <p className="text-sm text-gray-600">{t.rating}: ⭐ {tour.rating}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-100 text-green-800 py-2 rounded-lg hover:bg-green-200 flex items-center justify-center space-x-1">
                      <EyeIcon className="w-4 h-4" />
                      <span>{t.view}</span>
                    </button>
                    <button className="flex-1 bg-blue-100 text-blue-800 py-2 rounded-lg hover:bg-blue-200 flex items-center justify-center space-x-1">
                      <PencilIcon className="w-4 h-4" />
                      <span>{t.edit}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-800 mb-4">{t.currentBookings}</h3>
              <div className="space-y-4">
                {mockData.bookings.map((booking) => (
                  <div key={booking.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
                      <div>
                        <p className="font-semibold text-green-800">{booking.tourist}</p>
                        <p className="text-sm text-gray-600">{booking.tour}</p>
                        <p className="text-sm text-gray-500">{booking.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status === 'confirmed' ? t.confirmed : t.pending}
                        </span>
                        <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm">
                          {t.chat}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentSection?.items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleAction(item.action)}
                  className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-200 text-left"
                >
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-green-600">
                    {t.clickForDetails}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            {/* Общая статистика */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {language === 'ru' ? 'Общий рейтинг' : 'Overall Rating'}
                </h3>
                <p className="text-3xl font-bold text-green-600">⭐ {mockData.profile.rating}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'ru' ? 'На основе 127 отзывов' : 'Based on 127 reviews'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {language === 'ru' ? 'Завершенные туры' : 'Completed Tours'}
                </h3>
                <p className="text-3xl font-bold text-green-600">{mockData.profile.toursCompleted}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'ru' ? 'За все время' : 'All time'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {language === 'ru' ? 'Активные туры' : 'Active Tours'}
                </h3>
                <p className="text-3xl font-bold text-green-600">{mockData.tours.filter(tour => tour.status === 'active').length}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'ru' ? 'Доступно для бронирования' : 'Available for booking'}
                </p>
              </div>
            </div>

            {/* Детальная аналитика */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Популярность туров */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <ChartBarIcon className="w-6 h-6 mr-2" />
                  {t.tourPopularity}
                </h3>
                <div className="space-y-4">
                  {mockData.tours.map((tour) => (
                    <div key={tour.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-green-800">{tour.name}</h4>
                        <span className="text-sm text-gray-600">{tour.bookings} {language === 'ru' ? 'бронирований' : 'bookings'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(tour.bookings / 20) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{language === 'ru' ? 'Популярность' : 'Popularity'}</span>
                        <span>{Math.round((tour.bookings / 20) * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Рейтинги */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <StarIcon className="w-6 h-6 mr-2" />
                  {t.ratings}
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">⭐ {mockData.profile.rating}</div>
                    <p className="text-gray-600">{language === 'ru' ? 'Средний рейтинг' : 'Average Rating'}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center space-x-2">
                        <span className="text-sm w-8">{star}⭐</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ 
                              width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 8 : star === 2 ? 1 : 1}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {star === 5 ? 89 : star === 4 ? 25 : star === 3 ? 10 : star === 2 ? 1 : 1}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-700">
                      {language === 'ru' 
                        ? '🎉 Отличная работа! Ваш рейтинг выше среднего по платформе.'
                        : '🎉 Great job! Your rating is above the platform average.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Рекомендации */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100 md:col-span-2">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <ChartBarIcon className="w-6 h-6 mr-2" />
                  {t.recommendations}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      {language === 'ru' ? '📈 Увеличить доходы' : '📈 Increase Revenue'}
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• {language === 'ru' ? 'Добавить вечерние туры (+15% к доходу)' : 'Add evening tours (+15% revenue)'}</li>
                      <li>• {language === 'ru' ? 'Создать VIP пакеты' : 'Create VIP packages'}</li>
                      <li>• {language === 'ru' ? 'Предложить фотосессии' : 'Offer photo sessions'}</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      {language === 'ru' ? '🌟 Улучшить рейтинг' : '🌟 Improve Rating'}
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• {language === 'ru' ? 'Добавить интерактивные элементы' : 'Add interactive elements'}</li>
                      <li>• {language === 'ru' ? 'Улучшить качество фото' : 'Improve photo quality'}</li>
                      <li>• {language === 'ru' ? 'Предоставить сувениры' : 'Provide souvenirs'}</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">
                      {language === 'ru' ? '🎯 Расширить аудиторию' : '🎯 Expand Audience'}
                    </h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• {language === 'ru' ? 'Создать семейные туры' : 'Create family tours'}</li>
                      <li>• {language === 'ru' ? 'Добавить детские программы' : 'Add children programs'}</li>
                      <li>• {language === 'ru' ? 'Разработать корпоративные туры' : 'Develop corporate tours'}</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">
                      {language === 'ru' ? '📅 Оптимизировать расписание' : '📅 Optimize Schedule'}
                    </h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• {language === 'ru' ? 'Пик спроса: выходные дни' : 'Peak demand: weekends'}</li>
                      <li>• {language === 'ru' ? 'Лучшее время: 10:00-14:00' : 'Best time: 10:00-14:00'}</li>
                      <li>• {language === 'ru' ? 'Сезонность: май-сентябрь' : 'Seasonality: May-September'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6">
            {/* Быстрая помощь */}
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <ChatBubbleLeftIcon className="w-6 h-6 mr-2" />
                {language === 'ru' ? '🚨 Быстрая помощь' : '🚨 Quick Help'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">
                    {language === 'ru' ? '📞 Экстренная связь' : '📞 Emergency Contact'}
                  </h4>
                  <p className="text-red-700 text-sm mb-3">
                    {language === 'ru' ? 'Для срочных вопросов и экстренных ситуаций' : 'For urgent questions and emergency situations'}
                  </p>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium">
                    {language === 'ru' ? 'Позвонить сейчас' : 'Call Now'}
                  </button>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {language === 'ru' ? '💬 Онлайн чат' : '💬 Online Chat'}
                  </h4>
                  <p className="text-blue-700 text-sm mb-3">
                    {language === 'ru' ? 'Среднее время ответа: 5 минут' : 'Average response time: 5 minutes'}
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
                    {language === 'ru' ? 'Начать чат' : 'Start Chat'}
                  </button>
                </div>
              </div>
            </div>

            {/* Основные функции поддержки */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Поддержка в чате */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <ChatBubbleLeftIcon className="w-6 h-6 mr-2" />
                  {t.supportChat}
                </h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      {language === 'ru' ? '📋 Доступные темы:' : '📋 Available Topics:'}
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• {language === 'ru' ? 'Техническая поддержка' : 'Technical Support'}</li>
                      <li>• {language === 'ru' ? 'Вопросы по бронированию' : 'Booking Questions'}</li>
                      <li>• {language === 'ru' ? 'Проблемы с оплатой' : 'Payment Issues'}</li>
                      <li>• {language === 'ru' ? 'Обучение и сертификация' : 'Training & Certification'}</li>
                      <li>• {language === 'ru' ? 'Маркетинг и продвижение' : 'Marketing & Promotion'}</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      {language === 'ru' ? '⏰ Время работы:' : '⏰ Working Hours:'}
                    </h4>
                    <p className="text-blue-700 text-sm">
                      {language === 'ru' ? 'Пн-Пт: 9:00-18:00 (GMT+6)' : 'Mon-Fri: 9:00-18:00 (GMT+6)'}
                    </p>
                    <p className="text-blue-700 text-sm">
                      {language === 'ru' ? 'Сб-Вс: 10:00-16:00 (GMT+6)' : 'Sat-Sun: 10:00-16:00 (GMT+6)'}
                    </p>
                  </div>
                  
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium">
                    {language === 'ru' ? '💬 Начать чат с поддержкой' : '💬 Start Support Chat'}
                  </button>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <ChatBubbleLeftIcon className="w-6 h-6 mr-2" />
                  {t.faq}
                </h3>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="border-b border-gray-100 pb-3">
                      <h4 className="font-medium text-green-800 mb-1">
                        {language === 'ru' ? 'Как создать новый тур?' : 'How to create a new tour?'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === 'ru' ? 'Перейдите в раздел "Мои туры" → "Создать тур"' : 'Go to "My Tours" → "Create Tour"'}
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-100 pb-3">
                      <h4 className="font-medium text-green-800 mb-1">
                        {language === 'ru' ? 'Как получить сертификацию?' : 'How to get certification?'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === 'ru' ? 'Пройдите курсы в разделе "Образование"' : 'Complete courses in "Education" section'}
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-100 pb-3">
                      <h4 className="font-medium text-green-800 mb-1">
                        {language === 'ru' ? 'Как повысить рейтинг?' : 'How to improve rating?'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === 'ru' ? 'Смотрите рекомендации в разделе "Аналитика"' : 'Check recommendations in "Analytics" section'}
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-100 pb-3">
                      <h4 className="font-medium text-green-800 mb-1">
                        {language === 'ru' ? 'Как вывести средства?' : 'How to withdraw funds?'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === 'ru' ? 'В разделе "Финансы" → "Способы оплаты"' : 'In "Finance" → "Payment Methods"'}
                      </p>
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium">
                    {language === 'ru' ? '📚 Показать все FAQ' : '📚 Show All FAQ'}
                  </button>
                </div>
              </div>
            </div>

            {/* Дополнительные ресурсы */}
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                {language === 'ru' ? '📚 Дополнительные ресурсы' : '📚 Additional Resources'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">
                    {language === 'ru' ? '📖 Руководство гида' : '📖 Guide Manual'}
                  </h4>
                  <p className="text-purple-700 text-sm mb-3">
                    {language === 'ru' ? 'Полное руководство по работе с платформой' : 'Complete platform usage guide'}
                  </p>
                  <button className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 text-sm">
                    {language === 'ru' ? 'Открыть' : 'Open'}
                  </button>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">
                    {language === 'ru' ? '🎥 Видеоуроки' : '🎥 Video Tutorials'}
                  </h4>
                  <p className="text-orange-700 text-sm mb-3">
                    {language === 'ru' ? 'Пошаговые видеоинструкции' : 'Step-by-step video instructions'}
                  </p>
                  <button className="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 text-sm">
                    {language === 'ru' ? 'Смотреть' : 'Watch'}
                  </button>
                </div>
                
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                  <h4 className="font-semibold text-teal-800 mb-2">
                    {language === 'ru' ? '👥 Сообщество' : '👥 Community'}
                  </h4>
                  <p className="text-teal-700 text-sm mb-3">
                    {language === 'ru' ? 'Форум гидов и обмен опытом' : 'Guides forum and experience sharing'}
                  </p>
                  <button className="bg-teal-600 text-white px-3 py-2 rounded-lg hover:bg-teal-700 text-sm">
                    {language === 'ru' ? 'Присоединиться' : 'Join'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'finance':
        return (
          <div className="space-y-6">
            {/* Финансовая статистика в AirCoin */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <span className="mr-2">🌱</span>
                  {language === 'ru' ? 'Баланс AirCoin' : 'AirCoin Balance'}
                </h3>
                <p className="text-3xl font-bold text-green-600">2,847 🌱</p>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'ru' ? 'Доступно для вывода' : 'Available for withdrawal'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <span className="mr-2">📈</span>
                  {language === 'ru' ? 'Этот месяц' : 'This Month'}
                </h3>
                <p className="text-3xl font-bold text-green-600">+425 🌱</p>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'ru' ? 'Заработано' : 'Earned'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <span className="mr-2">💰</span>
                  {language === 'ru' ? 'Общий доход' : 'Total Earnings'}
                </h3>
                <p className="text-3xl font-bold text-green-600">15,234 🌱</p>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'ru' ? 'За все время' : 'All time'}
                </p>
              </div>
            </div>
            
            {/* Детальная финансовая аналитика */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Баланс */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <CurrencyDollarIcon className="w-6 h-6 mr-2" />
                  {t.balance}
                </h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      {language === 'ru' ? '💳 Доступные средства:' : '💳 Available Funds:'}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{language === 'ru' ? 'Основной баланс' : 'Main Balance'}</span>
                        <span className="text-lg font-bold text-green-600">2,847 🌱</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{language === 'ru' ? 'В обработке' : 'Pending'}</span>
                        <span className="text-sm font-medium text-blue-600">+125 🌱</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{language === 'ru' ? 'Заблокировано' : 'Blocked'}</span>
                        <span className="text-sm font-medium text-red-600">-50 🌱</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      {language === 'ru' ? '📊 Статистика:' : '📊 Statistics:'}
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• {language === 'ru' ? 'Средний доход в месяц: 380 🌱' : 'Average monthly income: 380 🌱'}</li>
                      <li>• {language === 'ru' ? 'Лучший месяц: 650 🌱' : 'Best month: 650 🌱'}</li>
                      <li>• {language === 'ru' ? 'Рост за год: +45%' : 'Yearly growth: +45%'}</li>
                    </ul>
                  </div>
                  
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium">
                    {language === 'ru' ? '💸 Вывести средства' : '💸 Withdraw Funds'}
                  </button>
                </div>
              </div>

              {/* История платежей */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <CalendarIcon className="w-6 h-6 mr-2" />
                  {t.paymentHistory}
                </h3>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="border-b border-gray-100 pb-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-green-800">{language === 'ru' ? 'Эко-тур "Лесные тропинки"' : 'Eco Tour "Forest Paths"'}</p>
                          <p className="text-sm text-gray-600">15 января 2024</p>
                        </div>
                        <span className="text-green-600 font-bold">+85 🌱</span>
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-100 pb-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-green-800">{language === 'ru' ? 'Велосипедный тур' : 'Bicycle Tour'}</p>
                          <p className="text-sm text-gray-600">12 января 2024</p>
                        </div>
                        <span className="text-green-600 font-bold">+65 🌱</span>
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-100 pb-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-green-800">{language === 'ru' ? 'Эко-курс "Маркетинг"' : 'Eco Course "Marketing"'}</p>
                          <p className="text-sm text-gray-600">8 января 2024</p>
                        </div>
                        <span className="text-red-600 font-bold">-150 🌱</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">
                      {language === 'ru' ? '📈 Тренды:' : '📈 Trends:'}
                    </h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• {language === 'ru' ? 'Рост доходов: +12% за месяц' : 'Income growth: +12% this month'}</li>
                      <li>• {language === 'ru' ? 'Популярные туры: пешие экскурсии' : 'Popular tours: walking tours'}</li>
                      <li>• {language === 'ru' ? 'Сезонность: пик в мае-сентябре' : 'Seasonality: peak in May-September'}</li>
                    </ul>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium">
                    {language === 'ru' ? '📋 Полная история' : '📋 Full History'}
                  </button>
                </div>
              </div>

              {/* Способы оплаты */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <CurrencyDollarIcon className="w-6 h-6 mr-2" />
                  {t.paymentMethods}
                </h3>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">🌱</span>
                          </div>
                          <div>
                            <p className="font-medium text-green-800">{language === 'ru' ? 'AirCoin Wallet' : 'AirCoin Wallet'}</p>
                            <p className="text-sm text-gray-600">{language === 'ru' ? 'Основной кошелек' : 'Main wallet'}</p>
                          </div>
                        </div>
                        <span className="text-green-600 font-bold">2,847 🌱</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">💳</span>
                          </div>
                          <div>
                            <p className="font-medium text-blue-800">{language === 'ru' ? 'Банковская карта' : 'Bank Card'}</p>
                            <p className="text-sm text-gray-600">**** 1234</p>
                          </div>
                        </div>
                        <span className="text-blue-600 text-sm">{language === 'ru' ? 'Подключена' : 'Connected'}</span>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">🏦</span>
                          </div>
                          <div>
                            <p className="font-medium text-orange-800">{language === 'ru' ? 'Банковский перевод' : 'Bank Transfer'}</p>
                            <p className="text-sm text-gray-600">{language === 'ru' ? 'Для крупных сумм' : 'For large amounts'}</p>
                          </div>
                        </div>
                        <span className="text-orange-600 text-sm">{language === 'ru' ? 'Доступно' : 'Available'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium">
                    {language === 'ru' ? '➕ Добавить способ оплаты' : '➕ Add Payment Method'}
                  </button>
                </div>
              </div>

              {/* Налоговые отчеты */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <ChartBarIcon className="w-6 h-6 mr-2" />
                  {t.taxReports}
                </h3>
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">
                      {language === 'ru' ? '📊 Налоговая отчетность:' : '📊 Tax Reporting:'}
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• {language === 'ru' ? 'Доход за 2024: 15,234 🌱' : '2024 Income: 15,234 🌱'}</li>
                      <li>• {language === 'ru' ? 'Налог к уплате: 1,523 🌱' : 'Tax to pay: 1,523 🌱'}</li>
                      <li>• {language === 'ru' ? 'Статус: В обработке' : 'Status: Processing'}</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      {language === 'ru' ? '📅 Сроки подачи:' : '📅 Filing Deadlines:'}
                    </h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• {language === 'ru' ? 'Квартальный отчет: до 25 января' : 'Quarterly report: by January 25'}</li>
                      <li>• {language === 'ru' ? 'Годовой отчет: до 30 апреля' : 'Annual report: by April 30'}</li>
                      <li>• {language === 'ru' ? 'Налог на прибыль: до 15 июля' : 'Income tax: by July 15'}</li>
                    </ul>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 font-medium">
                      {language === 'ru' ? '📄 Скачать отчет' : '📄 Download Report'}
                    </button>
                    <button className="flex-1 bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 font-medium">
                      {language === 'ru' ? '📧 Отправить в ФНС' : '📧 Send to Tax Office'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'eco-rating':
        return (
          <div className="space-y-6">
            {/* Общая эко-статистика */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button 
                onClick={() => handleAction('eco-rating-details')}
                className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-200 text-left w-full"
              >
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {language === 'ru' ? '🌱 Эко-рейтинг' : '🌱 Eco Rating'}
                </h3>
                <p className="text-3xl font-bold text-green-600">4.8/5.0</p>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'ru' ? 'Отличный результат!' : 'Excellent result!'}
                </p>
                <div className="mt-3 text-xs text-green-500">
                  {language === 'ru' ? 'Нажмите для деталей' : 'Click for details'}
                </div>
              </button>
              <button 
                onClick={() => handleAction('eco-points-details')}
                className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-200 text-left w-full"
              >
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {language === 'ru' ? '🏆 Эко-баллы' : '🏆 Eco Points'}
                </h3>
                <p className="text-3xl font-bold text-green-600">2,847</p>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'ru' ? 'За все время' : 'All time'}
                </p>
                <div className="mt-3 text-xs text-green-500">
                  {language === 'ru' ? 'Нажмите для аналитики' : 'Click for analytics'}
                </div>
              </button>
              <button 
                onClick={() => handleAction('eco-tours-details')}
                className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-200 text-left w-full"
              >
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {language === 'ru' ? '🌿 Эко-туры' : '🌿 Eco Tours'}
                </h3>
                <p className="text-3xl font-bold text-green-600">127</p>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'ru' ? 'Проведено туров' : 'Tours conducted'}
                </p>
                <div className="mt-3 text-xs text-green-500">
                  {language === 'ru' ? 'Нажмите для статистики' : 'Click for statistics'}
                </div>
              </button>
            </div>

            {/* Детальная эко-аналитика */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Эко-баллы */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <StarIcon className="w-6 h-6 mr-2" />
                  {t.ecoPoints}
                </h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      {language === 'ru' ? '📊 Источники баллов:' : '📊 Points Sources:'}
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• {language === 'ru' ? 'Эко-туры: +1,200 баллов' : 'Eco tours: +1,200 points'}</li>
                      <li>• {language === 'ru' ? 'Обучение: +800 баллов' : 'Education: +800 points'}</li>
                      <li>• {language === 'ru' ? 'Волонтерство: +600 баллов' : 'Volunteering: +600 points'}</li>
                      <li>• {language === 'ru' ? 'Эко-инициативы: +247 баллов' : 'Eco initiatives: +247 points'}</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      {language === 'ru' ? '🎯 Следующий уровень:' : '🎯 Next Level:'}
                    </h4>
                    <p className="text-blue-700 text-sm mb-2">
                      {language === 'ru' ? 'До "Эко-Мастер" осталось 153 балла' : '153 points to "Eco Master"'}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                <button
                    onClick={() => handleAction('eco-points-history')}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium"
                  >
                    {language === 'ru' ? '📈 История эко-баллов' : '📈 Eco Points History'}
                  </button>
                </div>
              </div>

              {/* Эко-значки */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <StarIcon className="w-6 h-6 mr-2" />
                  {t.ecoBadges}
                  </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-center">
                      <div className="text-2xl mb-1">🌱</div>
                      <p className="text-xs font-medium text-yellow-800">
                        {language === 'ru' ? 'Эко-Новичок' : 'Eco Beginner'}
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
                      <div className="text-2xl mb-1">🌿</div>
                      <p className="text-xs font-medium text-green-800">
                        {language === 'ru' ? 'Эко-Гид' : 'Eco Guide'}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
                      <div className="text-2xl mb-1">🌳</div>
                      <p className="text-xs font-medium text-blue-800">
                        {language === 'ru' ? 'Эко-Эксперт' : 'Eco Expert'}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 text-center">
                      <div className="text-2xl mb-1">🏆</div>
                      <p className="text-xs font-medium text-purple-800">
                        {language === 'ru' ? 'Эко-Чемпион' : 'Eco Champion'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">
                      {language === 'ru' ? '🎖️ Достижения:' : '🎖️ Achievements:'}
                    </h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• {language === 'ru' ? '100+ эко-туров проведено' : '100+ eco tours conducted'}</li>
                      <li>• {language === 'ru' ? 'Сертификация по эко-туризму' : 'Eco-tourism certification'}</li>
                      <li>• {language === 'ru' ? 'Волонтер в 5+ проектах' : 'Volunteer in 5+ projects'}</li>
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => handleAction('all-achievements')}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    {language === 'ru' ? '🏅 Все достижения' : '🏅 All Achievements'}
                </button>
                </div>
              </div>

              {/* CO2 Калькулятор */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100 md:col-span-2">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <ChartBarIcon className="w-6 h-6 mr-2" />
                  {t.co2Calculator}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">
                        {language === 'ru' ? '📉 Выбросы CO2' : '📉 CO2 Emissions'}
                      </h4>
                      <p className="text-2xl font-bold text-red-600 mb-1">-2.3 тонны</p>
                      <p className="text-sm text-red-700">
                        {language === 'ru' ? 'Сэкономлено за год' : 'Saved this year'}
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">
                        {language === 'ru' ? '🌳 Эквивалент деревьев' : '🌳 Tree Equivalent'}
                      </h4>
                      <p className="text-2xl font-bold text-green-600 mb-1">47 деревьев</p>
                      <p className="text-sm text-green-700">
                        {language === 'ru' ? 'Посажено благодаря вам' : 'Planted thanks to you'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        {language === 'ru' ? '📊 Статистика туров' : '📊 Tour Statistics'}
                      </h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• {language === 'ru' ? 'Пешие туры: 85%' : 'Walking tours: 85%'}</li>
                        <li>• {language === 'ru' ? 'Велосипедные: 10%' : 'Bicycle tours: 10%'}</li>
                        <li>• {language === 'ru' ? 'Эко-транспорт: 5%' : 'Eco transport: 5%'}</li>
                      </ul>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2">
                        {language === 'ru' ? '🎯 Цели на месяц' : '🎯 Monthly Goals'}
                      </h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• {language === 'ru' ? 'Снизить выбросы на 15%' : 'Reduce emissions by 15%'}</li>
                        <li>• {language === 'ru' ? 'Провести 20 эко-туров' : 'Conduct 20 eco tours'}</li>
                        <li>• {language === 'ru' ? 'Привлечь 50+ туристов' : 'Attract 50+ tourists'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={() => handleAction('calculate-co2')}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium"
                  >
                    {language === 'ru' ? '🧮 Рассчитать CO2' : '🧮 Calculate CO2'}
                  </button>
                  <button 
                    onClick={() => handleAction('detailed-statistics')}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    {language === 'ru' ? '📊 Детальная статистика' : '📊 Detailed Statistics'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentSection?.items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleAction(item.action)}
                className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-200 text-left"
              >
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {item.name}
                </h3>
                <p className="text-green-600">
                  {t.clickForDetails}
                </p>
              </button>
            ))}
          </div>
        );
    }
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
            <h1 className="text-2xl font-bold text-green-800">{t.guideDashboard}</h1>
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
          <div className={`bg-white rounded-lg p-6 w-full ${
            selectedAction === 'create-tour' 
              ? 'max-w-4xl max-h-[90vh] overflow-y-auto' 
              : 'max-w-md'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-green-800">
                {selectedAction === 'courses' ? t.courses : selectedAction}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            {selectedAction === 'courses' ? (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">{t.coursesOverview}</h4>
                  <p className="text-green-700 text-sm">{t.coursesDescription}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{t.completedCourses}</span>
                    <span className="text-green-600 font-semibold">1</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{t.coursesInProgress}</span>
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{t.availableCourses}</span>
                    <span className="text-gray-600 font-semibold">1</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">{t.nextSteps}</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• {t.completeCurrentCourse}</li>
                    <li>• {t.enrollInNewCourse}</li>
                    <li>• {t.earnCertification}</li>
                  </ul>
                </div>
              </div>
            ) : selectedAction === 'eco-points-history' ? (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'ru' ? '📈 История эко-баллов' : '📈 Eco Points History'}
                  </h4>
                  <p className="text-green-700 text-sm">
                    {language === 'ru' ? 'Детальная история начисления эко-баллов' : 'Detailed history of eco points accrual'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{language === 'ru' ? 'Эко-туры' : 'Eco tours'}</span>
                    <span className="text-green-600 font-semibold">+1,200</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{language === 'ru' ? 'Обучение' : 'Education'}</span>
                    <span className="text-blue-600 font-semibold">+800</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{language === 'ru' ? 'Волонтерство' : 'Volunteering'}</span>
                    <span className="text-purple-600 font-semibold">+600</span>
                  </div>
                </div>
              </div>
            ) : selectedAction === 'all-achievements' ? (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {language === 'ru' ? '🏅 Все достижения' : '🏅 All Achievements'}
                  </h4>
                  <p className="text-blue-700 text-sm">
                    {language === 'ru' ? 'Полный список ваших достижений и наград' : 'Complete list of your achievements and awards'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm text-yellow-800">{language === 'ru' ? '🌱 Эко-Новичок' : '🌱 Eco Beginner'}</span>
                    <span className="text-yellow-600 font-semibold">{language === 'ru' ? 'Получено' : 'Earned'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-green-800">{language === 'ru' ? '🌿 Эко-Гид' : '🌿 Eco Guide'}</span>
                    <span className="text-green-600 font-semibold">{language === 'ru' ? 'Получено' : 'Earned'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-blue-800">{language === 'ru' ? '🌳 Эко-Эксперт' : '🌳 Eco Expert'}</span>
                    <span className="text-blue-600 font-semibold">{language === 'ru' ? 'Получено' : 'Earned'}</span>
                  </div>
                </div>
              </div>
            ) : selectedAction === 'calculate-co2' ? (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'ru' ? '🧮 Рассчитать CO2' : '🧮 Calculate CO2'}
                  </h4>
                  <p className="text-green-700 text-sm">
                    {language === 'ru' ? 'Калькулятор выбросов CO2 для ваших туров' : 'CO2 emissions calculator for your tours'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{language === 'ru' ? 'Текущие выбросы' : 'Current emissions'}</span>
                    <span className="text-red-600 font-semibold">-2.3 тонны</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{language === 'ru' ? 'Эквивалент деревьев' : 'Tree equivalent'}</span>
                    <span className="text-green-600 font-semibold">47 деревьев</span>
                  </div>
                </div>
              </div>
            ) : selectedAction === 'detailed-statistics' ? (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {language === 'ru' ? '📊 Детальная статистика' : '📊 Detailed Statistics'}
                  </h4>
                  <p className="text-blue-700 text-sm">
                    {language === 'ru' ? 'Подробная аналитика по эко-показателям' : 'Detailed analytics on eco indicators'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{language === 'ru' ? 'Пешие туры' : 'Walking tours'}</span>
                    <span className="text-blue-600 font-semibold">85%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{language === 'ru' ? 'Велосипедные туры' : 'Bicycle tours'}</span>
                    <span className="text-green-600 font-semibold">10%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{language === 'ru' ? 'Эко-транспорт' : 'Eco transport'}</span>
                    <span className="text-purple-600 font-semibold">5%</span>
                  </div>
                </div>
              </div>
            ) : selectedAction === 'eco-rating-details' ? (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'ru' ? '🌱 Детали эко-рейтинга' : '🌱 Eco Rating Details'}
                  </h4>
                  <p className="text-green-700 text-sm">
                    {language === 'ru' ? 'Подробная аналитика вашего эко-рейтинга' : 'Detailed analytics of your eco rating'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm text-yellow-800">{language === 'ru' ? 'Общий рейтинг' : 'Overall Rating'}</span>
                    <span className="text-yellow-600 font-semibold">4.8/5.0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-green-800">{language === 'ru' ? 'Эко-практики' : 'Eco Practices'}</span>
                    <span className="text-green-600 font-semibold">4.9/5.0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-blue-800">{language === 'ru' ? 'Обучение туристов' : 'Tourist Education'}</span>
                    <span className="text-blue-600 font-semibold">4.7/5.0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm text-purple-800">{language === 'ru' ? 'Инновации' : 'Innovations'}</span>
                    <span className="text-purple-600 font-semibold">4.6/5.0</span>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">
                    {language === 'ru' ? '🎯 Геймификация' : '🎯 Gamification'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-orange-700">{language === 'ru' ? 'Уровень: Эко-Эксперт' : 'Level: Eco Expert'}</span>
                      <span className="text-orange-600 font-semibold">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-orange-600">
                      {language === 'ru' ? 'До следующего уровня: 15%' : 'To next level: 15%'}
                    </p>
                  </div>
                </div>
              </div>
            ) : selectedAction === 'eco-points-details' ? (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'ru' ? '🏆 Аналитика эко-баллов' : '🏆 Eco Points Analytics'}
                  </h4>
                  <p className="text-green-700 text-sm">
                    {language === 'ru' ? 'Детальная аналитика накопления эко-баллов' : 'Detailed analytics of eco points accumulation'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-green-800">{language === 'ru' ? 'Всего баллов' : 'Total Points'}</span>
                    <span className="text-green-600 font-semibold">2,847</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-blue-800">{language === 'ru' ? 'За этот месяц' : 'This Month'}</span>
                    <span className="text-blue-600 font-semibold">+245</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm text-purple-800">{language === 'ru' ? 'Среднее в день' : 'Daily Average'}</span>
                    <span className="text-purple-600 font-semibold">8.2</span>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    {language === 'ru' ? '🎮 Геймификация' : '🎮 Gamification'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-yellow-700">{language === 'ru' ? 'Текущий уровень' : 'Current Level'}</span>
                      <span className="text-yellow-600 font-semibold">{language === 'ru' ? 'Эко-Мастер' : 'Eco Master'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-yellow-700">{language === 'ru' ? 'До следующего уровня' : 'To Next Level'}</span>
                      <span className="text-yellow-600 font-semibold">153 балла</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedAction === 'eco-tours-details' ? (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'ru' ? '🌿 Статистика эко-туров' : '🌿 Eco Tours Statistics'}
                  </h4>
                  <p className="text-green-700 text-sm">
                    {language === 'ru' ? 'Подробная статистика проведенных эко-туров' : 'Detailed statistics of conducted eco tours'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-green-800">{language === 'ru' ? 'Всего туров' : 'Total Tours'}</span>
                    <span className="text-green-600 font-semibold">127</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-blue-800">{language === 'ru' ? 'В этом месяце' : 'This Month'}</span>
                    <span className="text-blue-600 font-semibold">12</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm text-purple-800">{language === 'ru' ? 'Средняя оценка' : 'Average Rating'}</span>
                    <span className="text-purple-600 font-semibold">4.8/5.0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm text-orange-800">{language === 'ru' ? 'Участников' : 'Participants'}</span>
                    <span className="text-orange-600 font-semibold">1,247</span>
                  </div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">
                    {language === 'ru' ? '🌍 Эко-влияние' : '🌍 Eco Impact'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-700">{language === 'ru' ? 'Сэкономлено CO2' : 'CO2 Saved'}</span>
                      <span className="text-red-600 font-semibold">-2.3 тонны</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-700">{language === 'ru' ? 'Эквивалент деревьев' : 'Tree Equivalent'}</span>
                      <span className="text-red-600 font-semibold">47 деревьев</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedAction === 'current-bookings' ? (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'ru' ? '📅 Текущие бронирования' : '📅 Current Bookings'}
                  </h4>
                  <p className="text-green-700 text-sm">
                    {language === 'ru' ? 'Управление активными бронированиями' : 'Manage active bookings'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {mockData.bookings.map((booking) => (
                    <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800">{booking.tourist}</h5>
                          <p className="text-sm text-gray-600">{booking.tour}</p>
                          <p className="text-xs text-gray-500">{booking.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status === 'confirmed' ? t.confirmed : t.pending}
                          </span>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                            {language === 'ru' ? 'Чат' : 'Chat'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : selectedAction === 'completed-bookings' ? (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {language === 'ru' ? '✅ Завершенные бронирования' : '✅ Completed Bookings'}
                  </h4>
                  <p className="text-blue-700 text-sm">
                    {language === 'ru' ? 'История завершенных туров' : 'History of completed tours'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'Анна Петрова' : 'Anna Petrova'}</h5>
                        <p className="text-sm text-gray-600">{language === 'ru' ? 'Экотропа "Лесные тропинки"' : 'Eco Trail "Forest Paths"'}</p>
                        <p className="text-xs text-gray-500">2024-01-10</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {language === 'ru' ? 'Завершен' : 'Completed'}
                        </span>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-green-600">⭐ 4.9</div>
                          <div className="text-xs text-gray-500">{language === 'ru' ? 'Рейтинг' : 'Rating'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'Михаил Козлов' : 'Mikhail Kozlov'}</h5>
                        <p className="text-sm text-gray-600">{language === 'ru' ? 'Велосипедный тур по паркам' : 'Bicycle Tour in Parks'}</p>
                        <p className="text-xs text-gray-500">2024-01-08</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {language === 'ru' ? 'Завершен' : 'Completed'}
                        </span>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-green-600">⭐ 4.7</div>
                          <div className="text-xs text-gray-500">{language === 'ru' ? 'Рейтинг' : 'Rating'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedAction === 'chat' ? (
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">
                    {language === 'ru' ? '💬 Чат с туристами' : '💬 Chat with Tourists'}
                  </h4>
                  <p className="text-purple-700 text-sm">
                    {language === 'ru' ? 'Общение с туристами и ответы на вопросы' : 'Communication with tourists and answering questions'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-sm font-medium">ИС</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'Иван Смирнов' : 'Ivan Smirnov'}</h5>
                          <p className="text-xs text-gray-500">{language === 'ru' ? '2 минуты назад' : '2 minutes ago'}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {language === 'ru' ? 'Новое' : 'New'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {language === 'ru' 
                        ? 'Здравствуйте! Подскажите, что нужно взять с собой на экотропу?'
                        : 'Hello! Can you tell me what to bring for the eco trail?'
                      }
                    </p>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-medium">АП</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'Анна Петрова' : 'Anna Petrova'}</h5>
                          <p className="text-xs text-gray-500">{language === 'ru' ? '1 час назад' : '1 hour ago'}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        {language === 'ru' ? 'Прочитано' : 'Read'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {language === 'ru' 
                        ? 'Спасибо за отличный тур! Обязательно приеду еще.'
                        : 'Thank you for the great tour! I will definitely come again.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ) : selectedAction === 'emergency' ? (
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">
                    {language === 'ru' ? '🚨 Экстренная связь' : '🚨 Emergency Contact'}
                  </h4>
                  <p className="text-red-700 text-sm">
                    {language === 'ru' ? 'Контактная информация для экстренных случаев' : 'Contact information for emergency situations'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white border border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-red-800">{language === 'ru' ? 'Служба спасения' : 'Rescue Service'}</h5>
                        <p className="text-sm text-gray-600">112</p>
                      </div>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                        {language === 'ru' ? 'Позвонить' : 'Call'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-red-800">{language === 'ru' ? 'Медицинская помощь' : 'Medical Help'}</h5>
                        <p className="text-sm text-gray-600">103</p>
                      </div>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                        {language === 'ru' ? 'Позвонить' : 'Call'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-red-800">{language === 'ru' ? 'Полиция' : 'Police'}</h5>
                        <p className="text-sm text-gray-600">102</p>
                      </div>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                        {language === 'ru' ? 'Позвонить' : 'Call'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedAction === 'balance' ? (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'ru' ? '💰 Баланс AirCoin' : '💰 AirCoin Balance'}
                  </h4>
                  <p className="text-green-700 text-sm">
                    {language === 'ru' ? 'Управление вашим балансом и средствами' : 'Manage your balance and funds'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'Основной баланс' : 'Main Balance'}</h5>
                        <p className="text-sm text-gray-600">{language === 'ru' ? 'Доступно для вывода' : 'Available for withdrawal'}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">2,847 🌱</div>
                        <div className="text-xs text-gray-500">{language === 'ru' ? 'AirCoin' : 'AirCoin'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'В обработке' : 'Pending'}</h5>
                        <p className="text-sm text-gray-600">{language === 'ru' ? 'Ожидает подтверждения' : 'Awaiting confirmation'}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">+125 🌱</div>
                        <div className="text-xs text-gray-500">{language === 'ru' ? 'AirCoin' : 'AirCoin'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'Заблокировано' : 'Blocked'}</h5>
                        <p className="text-sm text-gray-600">{language === 'ru' ? 'Временно недоступно' : 'Temporarily unavailable'}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-600">-50 🌱</div>
                        <div className="text-xs text-gray-500">{language === 'ru' ? 'AirCoin' : 'AirCoin'}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
                    {language === 'ru' ? '💸 Вывести' : '💸 Withdraw'}
                  </button>
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                    {language === 'ru' ? '📊 Статистика' : '📊 Statistics'}
                  </button>
                </div>
              </div>
            ) : selectedAction === 'payment-history' ? (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {language === 'ru' ? '📋 История платежей' : '📋 Payment History'}
                  </h4>
                  <p className="text-blue-700 text-sm">
                    {language === 'ru' ? 'Детальная история всех транзакций' : 'Detailed history of all transactions'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'Эко-тур "Лесные тропинки"' : 'Eco Tour "Forest Paths"'}</h5>
                        <p className="text-sm text-gray-600">15 января 2024</p>
                        <p className="text-xs text-gray-500">{language === 'ru' ? 'Завершен' : 'Completed'}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">+85 🌱</div>
                        <div className="text-xs text-gray-500">{language === 'ru' ? 'Доход' : 'Income'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'Велосипедный тур' : 'Bicycle Tour'}</h5>
                        <p className="text-sm text-gray-600">12 января 2024</p>
                        <p className="text-xs text-gray-500">{language === 'ru' ? 'Завершен' : 'Completed'}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">+65 🌱</div>
                        <div className="text-xs text-gray-500">{language === 'ru' ? 'Доход' : 'Income'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'Эко-курс "Маркетинг"' : 'Eco Course "Marketing"'}</h5>
                        <p className="text-sm text-gray-600">8 января 2024</p>
                        <p className="text-xs text-gray-500">{language === 'ru' ? 'Оплачено' : 'Paid'}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-600">-150 🌱</div>
                        <div className="text-xs text-gray-500">{language === 'ru' ? 'Расход' : 'Expense'}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                  {language === 'ru' ? '📋 Полная история' : '📋 Full History'}
                </button>
              </div>
            ) : selectedAction === 'payment-methods' ? (
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">
                    {language === 'ru' ? '💳 Способы оплаты' : '💳 Payment Methods'}
                  </h4>
                  <p className="text-purple-700 text-sm">
                    {language === 'ru' ? 'Управление способами получения платежей' : 'Manage payment receiving methods'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-lg">🌱</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'AirCoin Wallet' : 'AirCoin Wallet'}</h5>
                          <p className="text-sm text-gray-600">{language === 'ru' ? 'Основной кошелек' : 'Main wallet'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">2,847 🌱</div>
                        <div className="text-xs text-gray-500">{language === 'ru' ? 'Активен' : 'Active'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-lg">💳</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'Банковская карта' : 'Bank Card'}</h5>
                          <p className="text-sm text-gray-600">**** 1234</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-blue-600">{language === 'ru' ? 'Подключена' : 'Connected'}</div>
                        <div className="text-xs text-gray-500">{language === 'ru' ? 'Активна' : 'Active'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 text-lg">🏦</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'Банковский перевод' : 'Bank Transfer'}</h5>
                          <p className="text-sm text-gray-600">{language === 'ru' ? 'Для крупных сумм' : 'For large amounts'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-orange-600">{language === 'ru' ? 'Доступно' : 'Available'}</div>
                        <div className="text-xs text-gray-500">{language === 'ru' ? 'Настроено' : 'Configured'}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
                  {language === 'ru' ? '➕ Добавить способ оплаты' : '➕ Add Payment Method'}
                </button>
              </div>
            ) : selectedAction === 'tax-reports' ? (
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">
                    {language === 'ru' ? '📊 Налоговые отчеты' : '📊 Tax Reports'}
                  </h4>
                  <p className="text-red-700 text-sm">
                    {language === 'ru' ? 'Управление налоговой отчетностью' : 'Manage tax reporting'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'Доход за 2024' : '2024 Income'}</h5>
                        <p className="text-sm text-gray-600">{language === 'ru' ? 'Общая сумма доходов' : 'Total income amount'}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">15,234 🌱</div>
                        <div className="text-xs text-gray-500">{language === 'ru' ? 'AirCoin' : 'AirCoin'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'Налог к уплате' : 'Tax to Pay'}</h5>
                        <p className="text-sm text-gray-600">{language === 'ru' ? '10% от дохода' : '10% of income'}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-600">1,523 🌱</div>
                        <div className="text-xs text-gray-500">{language === 'ru' ? 'AirCoin' : 'AirCoin'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-gray-800">{language === 'ru' ? 'Статус отчетности' : 'Reporting Status'}</h5>
                        <p className="text-sm text-gray-600">{language === 'ru' ? 'Текущий статус' : 'Current status'}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-yellow-600">{language === 'ru' ? 'В обработке' : 'Processing'}</div>
                        <div className="text-xs text-gray-500">{language === 'ru' ? 'До 30 апреля' : 'By April 30'}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
                    {language === 'ru' ? '📄 Скачать отчет' : '📄 Download Report'}
                  </button>
                  <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg">
                    {language === 'ru' ? '📧 Отправить в ФНС' : '📧 Send to Tax Office'}
                  </button>
                </div>
              </div>
            ) : selectedAction === 'create-tour' ? (
              <div className="space-y-6">
                {/* Progress Steps */}
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    {[
                      { key: 'basic', label: language === 'ru' ? 'Основное' : 'Basic' },
                      { key: 'points', label: language === 'ru' ? 'Точки' : 'Points' },
                      { key: 'photos', label: language === 'ru' ? 'Фото' : 'Photos' },
                      { key: 'route', label: language === 'ru' ? 'Маршрут' : 'Route' },
                      { key: 'finish', label: language === 'ru' ? 'Завершить' : 'Finish' }
                    ].map((step, index) => (
                      <div key={step.key} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          tourCreationStep === step.key 
                            ? 'bg-green-500 text-white' 
                            : tourCreationStep === 'basic' && index === 0
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <span className={`ml-2 text-sm ${
                          tourCreationStep === step.key ? 'text-green-600 font-medium' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </span>
                        {index < 4 && (
                          <div className={`w-8 h-0.5 mx-3 ${
                            tourCreationStep === step.key ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Content */}
                {tourCreationStep === 'basic' && (
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">
                        {language === 'ru' ? '🎯 Основная информация' : '🎯 Basic Information'}
                      </h4>
                      <p className="text-green-700 text-sm">
                        {language === 'ru' ? 'Заполните основную информацию о туре' : 'Fill in basic tour information'}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === 'ru' ? 'Название тура' : 'Tour Name'}
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder={language === 'ru' ? 'Введите название тура' : 'Enter tour name'}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === 'ru' ? 'Описание тура' : 'Tour Description'}
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          rows={3}
                          placeholder={language === 'ru' ? 'Опишите ваш тур' : 'Describe your tour'}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'ru' ? 'Тип тура' : 'Tour Type'}
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="hiking">{t.hiking}</option>
                            <option value="cycling">{t.cycling}</option>
                            <option value="cultural">{t.cultural}</option>
                            <option value="nature">{t.nature}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'ru' ? 'Сложность' : 'Difficulty'}
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="easy">{t.easy}</option>
                            <option value="medium">{t.medium}</option>
                            <option value="hard">{t.hard}</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'ru' ? 'Продолжительность' : 'Duration'}
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder={language === 'ru' ? '2-3 часа' : '2-3 hours'}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'ru' ? 'Расстояние' : 'Distance'}
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder={language === 'ru' ? '5 км' : '5 km'}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'ru' ? 'Цена' : 'Price'}
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="🌱 500 AirCoin"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={() => setTourCreationStep('points')}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        {language === 'ru' ? 'Продолжить' : 'Continue'}
                      </button>
                    </div>
                  </div>
                )}

                {tourCreationStep === 'points' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        {language === 'ru' ? '📍 Контрольные точки' : '📍 Checkpoints'}
                      </h4>
                      <p className="text-blue-700 text-sm">
                        {language === 'ru' ? 'Добавьте ключевые точки вашего тура' : 'Add key points of your tour'}
                      </p>
                    </div>
                    
                    {/* Map Placeholder */}
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">
                        {language === 'ru' ? 'Интерактивная карта для добавления точек' : 'Interactive map for adding points'}
                      </p>
                      <button 
                        onClick={() => addTourPoint({
                          name: language === 'ru' ? 'Новая точка' : 'New Point',
                          lat: 43.2220 + Math.random() * 0.1,
                          lng: 76.8512 + Math.random() * 0.1,
                          description: language === 'ru' ? 'Описание точки' : 'Point description',
                          type: 'checkpoint'
                        })}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                      >
                        {language === 'ru' ? 'Добавить точку' : 'Add Point'}
                      </button>
                      <button 
                        onClick={generateAutoRoute}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                      >
                        {language === 'ru' ? 'Автомаршрут' : 'Auto Route'}
                      </button>
                    </div>
                    
                    {/* Points List */}
                    <div className="space-y-3">
                      <h5 className="font-semibold text-gray-800">
                        {language === 'ru' ? 'Точки маршрута' : 'Route Points'} ({tourPoints.length})
                      </h5>
                      {tourPoints.map((point, index) => (
                        <div key={point.id} className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                point.type === 'start' ? 'bg-green-100 text-green-600' :
                                point.type === 'end' ? 'bg-red-100 text-red-600' :
                                'bg-blue-100 text-blue-600'
                              }`}>
                                {point.type === 'start' ? '🚀' : point.type === 'end' ? '🏁' : index + 1}
                              </div>
                              <div>
                                <h6 className="font-medium text-gray-800">{point.name}</h6>
                                <p className="text-sm text-gray-600">{point.description}</p>
                                <p className="text-xs text-gray-500">
                                  {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <select
                                value={point.type}
                                onChange={(e) => updateTourPoint(point.id, { type: e.target.value as 'start' | 'checkpoint' | 'end' })}
                                className="text-xs px-2 py-1 border border-gray-300 rounded"
                              >
                                <option value="start">{language === 'ru' ? 'Старт' : 'Start'}</option>
                                <option value="checkpoint">{language === 'ru' ? 'Точка' : 'Checkpoint'}</option>
                                <option value="end">{language === 'ru' ? 'Финиш' : 'End'}</option>
                              </select>
                              <button
                                onClick={() => removeTourPoint(point.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <XMarkIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {tourPoints.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <MapIcon className="w-8 h-8 mx-auto mb-2" />
                          <p>{language === 'ru' ? 'Пока нет точек маршрута' : 'No route points yet'}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={() => setTourCreationStep('basic')}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {language === 'ru' ? 'Назад' : 'Back'}
                      </button>
                      <button
                        onClick={() => setTourCreationStep('photos')}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        {language === 'ru' ? 'Продолжить' : 'Continue'}
                      </button>
                    </div>
                  </div>
                )}

                {tourCreationStep === 'photos' && (
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">
                        {language === 'ru' ? '📸 Фотографии тура' : '📸 Tour Photos'}
                      </h4>
                      <p className="text-purple-700 text-sm">
                        {language === 'ru' ? 'Добавьте фотографии для вашего тура' : 'Add photos for your tour'}
                      </p>
                    </div>
                    
                    {/* Photo Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                      <div className="text-4xl mb-4">📸</div>
                      <p className="text-gray-600 mb-4">
                        {language === 'ru' ? 'Перетащите фото сюда или нажмите для выбора' : 'Drag photos here or click to select'}
                      </p>
                      <button 
                        onClick={() => addTourPhoto({
                          url: '/placeholder.jpg',
                          description: language === 'ru' ? 'Новое фото' : 'New photo'
                        })}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
                      >
                        {language === 'ru' ? 'Выбрать файлы' : 'Select Files'}
                      </button>
                    </div>
                    
                    {/* Photos Grid */}
                    {tourPhotos.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {tourPhotos.map((photo) => (
                          <div key={photo.id} className="relative bg-gray-100 rounded-lg p-4">
                            <div className="aspect-square bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                              <span className="text-gray-500">📷</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{photo.description}</p>
                            <button
                              onClick={() => removeTourPhoto(photo.id)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <button
                        onClick={() => setTourCreationStep('points')}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {language === 'ru' ? 'Назад' : 'Back'}
                      </button>
                      <button
                        onClick={() => setTourCreationStep('route')}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        {language === 'ru' ? 'Продолжить' : 'Continue'}
                      </button>
                    </div>
                  </div>
                )}

                {tourCreationStep === 'route' && (
                  <div className="space-y-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">
                        {language === 'ru' ? '🗺️ Построение маршрута' : '🗺️ Route Building'}
                      </h4>
                      <p className="text-orange-700 text-sm">
                        {language === 'ru' ? 'Настройте автоматическое построение маршрута' : 'Configure automatic route building'}
                      </p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-semibold text-gray-800">
                          {language === 'ru' ? 'Автоматическое построение' : 'Automatic Building'}
                        </h5>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={autoRouteEnabled}
                            onChange={(e) => setAutoRouteEnabled(e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">
                            {language === 'ru' ? 'Включить авто-маршрут' : 'Enable auto-route'}
                          </span>
                        </label>
                      </div>
                      
                      {autoRouteEnabled && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h6 className="font-medium text-green-800 mb-2">
                            {language === 'ru' ? '✅ Автомаршрут активен' : '✅ Auto-route active'}
                          </h6>
                          <p className="text-sm text-green-700">
                            {language === 'ru' 
                              ? 'Маршрут будет автоматически построен между точками'
                              : 'Route will be automatically built between points'
                            }
                          </p>
                        </div>
                      )}
                      
                      <div className="mt-4">
                        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 mb-4">
                            {language === 'ru' ? 'Визуализация маршрута' : 'Route visualization'}
                          </p>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                            {language === 'ru' ? 'Открыть карту' : 'Open Map'}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={() => setTourCreationStep('photos')}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {language === 'ru' ? 'Назад' : 'Back'}
                      </button>
                      <button
                        onClick={() => setTourCreationStep('finish')}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        {language === 'ru' ? 'Продолжить' : 'Continue'}
                      </button>
                    </div>
                  </div>
                )}

                {tourCreationStep === 'finish' && (
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">
                        {language === 'ru' ? '🎉 Завершение создания тура' : '🎉 Finish Tour Creation'}
                      </h4>
                      <p className="text-green-700 text-sm">
                        {language === 'ru' ? 'Проверьте информацию и создайте тур' : 'Review information and create tour'}
                      </p>
                    </div>
                    
                    {/* Tour Summary */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h5 className="font-semibold text-gray-800 mb-4">
                        {language === 'ru' ? 'Сводка тура' : 'Tour Summary'}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{tourPoints.length}</div>
                          <div className="text-sm text-gray-600">
                            {language === 'ru' ? 'Точек маршрута' : 'Route Points'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{tourPhotos.length}</div>
                          <div className="text-sm text-gray-600">
                            {language === 'ru' ? 'Фотографий' : 'Photos'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {autoRouteEnabled ? '✅' : '❌'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {language === 'ru' ? 'Автомаршрут' : 'Auto Route'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={() => setTourCreationStep('route')}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {language === 'ru' ? 'Назад' : 'Back'}
                      </button>
                      <button
                        onClick={closeModal}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        {language === 'ru' ? 'Создать тур' : 'Create Tour'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-green-600 mb-4">
                {t.functionInDevelopment}
              </div>
            )}
            
            <div className="flex justify-end mt-6">
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

       {/* Course Action Modal */}
       {showCourseModal && selectedCourse && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-lg p-6 max-w-md w-full">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-xl font-semibold text-green-800">
                 {modalType === 'enroll' ? t.enroll :
                  modalType === 'continue' ? t.continue :
                  modalType === 'certificate' ? t.viewCertificate :
                  modalType === 'view' ? t.view : ''}
               </h3>
               <button
                 onClick={closeCourseModal}
                 className="text-gray-500 hover:text-gray-700"
               >
                 <XMarkIcon className="w-6 h-6" />
               </button>
             </div>
             
             <div className="space-y-4">
               <div className="bg-green-50 p-4 rounded-lg">
                 <h4 className="font-semibold text-green-800 mb-2">{selectedCourse.title}</h4>
                 <p className="text-green-700 text-sm">{selectedCourse.description}</p>
               </div>
               
               {modalType === 'enroll' && (
                 <div className="space-y-3">
                   <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                     <span className="text-sm text-gray-600">{t.duration}</span>
                     <span className="text-green-600 font-semibold">{selectedCourse.duration}</span>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                     <span className="text-sm text-gray-600">{t.level}</span>
                     <span className="text-blue-600 font-semibold">{selectedCourse.level}</span>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                     <span className="text-sm text-gray-600">{t.instructor}</span>
                     <span className="text-purple-600 font-semibold">{selectedCourse.instructor}</span>
                   </div>
                   <div className="bg-blue-50 p-4 rounded-lg">
                     <h5 className="font-semibold text-blue-800 mb-2">{t.courseBenefits}</h5>
                     <ul className="text-blue-700 text-sm space-y-1">
                       <li>• {t.learnEcoTourism}</li>
                       <li>• {t.getCertificate}</li>
                       <li>• {t.improveSkills}</li>
                     </ul>
                   </div>
                 </div>
               )}
               
               {modalType === 'continue' && (
                 <div className="space-y-3">
                   <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                     <span className="text-sm text-gray-600">{t.currentProgress}</span>
                     <span className="text-blue-600 font-semibold">{selectedCourse.progress}%</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-3">
                     <div className="bg-green-500 h-3 rounded-full" style={{ width: `${selectedCourse.progress}%` }}></div>
                   </div>
                   <div className="bg-blue-50 p-4 rounded-lg">
                     <h5 className="font-semibold text-blue-800 mb-2">{t.nextLesson}</h5>
                     <p className="text-blue-700 text-sm">{t.continueLearning}</p>
                   </div>
                 </div>
               )}
               
               {modalType === 'certificate' && (
                 <div className="space-y-3">
                   <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                     <span className="text-sm text-gray-600">{t.completionDate}</span>
                     <span className="text-green-600 font-semibold">
                       {selectedCourse.completionDate && new Date(selectedCourse.completionDate).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')}
                     </span>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                     <span className="text-sm text-gray-600">{t.finalGrade}</span>
                     <span className="text-green-600 font-semibold">A+ (95%)</span>
                   </div>
                   <div className="bg-green-50 p-4 rounded-lg">
                     <h5 className="font-semibold text-green-800 mb-2">{t.certificateDetails}</h5>
                     <ul className="text-green-700 text-sm space-y-1">
                       <li>• {t.officialCertificate}</li>
                       <li>• {t.validForLife}</li>
                       <li>• {t.downloadable}</li>
                     </ul>
                   </div>
                 </div>
               )}
               
               {modalType === 'view' && (
                 <div className="space-y-3">
                   <div className="grid grid-cols-2 gap-3">
                     <div className="p-3 bg-gray-50 rounded-lg">
                       <span className="text-sm text-gray-600">{t.duration}</span>
                       <p className="text-green-600 font-semibold">{selectedCourse.duration}</p>
                     </div>
                     <div className="p-3 bg-gray-50 rounded-lg">
                       <span className="text-sm text-gray-600">{t.level}</span>
                       <p className="text-blue-600 font-semibold">{selectedCourse.level}</p>
                     </div>
                     <div className="p-3 bg-gray-50 rounded-lg">
                       <span className="text-sm text-gray-600">{t.instructor}</span>
                       <p className="text-purple-600 font-semibold">{selectedCourse.instructor}</p>
                     </div>
                     <div className="p-3 bg-gray-50 rounded-lg">
                       <span className="text-sm text-gray-600">{t.status}</span>
                       <p className={`font-semibold ${
                         selectedCourse.status === 'completed' ? 'text-green-600' :
                         selectedCourse.status === 'enrolled' ? 'text-blue-600' :
                         'text-gray-600'
                       }`}>
                         {selectedCourse.status === 'completed' ? t.completed :
                          selectedCourse.status === 'enrolled' ? t.inProgress :
                          t.available}
                       </p>
                     </div>
                   </div>
                   <div className="bg-blue-50 p-4 rounded-lg">
                     <h5 className="font-semibold text-blue-800 mb-2">{t.courseDescription}</h5>
                     <p className="text-blue-700 text-sm">{selectedCourse.description}</p>
                   </div>
                 </div>
               )}
             </div>
             
             <div className="flex justify-end space-x-3 mt-6">
               <button
                 onClick={closeCourseModal}
                 className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
               >
                 {t.cancel}
               </button>
               <button 
                 onClick={
                   modalType === 'enroll' ? handleEnroll :
                   modalType === 'continue' ? handleContinue :
                   modalType === 'certificate' ? handleViewCertificate :
                   modalType === 'view' ? handleViewCourse :
                   closeCourseModal
                 }
                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
               >
                 {modalType === 'enroll' ? t.enroll :
                  modalType === 'continue' ? t.continue :
                  modalType === 'certificate' ? t.download :
                  modalType === 'view' ? t.open :
                  t.close}
               </button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 } 