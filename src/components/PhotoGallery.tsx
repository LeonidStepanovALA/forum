'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  CameraIcon, 
  PhotoIcon, 
  ShareIcon, 
  HeartIcon,
  ChatBubbleLeftIcon,
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartSolidIcon,
  ShareIcon as ShareSolidIcon
} from '@heroicons/react/24/solid';
import { useLanguage } from '@/hooks/useLanguage';

interface Photo {
  id: string;
  url: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isShared: boolean;
  timestamp: string;
  location?: string;
}

interface PhotoGalleryProps {
  className?: string;
}

export default function PhotoGallery({ className = '' }: PhotoGalleryProps) {
  const { language } = useLanguage();
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      url: '/api/placeholder/400/300',
      caption: language === 'ru' ? 'Красивый закат в горах' : 'Beautiful sunset in the mountains',
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false,
      isShared: false,
      timestamp: '2 часа назад',
      location: 'Алтай, Россия'
    },
    {
      id: '2',
      url: '/api/placeholder/400/300',
      caption: language === 'ru' ? 'Эко-тур по лесу' : 'Eco-tour through the forest',
      likes: 18,
      comments: 5,
      shares: 2,
      isLiked: true,
      isShared: false,
      timestamp: '1 день назад',
      location: 'Тайга, Сибирь'
    }
  ]);
  
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState<{
    file: File | null;
    caption: string;
    location: string;
  }>({
    file: null,
    caption: '',
    location: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewPhoto(prev => ({ ...prev, file }));
    }
  };

  const handleUpload = async () => {
    if (!newPhoto.file) return;
    
    setIsUploading(true);
    
    // Симуляция загрузки
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newPhotoData: Photo = {
      id: Date.now().toString(),
      url: URL.createObjectURL(newPhoto.file),
      caption: newPhoto.caption,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isShared: false,
      timestamp: 'только что',
      location: newPhoto.location
    };
    
    setPhotos(prev => [newPhotoData, ...prev]);
    setNewPhoto({ file: null, caption: '', location: '' });
    setShowUploadModal(false);
    setIsUploading(false);
  };

  const handleLike = (photoId: string) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { 
            ...photo, 
            isLiked: !photo.isLiked,
            likes: photo.isLiked ? photo.likes - 1 : photo.likes + 1
          }
        : photo
    ));
  };

  const handleShare = (photoId: string) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { 
            ...photo, 
            isShared: !photo.isShared,
            shares: photo.isShared ? photo.shares - 1 : photo.shares + 1
          }
        : photo
    ));
  };

  const handleDelete = (photoId: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const shareToSocial = (photo: Photo, platform: string) => {
    const shareText = `${photo.caption} ${photo.location ? `📍 ${photo.location}` : ''}`;
    const shareUrl = window.location.origin;
    
    let shareLink = '';
    
    switch (platform) {
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        break;
      case 'vk':
        shareLink = `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
        break;
      case 'instagram':
        // Для Instagram нужно использовать их API или копировать ссылку
        navigator.clipboard.writeText(shareUrl);
        alert(language === 'ru' ? 'Ссылка скопирована! Вставьте в Instagram.' : 'Link copied! Paste in Instagram.');
        return;
    }
    
    window.open(shareLink, '_blank');
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-green-800">
          {language === 'ru' ? 'Фотогалерея' : 'Photo Gallery'}
        </h2>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5" />
          <span>{language === 'ru' ? 'Добавить фото' : 'Add Photo'}</span>
        </button>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-green-100">
            {/* Photo */}
            <div className="relative group">
              <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                />
              </div>
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedPhoto(photo)}
                    className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200"
                    title={language === 'ru' ? 'Просмотр' : 'View'}
                  >
                    <EyeIcon className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="p-2 bg-red-500 bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200"
                    title={language === 'ru' ? 'Удалить' : 'Delete'}
                  >
                    <TrashIcon className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Photo Info */}
            <div className="p-4">
              <p className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                {photo.caption}
              </p>
              
              {photo.location && (
                <p className="text-xs text-gray-500 mb-3 flex items-center">
                  <span>📍</span>
                  <span className="ml-1">{photo.location}</span>
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>{photo.timestamp}</span>
                <div className="flex items-center space-x-3">
                  <span>{photo.likes} {language === 'ru' ? 'лайков' : 'likes'}</span>
                  <span>{photo.comments} {language === 'ru' ? 'комментариев' : 'comments'}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(photo.id)}
                    className={`flex items-center space-x-1 transition-colors duration-200 ${
                      photo.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    {photo.isLiked ? (
                      <HeartSolidIcon className="w-5 h-5" />
                    ) : (
                      <HeartIcon className="w-5 h-5" />
                    )}
                    <span className="text-sm">{photo.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                    <ChatBubbleLeftIcon className="w-5 h-5" />
                    <span className="text-sm">{photo.comments}</span>
                  </button>
                </div>

                <button
                  onClick={() => handleShare(photo.id)}
                  className={`flex items-center space-x-1 transition-colors duration-200 ${
                    photo.isShared ? 'text-green-500' : 'text-gray-500 hover:text-green-500'
                  }`}
                >
                  {photo.isShared ? (
                    <ShareSolidIcon className="w-5 h-5" />
                  ) : (
                    <ShareIcon className="w-5 h-5" />
                  )}
                  <span className="text-sm">{photo.shares}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === 'ru' ? 'Загрузить фото' : 'Upload Photo'}
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* File Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ru' ? 'Выберите фото' : 'Select Photo'}
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors duration-200 flex flex-col items-center space-y-2"
                >
                  <CameraIcon className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {newPhoto.file ? newPhoto.file.name : (language === 'ru' ? 'Нажмите для выбора файла' : 'Click to select file')}
                  </span>
                </button>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ru' ? 'Описание' : 'Caption'}
                </label>
                <textarea
                  value={newPhoto.caption}
                  onChange={(e) => setNewPhoto(prev => ({ ...prev, caption: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder={language === 'ru' ? 'Добавьте описание к фото...' : 'Add a caption...'}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ru' ? 'Местоположение' : 'Location'}
                </label>
                <input
                  type="text"
                  value={newPhoto.location}
                  onChange={(e) => setNewPhoto(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={language === 'ru' ? 'Где было сделано фото?' : 'Where was this photo taken?'}
                />
              </div>

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={!newPhoto.file || isUploading}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{language === 'ru' ? 'Загрузка...' : 'Uploading...'}</span>
                  </>
                ) : (
                  <>
                    <PhotoIcon className="w-5 h-5" />
                    <span>{language === 'ru' ? 'Загрузить' : 'Upload'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === 'ru' ? 'Просмотр фото' : 'Photo View'}
              </h3>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Photo */}
                <div className="relative">
                  <Image
                    src={selectedPhoto.url}
                    alt={selectedPhoto.caption}
                    width={600}
                    height={400}
                    className="w-full h-64 lg:h-96 object-cover rounded-lg"
                  />
                </div>
                
                {/* Photo Info */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {selectedPhoto.caption}
                    </h4>
                    {selectedPhoto.location && (
                      <p className="text-sm text-gray-600 flex items-center">
                        <span>📍</span>
                        <span className="ml-1">{selectedPhoto.location}</span>
                      </p>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <span>{selectedPhoto.likes} {language === 'ru' ? 'лайков' : 'likes'}</span>
                    <span>{selectedPhoto.comments} {language === 'ru' ? 'комментариев' : 'comments'}</span>
                    <span>{selectedPhoto.shares} {language === 'ru' ? 'поделились' : 'shares'}</span>
                    <span>{selectedPhoto.timestamp}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(selectedPhoto.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                        selectedPhoto.isLiked 
                          ? 'bg-red-50 text-red-500 border border-red-200' 
                          : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      {selectedPhoto.isLiked ? (
                        <HeartSolidIcon className="w-5 h-5" />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                      <span>{language === 'ru' ? 'Лайк' : 'Like'}</span>
                    </button>

                    <button
                      onClick={() => handleShare(selectedPhoto.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                        selectedPhoto.isShared 
                          ? 'bg-green-50 text-green-500 border border-green-200' 
                          : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-green-50 hover:text-green-500'
                      }`}
                    >
                      <ShareIcon className="w-5 h-5" />
                      <span>{language === 'ru' ? 'Поделиться' : 'Share'}</span>
                    </button>
                  </div>

                  {/* Social Share */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      {language === 'ru' ? 'Поделиться в соцсетях:' : 'Share on social media:'}
                    </h5>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => shareToSocial(selectedPhoto, 'telegram')}
                        className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600 transition-colors duration-200"
                      >
                        Telegram
                      </button>
                      <button
                        onClick={() => shareToSocial(selectedPhoto, 'whatsapp')}
                        className="px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition-colors duration-200"
                      >
                        WhatsApp
                      </button>
                      <button
                        onClick={() => shareToSocial(selectedPhoto, 'vk')}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 transition-colors duration-200"
                      >
                        VK
                      </button>
                      <button
                        onClick={() => shareToSocial(selectedPhoto, 'instagram')}
                        className="px-3 py-1 bg-pink-500 text-white text-xs rounded-full hover:bg-pink-600 transition-colors duration-200"
                      >
                        Instagram
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
