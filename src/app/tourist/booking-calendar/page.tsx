'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface Booking {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  guide: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  type: 'tour' | 'accommodation' | 'transport';
}

export default function BookingCalendarPage() {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Моковые данные бронирований
  const mockBookings: Booking[] = [
    {
      id: '1',
      title: t.ecoTourAlmaty,
      date: '2024-08-15',
      time: '09:00',
      location: t.almatyKazakhstan,
      guide: t.aigulSatpaeva,
      status: 'confirmed',
      type: 'tour'
    },
    {
      id: '2',
      title: t.ecoHotelGreenMountains,
      date: '2024-08-20',
      time: '14:00',
      location: t.almatyRegion,
      guide: '',
      status: 'pending',
      type: 'accommodation'
    },
    {
      id: '3',
      title: t.bicycleTour,
      date: '2024-08-25',
      time: '10:30',
      location: t.astanaKazakhstan,
      guide: t.maratZhumabaev,
      status: 'confirmed',
      type: 'tour'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return t.bookingConfirmed;
      case 'pending':
        return t.bookingPending;
      case 'cancelled':
        return t.bookingCancelled;
      default:
        return t.bookingUnknown;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tour':
        return '🏔️';
      case 'accommodation':
        return '🏨';
      case 'transport':
        return '🚗';
      default:
        return '📅';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Language Switcher */}
      <div className="flex justify-end mb-4">
        <LanguageSwitcher 
          currentLanguage={language} 
          onLanguageChange={changeLanguage}
        />
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/tourist"
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">
            {t.bookingCalendar}
          </h1>
          <p className="text-gray-600 mt-1">
            {t.manageBookings}
          </p>
        </div>
      </div>

      {/* Add Booking Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          {t.addBooking}
        </button>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {mockBookings.map((booking) => (
          <div 
            key={booking.id}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="text-2xl">
                  {getTypeIcon(booking.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {booking.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{booking.location}</span>
                    </div>
                    {booking.guide && (
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4" />
                        <span>{booking.guide}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {getStatusText(booking.status)}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {mockBookings.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {t.noBookings}
          </h3>
          <p className="text-gray-500 mb-4">
            {t.noBookingsYet}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            {t.addFirstBooking}
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {selectedBooking ? t.editBooking : t.addBooking}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.title}
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={t.enterTitle}
                  defaultValue={selectedBooking?.title || ''}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.date}
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    defaultValue={selectedBooking?.date || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.time}
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    defaultValue={selectedBooking?.time || ''}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.bookingLocation}
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={t.enterLocation}
                  defaultValue={selectedBooking?.location || ''}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedBooking(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.cancelBooking}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  {selectedBooking ? t.saveBooking : t.addBookingAction}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 