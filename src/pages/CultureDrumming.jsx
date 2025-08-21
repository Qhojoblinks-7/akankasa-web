import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Music, Play, Clock, MapPin, User } from 'lucide-react';
import drummingLessons from '../data/drumming';
import LessonCard from '../components/drumming/LessonCard';
import LessonPlayer from '../components/drumming/LessonPlayer';

const CultureDrumming = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique instruments and difficulties for filter options
  const instruments = ['all', ...new Set(drummingLessons.map(lesson => lesson.instrument))];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  const types = ['all', 'video', 'audio'];

  // Filter lessons based on search and filters
  const filteredLessons = drummingLessons.filter(lesson => {
    const matchesSearch = !searchTerm || 
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInstrument = selectedInstrument === 'all' || lesson.instrument === selectedInstrument;
    const matchesDifficulty = selectedDifficulty === 'all' || lesson.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'all' || lesson.type === selectedType;
    
    return matchesSearch && matchesInstrument && matchesDifficulty && matchesType;
  });

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  const closePlayer = () => {
    setSelectedLesson(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-4">
            <Music className="w-10 h-10 mr-4" />
            <h1 className="text-4xl font-bold">Traditional Drumming</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Master the rhythms and techniques of traditional Akan drums. Learn from expert instructors 
            and discover the cultural significance behind each beat and pattern.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search lessons, instruments, or instructors..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Filter Toggle */}
            <div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>
            
            {/* Results Count */}
            <div className="flex items-center justify-center text-gray-600">
              {filteredLessons.length} {filteredLessons.length === 1 ? 'lesson' : 'lessons'} found
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instrument</label>
                <select
                  value={selectedInstrument}
                  onChange={(e) => setSelectedInstrument(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {instruments.map(instrument => (
                    <option key={instrument} value={instrument}>
                      {instrument === 'all' ? 'All Instruments' : instrument}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty === 'all' ? 'All Levels' : difficulty}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type === 'audio' ? 'Audio Only' : 'Video'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Lessons Grid */}
        {filteredLessons.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No lessons found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLessons.map(lesson => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                onClick={handleLessonClick}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Lesson Player Modal */}
      {selectedLesson && (
        <LessonPlayer 
          lesson={selectedLesson} 
          onClose={closePlayer}
        />
      )}
      
      {/* Back to Culture Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Link 
          to="/culture" 
          className="inline-flex items-center text-red-700 hover:text-red-800 font-medium"
        >
          ← Back to Culture
        </Link>
      </div>
    </div>
  );
};

export default CultureDrumming;
