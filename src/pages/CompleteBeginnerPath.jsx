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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Complete Beginner Path</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Perfect for those new to Akan language - 8-12 weeks to build a solid foundation
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors"
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
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Path Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <section className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Path Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What You'll Learn</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5" style={{color: '#f1d799'}} />
                      <span>Akan alphabet and pronunciation fundamentals</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5" style={{color: '#f1d799'}} />
                      <span>Essential daily greetings and polite expressions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5" style={{color: '#f1d799'}} />
                      <span>Basic vocabulary for family, numbers, and common objects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5" style={{color: '#f1d799'}} />
                      <span>Simple sentence structures and conversation patterns</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5" style={{color: '#f1d799'}} />
                      <span>Cultural context for appropriate language use</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Path Structure</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 pl-4 py-1" style={{borderColor: '#f1d799'}}>
                      <h4 className="font-semibold text-gray-900">Weeks 1-2: Foundations</h4>
                      <p className="text-gray-600 text-sm">Alphabet, pronunciation, basic greetings</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1" style={{borderColor: '#c2ae81'}}>
                      <h4 className="font-semibold text-gray-900">Weeks 3-6: Core Vocabulary</h4>
                      <p className="text-gray-600 text-sm">Family terms, numbers, common objects</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1" style={{borderColor: '#77705c'}}>
                      <h4 className="font-semibold text-gray-900">Weeks 7-12: Simple Conversations</h4>
                      <p className="text-gray-600 text-sm">Basic sentence structures, practical dialogues</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Learning Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Alphabet Mastery", desc: "Learn all 22 Akan letters", progress: "0%", color: "#564c38" },
                  { title: "Greetings Fluency", desc: "Master 8 essential greetings", progress: "0%", color: "#695e46" },
                  { title: "Vocabulary Builder", desc: "Learn 150+ core words", progress: "0%", color: "#77705c" }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold" style={{backgroundColor: item.color}}>
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.desc}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: item.progress}}></div>
                    </div>
                    <p className="text-sm text-gray-500">Not started</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Alphabet Tab */}
        {activeTab === 'alphabet' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Akan Alphabet & Pronunciation</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <p className="text-lg text-gray-700 mb-6">
                The Akan alphabet consists of 22 letters. Click on each letter to hear its pronunciation and see an example word.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {alphabetData.map((letter, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2" style={{color: '#564c38'}}>{letter.letter}</div>
                      <div className="text-sm text-gray-600 mb-2">{letter.pronunciation}</div>
                      <button
                        onClick={() => playAudio(letter.audio)}
                        className="flex items-center justify-center w-full py-2 px-3 rounded-lg transition-colors"
                        style={{backgroundColor: '#f1d799', color: '#564c38'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#c2ae81'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#f1d799'}
                      >
                        <Volume2 className={`w-4 h-4 mr-2 ${playingAudio === letter.audio ? 'animate-pulse' : ''}`} />
                        Play
                      </button>
                      <div className="text-xs text-gray-500 mt-2">{letter.example}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Greetings Tab */}
        {activeTab === 'greetings' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Essential Akan Greetings</h2>
            <div className="space-y-6">
              {greetingsData.map((greeting) => (
                <div key={greeting.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{greeting.akan}</h3>
                      <p className="text-lg text-gray-600 mb-2">{greeting.english}</p>
                      <p className="text-sm text-gray-500 mb-4">Pronunciation: {greeting.pronunciation}</p>
                      <p className="text-sm" style={{color: '#564c38'}}>{greeting.context}</p>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => playAudio(greeting.audio)}
                        className="text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center mx-auto"
                        style={{backgroundColor: '#564c38'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#695e46'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#564c38'}
                      >
                        <Play className={`w-5 h-5 mr-2 ${playingAudio === greeting.audio ? 'animate-pulse' : ''}`} />
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
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Beginner Vocabulary Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {beginnerVocabularyModules.map((module) => (
                <div key={module.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6 text-white" style={{background: 'linear-gradient(135deg, #695e46 0%, #77705c 100%)'}}>
                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                    <p style={{color: '#f1d799'}}>{module.description}</p>
                    <p className="text-sm mt-2" style={{color: '#c2ae81'}}>{module.words.length} words</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      {module.words.slice(0, 3).map((word, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <span className="font-medium text-gray-900">{word.akan}</span>
                            <span className="text-gray-600 ml-2">- {word.english}</span>
                          </div>
                          <button
                            onClick={() => playAudio(word.audio)}
                            className="transition-colors"
                            style={{color: '#564c38'}}
                            onMouseEnter={(e) => e.target.style.color = '#695e46'}
                            onMouseLeave={(e) => e.target.style.color = '#564c38'}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {module.words.length > 3 && (
                        <p className="text-sm text-gray-500">+{module.words.length - 3} more words</p>
                      )}
                    </div>
                    <Link
                      to={`/learn/vocabulary/${module.id}`}
                      className="w-full text-white py-3 rounded-lg transition-colors flex items-center justify-center"
                      style={{backgroundColor: '#564c38'}}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f59e0b'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#564c38'}
                    >
                      Study Module
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Beginner Lessons</h2>
            <div className="space-y-6">
              {beginnerLessons.map((lesson) => (
                <div key={lesson.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h3>
                      <p className="text-gray-600 mb-4">{lesson.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="px-3 py-1 rounded-full" style={{backgroundColor: '#f1d799', color: '#564c38'}}>{lesson.level}</span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/learn/lesson/${lesson.id}`}
                      className="text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                      style={{backgroundColor: '#564c38'}}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#695e46'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#564c38'}
                    >
                      Start Lesson
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Learning Objectives:</h4>
                    <ul className="space-y-1">
                      {lesson.content.objectives.map((objective, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <CheckCircle className="w-4 h-4 mr-2" style={{color: '#f1d799'}} />
                          {objective}
                        </li>
                      ))}
                    </ul>
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
