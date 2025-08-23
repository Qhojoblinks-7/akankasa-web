import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Headphones, Video } from 'lucide-react';
import folkStories from '../data/folkStories';
import StoryCard from '../components/folk/StoryCard';
import StoryPlayer from '../components/folk/StoryPlayer';

const CultureFolkStories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStory, setSelectedStory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories and languages for filter options
  const categories = ['all', ...new Set(folkStories.map(story => story.category))];
  const languages = ['all', ...new Set(folkStories.map(story => story.language))];
  const types = ['all', 'audio', 'video'];

  // Filter stories based on search and filters
  const filteredStories = folkStories.filter(story => {
    const matchesSearch = !searchTerm || 
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || story.language === selectedLanguage;
    const matchesType = selectedType === 'all' || story.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesLanguage && matchesType;
  });

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  const closePlayer = () => {
    setSelectedStory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
          <div className="flex items-center mb-4 overflow-hidden">
            <BookOpen className="w-10 h-10 mr-4 flex-shrink-0" />
            <h1 className="text-4xl font-bold break-words">Folk Stories</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl break-words">
            Traditional Akan folk stories, proverbs, and oral traditions passed down through generations. 
            Listen or watch these captivating tales that preserve our cultural heritage.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden">
            {/* Search */}
            <div className="md:col-span-2 overflow-hidden">
              <div className="relative overflow-hidden">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search stories, narrators, or themes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent box-border overflow-hidden"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Filter Toggle */}
            <div className="overflow-hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 min-h-[44px] break-words"
              >
                <Filter className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="break-words">Filters</span>
              </button>
            </div>
            
            {/* Results Count */}
            <div className="flex items-center justify-center text-gray-600 overflow-hidden">
              <span className="break-words">{filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found</span>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t overflow-hidden">
              <div className="overflow-hidden">
                <label className="block text-sm font-medium text-gray-700 mb-1 break-words">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent box-border overflow-hidden min-h-[44px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="break-words">
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="overflow-hidden">
                <label className="block text-sm font-medium text-gray-700 mb-1 break-words">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent box-border overflow-hidden min-h-[44px]"
                >
                  {languages.map(language => (
                    <option key={language} value={language} className="break-words">
                      {language === 'all' ? 'All Languages' : language}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="overflow-hidden">
                <label className="block text-sm font-medium text-gray-700 mb-1 break-words">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent box-border overflow-hidden min-h-[44px]"
                >
                  {types.map(type => (
                    <option key={type} value={type} className="break-words">
                      {type === 'all' ? 'All Types' : type === 'audio' ? 'Audio Only' : 'Video'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Stories Grid */}
        {filteredStories.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center overflow-hidden">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4 flex-shrink-0" />
            <h3 className="text-xl font-medium text-gray-900 mb-2 break-words">No stories found</h3>
            <p className="text-gray-600 break-words">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-hidden">
            {filteredStories.map(story => (
              <StoryCard 
                key={story.id} 
                story={story} 
                onClick={handleStoryClick}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Story Player Modal */}
      {selectedStory && (
        <StoryPlayer 
          story={selectedStory} 
          onClose={closePlayer}
        />
      )}
      
      {/* Back to Culture Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 overflow-hidden">
        <Link 
          to="/culture" 
          className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium break-words min-h-[44px]"
        >
          ← Back to Culture
        </Link>
      </div>
    </div>
  );
};

export default CultureFolkStories;