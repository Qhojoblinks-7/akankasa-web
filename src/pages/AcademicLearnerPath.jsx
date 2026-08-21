import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Volume2, Book, Users, Star, Clock, ArrowRight, CheckCircle, GraduationCap } from 'lucide-react';
import { getDocuments, getLessons } from '../api';

const AcademicLearnerPath = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [documents, setDocuments] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const [docs, less] = await Promise.all([
          getDocuments({ limit: 50 }),
          getLessons(),
        ]);
        if (mounted) {
          setDocuments(Array.isArray(docs) ? docs : (docs.results || []));
          setLessons(Array.isArray(less) ? less : []);
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

  const tabs = [
    { id: 'overview', label: 'Path Overview', icon: GraduationCap },
    { id: 'grammar', label: 'Grammar', icon: Book },
    { id: 'phonology', label: 'Phonology', icon: Volume2 },
    { id: 'dialects', label: 'Dialectal Variations', icon: Users },
    { id: 'research', label: 'Research Methods', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-white" style={{background: 'linear-gradient(135deg, #77705c 0%, #564c38 100%)'}}>
        <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Learner Path</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Comprehensive linguistic approach - 12-16 weeks for in-depth understanding
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Academic Overview</h2>
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#564c38] mb-2">12-16</div>
                    <div className="text-gray-600">Weeks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#564c38] mb-2">Advanced</div>
                    <div className="text-gray-600">Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#564c38] mb-2">{documents.length}</div>
                    <div className="text-gray-600">Resources</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'grammar' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Grammar Resources</h2>
            <div className="space-y-6">
              {documents.filter(d => d.category === 'grammar').map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-gray-600 mb-4">{doc.description}</p>
                  <span className="px-3 py-1 rounded-full text-xs font-medium" style={{backgroundColor: '#f1d799', color: '#564c38'}}>
                    {doc.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'phonology' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Phonology</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <p className="text-lg text-gray-700">Study Akan sound systems, phonetic notation, and pronunciation patterns.</p>
            </div>
          </div>
        )}

        {activeTab === 'dialects' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Dialectal Variations</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <p className="text-lg text-gray-700">Explore Twi, Fante, and Akuapem dialect differences and regional variations.</p>
            </div>
          </div>
        )}

        {activeTab === 'research' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Research Methods</h2>
            <div className="space-y-6">
              {lessons.filter(l => l.level === 'advanced').map((lesson) => (
                <div key={lesson.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h3>
                  <p className="text-gray-600 mb-4">{lesson.description}</p>
                  <Link to={`/learn/lesson/${lesson.id}`} className="text-[#564c38] font-medium hover:underline">
                    View Lesson →
                  </Link>
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

export default AcademicLearnerPath;
