import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Tag, BookOpen, Users } from 'lucide-react';
import { culturalData } from '../data/mockData';

const HistoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [historyItem, setHistoryItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the history item by ID
    const item = culturalData.history?.find(item => item.id === parseInt(id));
    if (item) {
      setHistoryItem(item);
    }
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading history content...</p>
        </div>
      </div>
    );
  }

  if (!historyItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">History Item Not Found</h2>
          <p className="text-gray-600 mb-6">The history item you're looking for doesn't exist.</p>
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
      {/* Header */}
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <button
            onClick={() => navigate('/culture')}
            className="flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Culture
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{historyItem.title}</h1>
          <p className="text-xl opacity-90 max-w-3xl">{historyItem.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metadata */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Timeline</p>
                <p className="font-semibold text-gray-900">{historyItem.timeline}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="font-semibold text-gray-900">{historyItem.region}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Significance</p>
                <p className="font-semibold text-gray-900">{historyItem.significance}</p>
              </div>
            </div>
          </div>
          
          {historyItem.tags && historyItem.tags.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center mb-3">
                <Tag className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {historyItem.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Full Script Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
              {historyItem.fullScript}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate('/culture')}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Back to Culture
          </button>
          <button
            onClick={() => navigate('/culture')}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
          >
            Explore More History
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetail;