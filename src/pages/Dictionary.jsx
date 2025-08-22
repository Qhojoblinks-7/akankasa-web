import React from 'react';

import { useState, useMemo, useEffect } from 'react';
import { Search, Download, ListPlus, Plus } from 'lucide-react';
import { getDictionary, getFavorites, saveFavorites, getWordLists, createWordList, renameWordList, deleteWordList, addWordToList, removeWordFromList } from '../api';
import { dictionaryData } from '../data/mockData';
import DictionaryContributionModal from '../components/DictionaryContributionModal.jsx';
import { submitDictionaryContribution } from '../api';

const ResultsList = React.lazy(() => import('../components/dictionary/ResultsList.jsx'));
const ListsSidebar = React.lazy(() => import('../components/dictionary/ListsSidebar.jsx'));

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

        <div className="bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2">
            <React.Suspense fallback={<div className="p-6">Loading results…</div>}>
              <ResultsList
                words={paginatedWords}
                favorites={favorites}
                playingAudio={playingAudio}
                onPlaySrc={(src) => setPlayingAudio(src)}
                onPause={() => setPlayingAudio(null)}
                onToggleFavorite={toggleFavorite}
                onAddToActiveList={handleAddWordToActiveList}
              />
            </React.Suspense>
          </div>

          <React.Suspense fallback={<div className="p-6">Loading lists…</div>}>
            <ListsSidebar
              wordLists={wordLists}
              activeListId={activeListId}
              onNewList={() => setIsListModalOpen(true)}
              onSetActive={(id) => setActiveListId(id)}
              onDelete={handleDeleteList}
              onRemoveWord={handleRemoveWordFromActiveList}
              isListModalOpen={isListModalOpen}
              setIsListModalOpen={setIsListModalOpen}
              newListName={newListName}
              setNewListName={setNewListName}
              renameState={renameState}
              setRenameState={setRenameState}
              onCreateList={handleCreateList}
              onSaveRename={handleRenameList}
            />
          </React.Suspense>
        </div>

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

      <DictionaryContributionModal isOpen={isContribOpen} onClose={() => setIsContribOpen(false)} onSubmit={submitContribution} />
    </div>
  );
};

export default Dictionary;