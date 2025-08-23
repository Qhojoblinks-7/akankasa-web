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
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="text-white overflow-hidden" style={{background: 'linear-gradient(135deg, #695e46 0%, #77705c 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 break-words">Heritage Speaker Path</h1>
          <p className="text-xl opacity-90 max-w-3xl break-words">
            For those reconnecting with their roots - 6-8 weeks to deepen your cultural connection
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
                      <Heart className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Deepen your understanding of cultural context and traditions</span>
                    </li>
                    <li className="flex items-start overflow-hidden">
                      <Heart className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Advanced vocabulary for meaningful conversations</span>
                    </li>
                    <li className="flex items-start overflow-hidden">
                      <Heart className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Traditional expressions and their significance</span>
                    </li>
                    <li className="flex items-start overflow-hidden">
                      <Heart className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Proverbs and their cultural meanings</span>
                    </li>
                    <li className="flex items-start overflow-hidden">
                      <Heart className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Connection to ancestral wisdom and values</span>
                    </li>
                  </ul>
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 break-words">Path Structure</h3>
                  <div className="space-y-4 overflow-hidden">
                    <div className="border-l-4 pl-4 py-1 overflow-hidden" style={{borderColor: '#f1d799'}}>
                      <h4 className="font-semibold text-gray-900 break-words">Weeks 1-2: Cultural Foundation</h4>
                      <p className="text-gray-600 text-sm break-words">Understanding traditions and cultural context</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1 overflow-hidden" style={{borderColor: '#c2ae81'}}>
                      <h4 className="font-semibold text-gray-900 break-words">Weeks 3-4: Advanced Vocabulary</h4>
                      <p className="text-gray-600 text-sm break-words">Expanding language for deeper conversations</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1 overflow-hidden" style={{borderColor: '#77705c'}}>
                      <h4 className="font-semibold text-gray-900 break-words">Weeks 5-6: Traditional Expressions</h4>
                      <p className="text-gray-600 text-sm break-words">Learning meaningful cultural phrases</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1 overflow-hidden" style={{borderColor: '#695e46'}}>
                      <h4 className="font-semibold text-gray-900 break-words">Weeks 7-8: Proverbs & Wisdom</h4>
                      <p className="text-gray-600 text-sm break-words">Understanding ancestral knowledge</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Your Heritage Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 overflow-hidden">
                {[
                  { title: "Cultural Connector", desc: "Deepen cultural understanding", progress: "0%", color: "#695e46" },
                  { title: "Language Bridge", desc: "Advanced vocabulary mastery", progress: "0%", color: "#77705c" },
                  { title: "Tradition Keeper", desc: "Preserve cultural expressions", progress: "0%", color: "#564c38" },
                  { title: "Wisdom Seeker", desc: "Learn ancestral proverbs", progress: "0%", color: "#f1d799" }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center overflow-hidden">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold overflow-hidden" style={{backgroundColor: item.color}}>
                      <Heart className="w-8 h-8 flex-shrink-0" />
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

        {/* Cultural Context Tab */}
        {activeTab === 'cultural' && (
          <div className="overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Cultural Context & Traditions</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-hidden">
              <p className="text-lg text-gray-700 mb-6 break-words">
                Understanding the cultural context behind Akan language is essential for heritage speakers. 
                Learn about traditions, values, and the significance of cultural expressions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
                {[
                  {
                    title: "Family & Community",
                    description: "Akan society places great emphasis on family bonds and community relationships.",
                    examples: ["Extended family structure", "Community leadership", "Intergenerational respect"]
                  },
                  {
                    title: "Traditional Values",
                    description: "Core values that shape Akan culture and language use.",
                    examples: ["Respect for elders", "Hospitality", "Unity and cooperation"]
                  },
                  {
                    title: "Ceremonial Language",
                    description: "Special language used in traditional ceremonies and rituals.",
                    examples: ["Naming ceremonies", "Funeral rites", "Festival celebrations"]
                  },
                  {
                    title: "Regional Variations",
                    description: "How cultural practices vary across different Akan regions.",
                    examples: ["Ashanti traditions", "Fante customs", "Akuapem practices"]
                  }
                ].map((topic, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 overflow-hidden">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 break-words">{topic.title}</h3>
                    <p className="text-gray-600 mb-4 break-words">{topic.description}</p>
                    <div className="space-y-2 overflow-hidden">
                      <p className="font-medium text-gray-900 break-words">Key Aspects:</p>
                      <ul className="space-y-1 overflow-hidden">
                        {topic.examples.map((example, idx) => (
                          <li key={idx} className="flex items-center text-gray-600 overflow-hidden">
                            <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{color: '#f1d799'}} />
                            <span className="break-words">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Advanced Vocabulary Tab */}
        {activeTab === 'vocabulary' && (
          <div className="overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Advanced Vocabulary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
              {heritageVocabularyModules.map((module) => (
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
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium break-words">
                        Advanced
                      </span>
                    </div>
                    <Link
                      to={`/learn/vocabulary/${module.id}`}
                      className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors text-center block min-h-[44px] flex items-center justify-center font-medium break-words"
                    >
                      Study Module
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Proverbs Tab */}
        {activeTab === 'proverbs' && (
          <div className="overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Traditional Proverbs</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-hidden">
              <p className="text-lg text-gray-700 mb-6 break-words">
                Akan proverbs carry deep cultural wisdom and are essential for understanding the values and philosophy of the people.
              </p>
              
              <div className="space-y-6 overflow-hidden">
                {[
                  {
                    akan: "Sɛ wo were fi na wo sankofa a yenkyi",
                    english: "It is not wrong to go back for that which you have forgotten",
                    meaning: "It's never too late to return to your roots and learn from the past",
                    context: "Used to encourage people to reconnect with their heritage"
                  },
                  {
                    akan: "Ɛyɛ nware yɛ",
                    english: "It is by doing that we learn",
                    meaning: "Practical experience is the best teacher",
                    context: "Emphasizes the importance of practice and hands-on learning"
                  },
                  {
                    akan: "Wo nsa da mu a, wo nkyɛn da mu",
                    english: "If your hands are in the dish, your mouth is in the dish",
                    meaning: "You must work to eat; nothing comes without effort",
                    context: "Teaches the value of hard work and self-reliance"
                  }
                ].map((proverb, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
                      <div className="overflow-hidden">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 break-words">
                          {proverb.akan}
                        </h3>
                        <p className="text-lg text-gray-600 mb-2 break-words">
                          {proverb.english}
                        </p>
                        <p className="text-gray-700 mb-3 break-words">
                          <strong>Meaning:</strong> {proverb.meaning}
                        </p>
                        <p className="text-sm text-gray-600 break-words">
                          <strong>Context:</strong> {proverb.context}
                        </p>
                      </div>
                      <div className="text-center overflow-hidden">
                        <button
                          onClick={() => playAudio(`proverb-${index}`)}
                          className="text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center mx-auto min-h-[44px] font-medium break-words"
                          style={{backgroundColor: '#695e46'}}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#77705c'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#695e46'}
                        >
                          <Volume2 className="w-5 h-5 mr-2 flex-shrink-0" />
                          Listen
                        </button>
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
          <div className="overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Advanced Lessons</h2>
            <div className="space-y-6 overflow-hidden">
              {heritageLessons.map((lesson) => (
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

export default HeritageSpeakerPath;
