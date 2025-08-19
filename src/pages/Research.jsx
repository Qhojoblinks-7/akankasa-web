import React from 'react';

import { useState } from 'react';
import { Search, Download, Filter, BookOpen, Users, GraduationCap, FileText, ExternalLink, MessageSquare } from 'lucide-react';
import { researchData, forumData } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const Research = () => {
  const [activeTab, setActiveTab] = useState('resources');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const tabs = [
    { id: 'resources', label: 'Resource Library', icon: BookOpen },
    { id: 'forum', label: 'Research Forum', icon: MessageSquare },
    { id: 'tools', label: 'Analysis Tools', icon: GraduationCap },
    { id: 'collaboration', label: 'Collaboration', icon: Users }
  ];

  const levels = ['all', 'beginner', 'intermediate', 'advanced'];
  const types = ['all', 'article', 'research paper', 'thesis', 'book', 'video', 'dataset'];

  const getAllResources = () => {
    return researchData.papers || [];
  };

  const filteredResources = getAllResources().filter(resource => {
    const matchesSearch = !searchTerm || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.abstract && resource.abstract.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === 'all' || resource.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  const ResourceCard = ({ resource }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
          <p className="text-sm text-gray-600 mb-2">by {resource.author}</p>
          <p className="text-gray-700 mb-4">{resource.abstract}</p>
        </div>
        <div className="flex flex-col items-end space-y-2 ml-4">
          <span className="px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: resource.level === 'beginner' ? '#f1d799' : 
                                 resource.level === 'intermediate' ? '#c2ae81' : '#77705c',
                  color: '#564c38'
                }}>
            {resource.level}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
            Paper
          </span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {resource.tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <button 
          className="font-medium text-sm flex items-center transition-colors"
          style={{color: '#564c38'}}
          onMouseEnter={(e) => e.target.style.color = '#695e46'}
          onMouseLeave={(e) => e.target.style.color = '#564c38'}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Details
        </button>
        <button 
          className="text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm"
          style={{backgroundColor: '#564c38'}}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#695e46'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#564c38'}
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </button>
      </div>
    </div>
  );

  const ForumPost = ({ post }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-3">{post.content}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>by {post.author}</span>
            <span>{post.lastActivity}</span>
            <span>{post.replies} replies</span>
          </div>
        </div>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
          {post.category}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, index) => (
          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            #{tag}
          </span>
        ))}
      </div>
      
      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
        Join Discussion →
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Research Hub</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Access academic resources, collaborate with researchers, and contribute to Akan language and culture studies
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
        {/* Resource Library Tab */}
        {activeTab === 'resources' && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Resources</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by title, author, or keywords..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Resource Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">120+</div>
                <div className="text-gray-600">Research Papers</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">45+</div>
                <div className="text-gray-600">Academic Articles</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">30+</div>
                <div className="text-gray-600">Datasets</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
                <div className="text-gray-600">Collaborators</div>
              </div>
            </div>

            {/* Results */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Research Resources ({filteredResources.length})
              </h2>
              {filteredResources.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResources.map((resource, index) => (
                    <ResourceCard key={index} resource={resource} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Research Forum Tab */}
        {activeTab === 'forum' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Research Discussions</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => navigate('/research/new-discussion')}
              >
                Start New Discussion
              </button>
            </div>
            
            <div className="space-y-6">
              {forumData.map((post) => (
                <ForumPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Analysis Tools Tab */}
        {activeTab === 'tools' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Linguistic Analysis Tools</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Text Analyzer',
                  description: 'Analyze Akan text for linguistic patterns, word frequency, and grammatical structures',
                  icon: FileText,
                  status: 'Available'
                },
                {
                  title: 'Tone Pattern Recognition',
                  description: 'Identify and analyze tonal patterns in spoken Akan recordings',
                  icon: MessageSquare,
                  status: 'Beta'
                },
                {
                  title: 'Dialect Comparison Tool',
                  description: 'Compare linguistic features across different Akan dialects',
                  icon: BookOpen,
                  status: 'Coming Soon'
                },
                {
                  title: 'Corpus Search',
                  description: 'Search through large collections of Akan texts and audio recordings',
                  icon: Search,
                  status: 'Available'
                },
                {
                  title: 'Phonetic Transcription',
                  description: 'Convert Akan audio to phonetic notation using IPA standards',
                  icon: GraduationCap,
                  status: 'Beta'
                },
                {
                  title: 'Statistical Analysis',
                  description: 'Generate statistical reports on language usage patterns',
                  icon: Users,
                  status: 'Available'
                }
              ].map((tool, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <tool.icon className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tool.status === 'Available' ? 'bg-green-100 text-green-700' :
                        tool.status === 'Beta' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {tool.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <button 
                    className={`w-full py-2 px-4 rounded-lg transition-colors ${
                      tool.status === 'Available' 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={tool.status !== 'Available'}
                    onClick={() => tool.status === 'Available' && alert('Demo: Tool would launch here!')}
                  >
                    {tool.status === 'Available' ? 'Launch Tool' : tool.status}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Collaboration Tab */}
        {activeTab === 'collaboration' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Collaboration</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Active Projects */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Active Research Projects</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Akan Proverbs Digital Archive',
                      description: 'Collaborative effort to digitize and analyze traditional Akan proverbs',
                      participants: 8,
                      status: 'In Progress'
                    },
                    {
                      title: 'Dialectal Variations Study',
                      description: 'Comparative analysis of phonological differences across Akan dialects',
                      participants: 5,
                      status: 'Data Collection'
                    },
                    {
                      title: 'Modern Akan Usage Patterns',
                      description: 'Studying how Akan language is evolving in digital spaces',
                      participants: 12,
                      status: 'Analysis'
                    }
                  ].map((project, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{project.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{project.participants} participants</span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                  onClick={() => navigate('/research/propose-project')}
                >
                  Propose New Project
                </button>
              </div>

              {/* Collaboration Guidelines */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Collaboration Guidelines</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Getting Started</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Review existing research projects</li>
                      <li>• Contact project coordinators</li>
                      <li>• Submit collaboration request</li>
                      <li>• Attend virtual meetups</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Best Practices</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Respect cultural sensitivity</li>
                      <li>• Follow academic standards</li>
                      <li>• Share resources openly</li>
                      <li>• Credit all contributors</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Resources</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Research methodology guides</li>
                      <li>• Data collection templates</li>
                      <li>• Ethics review guidelines</li>
                      <li>• Publication templates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;