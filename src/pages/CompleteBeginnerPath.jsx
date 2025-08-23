import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Volume2, Book, Users, Star, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { alphabetData, greetingsData, vocabularyModules, lessonsData } from '../data/mockData';

const CompleteBeginnerPath = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [playingAudio, setPlayingAudio] = useState(null);

  const playAudio = (audioSrc) => {
    // Simulate audio playing
    setPlayingAudio(audioSrc);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  const tabs = [
    { id: 'overview', label: 'Path Overview', icon: Star },
    { id: 'alphabet', label: 'Alphabet', icon: Book },
    { id: 'greetings', label: 'Greetings', icon: Users },
    { id: 'vocabulary', label: 'Vocabulary', icon: Volume2 },
    { id: 'lessons', label: 'Lessons', icon: CheckCircle }
  ];

  // Filter content for this learning path
  const beginnerVocabularyModules = vocabularyModules.filter(module => 
    ['family', 'numbers', 'food'].includes(module.id)
  );

  const beginnerLessons = lessonsData.filter(lesson => 
    [1, 2, 3].includes(lesson.id) // First three lessons are beginner
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="text-white overflow-hidden" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 break-words">Complete Beginner Path</h1>
          <p className="text-xl opacity-90 max-w-3xl break-words">
            Perfect for those new to Akan language - 8-12 weeks to build a solid foundation
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="flex space-x-8 overflow-x-auto overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors min-h-[44px]"
                  style={activeTab === tab.id 
                    ? {borderColor: '#564c38', color: '#564c38'} 
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
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="break-words">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        {/* Path Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12 overflow-hidden">
            <section className="bg-white rounded-lg shadow-lg p-8 overflow-hidden">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 break-words">Path Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
                <div className="overflow-hidden">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 break-words">What You'll Learn</h3>
                  <ul className="space-y-3 overflow-hidden">
                    <li className="flex items-start overflow-hidden">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Akan alphabet and pronunciation fundamentals</span>
                    </li>
                    <li className="flex items-start overflow-hidden">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Essential daily greetings and polite expressions</span>
                    </li>
                    <li className="flex items-start overflow-hidden">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Basic family and relationship vocabulary</span>
                    </li>
                    <li className="flex items-start overflow-hidden">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Numbers 1-100 and counting systems</span>
                    </li>
                    <li className="flex items-start overflow-hidden">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Simple conversation patterns and responses</span>
                    </li>
                  </ul>
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 break-words">Path Structure</h3>
                  <div className="space-y-4 overflow-hidden">
                    <div className="border-l-4 pl-4 py-1 overflow-hidden" style={{borderColor: '#f1d799'}}>
                      <h4 className="font-semibold text-gray-900 break-words">Weeks 1-2: Alphabet & Sounds</h4>
                      <p className="text-gray-600 text-sm break-words">Learn Akan letters and basic pronunciation</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1 overflow-hidden" style={{borderColor: '#c2ae81'}}>
                      <h4 className="font-semibold text-gray-900 break-words">Weeks 3-4: Greetings & Politeness</h4>
                      <p className="text-gray-600 text-sm break-words">Essential daily expressions and cultural context</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1 overflow-hidden" style={{borderColor: '#77705c'}}>
                      <h4 className="font-semibold text-gray-900 break-words">Weeks 5-8: Core Vocabulary</h4>
                      <p className="text-gray-600 text-sm break-words">Family, numbers, food, and basic nouns</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1 overflow-hidden" style={{borderColor: '#564c38'}}>
                      <h4 className="font-semibold text-gray-900 break-words">Weeks 9-12: Simple Conversations</h4>
                      <p className="text-gray-600 text-sm break-words">Basic dialogue patterns and cultural understanding</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Your Learning Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 overflow-hidden">
                {[
                  { title: "Alphabet Master", desc: "Know all Akan letters", progress: "0%", color: "#564c38" },
                  { title: "Greeting Expert", desc: "Master daily expressions", progress: "0%", color: "#695e46" },
                  { title: "Vocabulary Builder", desc: "Learn essential words", progress: "0%", color: "#77705c" },
                  { title: "Conversation Starter", desc: "Begin simple dialogues", progress: "0%", color: "#f1d799" }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center overflow-hidden">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold overflow-hidden" style={{backgroundColor: item.color}}>
                      <CheckCircle className="w-8 h-8 flex-shrink-0" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 break-words">{item.title}</h3>
                    <p className="text-gray-600 mb-4 break-words">{item.desc}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: item.progress}}></div>
                    </div>
                    <p className="text-sm text-gray-500 break-words">Not started</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Alphabet Tab */}
        {activeTab === 'alphabet' && (
          <div className="overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Akan Alphabet & Pronunciation</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-hidden">
              <p className="text-lg text-gray-700 mb-6 break-words">
                Start with the building blocks of Akan language. Learn each letter, its pronunciation, and example words.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden">
                {alphabetData.slice(0, 12).map((letter, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors overflow-hidden">
                    <div className="text-center overflow-hidden">
                      <div className="text-3xl font-bold mb-2 break-words" style={{color: '#564c38'}}>
                        {letter.letter}
                      </div>
                      <div className="text-sm text-gray-600 mb-2 break-words">
                        {letter.pronunciation}
                      </div>
                      <button
                        onClick={() => playAudio(letter.audio)}
                        className="w-full py-2 px-3 rounded-lg transition-colors min-h-[44px] font-medium break-words"
                        style={{backgroundColor: '#f1d799', color: '#564c38'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#c2ae81'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#f1d799'}
                      >
                        <Volume2 className={`w-4 h-4 mr-2 inline ${playingAudio === letter.audio ? 'animate-pulse' : ''}`} />
                        Listen
                      </button>
                      <div className="text-xs text-gray-500 mt-2 break-words">{letter.example}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Greetings Tab */}
        {activeTab === 'greetings' && (
          <div className="overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Essential Greetings</h2>
            <div className="space-y-6 overflow-hidden">
              {greetingsData.slice(0, 6).map((greeting) => (
                <div key={greeting.id} className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center overflow-hidden">
                    <div className="overflow-hidden">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 break-words">
                        {greeting.akan}
                      </h3>
                      <p className="text-lg text-gray-600 mb-2 break-words">
                        {greeting.english}
                      </p>
                      <p className="text-sm text-gray-500 mb-3 break-words">
                        Pronunciation: {greeting.pronunciation}
                      </p>
                      <p className="text-sm break-words" style={{color: '#564c38'}}>
                        {greeting.context}
                      </p>
                    </div>
                    <div className="text-center overflow-hidden">
                      <button
                        onClick={() => playAudio(greeting.audio)}
                        className="text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center mx-auto min-h-[44px] font-medium break-words"
                        style={{backgroundColor: '#564c38'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#695e46'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#564c38'}
                      >
                        <Volume2 className={`w-5 h-5 mr-2 ${playingAudio === greeting.audio ? 'animate-pulse' : ''}`} />
                        Listen
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vocabulary Tab */}
        {activeTab === 'vocabulary' && (
          <div className="overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Core Vocabulary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
              {beginnerVocabularyModules.map((module) => (
                <div key={module.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-32 relative overflow-hidden" style={{backgroundColor: module.color}}>
                    <div className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden">
                      <h3 className="text-white text-xl font-bold text-center leading-tight break-words">
                        {module.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 overflow-hidden">
                    <p className="text-gray-600 mb-4 text-sm break-words">
                      {module.description}
                    </p>
                    <div className="flex items-center justify-between mb-4 overflow-hidden">
                      <span className="text-sm text-gray-500 break-words">{module.wordCount} words</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium break-words">
                        Beginner
                      </span>
                    </div>
                    <Link
                      to={`/learn/vocabulary/${module.id}`}
                      className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors text-center block min-h-[44px] flex items-center justify-center font-medium break-words"
                    >
                      Start Module
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div className="overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Interactive Lessons</h2>
            <div className="space-y-6 overflow-hidden">
              {beginnerLessons.map((lesson) => (
                <div key={lesson.id} className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
                  <div className="flex flex-col sm:flex-row gap-6 overflow-hidden">
                    <div className="flex-shrink-0 overflow-hidden">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-xl overflow-hidden" style={{backgroundColor: lesson.color}}>
                        {lesson.id}
                      </div>
                    </div>
                    <div className="flex-grow min-w-0 overflow-hidden">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 overflow-hidden">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 sm:mb-0 break-words">
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
                      <p className="text-gray-600 mb-4 text-sm break-words">
                        {lesson.description}
                      </p>
                      <div className="flex items-center justify-between overflow-hidden">
                        <div className="text-sm text-gray-500 break-words">
                          Progress: {lesson.progress}%
                        </div>
                        <Link
                          to={`/learn/lesson/${lesson.id}`}
                          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center min-h-[44px] font-medium break-words"
                        >
                          <Play className="w-4 h-4 mr-2 flex-shrink-0" />
                          {lesson.progress > 0 ? 'Continue' : 'Start'}
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

export default CompleteBeginnerPath;
