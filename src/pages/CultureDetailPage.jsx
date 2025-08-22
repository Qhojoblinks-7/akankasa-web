import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';
import { cultureHighlights } from '../data/mockData';

const CultureDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const content = cultureHighlights.find(item => item.id === parseInt(id));
  
  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h2>
          <button 
            onClick={() => navigate('/culture')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/culture')}
            className="flex items-center text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Culture
          </button>
          <h1 className="text-4xl font-bold">{content.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Image */}
          {content.image && (
            <div className="relative h-96">
              <img 
                src={content.image} 
                alt={content.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          {/* Meta Information */}
          <div className="p-8">
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
              {content.date && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {content.date}
                </div>
              )}
              {content.author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {content.author}
                </div>
              )}
              {content.readTime && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {content.readTime} min read
                </div>
              )}
              {content.category && (
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  {content.category}
                </div>
              )}
            </div>

            {/* Full Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700 mb-6">{content.fullDescription || content.description}</p>

              {content.sections && content.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                  <div className="text-gray-700">{section.content}</div>
                </div>
              ))}

              {content.keyPoints && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Key Points</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {content.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {content.sources && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-3">Sources & References</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {content.sources.map((source, index) => (
                      <li key={index}>{source}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Content */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cultureHighlights
              .filter(item => item.id !== content.id && item.category === content.category)
              .slice(0, 2)
              .map(related => (
                <div 
                  key={related.id}
                  onClick={() => navigate(`/culture/${related.id}`)}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <img 
                    src={related.image} 
                    alt={related.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{related.title}</h3>
                    <p className="text-sm text-gray-600">{related.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CultureDetailPage;
