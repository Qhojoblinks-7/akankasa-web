// src/components/CultureHighlights.jsx
import React, { useEffect } from 'react';
import { Calendar, MapPin, X, Users, Music, Palette, BookOpen, Play, Image, ChevronRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCulture, useUI } from '../hooks/useRadux';
import ContributeModal from './ContributeModal';

const CultureHighlights = () => {
  const navigate = useNavigate();
  const {
    activeSection,
    selectedRegion,
    searchTerm,
    isLoading,
    error,
    filteredContent,
    availableRegions,
    setActiveSection,
    setRegionFilter,
    setSearchTerm,
    loadCulturalData,
  } = useCulture();
  
  const {
    isContributeModalOpen,
    setContributeModal,
    showSuccessToast,
  } = useUI();

  const sections = [
    { id: 'traditions', label: 'Traditions & Customs', icon: Users, color: '#564c38' },
    { id: 'history', label: 'History & Heritage', icon: BookOpen, color: '#695e46' },
    { id: 'symbols', label: 'Symbols & Arts', icon: Palette, color: '#77705c' },
  ];

  // Load cultural data on component mount
  useEffect(() => {
    loadCulturalData();
  }, [loadCulturalData]);

  const handleContributeSubmit = (newContent) => {
    console.log('New content submitted:', newContent);
    showSuccessToast('Thank you for your contribution! We will review it shortly.');
    setContributeModal(false);
  };

  const handleLearnMore = (item) => {
    if (activeSection === 'history') {
      // Navigate to the history detail page for history items
      navigate(`/culture/history/${item.id}`);
    } else if (activeSection === 'traditions') {
      // Navigate to the traditions detail page for tradition items
      navigate(`/culture/traditions/${item.id}`);
    } else {
      // For other sections, show the modal
      // Note: This would need to be implemented with Radux state
      console.log('Show modal for:', item);
    }
  };

  const CultureCard = ({ item, sectionType }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-32 sm:h-40 md:h-48" style={{background: 'linear-gradient(135deg, #f1d799 0%, #564c38 100%)'}}>
        <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
          <div className="text-white text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 leading-tight">{item.title}</h3>
            <p className="text-xs sm:text-sm opacity-90 leading-tight">{item.description}</p>
          </div>
        </div>
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
          <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs">
            {item.region || 'All Regions'}
          </span>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="mb-3 sm:mb-4">
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{item.content}</p>
        </div>

        {sectionType === 'history' && item.timeline && (
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              <span>{item.timeline}</span>
            </div>
            {item.significance && (
              <div className="mt-2">
                <span className="font-semibold text-gray-900 text-xs sm:text-sm">Significance:</span>
                <p className="text-gray-700 text-xs sm:text-sm">{item.significance}</p>
              </div>
            )}
          </div>
        )}

        {sectionType === 'arts' && item.examples && (
          <div className="mb-3 sm:mb-4">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Examples:</h4>
            <div className="space-y-2">
              {item.examples.map((example, index) => (
                <div key={index} className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                  <div className="font-medium text-gray-900 text-sm">{example.symbol}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{example.meaning}</div>
                  <div className="text-xs text-gray-500">{example.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sectionType === 'music' && item.instruments && (
          <div className="mb-3 sm:mb-4">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Instruments:</h4>
            <div className="flex flex-wrap gap-2">
              {item.instruments.map((instrument, index) => (
                <span key={index} className="px-2 py-1 rounded-full text-xs sm:text-sm" style={{backgroundColor: '#f1d799', color: '#564c38'}}>
                  {instrument}
                </span>
              ))}
            </div>
          </div>
        )}

        {item.tags && (
          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            {item.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
          <button
            onClick={() => handleLearnMore(item)}
            className="font-medium text-sm flex items-center transition-colors w-full justify-center sm:justify-start py-2 sm:py-1 min-h-[44px] sm:min-h-[32px]"
            style={{color: '#564c38'}}
            onMouseEnter={(e) => e.target.style.color = '#695e46'}
            onMouseLeave={(e) => e.target.style.color = '#564c38'}
          >
            Learn More
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mt-15 bg-gray-50">
      {/* Header - Mobile first */}
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">Akan Culture Highlights</h1>
          <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-3xl leading-relaxed">
            Explore the rich traditions, fascinating history, beautiful arts, and vibrant culture of the Akan people
          </p>
        </div>
      </div>
      
      {/* Section Navigation - Mobile optimized */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto scrollbar-hide pb-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className="flex items-center space-x-2 py-3 sm:py-4 px-3 sm:px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors min-w-fit"
                  style={activeSection === section.id
                    ? {borderColor: '#f59e0b', color: '#564c38'}
                    : {borderColor: 'transparent', color: '#6b7280'}}
                  onMouseEnter={(e) => {
                    if (activeSection !== section.id) {
                      e.target.style.color = '#374151';
                      e.target.style.borderColor = '#d1d5db';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== section.id) {
                      e.target.style.color = '#6b7280';
                      e.target.style.borderColor = 'transparent';
                    }
                  }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
        {/* Filters and Search - Mobile first */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Content</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search traditions, stories, or topics..."
                  className="w-full pl-10 pr-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-base"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-3 sm:py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-base"
              >
                {availableRegions.map(region => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Section Content - Mobile first */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center mb-4 sm:mb-6">
            {sections.find(s => s.id === activeSection) && (() => {
              const Icon = sections.find(s => s.id === activeSection).icon;
              return (
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-3 sm:mr-4`} style={{backgroundColor: sections.find(s => s.id === activeSection).color}}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              );
            })()}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                {sections.find(s => s.id === activeSection)?.label}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {filteredContent.length} {filteredContent.length === 1 ? 'item' : 'items'} found
              </p>
            </div>
          </div>
          
          {/* Content Grid - Mobile first */}
          {filteredContent.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-sm sm:text-base text-gray-600 px-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredContent.map((item) => (
                <CultureCard
                  key={item.id}
                  item={item}
                  sectionType={activeSection}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Multimedia Gallery - Mobile first */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Multimedia Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { type: 'video', title: 'Traditional Drumming', description: 'Learn about Akan drumming traditions', link: '/culture/drumming' },
              { type: 'audio', title: 'Folk Stories', description: 'Listen to traditional Akan stories', link: '/culture/folk-stories' },
              { type: 'image', title: 'Festival Photos', description: 'Browse photos from cultural festivals', link: '/festival-photos' },
              { type: 'document', title: 'Research Papers', description: 'Academic studies on Akan culture', link: '/culture/research-papers' }
            ].map((media, index) => (
              <a
                key={index}
                href={media.link}
                className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow block min-h-[120px] sm:min-h-[140px]"
              >
                <div className="flex items-center mb-2 sm:mb-3">
                  {media.type === 'video' && <Play className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 mr-2" />}
                  {media.type === 'audio' && <Music className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 mr-2" />}
                  {media.type === 'image' && <Image className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 mr-2" />}
                  {media.type === 'document' && <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 mr-2" />}
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{media.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{media.description}</p>
                <span className="text-yellow-600 hover:text-yellow-700 text-xs sm:text-sm font-medium">
                  Explore →
                </span>
              </a>
            ))}
          </div>
        </div>
        
        {/* User Contribution Section - Mobile first */}
        <div className="bg-gradient-to-r from-yellow-700 to-yellow-600 text-white rounded-lg p-6 sm:p-8 mt-6 sm:mt-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Share Your Knowledge</h3>
            <p className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6 px-2">
              Help preserve Akan culture by contributing your stories, photos, and knowledge
            </p>
            <button
              onClick={() => setContributeModal(true)}
              className="bg-white text-yellow-500 px-4 sm:px-6 py-3 rounded-lg font-semibold hover:text-gray-100 hover:bg-gray-500 transition-colors min-h-[44px] w-full sm:w-auto"
            >
              Contribute Content
            </button>
          </div>
        </div>
        
        {/* Modals */}
        <ContributeModal
          isOpen={isContributeModalOpen}
          onClose={() => setContributeModal(false)}
          onSubmit={handleContributeSubmit}
        />
      </div>
    </div>
  );
};

export default CultureHighlights;