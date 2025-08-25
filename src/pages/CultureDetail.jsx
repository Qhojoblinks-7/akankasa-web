import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, BookOpen, Palette, Music, X } from 'lucide-react';
import { culturalData } from '../data/mockData';

const CultureDetail = () => {
  const { section, id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [sectionInfo, setSectionInfo] = useState(null);

  useEffect(() => {
    if (section && id) {
      const sectionData = culturalData[section];
      if (sectionData) {
        const foundItem = sectionData.find(item => item.id === parseInt(id));
        if (foundItem) {
          setItem(foundItem);
          
          // Set section information for display
          const sections = {
            traditions: { label: 'Traditions & Customs', icon: Users, color: '#564c38' },
            history: { label: 'History & Heritage', icon: BookOpen, color: '#695e46' },
            arts: { label: 'Arts & Crafts', icon: Palette, color: '#77705c' },
            music: { label: 'Music & Dance', icon: Music, color: '#c2ae81' },
            symbols: { label: 'Cultural Symbols', icon: BookOpen, color: '#695e46' }
          };
          setSectionInfo(sections[section]);
        }
      }
    }
  }, [section, id]);

  if (!item || !sectionInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h1>
          <p className="text-gray-600 mb-6">The requested cultural content could not be found.</p>
          <Link 
            to="/culture" 
            className="inline-flex items-center px-4 py-2 bg-akan-gold text-white rounded-lg hover:bg-akan-gold-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Culture
          </Link>
        </div>
      </div>
    );
  }

  const Icon = sectionInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4`} style={{backgroundColor: sectionInfo.color}}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{item.title}</h1>
              <p className="text-lg opacity-90 mt-2">{item.description}</p>
            </div>
          </div>
          
          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm">
            {item.region && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{item.region}</span>
              </div>
            )}
            {item.timeline && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{item.timeline}</span>
              </div>
            )}
            {item.importance && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>Importance: {item.importance}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Breadcrumb */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-gray-900">Home</Link>
              <span>/</span>
              <Link to="/culture" className="hover:text-gray-900">Culture</Link>
              <span>/</span>
              <Link to={`/culture#${section}`} className="hover:text-gray-900">{sectionInfo.label}</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{item.title}</span>
            </nav>
          </div>

          {/* Main content */}
          <div className="p-6">
            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Full content */}
            <div className="prose max-w-none">
              {item.fullContent ? (
                <div 
                  className="markdown-content"
                  dangerouslySetInnerHTML={{ 
                    __html: item.fullContent
                      .split('\n')
                      .map(line => {
                        if (line.startsWith('# ')) {
                          return `<h1 class="text-3xl font-bold text-gray-900 mb-6">${line.substring(2)}</h1>`;
                        }
                        if (line.startsWith('## ')) {
                          return `<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">${line.substring(3)}</h2>`;
                        }
                        if (line.startsWith('### ')) {
                          return `<h3 class="text-xl font-bold text-gray-900 mb-3 mt-6">${line.substring(4)}</h3>`;
                        }
                        if (line.startsWith('- **') && line.includes('**:')) {
                          const parts = line.split('**:**');
                          if (parts.length === 2) {
                            const key = parts[0].substring(3);
                            const value = parts[1];
                            return `<div class="mb-2"><strong class="text-gray-900">${key}:</strong>${value}</div>`;
                          }
                        }
                        if (line.startsWith('- ')) {
                          return `<li class="ml-4 mb-1">${line.substring(2)}</li>`;
                        }
                        if (line.startsWith('1. **')) {
                          const content = line.substring(3);
                          return `<li class="ml-4 mb-1">${content}</li>`;
                        }
                        if (line.trim() === '') {
                          return '<br>';
                        }
                        if (line.includes('*"') && line.includes('"*')) {
                          return `<blockquote class="border-l-4 border-akan-gold pl-4 italic text-gray-700 my-4">${line}</blockquote>`;
                        }
                        return `<p class="text-gray-700 leading-relaxed mb-4">${line}</p>`;
                      })
                      .join('')
                  }}
                />
              ) : (
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">{item.content}</p>
                  
                  {section === 'history' && item.timeline && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Timeline:</h3>
                      <p className="text-gray-700">{item.timeline}</p>
                      {item.significance && (
                        <>
                          <h3 className="font-semibold text-gray-900 mb-2 mt-4">Significance:</h3>
                          <p className="text-gray-700">{item.significance}</p>
                        </>
                      )}
                    </div>
                  )}
                  
                  {section === 'arts' && item.examples && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Examples:</h3>
                      <div className="space-y-2">
                        {item.examples.map((example, index) => (
                          <div key={index} className="bg-white p-3 rounded-lg">
                            <div className="font-medium text-gray-900">{example.symbol}</div>
                            <div className="text-sm text-gray-600">{example.meaning}</div>
                            <div className="text-xs text-gray-500">{example.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {section === 'music' && item.instruments && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Instruments:</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.instruments.map((instrument, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 rounded-full text-sm"
                            style={{backgroundColor: '#f1d799', color: '#564c38'}}
                          >
                            {instrument}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                
                <Link 
                  to="/culture" 
                  className="inline-flex items-center px-4 py-2 bg-akan-gold text-white rounded-lg hover:bg-akan-gold-dark transition-colors"
                >
                  Explore More Culture
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CultureDetail;