import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, MapPin, Tag, BookOpen, Star } from 'lucide-react';
import { culturalData } from '../data/mockData';

const TraditionsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [traditionItem, setTraditionItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the tradition item by ID
    const item = culturalData.traditions?.find(item => item.id === parseInt(id));
    if (item) {
      setTraditionItem(item);
    }
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tradition content...</p>
        </div>
      </div>
    );
  }

  if (!traditionItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tradition Not Found</h2>
          <p className="text-gray-600 mb-6">The tradition you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/culture')}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
          >
            Back to Culture
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile first */}
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/culture')}
            className="flex items-center text-white/80 hover:text-white mb-4 sm:mb-6 transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm sm:text-base">Back to Culture</span>
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">{traditionItem.title}</h1>
          <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-3xl leading-relaxed">{traditionItem.description}</p>
        </div>
      </div>

      {/* Content - Mobile first */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl mx-auto">
        {/* Metadata - Mobile optimized */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-3 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500">Importance</p>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">{traditionItem.importance}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-3 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-gray-500">Region</p>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">{traditionItem.region}</p>
              </div>
            </div>
            <div className="flex items-center sm:col-span-2 lg:col-span-1">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-3 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500">Category</p>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">Traditions & Customs</p>
              </div>
            </div>
          </div>
          
          {traditionItem.tags && traditionItem.tags.length > 0 && (
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <div className="flex items-center mb-3">
                <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {traditionItem.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 text-yellow-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Full Script Content - Mobile optimized */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="prose max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
              {traditionItem.fullScript}
            </div>
          </div>
        </div>

        {/* Navigation - Mobile optimized */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
          <button
            onClick={() => navigate('/culture')}
            className="bg-gray-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors min-h-[44px] w-full sm:w-auto"
          >
            Back to Culture
          </button>
          <button
            onClick={() => navigate('/culture')}
            className="bg-yellow-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors min-h-[44px] w-full sm:w-auto"
          >
            Explore More Traditions
          </button>
        </div>
      </div>
    </div>
  );
};

export default TraditionsDetail;