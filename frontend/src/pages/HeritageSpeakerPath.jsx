import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Volume2, Book, Users, Star, Clock, ArrowRight, CheckCircle, Heart } from 'lucide-react';
import { getVocabularyModules, getLessons, getCultureArticles } from '../api';

const HeritageSpeakerPath = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [vocabulary, setVocabulary] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [cultureArticles, setCultureArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const [vocab, less, culture] = await Promise.all([
          getVocabularyModules(),
          getLessons(),
          getCultureArticles(),
        ]);
        if (mounted) {
          setVocabulary(Array.isArray(vocab) ? vocab : []);
          setLessons(Array.isArray(less) ? less : []);
          setCultureArticles(Array.isArray(culture) ? culture : []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, []);

  const playAudio = (audioSrc) => {
    console.log(`Playing audio: ${audioSrc}`);
  };

  const tabs = [
    { id: 'overview', label: 'Path Overview', icon: Heart },
    { id: 'cultural', label: 'Cultural Context', icon: Users },
    { id: 'vocabulary', label: 'Advanced Vocabulary', icon: Book },
    { id: 'proverbs', label: 'Proverbs', icon: Star },
    { id: 'lessons', label: 'Lessons', icon: CheckCircle }
  ];

  const heritageVocabularyModules = vocabulary.filter(module => 
    ['family', 'numbers', 'food'].includes(module.id)
  );

  const heritageLessons = lessons.filter(lesson => 
    [4, 5].includes(lesson.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-white" style={{background: 'linear-gradient(135deg, #695e46 0%, #77705c 100%)'}}>
        <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Heritage Speaker Path</h1>
          <p className="text-base opacity-90 max-w-3xl">
            Reconnect with your roots - 6-8 weeks to deepen your cultural understanding
          </p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors"
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
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : (
          <>
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Reconnect with Your Heritage</h2>
              <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#564c38] mb-2">6-8</div>
                    <div className="text-gray-600 text-sm">Weeks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#564c38] mb-2">100+</div>
                    <div className="text-gray-600 text-sm">Cultural Terms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#564c38] mb-2">5</div>
                    <div className="text-gray-600 text-sm">Core Modules</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'cultural' && (
          <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Cultural Context</h2>
              <div className="space-y-4">
                {cultureArticles.map((article) => (
                  <div key={article.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 p-4 border border-gray-100">
                    <h3 className="text-base font-bold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{article.description || article.body}</p>
                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={{backgroundColor: '#f1d799', color: '#564c38'}}>
                    {article.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'vocabulary' && (
          <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Advanced Vocabulary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {heritageVocabularyModules.map((module) => (
                  <div key={module.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 overflow-hidden border border-gray-100">
                   <div className="p-4 text-white" style={{background: 'linear-gradient(135deg, #695e46 0%, #77705c 100%)'}}>
                     <h3 className="text-lg font-bold mb-2">{module.title}</h3>
                     <p style={{color: '#f1d799'}}>{module.description}</p>
                     <p className="text-sm mt-2" style={{color: '#c2ae81'}}>{module.words?.length || 0} words</p>
                   </div>
                   <div className="p-4">
                     <div className="space-y-3 mb-4">
                      {(module.words || []).slice(0, 3).map((word, index) => (
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
                    </div>
                    <Link
                      to={`/learn/vocabulary/${module.id}`}
                       className="w-full text-white py-3 rounded-xl transition-all duration-200 flex items-center justify-center hover:shadow-lg hover:-translate-y-0.5"
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

        {activeTab === 'proverbs' && (
          <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Akan Proverbs</h2>
              <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <p className="text-base text-gray-700">Explore traditional Akan proverbs and their meanings.</p>
              </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Heritage Lessons</h2>
            <div className="space-y-4">
               {heritageLessons.map((lesson) => (
                <div key={lesson.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 p-4 border border-gray-100">
                 <div className="flex justify-between items-start mb-3">
                   <div>
                     <h3 className="text-lg font-bold text-gray-900 mb-2">{lesson.title}</h3>
                     <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
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
                       className="text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center hover:shadow-lg"
                      style={{backgroundColor: '#564c38'}}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#695e46'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#564c38'}
                    >
                      Start Lesson
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Learning Objectives:</h4>
                    <ul className="space-y-1">
                      {(lesson.objectives || []).map((objective, index) => (
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
          </>
        )}
      </div>
    </div>
  );
};

export default HeritageSpeakerPath;
