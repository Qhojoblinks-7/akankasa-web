import React, { useState, useMemo, useEffect } from 'react';
import { Search, Volume2, BookOpen, MapPin, Heart, Download, Filter, ArrowUpDown, X } from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import { getDictionary, getFavorites, saveFavorites } from '../api';
import { dictionaryData } from '../data/mockData';
import { useUI } from '../hooks/useRadux';

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDialect, setSelectedDialect] = useState('all');
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState('all');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [searchDirection, setSearchDirection] = useState('akan-english');
  const [favorites, setFavorites] = useState([]);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const { showSuccessToast } = useUI();

  // Load dictionary & favorites via API wrapper
  useEffect(() => {
    let mounted = true;
    getDictionary().then(() => {});

    getFavorites().then(list => {
      if (mounted) setFavorites(list || []);
    });

    return () => { mounted = false; };
  }, []);

  const toggleFavorite = (wordId) => {
    setFavorites(prev => {
      const next = prev.includes(wordId) ? prev.filter(id => id !== wordId) : [...prev, wordId];
      saveFavorites(next);
      const word = dictionaryData.find(w => w.id === wordId);
      if (next.includes(wordId)) {
        showSuccessToast(`${word?.akan || 'Word'} added to favorites`);
      } else {
        showSuccessToast(`${word?.akan || 'Word'} removed from favorites`);
      }
      return next;
    });
  };

  // No global audio cleanup needed; AudioPlayer manages its own audio instances

  const dialects = ['all', 'Twi', 'Fante', 'Akuapem'];
  const partsOfSpeech = ['all', 'noun', 'verb', 'adjective', 'adverb', 'interjection'];

  const filteredWords = useMemo(() => {
    let filtered = dictionaryData.filter(word => {
      const matchesSearch = searchDirection === 'akan-english'
        ? word.akan.toLowerCase().includes(searchTerm.toLowerCase())
        : word.english.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDialect = selectedDialect === 'all' || word.dialect === selectedDialect;
      const matchesPartOfSpeech = selectedPartOfSpeech === 'all' || word.partOfSpeech === selectedPartOfSpeech;
      
      return matchesSearch && matchesDialect && matchesPartOfSpeech;
    });

    // Sort results
    if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => 
        searchDirection === 'akan-english' 
          ? a.akan.localeCompare(b.akan)
          : a.english.localeCompare(b.english)
      );
    }

    return filtered;
  }, [searchTerm, selectedDialect, selectedPartOfSpeech, sortBy, searchDirection]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSizeOptions = [10, 20, 50];
  const [pageSize, setPageSize] = useState(10);

  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDialect, selectedPartOfSpeech, sortBy, searchDirection, pageSize]);

  const totalResults = filteredWords.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

  // Ensure currentPage is within bounds
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(totalResults, startIndex + pageSize);
  const paginatedWords = filteredWords.slice(startIndex, endIndex);

  const searchSuggestions = useMemo(() => {
    if (searchTerm.length < 2) return [];
    
    return dictionaryData
      .filter(word => 
        searchDirection === 'akan-english'
          ? word.akan.toLowerCase().startsWith(searchTerm.toLowerCase())
          : word.english.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      .slice(0, 5)
      .map(word => searchDirection === 'akan-english' ? word.akan : word.english);
  }, [searchTerm, searchDirection]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header - Mobile First with overflow protection */}
      <div className="text-white overflow-hidden" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 box-border">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight break-words">
            Akan Dictionary
          </h1>
          <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-3xl leading-relaxed break-words">
            Comprehensive bilingual dictionary with audio pronunciations, etymologies, and cultural context
          </p>
        </div>
      </div>

      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 box-border overflow-hidden">
        {/* Search Section - Mobile First with overflow protection */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-4 mb-6 overflow-hidden">
            {/* Search Direction Toggle - Mobile First with overflow protection */}
            <div className="flex bg-gray-100 rounded-lg p-1 w-full lg:w-auto overflow-hidden">
              <button
                onClick={() => setSearchDirection('akan-english')}
                className="flex-1 lg:flex-none px-3 sm:px-4 py-2 sm:py-2.5 rounded-md text-sm font-medium transition-colors min-h-[44px] break-words"
                style={searchDirection === 'akan-english' 
                  ? {backgroundColor: '#564c38', color: 'white'} 
                  : {color: '#6b7280'}}
                onMouseEnter={(e) => {
                  if (searchDirection !== 'akan-english') {
                    e.target.style.color = '#111827';
                  }
                }}
                onMouseLeave={(e) => {
                  if (searchDirection !== 'akan-english') {
                    e.target.style.color = '#6b7280';
                  }
                }}
                aria-label="Search from Akan to English"
              >
                Akan → English
              </button>
              <button
                onClick={() => setSearchDirection('english-akan')}
                className="flex-1 lg:flex-none px-3 sm:px-4 py-2 sm:py-2.5 rounded-md text-sm font-medium transition-colors min-h-[44px] break-words"
                style={searchDirection === 'english-akan' 
                  ? {backgroundColor: '#564c38', color: 'white'} 
                  : {color: '#6b7280'}}
                onMouseEnter={(e) => {
                  if (searchDirection !== 'english-akan') {
                    e.target.style.color = '#111827';
                  }
                }}
                onMouseLeave={(e) => {
                  if (searchDirection !== 'english-akan') {
                    e.target.style.color = '#6b7280';
                  }
                }}
                aria-label="Search from English to Akan"
              >
                English → Akan
              </button>
            </div>

            {/* Search Input - Mobile First with overflow protection */}
            <div className="flex-1 relative overflow-hidden">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Search in ${searchDirection === 'akan-english' ? 'Akan' : 'English'}...`}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-base box-border"
                  style={{'--tw-ring-color': '#564c38'}}
                  onFocus={(e) => e.target.style.ringColor = '#564c38'}
                  aria-label={`Search for words in ${searchDirection === 'akan-english' ? 'Akan' : 'English'}`}
                />
              </div>
              
              {/* Search Suggestions - Mobile First with overflow protection */}
              {searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10 overflow-hidden">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchTerm(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg text-sm sm:text-base min-h-[44px] break-words"
                      aria-label={`Select suggestion: ${suggestion}`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Filters - Mobile First with overflow protection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
            {/* Dialect Filter */}
            <div className="overflow-hidden">
              <label className="block text-sm font-medium text-gray-700 mb-2 break-words">Dialect</label>
              <select
                value={selectedDialect}
                onChange={(e) => setSelectedDialect(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent min-h-[44px] text-base box-border"
                style={{'--tw-ring-color': '#564c38'}}
                aria-label="Filter by dialect"
              >
                {dialects.map(dialect => (
                  <option key={dialect} value={dialect} className="break-words">
                    {dialect === 'all' ? 'All Dialects' : dialect}
                  </option>
                ))}
              </select>
            </div>

            {/* Part of Speech Filter */}
            <div className="overflow-hidden">
              <label className="block text-sm font-medium text-gray-700 mb-2 break-words">Part of Speech</label>
              <select
                value={selectedPartOfSpeech}
                onChange={(e) => setSelectedPartOfSpeech(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent min-h-[44px] text-base box-border"
                aria-label="Filter by part of speech"
              >
                {partsOfSpeech.map(pos => (
                  <option key={pos} value={pos} className="break-words">
                    {pos === 'all' ? 'All Types' : pos.charAt(0).toUpperCase() + pos.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="overflow-hidden">
              <label className="block text-sm font-medium text-gray-700 mb-2 break-words">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent min-h-[44px] text-base box-border"
                aria-label="Sort results by"
              >
                <option value="alphabetical">Alphabetical</option>
                <option value="relevance">Relevance</option>
              </select>
            </div>

            {/* Quick Actions - Mobile First with overflow protection */}
            <div className="flex items-end space-x-2 overflow-hidden">
              <button 
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center min-h-[44px] font-medium flex-shrink-0"
                aria-label="Export dictionary data"
              >
                <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm sm:text-base break-words">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dictionary Features - Mobile First with overflow protection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 overflow-hidden">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center overflow-hidden">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mx-auto mb-3 flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base break-words">Comprehensive</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">Over 500+ words with detailed definitions</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center overflow-hidden">
            <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mx-auto mb-3 flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base break-words">Audio Pronunciation</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">Native speaker recordings for every word</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center overflow-hidden">
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mx-auto mb-3 flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base break-words">Regional Variants</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">Different dialects and pronunciations</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center overflow-hidden">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mx-auto mb-3 flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base break-words">Etymology</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">Word origins and historical development</p>
          </div>
        </div>

        {/* Mobile Favorites Toggle with overflow protection */}
        <div className="lg:hidden mb-4 overflow-hidden">
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="w-full bg-white p-4 rounded-lg shadow-md flex items-center justify-between box-border"
            aria-label={`${showFavorites ? 'Hide' : 'Show'} favorites panel`}
          >
            <span className="font-medium text-gray-900 break-words">Favorites ({favorites.length})</span>
            <Heart className={`w-5 h-5 flex-shrink-0 ${showFavorites ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Results - Mobile First with overflow protection */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Results Header with overflow protection */}
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 overflow-hidden">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">
                Dictionary Results ({filteredWords.length})
              </h2>
              {filteredWords.length > 0 && (
                <p className="text-xs sm:text-sm text-gray-600 break-words">
                  Showing {filteredWords.length} {filteredWords.length === 1 ? 'result' : 'results'}
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              )}
            </div>
          </div>

          {/* Word Entries - Mobile First with overflow protection */}
          <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-3 overflow-hidden">
            <div className="lg:col-span-2 overflow-hidden">
              {totalResults === 0 ? (
                <div className="px-4 sm:px-6 py-12 text-center overflow-hidden">
                  <Search className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 break-words">No results found</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-words">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                </div>
              ) : (
                paginatedWords.map((word) => (
                  <div key={word.id} className="px-4 sm:px-6 py-4 sm:py-6 hover:bg-gray-50 transition-colors overflow-hidden">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 overflow-hidden">
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4 overflow-hidden">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight break-words min-w-0">
                            {word.akan}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap overflow-hidden">
                            <AudioPlayer
                              src={word.audio}
                              playing={playingAudio === word.audio}
                              onPlay={() => setPlayingAudio(word.audio)}
                              onPause={() => setPlayingAudio(null)}
                            />
                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium break-words flex-shrink-0">
                              {word.partOfSpeech}
                            </span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs break-words flex-shrink-0">
                              {word.dialect}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-base sm:text-lg text-gray-700 mb-2 leading-relaxed break-words">
                          {word.english}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 leading-relaxed break-words">
                          Pronunciation: <span className="font-mono break-all">{word.pronunciation}</span>
                        </p>

                        {/* Examples - Mobile First with overflow protection */}
                        {word.examples && word.examples.length > 0 && (
                          <div className="mb-4 overflow-hidden">
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base break-words">Examples:</h4>
                            {word.examples.map((example, index) => (
                              <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2 overflow-hidden">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 overflow-hidden">
                                  <div className="flex-1 min-w-0 overflow-hidden">
                                    <p className="font-medium text-gray-900 text-sm sm:text-base leading-tight break-words">
                                      {example.akan}
                                    </p>
                                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed break-words">
                                      {example.english}
                                    </p>
                                  </div>
                                  <AudioPlayer
                                    src={example.audio}
                                    playing={playingAudio === example.audio}
                                    onPlay={() => setPlayingAudio(example.audio)}
                                    onPause={() => setPlayingAudio(null)}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Etymology - Mobile First with overflow protection */}
                        {word.etymology && (
                          <div className="mb-4 overflow-hidden">
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base break-words">Etymology:</h4>
                            <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed break-words">
                              {word.etymology}
                            </p>
                          </div>
                        )}

                        {/* Related Words - Mobile First with overflow protection */}
                        {word.related && word.related.length > 0 && (
                          <div className="overflow-hidden">
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base break-words">Related Words:</h4>
                            <div className="flex flex-wrap gap-2 overflow-hidden">
                              {word.related.map((relatedWord, index) => (
                                <span key={index} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs sm:text-sm break-words flex-shrink-0">
                                  {relatedWord}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Favorite Button - Mobile First with overflow protection */}
                      <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-2 flex-shrink-0 overflow-hidden">
                        <button
                          onClick={() => toggleFavorite(word.id)}
                          className={`p-2 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                            favorites.includes(word.id)
                              ? 'text-red-500 bg-red-50 hover:bg-red-100'
                              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                          }`}
                          aria-pressed={favorites.includes(word.id)}
                          aria-label={`${favorites.includes(word.id) ? 'Remove' : 'Add'} ${word.akan} to favorites`}
                        >
                          <Heart className={`w-5 h-5 ${favorites.includes(word.id) ? 'fill-current' : ''}`} />
                        </button>
                        {favorites.includes(word.id) && (
                          <button
                            onClick={() => setFavorites(prev => prev.filter(id => id !== word.id))}
                            className="text-xs text-gray-500 hover:text-gray-700 min-h-[44px] px-2 break-words"
                            aria-label={`Remove ${word.akan} from favorites`}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Favorites panel - Mobile First with overflow protection */}
            <aside className={`lg:col-span-1 border-t lg:border-t-0 lg:border-l border-gray-100 p-4 bg-gray-50 ${showFavorites ? 'block' : 'hidden lg:block'} overflow-hidden`}>
              <div className="flex items-center justify-between mb-4 overflow-hidden">
                <h3 className="font-semibold text-sm sm:text-base break-words">Favorites ({favorites.length})</h3>
                <div className="flex items-center gap-2 flex-shrink-0 overflow-hidden">
                  <button 
                    onClick={() => setFavorites([])} 
                    className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 min-h-[44px] px-2 break-words"
                    aria-label="Clear all favorites"
                  >
                    Clear
                  </button>
                  <button 
                    onClick={() => setShowFavorites(false)}
                    className="lg:hidden text-gray-500 hover:text-gray-700 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Hide favorites panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {favorites.length === 0 ? (
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
                  No favorites yet. Click the heart next to a word to save it here.
                </p>
              ) : (
                <ul className="space-y-3 overflow-hidden">
                  {favorites.map(fid => {
                    const w = dictionaryData.find(d => d.id === fid);
                    if (!w) return null;
                    return (
                      <li key={fid} className="bg-white p-3 rounded shadow-sm overflow-hidden">
                        <div className="flex justify-between items-start gap-2 overflow-hidden">
                          <div className="flex-1 min-w-0 overflow-hidden">
                            <div className="font-medium text-sm sm:text-base leading-tight break-words">{w.akan}</div>
                            <div className="text-xs sm:text-sm text-gray-500 leading-relaxed break-words">{w.english}</div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 overflow-hidden">
                            <button 
                              onClick={() => { setPlayingAudio(w.audio); }} 
                              className="text-yellow-600 text-xs sm:text-sm min-h-[44px] px-2 break-words"
                              aria-label={`Play pronunciation of ${w.akan}`}
                            >
                              Play
                            </button>
                            <button 
                              onClick={() => setFavorites(prev => prev.filter(id => id !== fid))} 
                              className="text-gray-400 hover:text-red-500 min-h-[44px] p-1 min-w-[44px] flex items-center justify-center"
                              aria-label={`Remove ${w.akan} from favorites`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </aside>
          </div>
        </div>

        {/* Pagination Controls - Mobile First with overflow protection */}
        {totalResults > 0 && (
          <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 overflow-hidden">
              <label className="text-xs sm:text-sm text-gray-600 break-words">Page size:</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm min-h-[44px] box-border"
                aria-label="Select page size"
              >
                {pageSizeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left break-words">
                Showing {startIndex + 1}-{endIndex} of {totalResults}
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-hidden">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded border min-h-[44px] text-sm font-medium flex-shrink-0 ${
                  currentPage === 1 
                    ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
                    : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                aria-label="Go to previous page"
              >
                Prev
              </button>

              {/* Page numbers - Mobile First with overflow protection */}
              <div className="flex items-center gap-1 overflow-hidden">
                {(() => {
                  const pages = [];
                  const maxButtons = 5; // Reduced for mobile
                  let start = Math.max(1, currentPage - 2);
                  let end = Math.min(totalPages, start + maxButtons - 1);
                  if (end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);
                  for (let p = start; p <= end; p++) {
                    pages.push(
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`px-2 sm:px-3 py-2 rounded min-h-[44px] text-sm font-medium flex-shrink-0 ${
                          p === currentPage 
                            ? 'bg-[#564c38] text-white' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        aria-label={`Go to page ${p}`}
                      >
                        {p}
                      </button>
                    );
                  }
                  return pages;
                })()}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded border min-h-[44px] text-sm font-medium flex-shrink-0 ${
                  currentPage === totalPages 
                    ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
                    : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                aria-label="Go to next page"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;