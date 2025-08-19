import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Volume2, Book, Users, Star, Clock, ArrowRight, CheckCircle, Heart } from 'lucide-react';
import { vocabularyModules, lessonsData, culturalData } from '../data/mockData';

const HeritageSpeakerPath = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const playAudio = (audioSrc) => {
    // Simulate audio playing
    console.log(`Playing audio: ${audioSrc}`);
  };

  const tabs = [
    { id: 'overview', label: 'Path Overview', icon: Heart },
    { id: 'cultural', label: 'Cultural Context', icon: Users },
    { id: 'vocabulary', label: 'Advanced Vocabulary', icon: Book },
    { id: 'proverbs', label: 'Proverbs', icon: Star },
    { id: 'lessons', label: 'Lessons', icon: CheckCircle }
  ];

  // Filter content for this learning path
  const heritageVocabularyModules = vocabularyModules.filter(module => 
    ['family', 'numbers', 'food'].includes(module.id) // Could be expanded
  );

  const heritageLessons = lessonsData.filter(lesson => 
    [4, 5].includes(lesson.id) // Advanced lessons
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white" style={{background: 'linear-gradient(135deg, #695e46 0%, #77705c 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Heritage Speaker Path</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            For those reconnecting with their roots - 6-8 weeks to deepen your cultural connection
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
                    ? {borderColor: '#695e46', color: '#695e46'} 
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
                      <Heart className="w-5 h-5 mr-3 mt-0.5" style={{color: '#f1d799'}} />
                      <span>Deepen your understanding of cultural context and traditions</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 mr-3 mt-0.5" style={{color: '#f1d799'}} />
                      <span>Advanced vocabulary for meaningful conversations</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 mr-3 mt-0.5" style={{color: '#f1d799'}} />
                      <span>Traditional expressions and their significance</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 mr-3 mt-0.5" style={{color: '#f1d799'}} />
                      <span>Wisdom through traditional Akan proverbs</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="w-5 h-5 mr-3 mt-0.5" style={{color: '#f1d799'}} />
                      <span>Connecting with your heritage through language</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Path Structure</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 pl-4 py-1" style={{borderColor: '#f1d799'}}>
                      <h4 className="font-semibold text-gray-900">Weeks 1-2: Cultural Foundations</h4>
                      <p className="text-gray-600 text-sm">Understanding traditions and context</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1" style={{borderColor: '#c2ae81'}}>
                      <h4 className="font-semibold text-gray-900">Weeks 3-4: Advanced Vocabulary</h4>
                      <p className="text-gray-600 text-sm">Expanding your expressive capabilities</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1" style={{borderColor: '#77705c'}}>
                      <h4 className="font-semibold text-gray-900">Weeks 5-6: Proverbs & Wisdom</h4>
                      <p className="text-gray-600 text-sm">Traditional wisdom and expressions</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Heritage Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Cultural Mastery", desc: "Understand traditions deeply", progress: "0%", color: "#695e46" },
                  { title: "Expression Builder", desc: "Learn 100+ heritage words", progress: "0%", color: "#77705c" },
                  { title: "Wisdom Keeper", desc: "Master 15 traditional proverbs", progress: "0%", color: "#564c38" }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold" style={{backgroundColor: item.color}}>
                      <Heart className="w-8 h-8" />
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

        {/* Cultural Context Tab */}
        {activeTab === 'cultural' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Cultural Context</h2>
            <div className="space-y-6">
              {culturalData.traditions.map((tradition) => (
                <div key={tradition.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{tradition.title}</h3>
                      <p className="text-gray-600 mb-4">{tradition.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="px-3 py-1 rounded-full" style={{backgroundColor: '#f1d799', color: '#564c38'}}>
                          {tradition.importance} Importance
                        </span>
                        <span className="text-gray-500">{tradition.region}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Significance:</h4>
                    <p className="text-gray-600">
                      This tradition plays a vital role in maintaining cultural identity and community bonds among Akan people.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Advanced Vocabulary Tab */}
        {activeTab === 'vocabulary' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Advanced Vocabulary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {heritageVocabularyModules.map((module) => (
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
                            style={{color: '#695e46'}}
                            onMouseEnter={(e) => e.target.style.color = '#564c38'}
                            onMouseLeave={(e) => e.target.style.color = '#695e46'}
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
                      style={{backgroundColor: '#695e46'}}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#564c38'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#695e46'}
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

        {/* Proverbs Tab */}
        {activeTab === 'proverbs' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Traditional Proverbs</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <p className="text-lg text-gray-700 mb-6">
                Akan proverbs (mmerɛnw) are essential to understanding the cultural wisdom and values of the Akan people. 
                Each proverb carries deep meaning and is used to teach lessons, resolve conflicts, and express complex ideas.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    akan: "Ɔkra kɛse ɛbɛn kɔɔrɔ",
                    english: "A single stick does not make a fire",
                    meaning: "Unity is strength; cooperation is essential for success",
                    usage: "Used to emphasize the importance of working together"
                  },
                  {
                    akan: "Sɛ obiara ɔbɛn a, ɛnna ɔbɛn na ɔbɛn",
                    english: "When a person is born, they don't come with a book of customs",
                    meaning: "Cultural knowledge is learned through experience and teaching",
                    usage: "Explains how culture is passed down through generations"
                  },
                  {
                    akan: "Nea ɔnya no nyɛ no",
                    english: "What someone has, let them use it",
                    meaning: "Make use of what you have; be resourceful with your resources",
                    usage: "Encourages making the most of available resources"
                  }
                ].map((proverb, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{proverb.akan}</h3>
                        <p className="text-lg text-gray-600 mb-2">{proverb.english}</p>
                      </div>
                      <div className="text-4xl" style={{color: '#f1d799'}}>
                        ※
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Meaning:</h4>
                        <p className="text-gray-600">{proverb.meaning}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Usage:</h4>
                        <p className="text-gray-600">{proverb.usage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Heritage Lessons</h2>
            <div className="space-y-6">
              {heritageLessons.map((lesson) => (
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
                      style={{backgroundColor: '#695e46'}}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#564c38'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#695e46'}
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
                          <Heart className="w-4 h-4 mr-2" style={{color: '#f1d799'}} />
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

export default HeritageSpeakerPath;
