import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Volume2, Book, Users, Star, Clock, ArrowRight, CheckCircle, GraduationCap } from 'lucide-react';
import { researchData } from '../data/mockData';

const AcademicLearnerPath = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Path Overview', icon: GraduationCap },
    { id: 'grammar', label: 'Grammar', icon: Book },
    { id: 'phonology', label: 'Phonology', icon: Volume2 },
    { id: 'dialects', label: 'Dialectal Variations', icon: Users },
    { id: 'research', label: 'Research Methods', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="text-white overflow-hidden" style={{background: 'linear-gradient(135deg, #77705c 0%, #564c38 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 break-words">Academic Learner Path</h1>
          <p className="text-xl opacity-90 max-w-3xl break-words">
            Comprehensive linguistic approach - 12-16 weeks for in-depth understanding
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
                    ? {borderColor: '#77705c', color: '#77705c'} 
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
                      <GraduationCap className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Advanced grammatical structures and syntax</span>
                    </li>
                    <li className="flex items-start overflow-hidden">
                      <GraduationCap className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Phonological patterns and tonal systems</span>
                    </li>
                    <li className="flex items-start overflow-hidden">
                      <GraduationCap className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Variations across different Akan dialects</span>
                    </li>
                    <li className="flex items-start overflow-hidden">
                      <GraduationCap className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Research methodologies for linguistic study</span>
                    </li>
                    <li className="flex items-start overflow-hidden">
                      <GraduationCap className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{color: '#f1d799'}} />
                      <span className="break-words">Academic writing and presentation skills</span>
                    </li>
                  </ul>
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 break-words">Path Structure</h3>
                  <div className="space-y-4 overflow-hidden">
                    <div className="border-l-4 pl-4 py-1 overflow-hidden" style={{borderColor: '#f1d799'}}>
                      <h4 className="font-semibold text-gray-900 break-words">Weeks 1-4: Grammar Foundations</h4>
                      <p className="text-gray-600 text-sm break-words">Advanced grammatical structures and syntax</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1 overflow-hidden" style={{borderColor: '#c2ae81'}}>
                      <h4 className="font-semibold text-gray-900 break-words">Weeks 5-8: Phonological Analysis</h4>
                      <p className="text-gray-600 text-sm break-words">Tonal systems and sound patterns</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1 overflow-hidden" style={{borderColor: '#77705c'}}>
                      <h4 className="font-semibold text-gray-900 break-words">Weeks 9-12: Dialectal Studies</h4>
                      <p className="text-gray-600 text-sm break-words">Variations across Akan dialects</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1 overflow-hidden" style={{borderColor: '#564c38'}}>
                      <h4 className="font-semibold text-gray-900 break-words">Weeks 13-16: Research Methods</h4>
                      <p className="text-gray-600 text-sm break-words">Academic research and documentation</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Your Academic Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 overflow-hidden">
                {[
                  { title: "Grammar Mastery", desc: "Understand complex structures", progress: "0%", color: "#77705c" },
                  { title: "Phonology Expert", desc: "Analyze tonal patterns", progress: "0%", color: "#695e46" },
                  { title: "Dialect Researcher", desc: "Study regional variations", progress: "0%", color: "#564c38" },
                  { title: "Research Scholar", desc: "Conduct linguistic studies", progress: "0%", color: "#f1d799" }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center overflow-hidden">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold overflow-hidden" style={{backgroundColor: item.color}}>
                      <GraduationCap className="w-8 h-8 flex-shrink-0" />
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

        {/* Grammar Tab */}
        {activeTab === 'grammar' && (
          <div className="overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Advanced Grammar</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-hidden">
              <p className="text-lg text-gray-700 mb-6 break-words">
                Akan grammar features a complex system of noun classes, verb serialization, and aspect marking. 
                This section covers advanced grammatical structures essential for academic study.
              </p>
              
              <div className="space-y-6 overflow-hidden">
                {[
                  {
                    title: "Noun Classes and Agreement",
                    description: "Akan has several noun classes that affect agreement patterns with verbs, adjectives, and pronouns.",
                    example: "Ɛno yɛ den (This is a child) vs. Ɛno yɛ anim (This is an animal)"
                  },
                  {
                    title: "Verb Serialization",
                    description: "Multiple verbs can be combined in a single clause to express complex actions.",
                    example: "Me bue frɛ ba (I went and called him)"
                  },
                  {
                    title: "Aspect and Tense Marking",
                    description: "Akan uses aspect markers rather than tense to indicate the temporal nature of events.",
                    example: "Me re-kɔ (I am going) vs. Me kɔ (I went)"
                  }
                ].map((topic, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 overflow-hidden">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 break-words">{topic.title}</h3>
                    <p className="text-gray-600 mb-4 break-words">{topic.description}</p>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
                      <p className="font-medium text-gray-900 break-words">Example:</p>
                      <p className="text-gray-700 break-words">{topic.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Phonology Tab */}
        {activeTab === 'phonology' && (
          <div className="overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Phonological Patterns</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-hidden">
              <p className="text-lg text-gray-700 mb-6 break-words">
                Akan is a tonal language with two level tones (High and Low) and a downstep phenomenon. 
                Understanding these patterns is crucial for proper pronunciation and linguistic analysis.
              </p>
              
              <div className="space-y-6 overflow-hidden">
                {[
                  {
                    title: "Tonal Patterns",
                    description: "Akan uses High (H) and Low (L) tones with downstep (↓) to create meaning distinctions.",
                    example: "H-L: 'kɔ' (go) vs. L-H: 'kɔ' (leg)"
                  },
                  {
                    title: "Vowel Harmony",
                    description: "Akan exhibits advanced vowel harmony affecting both root and affix vowels.",
                    example: "ɔ + a → ɔ (back vowel harmony)"
                  },
                  {
                    title: "Consonant Assimilation",
                    description: "Consonants change their features to match adjacent sounds in natural speech.",
                    example: "n + p → m + p (nasal assimilation)"
                  }
                ].map((topic, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 overflow-hidden">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 break-words">{topic.title}</h3>
                    <p className="text-gray-600 mb-4 break-words">{topic.description}</p>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
                      <p className="font-medium text-gray-900 break-words">Example:</p>
                      <p className="text-gray-700 break-words">{topic.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dialects Tab */}
        {activeTab === 'dialects' && (
          <div className="overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Dialectal Variations</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-hidden">
              <p className="text-lg text-gray-700 mb-6 break-words">
                Akan dialects show fascinating variations in pronunciation, vocabulary, and grammar. 
                Understanding these differences is essential for comprehensive linguistic analysis.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
                {[
                  {
                    name: "Asante Twi",
                    region: "Ashanti Region",
                    features: "Standard dialect, most widely spoken",
                    examples: ["ɔkɔ", "ɛyɛ", "wɔ"]
                  },
                  {
                    name: "Fante",
                    region: "Central Region",
                    features: "Coastal dialect, distinct phonology",
                    examples: ["ɔkɔ", "ɛyɛ", "wɔ"]
                  },
                  {
                    name: "Akuapem Twi",
                    region: "Eastern Region",
                    features: "Traditional dialect, conservative features",
                    examples: ["ɔkɔ", "ɛyɛ", "wɔ"]
                  },
                  {
                    name: "Bono",
                    region: "Bono Region",
                    features: "Western dialect, unique vocabulary",
                    examples: ["ɔkɔ", "ɛyɛ", "wɔ"]
                  }
                ].map((dialect, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 overflow-hidden">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 break-words">{dialect.name}</h3>
                    <p className="text-gray-600 mb-2 break-words">{dialect.region}</p>
                    <p className="text-gray-700 mb-4 break-words">{dialect.features}</p>
                    <div className="space-y-2 overflow-hidden">
                      <p className="font-medium text-gray-900 break-words">Examples:</p>
                      <div className="flex flex-wrap gap-2 overflow-hidden">
                        {dialect.examples.map((example, idx) => (
                          <span key={idx} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm break-words">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Research Methods Tab */}
        {activeTab === 'research' && (
          <div className="overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 break-words">Research Methods</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-hidden">
              <p className="text-lg text-gray-700 mb-6 break-words">
                Learn systematic approaches to studying Akan language and culture. 
                This section covers fieldwork, data collection, and academic writing.
              </p>
              
              <div className="space-y-6 overflow-hidden">
                {[
                  {
                    title: "Fieldwork Techniques",
                    description: "Methods for collecting linguistic data from native speakers in natural settings.",
                    steps: ["Identify informants", "Record conversations", "Transcribe audio", "Analyze patterns"]
                  },
                  {
                    title: "Data Analysis",
                    description: "Systematic approaches to analyzing linguistic data and identifying patterns.",
                    steps: ["Organize data", "Identify variables", "Statistical analysis", "Pattern recognition"]
                  },
                  {
                    title: "Academic Writing",
                    description: "Standards for writing research papers and presenting linguistic findings.",
                    steps: ["Literature review", "Methodology", "Results", "Discussion"]
                  }
                ].map((topic, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 overflow-hidden">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 break-words">{topic.title}</h3>
                    <p className="text-gray-600 mb-4 break-words">{topic.description}</p>
                    <div className="space-y-2 overflow-hidden">
                      <p className="font-medium text-gray-900 break-words">Key Steps:</p>
                      <ol className="list-decimal list-inside space-y-1 overflow-hidden">
                        {topic.steps.map((step, idx) => (
                          <li key={idx} className="text-gray-700 break-words">{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicLearnerPath;
