import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Volume2, Book, Users, Star, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { alphabetData, greetingsData, vocabularyModules, lessonsData } from '../data/mockData';
import { useUI } from '../hooks/useRadux';

const LanguageLearning = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [playingAudio, setPlayingAudio] = useState(null);
  const { showSuccessToast } = useUI();

  const playAudio = (audioSrc) => {
    // Simulate audio playing
    setPlayingAudio(audioSrc);
    setTimeout(() => setPlayingAudio(null), 1000);
    showSuccessToast('Audio playing...');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Star },
    { id: 'alphabet', label: 'Alphabet', icon: Book },
    { id: 'greetings', label: 'Greetings', icon: Users },
    { id: 'vocabulary', label: 'Vocabulary', icon: Volume2 },
    { id: 'lessons', label: 'Lessons', icon: CheckCircle }
  ];

  const learningPaths = [
    {
      title: "Complete Beginner",
      description: "Perfect for those new to Akan language",
      duration: "8-12 weeks",
      modules: ["Alphabet", "Basic Greetings", "Family Words", "Numbers", "Simple Conversations"],
      color: "#564c38"
    },
    {
      title: "Heritage Speaker",
      description: "For those reconnecting with their roots",
      duration: "6-8 weeks",
      modules: ["Cultural Context", "Advanced Vocabulary", "Traditional Expressions", "Proverbs"],
      color: "#695e46"
    },
    {
      title: "Academic Learner",
      description: "Comprehensive linguistic approach",
      duration: "12-16 weeks",
      modules: ["Grammar", "Phonology", "Dialectal Variations", "Research Methods"],
      color: "#77705c"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header - Mobile First */}
      <div className="text-white overflow-hidden" style={{background: 'linear-gradient(135deg, #ca8a04 0%, #f59e0b 100%)'}}>
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto overflow-hidden">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight break-words">
            Learn Akan Language
          </h1>
          <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-3xl leading-relaxed break-words">
            Master the beautiful Akan language through interactive lessons, cultural context, and engaging exercises
          </p>
        </div>
      </div>

      {/* Navigation Tabs - Mobile First */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto scrollbar-hide pb-2 overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center space-x-2 py-3 sm:py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors min-w-fit min-h-[44px]"
                  style={activeTab === tab.id 
                    ? {borderColor: '#f59e0b', color: '#564c38'} 
                    : {borderColor: 'transparent', color: '#6b7280'}}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.color = '#374151';
                      e.target.style.borderColor = '#d1d5db';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.color = '#6b7280';
                      e.target.style.borderColor = 'transparent';
                    }
                  }}
                  aria-label={`Switch to ${tab.label} tab`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm break-words">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto overflow-hidden">
        {/* Overview Tab - Mobile First */}
        {activeTab === 'overview' && (
          <div className="space-y-8 sm:space-y-12 overflow-hidden">
            {/* Learning Paths */}
            <section className="overflow-hidden">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight break-words">
                Choose Your Learning Path
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-hidden">
                {learningPaths.map((path, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="h-24 sm:h-28 lg:h-32 relative overflow-hidden" style={{backgroundColor: path.color}}>
                      <div className="absolute inset-0 flex items-center justify-center p-2 overflow-hidden">
                        <h3 className="text-white text-lg sm:text-xl font-bold text-center leading-tight break-words">
                          {path.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 overflow-hidden">
                      <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed break-words">
                        {path.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-3 sm:mb-4 overflow-hidden">
                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm break-words">{path.duration}</span>
                      </div>
                      <div className="space-y-2 mb-4 sm:mb-6 overflow-hidden">
                        {path.modules.map((module, idx) => (
                          <div key={idx} className="flex items-center text-sm overflow-hidden">
                            <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{color: '#f1d799'}} />
                            <span className="text-xs sm:text-sm break-words">{module}</span>
                          </div>
                        ))}
                      </div>
                      <Link 
                        to={
                          path.title === "Complete Beginner" ? "/learn/beginner" :
                          path.title === "Heritage Speaker" ? "/learn/heritage" :
                          "/learn/academic"
                        }
                        className="w-full text-white py-3 rounded-lg transition-colors text-center block min-h-[44px] flex items-center justify-center font-medium break-words"
                        style={{backgroundColor: '#564c38'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f59e0b'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#564c38'}
                        aria-label={`Start ${path.title} learning path`}
                      >
                        Start This Path
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Start - Mobile First */}
            <section className="overflow-hidden">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight break-words">
                Quick Start Options
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-hidden">
                {[
                  { title: "Learn Alphabet", desc: "Master Akan letters and sounds", link: "#alphabet", icon: "অ" },
                  { title: "Basic Greetings", desc: "Essential daily greetings", link: "#greetings", icon: "👋" },
                  { title: "Family Words", desc: "Learn family relationships", link: "#vocabulary", icon: "👨‍👩‍👧‍👦" },
                  { title: "Numbers 1-10", desc: "Count in Akan", link: "#vocabulary", icon: "🔢" }
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(item.link.replace('#', ''))}
                    className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group min-h-[120px] sm:min-h-[140px] active:scale-95 overflow-hidden"
                    aria-label={`Quick start: ${item.title}`}
                  >
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 overflow-hidden">{item.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base group-hover:text-yellow-700 transition-colors leading-tight break-words">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed break-words">{item.desc}</p>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Alphabet Tab - Mobile First */}
        {activeTab === 'alphabet' && (
          <div className="overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight break-words">
              Akan Alphabet & Pronunciation
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 overflow-hidden">
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed break-words">
                The Akan alphabet consists of 22 letters. Click on each letter to hear its pronunciation and see an example word.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 overflow-hidden">
                {alphabetData.map((letter, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors overflow-hidden">
                    <div className="text-center overflow-hidden">
                      <div className="text-3xl sm:text-4xl font-bold mb-2 break-words" style={{color: '#564c38'}}>
                        {letter.letter}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 mb-2 leading-tight break-words">
                        {letter.pronunciation}
                      </div>
                      <button
                        onClick={() => playAudio(letter.audio)}
                        className="flex items-center justify-center w-full py-2 px-3 rounded-lg transition-colors min-h-[44px] font-medium break-words"
                        style={{backgroundColor: '#f1d799', color: '#564c38'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#c2ae81'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#f1d799'}
                        aria-label={`Play pronunciation for letter ${letter.letter}`}
                      >
                        <Volume2 className={`w-4 h-4 mr-2 flex-shrink-0 ${playingAudio === letter.audio ? 'animate-pulse' : ''}`} />
                        <span className="text-xs sm:text-sm">Play</span>
                      </button>
                      <div className="text-xs text-gray-500 mt-2 leading-tight break-words">{letter.example}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Greetings Tab - Mobile First */}
        {activeTab === 'greetings' && (
          <div className="overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight break-words">
              Essential Akan Greetings
            </h2>
            <div className="space-y-4 sm:space-y-6 overflow-hidden">
              {greetingsData.map((greeting) => (
                <div key={greeting.id} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center overflow-hidden">
                    <div className="overflow-hidden">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight break-words">
                        {greeting.akan}
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 mb-2 leading-relaxed break-words">
                        {greeting.english}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 leading-relaxed break-words">
                        Pronunciation: {greeting.pronunciation}
                      </p>
                      <p className="text-xs sm:text-sm leading-relaxed break-words" style={{color: '#564c38'}}>
                        {greeting.context}
                      </p>
                    </div>
                    <div className="text-center overflow-hidden">
                      <button
                        onClick={() => playAudio(greeting.audio)}
                        className="text-white px-4 sm:px-6 py-3 rounded-lg transition-colors flex items-center justify-center mx-auto min-h-[44px] font-medium break-words"
                        style={{backgroundColor: '#564c38'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#695e46'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#564c38'}
                        aria-label={`Listen to greeting: ${greeting.english}`}
                      >
                        <Play className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 ${playingAudio === greeting.audio ? 'animate-pulse' : ''}`} />
                        <span className="text-sm sm:text-base">Listen</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vocabulary Tab - Mobile First */}
        {activeTab === 'vocabulary' && (
          <div className="overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight break-words">
              Vocabulary Modules
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-hidden">
              {vocabularyModules.map((module) => (
                <div key={module.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-32 sm:h-40 relative overflow-hidden" style={{backgroundColor: module.color}}>
                    <div className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden">
                      <h3 className="text-white text-lg sm:text-xl font-bold text-center leading-tight break-words">
                        {module.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 overflow-hidden">
                    <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed break-words">
                      {module.description}
                    </p>
                    <div className="flex items-center justify-between mb-4 sm:mb-6 overflow-hidden">
                      <span className="text-sm text-gray-500 break-words">{module.wordCount} words</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium break-words">
                        {module.difficulty}
                      </span>
                    </div>
                    <Link
                      to={`/learn/vocabulary/${module.id}`}
                      className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors text-center block min-h-[44px] flex items-center justify-center font-medium break-words"
                      aria-label={`Start ${module.title} vocabulary module`}
                    >
                      Start Module
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lessons Tab - Mobile First */}
        {activeTab === 'lessons' && (
          <div className="overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight break-words">
              Interactive Lessons
            </h2>
            <div className="space-y-4 sm:space-y-6 overflow-hidden">
              {lessonsData.map((lesson) => (
                <div key={lesson.id} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 overflow-hidden">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 overflow-hidden">
                    <div className="flex-shrink-0 overflow-hidden">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-bold text-white text-lg sm:text-xl overflow-hidden" style={{backgroundColor: lesson.color}}>
                        {lesson.id}
                      </div>
                    </div>
                    <div className="flex-grow min-w-0 overflow-hidden">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 overflow-hidden">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-0 break-words">
                          {lesson.title}
                        </h3>
                        <div className="flex items-center space-x-2 overflow-hidden">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium break-words">
                            {lesson.type}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center break-words">
                            <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                            {lesson.duration}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed break-words">
                        {lesson.description}
                      </p>
                      <div className="flex items-center justify-between overflow-hidden">
                        <div className="text-sm text-gray-500 break-words">
                          Progress: {lesson.progress}%
                        </div>
                        <Link
                          to={`/learn/lesson/${lesson.id}`}
                          className="bg-green-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center min-h-[44px] font-medium break-words"
                          aria-label={`Start lesson: ${lesson.title}`}
                        >
                          <Play className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="text-sm sm:text-base">
                            {lesson.progress > 0 ? 'Continue' : 'Start'}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageLearning;