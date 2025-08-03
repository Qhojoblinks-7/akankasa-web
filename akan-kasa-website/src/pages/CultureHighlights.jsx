import { useState } from 'react';
import { Calendar, MapPin, Users, Music, Palette, BookOpen, Play, Image, ChevronRight, Filter } from 'lucide-react';
import { cultureData } from '../data/mockData';

const CultureHighlights = () => {
  const [activeSection, setActiveSection] = useState('traditions');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [
    { id: 'traditions', label: 'Traditions & Customs', icon: Users, color: 'bg-red-500' },
    { id: 'history', label: 'History & Heritage', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'arts', label: 'Arts & Crafts', icon: Palette, color: 'bg-green-500' },
    { id: 'music', label: 'Music & Dance', icon: Music, color: 'bg-purple-500' }
  ];

  const regions = ['all', 'Ashanti Region', 'Eastern Region', 'Central Region', 'Western Region'];

  const getCurrentSectionData = () => {
    return cultureData[activeSection] || [];
  };

  const filteredContent = getCurrentSectionData().filter(item => {
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'all' || 
      item.region === selectedRegion;
    
    return matchesSearch && matchesRegion;
  });

  const CultureCard = ({ item, sectionType }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 bg-gradient-to-r from-accent-gold to-primary-deep">
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

        {/* Section-specific content */}
        {sectionType === 'history' && item.timeline && (
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

        {sectionType === 'arts' && item.examples && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
            <div className="space-y-2">
              {item.examples.map((example, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-900">{example.symbol}</div>
                  <div className="text-sm text-gray-600">{example.meaning}</div>
                  <div className="text-xs text-gray-500">{example.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sectionType === 'music' && item.instruments && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Instruments:</h4>
            <div className="flex flex-wrap gap-2">
              {item.instruments.map((instrument, index) => (
                <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm">
                  {instrument}
                </span>
              ))}
            </div>
          </div>
        )}

        {item.tags && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
            Learn More
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-deep via-accent-gold to-primary-muted text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Akan Culture Highlights</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Explore the rich traditions, fascinating history, beautiful arts, and vibrant culture of the Akan people
          </p>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeSection === section.id
                      ? 'border-accent-gold text-primary-deep'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Content</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search traditions, stories, or topics..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-gold focus:border-transparent"
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            {sections.find(s => s.id === activeSection) && (() => {
              const Icon = sections.find(s => s.id === activeSection).icon;
              return (
                <div className={`w-12 h-12 ${sections.find(s => s.id === activeSection).color} rounded-lg flex items-center justify-center mr-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              );
            })()}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {sections.find(s => s.id === activeSection)?.label}
              </h2>
              <p className="text-gray-600">
                {filteredContent.length} {filteredContent.length === 1 ? 'item' : 'items'} found
              </p>
            </div>
          </div>

          {/* Content Grid */}
          {filteredContent.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Cultural Map Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Cultural Map</h3>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map showing cultural regions and traditions</p>
              <p className="text-sm text-gray-500">Coming soon: Click on regions to explore local customs</p>
            </div>
          </div>
        </div>

        {/* Multimedia Gallery */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Multimedia Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { type: 'video', title: 'Traditional Drumming', description: 'Learn about Akan drumming traditions' },
              { type: 'audio', title: 'Folk Stories', description: 'Listen to traditional Akan stories' },
              { type: 'image', title: 'Festival Photos', description: 'Browse photos from cultural festivals' },
              { type: 'document', title: 'Research Papers', description: 'Academic studies on Akan culture' }
            ].map((media, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  {media.type === 'video' && <Play className="w-6 h-6 text-red-500 mr-2" />}
                  {media.type === 'audio' && <Music className="w-6 h-6 text-blue-500 mr-2" />}
                  {media.type === 'image' && <Image className="w-6 h-6 text-green-500 mr-2" />}
                  {media.type === 'document' && <BookOpen className="w-6 h-6 text-purple-500 mr-2" />}
                  <h4 className="font-semibold text-gray-900">{media.title}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">{media.description}</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Explore →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* User Contribution Section */}
        <div className="bg-gradient-to-r from-accent-gold to-primary-deep text-white rounded-lg p-8 mt-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Share Your Knowledge</h3>
            <p className="text-lg opacity-90 mb-6">
              Help preserve Akan culture by contributing your stories, photos, and knowledge
            </p>
                          <button className="bg-white text-primary-deep px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contribute Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CultureHighlights;