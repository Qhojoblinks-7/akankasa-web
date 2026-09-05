import React, { useState, useMemo, useEffect } from 'react';

import { Search, Volume2, BookOpen, MapPin, Heart, Download, Filter, ArrowUpDown, X } from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import { getDictionary, getFavorites, saveFavorites } from '../api';

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDialect, setSelectedDialect] = useState('all');
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState('all');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [searchDirection, setSearchDirection] = useState('akan-english');
  const [favorites, setFavorites] = useState([]);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDictionary({
          q: searchTerm,
          direction: searchDirection,
          dialect: selectedDialect,
          partOfSpeech: selectedPartOfSpeech,
          sort: sortBy === 'relevance' ? 'relevance' : undefined,
          page,
          limit: pageSize,
        });
        const items = Array.isArray(data) ? data : (data.results || []);
        if (mounted) {
          setResults(items);
          setTotal(Array.isArray(data) ? data.length : (data.total || items.length));
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setResults([]);
          setTotal(0);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, [searchTerm, selectedDialect, selectedPartOfSpeech, sortBy, searchDirection, page, pageSize]);

  useEffect(() => {
    let mounted = true;
    getFavorites().then(list => {
      if (mounted) setFavorites(list || []);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const data = await getDictionary({
          q: searchTerm,
          direction: searchDirection,
          dialect: selectedDialect,
          partOfSpeech: selectedPartOfSpeech,
          limit: 5,
        });
        const items = Array.isArray(data) ? data : (data.results || []);
        setSuggestions(items.map(item => searchDirection === 'akan-english' ? item.primary_akan : item.english_translation));
      } catch {
        setSuggestions([]);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [searchTerm, searchDirection, selectedDialect, selectedPartOfSpeech]);

  const toggleFavorite = (wordId) => {
    setFavorites(prev => {
      const next = prev.includes(wordId) ? prev.filter(id => id !== wordId) : [...prev, wordId];
      saveFavorites(next);
      return next;
    });
  };

  const wordById = useMemo(() => {
    const map = new Map();
    results.forEach(w => map.set(w.id, w));
    return map;
  }, [results]);

  const dialects = ['all', 'Twi', 'Fante', 'Akuapem'];
  const partsOfSpeech = ['all', 'noun', 'verb', 'adjective', 'adverb', 'interjection'];

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const startIndex = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIndex = Math.min(total, page * pageSize);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Akan Dictionary</h1>
          <p className="text-base opacity-90 max-w-3xl">
            Comprehensive bilingual dictionary with audio pronunciations, etymologies, and cultural context
          </p>
        </div>
      </div>

  <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg" role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3 mb-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => { setSearchDirection('akan-english'); setPage(1); }}
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                style={searchDirection === 'akan-english' 
                  ? {backgroundColor: '#564c38', color: 'white'} 
                  : {color: '#6b7280'}}
              >
                Akan → English
              </button>
              <button
                onClick={() => { setSearchDirection('english-akan'); setPage(1); }}
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                style={searchDirection === 'english-akan' 
                  ? {backgroundColor: '#564c38', color: 'white'} 
                  : {color: '#6b7280'}}
              >
                English → Akan
              </button>
            </div>

            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                  placeholder={`Search in ${searchDirection === 'akan-english' ? 'Akan' : 'English'}...`}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  style={{'--tw-ring-color': '#564c38'}}
                  aria-label={`Search dictionary in ${searchDirection === 'akan-english' ? 'Akan' : 'English'}`}
                />
              </div>
              
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10" role="listbox" aria-label="Search suggestions">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => { setSearchTerm(suggestion); setPage(1); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      role="option"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dialect</label>
              <select
                value={selectedDialect}
                onChange={(e) => { setSelectedDialect(e.target.value); setPage(1); }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent"
                style={{'--tw-ring-color': '#564c38'}}
              >
                {dialects.map(dialect => (
                  <option key={dialect} value={dialect}>
                    {dialect === 'all' ? 'All Dialects' : dialect}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Part of Speech</label>
              <select
                value={selectedPartOfSpeech}
                onChange={(e) => { setSelectedPartOfSpeech(e.target.value); setPage(1); }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent"
              >
                {partsOfSpeech.map(pos => (
                  <option key={pos} value={pos}>
                    {pos === 'all' ? 'All Types' : pos.charAt(0).toUpperCase() + pos.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent"
              >
                <option value="alphabetical">Alphabetical</option>
                <option value="relevance">Relevance</option>
              </select>
            </div>

            <div className="flex items-end space-x-2">
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
           <div className="bg-white p-4 rounded-lg shadow-md text-center">
             <BookOpen className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
             <h3 className="font-semibold text-gray-900 text-sm mb-1">Comprehensive</h3>
             <p className="text-xs text-gray-600">Over 500+ words with detailed definitions</p>
           </div>
           <div className="bg-white p-4 rounded-lg shadow-md text-center">
             <Volume2 className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
             <h3 className="font-semibold text-gray-900 text-sm mb-1">Audio Pronunciation</h3>
             <p className="text-xs text-gray-600">Native speaker recordings for every word</p>
           </div>
           <div className="bg-white p-4 rounded-lg shadow-md text-center">
             <MapPin className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
             <h3 className="font-semibold text-gray-900 text-sm mb-1">Regional Variants</h3>
             <p className="text-xs text-gray-600">Different dialects and pronunciations</p>
           </div>
           <div className="bg-white p-4 rounded-lg shadow-md text-center">
             <Heart className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
             <h3 className="font-semibold text-gray-900 text-sm mb-1">Etymology</h3>
             <p className="text-xs text-gray-600">Word origins and historical development</p>
           </div>
         </div>

  <div className="bg-white rounded-lg shadow-lg">
           <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Dictionary Results ({total})
              </h2>
              {total > 0 && (
                <p className="text-sm text-gray-600">
                  Showing {startIndex}-{endIndex} of {total}
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              )}
            </div>
          </div>

          <div className="divide-y divide-gray-200 md:grid md:grid-cols-3">
            <div className="md:col-span-2">
              {loading ? (
                <div className="px-6 py-12 text-center text-gray-500" aria-live="polite" aria-busy="true">Loading...</div>
              ) : total === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                </div>
              ) : (
                 results.map((word) => (
                   <div key={word.id} className="px-4 py-4 hover:bg-gray-50 transition-colors">
                     <div className="flex justify-between items-start mb-3">
                       <div className="flex-1">
                         <div className="flex items-center space-x-3 mb-2">
                           <h3 className="text-lg font-bold text-gray-900">{word.primary_akan}</h3>
                          <div>
                            {word.audio && (
                              <AudioPlayer
                                src={word.audio}
                                playing={playingAudio === word.audio}
                                onPlay={() => setPlayingAudio(word.audio)}
                                onPause={() => setPlayingAudio(null)}
                              />
                            )}
                          </div>
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                            {word.part_of_speech}
                          </span>
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {word.dialect}
                          </span>
                        </div>
                        
                         <p className="text-base text-gray-700 mb-2">{word.english_translation}</p>
                        {word.variations && word.variations[0]?.phonetic_script && (
                          <p className="text-sm text-gray-500 mb-4">
                            Pronunciation: <span className="font-mono">{word.variations[0].phonetic_script}</span>
                          </p>
                        )}

                        {word.etymology && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Etymology:</h4>
                            <p className="text-sm text-gray-600 italic">{word.etymology}</p>
                          </div>
                        )}
                      </div>

                      <div className="ml-4 flex flex-col items-center space-y-2">
                        <button
                          onClick={() => toggleFavorite(word.id)}
                          className={`p-2 rounded-full transition-colors ${
                            favorites.includes(word.id)
                              ? 'text-red-500 bg-red-50 hover:bg-red-100'
                              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                          }`}
                          aria-pressed={favorites.includes(word.id)}
                          aria-label={favorites.includes(word.id) ? `Remove ${word.primary_akan} from favorites` : `Add ${word.primary_akan} to favorites`}
                        >
                          <Heart className={`w-5 h-5 ${favorites.includes(word.id) ? 'fill-current' : ''}`} />
                        </button>
                        {favorites.includes(word.id) && (
                          <button
                            onClick={() => setFavorites(prev => prev.filter(id => id !== word.id))}
                            className="text-xs text-gray-500 hover:text-gray-700"
                            aria-label={`Remove ${word.primary_akan} from favorites`}
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

            <aside className="md:col-span-1 border-l border-gray-100 p-3 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Favorites ({favorites.length})</h3>
                <button onClick={() => setFavorites([])} className="text-sm text-gray-500 hover:text-gray-700" aria-label="Clear all favorites">Clear</button>
              </div>
              {favorites.length === 0 ? (
                <p className="text-sm text-gray-600">No favorites yet. Click the heart next to a word to save it here.</p>
              ) : (
                <ul className="space-y-3">
                  {favorites.map(fid => {
                    const w = wordById.get(fid);
                    if (!w) return null;
                    return (
                      <li key={fid} className="bg-white p-3 rounded shadow-sm flex justify-between items-center">
                        <div>
                          <div className="font-medium">{w.primary_akan}</div>
                          <div className="text-sm text-gray-500">{w.english_translation}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {w.audio && (
                            <button onClick={() => { setPlayingAudio(w.audio); }} className="text-yellow-600" aria-label={`Play pronunciation for ${w.primary_akan}`}>Play</button>
                          )}
                          <button onClick={() => setFavorites(prev => prev.filter(id => id !== fid))} className="text-gray-400 hover:text-red-500" aria-label={`Remove ${w.primary_akan} from favorites`}><X className="w-4 h-4" /></button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </aside>
          </div>
        </div>

        {total > 0 && (
          <div className="mt-6 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Page size:</label>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <div className="text-sm text-gray-600">Showing {startIndex}-{endIndex} of {total}</div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`px-3 py-1 rounded border ${page === 1 ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >Prev</button>

              <div className="flex items-center space-x-1">
                {(() => {
                  const pages = [];
                  const maxButtons = 7;
                  let start = Math.max(1, page - 3);
                  let end = Math.min(totalPages, start + maxButtons - 1);
                  if (end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);
                  for (let p = start; p <= end; p++) {
                    pages.push(
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-3 py-1 rounded ${p === page ? 'bg-[#564c38] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                      >{p}</button>
                    );
                  }
                  return pages;
                })()}
              </div>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded border ${page === totalPages ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
