import React, { useState } from 'react';
import { Search, Filter, FileText } from 'lucide-react';
import researchPapers from '../data/researchPapers';
import ResearchCard from '../components/research/ResearchCard';
import ResearchPlayer from '../components/research/ResearchPlayer';

const CultureResearchPapers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', ...new Set(researchPapers.map(paper => paper.category))];
  const languages = ['all', ...new Set(researchPapers.map(paper => paper.language))];
  const types = ['all', 'pdf', 'audio', 'video'];

  const filteredPapers = researchPapers.filter(paper => {
    const matchesSearch = !searchTerm ||
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || paper.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || paper.language === selectedLanguage;
    const matchesType = selectedType === 'all' || paper.type === selectedType;

    return matchesSearch && matchesCategory && matchesLanguage && matchesType;
  });

  const handlePaperClick = (paper) => {
    setSelectedPaper(paper);
  };

  const closePlayer = () => {
    setSelectedPaper(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
          <div className="flex items-center mb-4 overflow-hidden">
            <FileText className="w-10 h-10 mr-4 flex-shrink-0" />
            <h1 className="text-4xl font-bold break-words">Research Papers</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl break-words">
            Explore academic studies, scholarly articles, and research papers on Akan culture, traditions, 
            and heritage. Access comprehensive analyses by leading scholars and researchers.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-hidden">
            {/* Search */}
            <div className="md:col-span-2 overflow-hidden">
              <div className="relative overflow-hidden">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search papers, authors, or keywords..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border overflow-hidden"
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
            <div className="flex items-center justify-center text-gray-600 col-span-2 overflow-hidden">
              <span className="break-words">{filteredPapers.length} {filteredPapers.length === 1 ? 'paper' : 'papers'} found</span>
            </div>
          </div>

          {/* Filters Section */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 overflow-hidden">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 box-border overflow-hidden min-h-[44px]"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="break-words">{category}</option>
                ))}
              </select>

              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 box-border overflow-hidden min-h-[44px]"
              >
                {languages.map(language => (
                  <option key={language} value={language} className="break-words">{language}</option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 box-border overflow-hidden min-h-[44px]"
              >
                {types.map(type => (
                  <option key={type} value={type} className="break-words">{type}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-hidden">
          {filteredPapers.map(paper => (
            <ResearchCard 
              key={paper.id} 
              paper={paper} 
              onClick={handlePaperClick}
            />
          ))}
        </div>

        {/* Optional Player Modal */}
        {selectedPaper && (
          <ResearchPlayer paper={selectedPaper} onClose={closePlayer} />
        )}
      </div>
    </div>
  );
};

export default CultureResearchPapers;
