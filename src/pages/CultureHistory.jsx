import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, MapPin, Users } from 'lucide-react';
import { culturalData } from '../data/mockData';

const CultureHistory = () => {
  const historyItems = culturalData.history || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center mr-6" style={{backgroundColor: '#695e46'}}>
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Akan History & Heritage</h1>
              <p className="text-xl opacity-90 max-w-3xl">
                Explore the rich historical background, migrations, and notable figures that shaped Akan civilization
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Akan History</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Akan people have a rich and complex history that spans centuries, from their early origins to the powerful 
            Ashanti Empire and their role in modern Ghana. This history is preserved through oral traditions, archaeological 
            evidence, and written records.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Explore the key events, figures, and developments that have shaped Akan culture and continue to influence 
            contemporary society.
          </p>
        </div>

        {/* History Items Grid */}
        {historyItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {historyItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48" style={{background: 'linear-gradient(135deg, #f1d799 0%, #564c38 100%)'}}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm opacity-90">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs">
                      {item.region || 'All Regions'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">{item.content}</p>
                  </div>

                  {item.timeline && (
                    <div className="mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{item.timeline}</span>
                      </div>
                      {item.significance && (
                        <div className="mt-2">
                          <span className="font-semibold text-gray-900">Significance:</span>
                          <p className="text-gray-700 text-sm">{item.significance}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {item.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      to={`/culture/history/${item.id}`}
                      className="font-medium text-sm flex items-center transition-colors"
                      style={{color: '#564c38'}}
                      onMouseEnter={(e) => e.target.style.color = '#695e46'}
                      onMouseLeave={(e) => e.target.style.color = '#564c38'}
                    >
                      Read Full Story
                      <BookOpen className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No history content available</h3>
            <p className="text-gray-600">
              Historical content is being prepared. Check back soon for detailed stories about Akan history.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center">
          <Link 
            to="/culture" 
            className="inline-flex items-center px-6 py-3 bg-akan-gold text-white rounded-lg font-semibold hover:bg-akan-gold-dark transition-colors"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Back to Culture
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CultureHistory;
