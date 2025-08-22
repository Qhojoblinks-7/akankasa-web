import React from 'react';

import { useState, useMemo, useEffect } from 'react';
import { Search, Volume2, BookOpen, MapPin, Heart, Download, Filter, ArrowUpDown, X, Plus, Pencil, Trash2, ListPlus } from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import { getDictionary, getFavorites, saveFavorites, getWordLists, createWordList, renameWordList, deleteWordList, addWordToList, removeWordFromList } from '../api';
import { dictionaryData } from '../data/mockData';
import DictionaryContributionModal from '../components/DictionaryContributionModal.jsx';
import { submitDictionaryContribution } from '../api';

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDialect, setSelectedDialect] = useState('all');
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState('all');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [searchDirection, setSearchDirection] = useState('akan-english');
  const [favorites, setFavorites] = useState([]);
  const [playingAudio, setPlayingAudio] = useState(null);

  const [wordLists, setWordLists] = useState({});
  const [activeListId, setActiveListId] = useState(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [renameState, setRenameState] = useState({ id: null, name: '' });

  const [isContribOpen, setIsContribOpen] = useState(false);

  // Load dictionary, favorites, word lists
  useEffect(() => {
    let mounted = true;
    getDictionary().then(() => {});

    getFavorites().then(list => {
      if (mounted) setFavorites(list || []);
    });

    getWordLists().then(lists => {
      if (mounted) setWordLists(lists || {});
    });

    return () => { mounted = false; };
  }, []);


  const toggleFavorite = (wordId) => {
    setFavorites(prev => {
      const next = prev.includes(wordId) ? prev.filter(id => id !== wordId) : [...prev, wordId];
      saveFavorites(next);
      return next;
    });
  };

  const dialects = ['all', 'Twi', 'Fante', 'Akuapem'];
  const partsOfSpeech = ['all', 'noun', 'verb', 'adjective', 'adverb', 'interjection', 'phrase'];

  const filteredWords = useMemo(() => {
    let filtered = dictionaryData.filter(word => {
      const matchesSearch = searchDirection === 'akan-english'
        ? word.akan.toLowerCase().includes(searchTerm.toLowerCase())
        : word.english.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDialect = selectedDialect === 'all' || word.dialect === selectedDialect;
      const matchesPartOfSpeech = selectedPartOfSpeech === 'all' || word.partOfSpeech === selectedPartOfSpeech;
      
      return matchesSearch && matchesDialect && matchesPartOfSpeech;
    });

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDialect, selectedPartOfSpeech, sortBy, searchDirection, pageSize]);

  const totalResults = filteredWords.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

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

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    const list = await createWordList(newListName.trim());
    const lists = await getWordLists();
    setWordLists(lists);
    setActiveListId(list.id);
    setNewListName('');
    setIsListModalOpen(false);
  };

  const handleRenameList = async () => {
    if (!renameState.id) return;
    await renameWordList(renameState.id, renameState.name.trim());
    const lists = await getWordLists();
    setWordLists(lists);
    setRenameState({ id: null, name: '' });
  };

  const handleDeleteList = async (id) => {
    await deleteWordList(id);
    const lists = await getWordLists();
    setWordLists(lists);
    if (activeListId === id) setActiveListId(null);
  };

  const handleAddWordToActiveList = async (wordId) => {
    if (!activeListId) return;
    await addWordToList(activeListId, wordId);
    const lists = await getWordLists();
    setWordLists(lists);
  };

  const handleRemoveWordFromActiveList = async (wordId) => {
    if (!activeListId) return;
    await removeWordFromList(activeListId, wordId);
    const lists = await getWordLists();
    setWordLists(lists);
  };

  const submitContribution = async (payload) => {
    await submitDictionaryContribution(payload);
    alert('Thank you! Your dictionary suggestion was queued for moderation.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Akan Dictionary</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Comprehensive bilingual dictionary with audio pronunciations, etymologies, and cultural context
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters Row */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Direction */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSearchDirection('akan-english')}
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                style={searchDirection === 'akan-english' 
                  ? {backgroundColor: '#564c38', color: 'white'} 
                  : {color: '#6b7280'}}
              >
                Akan → English
              </button>
              <button
                onClick={() => setSearchDirection('english-akan')}
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                style={searchDirection === 'english-akan' 
                  ? {backgroundColor: '#564c38', color: 'white'} 
                  : {color: '#6b7280'}}
              >
                English → Akan
              </button>
            </div>

            {/* Search */}
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Search in ${searchDirection === 'akan-english' ? 'Akan' : 'English'}...`}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  style={{'--tw-ring-color': '#564c38'}}
                />
              </div>
              {searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchTerm(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsContribOpen(true)}
                className="px-3 py-2 rounded text-white flex items-center text-sm"
                style={{backgroundColor: '#564c38'}}
              >
                <Plus className="w-4 h-4 mr-1" /> Suggest Entry
              </button>
              <button
                onClick={() => setIsListModalOpen(true)}
                className="px-3 py-2 rounded border text-sm flex items-center"
              >
                <ListPlus className="w-4 h-4 mr-1" /> New List
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dialect</label>
              <select
                value={selectedDialect}
                onChange={(e) => setSelectedDialect(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                onChange={(e) => setSelectedPartOfSpeech(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="alphabetical">Alphabetical</option>
                <option value="relevance">Relevance</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Results and Lists */}
        <div className="bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3">
          {/* Results List */}
          <div className="md:col-span-2 divide-y divide-gray-200">
            {totalResults === 0 ? (
              <div className="px-6 py-12 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
              </div>
            ) : (
              paginatedWords.map((word) => (
                <div key={word.id} className="px-6 py-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{word.akan}</h3>
                        <div>
                          <AudioPlayer
                            src={word.audio}
                            playing={playingAudio === word.audio}
                            onPlay={() => setPlayingAudio(word.audio)}
                            onPause={() => setPlayingAudio(null)}
                          />
                        </div>
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                          {word.partOfSpeech}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {word.dialect}
                        </span>
                      </div>
                      <p className="text-lg text-gray-700 mb-2">{word.english}</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Pronunciation: <span className="font-mono">{word.pronunciation}</span>
                      </p>

                      {word.examples && word.examples.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                          {word.examples.map((example, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-gray-900">{example.akan}</p>
                                  <p className="text-gray-600">{example.english}</p>
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

                      {word.etymology && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Etymology:</h4>
                          <p className="text-sm text-gray-600 italic">{word.etymology}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="ml-4 flex flex-col items-center space-y-2">
                      <button
                        onClick={() => toggleFavorite(word.id)}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.includes(word.id)
                            ? 'text-red-500 bg-red-50 hover:bg-red-100'
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                        aria-pressed={favorites.includes(word.id)}
                        title="Toggle favorite"
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(word.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleAddWordToActiveList(word.id)}
                        className="p-2 rounded-full hover:bg-gray-100"
                        title="Add to active list"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar: Lists */}
          <aside className="border-l border-gray-100 p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Word Lists</h3>
              <button onClick={() => setIsListModalOpen(true)} className="text-sm flex items-center"><ListPlus className="w-4 h-4 mr-1" /> New</button>
            </div>
            {Object.keys(wordLists).length === 0 ? (
              <p className="text-sm text-gray-600">No lists yet. Create one to start organizing words.</p>
            ) : (
              <ul className="space-y-2">
                {Object.values(wordLists).map(list => (
                  <li key={list.id} className={`rounded p-2 ${activeListId === list.id ? 'bg-white shadow' : 'hover:bg-white'}`}>
                    <div className="flex items-center justify-between">
                      <button onClick={() => setActiveListId(list.id)} className="font-medium text-sm text-left">
                        {list.name}
                      </button>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setRenameState({ id: list.id, name: list.name })} className="p-1 rounded hover:bg-gray-100" title="Rename"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteList(list.id)} className="p-1 rounded hover:bg-gray-100" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    {activeListId === list.id && (
                      <div className="mt-2">
                        {list.wordIds.length === 0 ? (
                          <p className="text-sm text-gray-500">No words yet. Use + on a word to add it here.</p>
                        ) : (
                          <ul className="space-y-1">
                            {list.wordIds.map(id => {
                              const w = dictionaryData.find(d => d.id === id);
                              if (!w) return null;
                              return (
                                <li key={id} className="flex items-center justify-between bg-white rounded px-2 py-1">
                                  <div className="text-sm">
                                    <span className="font-medium">{w.akan}</span>
                                    <span className="text-gray-500"> — {w.english}</span>
                                  </div>
                                  <button onClick={() => handleRemoveWordFromActiveList(id)} className="text-gray-400 hover:text-red-500" title="Remove"><X className="w-4 h-4" /></button>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>

        {/* Pagination Controls */}
        {totalResults > 0 && (
          <div className="mt-6 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Page size:</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                {pageSizeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <div className="text-sm text-gray-600">Showing {startIndex + 1}-{endIndex} of {totalResults}</div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border ${currentPage === 1 ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >Prev</button>

              <div className="flex items-center space-x-1">
                {(() => {
                  const pages = [];
                  const maxButtons = 7;
                  let start = Math.max(1, currentPage - 3);
                  let end = Math.min(totalPages, start + maxButtons - 1);
                  if (end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);
                  for (let p = start; p <= end; p++) {
                    pages.push(
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`px-3 py-1 rounded ${p === currentPage ? 'bg-[#564c38] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                      >{p}</button>
                    );
                  }
                  return pages;
                })()}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border ${currentPage === totalPages ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {isListModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-sm">
            <h3 className="font-semibold mb-2">Create New List</h3>
            <input value={newListName} onChange={(e) => setNewListName(e.target.value)} placeholder="List name" className="w-full border rounded px-3 py-2 mb-3" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsListModalOpen(false)} className="px-3 py-2 rounded border">Cancel</button>
              <button onClick={handleCreateList} className="px-3 py-2 rounded text-white" style={{backgroundColor: '#564c38'}}>Create</button>
            </div>
          </div>
        </div>
      )}

      {renameState.id && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-sm">
            <h3 className="font-semibold mb-2">Rename List</h3>
            <input value={renameState.name} onChange={(e) => setRenameState(s => ({...s, name: e.target.value}))} className="w-full border rounded px-3 py-2 mb-3" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setRenameState({ id: null, name: '' })} className="px-3 py-2 rounded border">Cancel</button>
              <button onClick={handleRenameList} className="px-3 py-2 rounded text-white" style={{backgroundColor: '#564c38'}}>Save</button>
            </div>
          </div>
        </div>
      )}

      <DictionaryContributionModal isOpen={isContribOpen} onClose={() => setIsContribOpen(false)} onSubmit={submitContribution} />
    </div>
  );
};

export default Dictionary;