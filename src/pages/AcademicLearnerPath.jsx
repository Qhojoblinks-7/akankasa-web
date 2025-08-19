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
    <div className="min-h-screen" style={{background: '#FDF6EC'}}>
      {/* Header */}
      <div className="text-white" style={{background: 'linear-gradient(135deg, #8B0000 0%, #C19A6B 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Learner Path</h1>
          <p className="text-xl opacity-90 max-w-3xl">Deep dive into Akan linguistics, phonology, and dialectal variations</p>
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
                    ? {borderColor: '#C19A6B', color: '#1C1C1C'} 
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
                      <GraduationCap className="w-5 h-5 mr-3 mt-0.5" style={{color: '#C19A6B'}} />
                      <span>Advanced grammatical structures and syntax</span>
                    </li>
                    <li className="flex items-start">
                      <GraduationCap className="w-5 h-5 mr-3 mt-0.5" style={{color: '#f1d799'}} />
                      <span>Phonological patterns and tonal systems</span>
                    </li>
                    <li className="flex items-start">
                      <GraduationCap className="w-5 h-5 mr-3 mt-0.5" style={{color: '#f1d799'}} />
                      <span>Variations across different Akan dialects</span>
                    </li>
                    <li className="flex items-start">
                      <GraduationCap className="w-5 h-5 mr-3 mt-0.5" style={{color: '#f1d799'}} />
                      <span>Research methodologies for linguistic study</span>
                    </li>
                    <li className="flex items-start">
                      <GraduationCap className="w-5 h-5 mr-3 mt-0.5" style={{color: '#f1d799'}} />
                      <span>Academic writing and presentation skills</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Path Structure</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 pl-4 py-1" style={{borderColor: '#C19A6B'}}>
                      <h4 className="font-semibold text-gray-900">Weeks 1-4: Grammar Foundations</h4>
                      <p className="text-gray-600 text-sm">Advanced grammatical structures and syntax</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1" style={{borderColor: '#3B7A57'}}>
                      <h4 className="font-semibold text-gray-900">Weeks 5-8: Phonological Analysis</h4>
                      <p className="text-gray-600 text-sm">Tonal systems and sound patterns</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1" style={{borderColor: '#1C1C1C'}}>
                      <h4 className="font-semibold text-gray-900">Weeks 9-12: Dialectal Studies</h4>
                      <p className="text-gray-600 text-sm">Variations across Akan dialects</p>
                    </div>
                    <div className="border-l-4 pl-4 py-1" style={{borderColor: '#8B0000'}}>
                      <h4 className="font-semibold text-gray-900">Weeks 13-16: Research Methods</h4>
                      <p className="text-gray-600 text-sm">Academic research and documentation</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Academic Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: "Grammar Mastery", desc: "Understand complex structures", progress: "0%", color: "#1C1C1C" },
                  { title: "Phonology Expert", desc: "Analyze tonal patterns", progress: "0%", color: "#3B7A57" },
                  { title: "Dialect Researcher", desc: "Study regional variations", progress: "0%", color: "#8B0000" },
                  { title: "Research Scholar", desc: "Conduct linguistic studies", progress: "0%", color: "#C19A6B" }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold" style={{backgroundColor: item.color}}>
                      <GraduationCap className="w-8 h-8" />
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

        {/* Grammar Tab */}
        {activeTab === 'grammar' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Advanced Grammar</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <p className="text-lg text-gray-700 mb-6">
                Akan grammar features a complex system of noun classes, verb serialization, and aspect marking. 
                This section covers advanced grammatical structures essential for academic study.
              </p>
              
              <div className="space-y-6">
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
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium text-gray-900">Example:</p>
                      <p className="text-gray-700">{topic.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Phonology Tab */}
        {activeTab === 'phonology' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Phonological Patterns</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <p className="text-lg text-gray-700 mb-6">
                Akan is a tonal language with two level tones (High and Low) and a downstep phenomenon. 
                Understanding these patterns is crucial for proper pronunciation and linguistic analysis.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Tone System",
                    description: "Akan uses high (H) and low (L) tones to distinguish meaning. Tone is lexical and grammatical.",
                    example: "ágya (chief) vs. àgya (fire)"
                  },
                  {
                    title: "Downstep Phenomenon",
                    description: "When a high tone is followed by another high tone, the second is pronounced lower.",
                    example: "ágyáá (chiefs) shows downstep on the second high tone"
                  },
                  {
                    title: "Tone Sandhi",
                    description: "Tonal changes that occur when words are combined in phrases or sentences.",
                    example: "Náà kò (He went) - tone changes in connected speech"
                  }
                ].map((topic, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium text-gray-900">Example:</p>
                      <p className="text-gray-700">{topic.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dialects Tab */}
        {activeTab === 'dialects' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Dialectal Variations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Asante Twi",
                  region: "Ashanti Region",
                  characteristics: "The most widely spoken dialect, basis for standard Twi",
                  features: ["Standard orthography", "Influenced by colonial education", "Used in media"]
                },
                {
                  title: "Akuapem Twi",
                  region: "Eastern Region",
                  characteristics: "Closely related to Asante Twi with minor variations",
                  features: ["Similar grammar structure", "Different vocabulary items", "Used in traditional ceremonies"]
                },
                {
                  title: "Fante",
                  region: "Central Region",
                  characteristics: "Significant differences in phonology and vocabulary",
                  features: ["Different tone system", "Unique grammatical constructions", "Coastal influences"]
                },
                {
                  title: "Other Dialects",
                  region: "Various Regions",
                  characteristics: "Regional variations with distinct features",
                  features: ["Bono dialect", "Gonja dialect", "Ahafo dialect"]
                }
              ].map((dialect, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dialect.title}</h3>
                  <p className="text-gray-600 mb-2">{dialect.region}</p>
                  <p className="text-gray-700 mb-4">{dialect.characteristics}</p>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {dialect.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2" style={{color: '#C19A6B'}} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Research Methods Tab */}
        {activeTab === 'research' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Research Methods</h2>
            <div className="space-y-6">
              {researchData.papers.map((paper) => (
                <div key={paper.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{paper.title}</h3>
                      <p className="text-gray-600 mb-2">by {paper.author}</p>
                      <p className="text-gray-700 mb-4">{paper.abstract}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="px-3 py-1 rounded-full" style={{backgroundColor: '#C19A6B', color: '#1C1C1C'}}>{paper.level}</span>
                        <span className="text-gray-500">{paper.year}</span>
                      </div>
                    </div>
                    <a
                      href={paper.downloadUrl}
                      className="px-6 py-3 rounded-lg transition-colors flex items-center btn-primary"
                      style={{backgroundColor: '#C19A6B', color: '#1C1C1C'}}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#a98253'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#C19A6B'}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Download
                    </a>
                  </div>
                </div>
              ))}
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Academic Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {researchData.tools.map((tool, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{tool.name}</h4>
                      <p className="text-gray-600 mb-3">{tool.description}</p>
                      <a
                        href={tool.url}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Access Tool →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicLearnerPath;
