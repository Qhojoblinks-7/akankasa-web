import React from 'react';

import { useState } from 'react';
import { Search, Download, Filter, BookOpen, Users, GraduationCap, FileText, ExternalLink, MessageSquare } from 'lucide-react';
import { researchData, forumData } from '../data/mockData';

const Research = () => {
  const [activeTab, setActiveTab] = useState('resources');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'resources', label: 'Resource Library', icon: BookOpen },
    { id: 'forum', label: 'Research Forum', icon: MessageSquare },
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
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="flex justify-between items-start mb-4 overflow-hidden">
        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 break-words">{resource.title}</h3>
          <p className="text-sm text-gray-600 mb-2 break-words">by {resource.author}</p>
          <p className="text-gray-700 mb-4 break-words">{resource.abstract}</p>
        </div>
        <div className="flex flex-col items-end space-y-2 ml-4 flex-shrink-0 overflow-hidden">
          <span className="px-2 py-1 rounded-full text-xs font-medium break-words"
                style={{
                  backgroundColor: resource.level === 'beginner' ? '#f1d799' : 
                                 resource.level === 'intermediate' ? '#c2ae81' : '#77705c',
                  color: '#564c38'
                }}>
            {resource.level}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs break-words">
            Paper
          </span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4 overflow-hidden">
        {resource.tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs break-words">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center overflow-hidden">
        <button 
          className="font-medium text-sm flex items-center transition-colors break-words min-h-[44px]"
          style={{color: '#564c38'}}
          onMouseEnter={(e) => e.target.style.color = '#695e46'}
          onMouseLeave={(e) => e.target.style.color = '#564c38'}
        >
          <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="break-words">View Details</span>
        </button>
        <button 
          className="text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm break-words min-h-[44px]"
          style={{backgroundColor: '#564c38'}}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#695e46'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#564c38'}
        >
          <Download className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="break-words">Download</span>
        </button>
      </div>
    </div>
  );

  const ForumPost = ({ post }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="flex justify-between items-start mb-4 overflow-hidden">
        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 break-words">{post.title}</h3>
          <p className="text-gray-700 mb-3 break-words">{post.content}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 overflow-hidden">
            <span className="break-words">by {post.author}</span>
            <span className="break-words">{post.lastActivity}</span>
            <span className="break-words">{post.replies} replies</span>
          </div>
        </div>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 break-words">
          {post.category}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4 overflow-hidden">
        {post.tags.map((tag, index) => (
          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs break-words">
            #{tag}
          </span>
        ))}
      </div>
      
      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm break-words min-h-[44px]">
        Join Discussion →
      </button>
    </div>
  );

  return (
    <div className="min-h-screen mt-15 bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="text-white overflow-hidden" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 break-words">Research Hub</h1>
          <p className="text-xl opacity-90 max-w-3xl break-words">
            Access academic resources, collaborate with researchers, and contribute to Akan language and culture studies
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
        {/* Resource Library Tab */}
        {activeTab === 'resources' && (
          <div className="overflow-hidden">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden">
                <div className="md:col-span-2 overflow-hidden">
                  <label className="block text-sm font-medium text-gray-700 mb-2 break-words">Search Resources</label>
                  <div className="relative overflow-hidden">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex-shrink-0" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by title, author, or keywords..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent box-border overflow-hidden"
                    />
                  </div>
                </div>
                
                <div className="overflow-hidden">
                  <label className="block text-sm font-medium text-gray-700 mb-2 break-words">Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent box-border overflow-hidden"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="overflow-hidden">
                  <label className="block text-sm font-medium text-gray-700 mb-2 break-words">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent box-border overflow-hidden"
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 overflow-hidden">
              <div className="bg-white p-6 rounded-lg shadow-md text-center overflow-hidden">
                <div className="text-3xl font-bold text-green-600 mb-2 break-words">120+</div>
                <div className="text-gray-600 break-words">Research Papers</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center overflow-hidden">
                <div className="text-3xl font-bold text-blue-600 mb-2 break-words">45+</div>
                <div className="text-gray-600 break-words">Academic Articles</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center overflow-hidden">
                <div className="text-3xl font-bold text-purple-600 mb-2 break-words">30+</div>
                <div className="text-gray-600 break-words">Datasets</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center overflow-hidden">
                <div className="text-3xl font-bold text-orange-600 mb-2 break-words">15+</div>
                <div className="text-gray-600 break-words">Collaborators</div>
              </div>
            </div>

            {/* Results */}
            <div className="mb-6 overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 break-words">
                Research Resources ({filteredResources.length})
              </h2>
              {filteredResources.length === 0 ? (
                <div className="text-center py-12 overflow-hidden">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4 flex-shrink-0" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2 break-words">No resources found</h3>
                  <p className="text-gray-600 break-words">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
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
          <div className="overflow-hidden">
            <div className="flex justify-between items-center mb-6 overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-900 break-words">Research Discussion Forum</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors break-words min-h-[44px]">
                Start New Discussion
              </button>
            </div>
            
            <div className="space-y-6 overflow-hidden">
              {forumData.filter(post => post.category === 'Research').map((post) => (
                <ForumPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        

        {/* Collaboration Tab */}
        {activeTab === 'collaboration' && (
          <div className="overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 break-words">Research Collaboration</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
              {/* Active Projects */}
              <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 break-words">Active Research Projects</h3>
                <div className="space-y-4 overflow-hidden">
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
                    <div key={index} className="border border-gray-200 rounded-lg p-4 overflow-hidden">
                      <h4 className="font-medium text-gray-900 mb-2 break-words">{project.title}</h4>
                      <p className="text-sm text-gray-600 mb-3 break-words">{project.description}</p>
                      <div className="flex justify-between items-center overflow-hidden">
                        <span className="text-xs text-gray-500 break-words">{project.participants} participants</span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs break-words">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors break-words min-h-[44px]">
                  Propose New Project
                </button>
              </div>

              {/* Collaboration Guidelines */}
              <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 break-words">Collaboration Guidelines</h3>
                <div className="space-y-4 overflow-hidden">
                  <div className="overflow-hidden">
                    <h4 className="font-medium text-gray-900 mb-2 break-words">Getting Started</h4>
                    <ul className="text-sm text-gray-600 space-y-1 overflow-hidden">
                      <li className="break-words">• Review existing research projects</li>
                      <li className="break-words">• Contact project coordinators</li>
                      <li className="break-words">• Submit collaboration request</li>
                      <li className="break-words">• Attend virtual meetups</li>
                    </ul>
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-medium text-gray-900 mb-2 break-words">Best Practices</h4>
                    <ul className="text-sm text-gray-600 space-y-1 overflow-hidden">
                      <li className="break-words">• Respect cultural sensitivity</li>
                      <li className="break-words">• Follow academic standards</li>
                      <li className="break-words">• Share resources openly</li>
                      <li className="break-words">• Credit all contributors</li>
                    </ul>
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-medium text-gray-900 mb-2 break-words">Resources</h4>
                    <ul className="text-sm text-gray-600 space-y-1 overflow-hidden">
                      <li className="break-words">• Research methodology guides</li>
                      <li className="break-words">• Data collection templates</li>
                      <li className="break-words">• Ethics review guidelines</li>
                      <li className="break-words">• Publication templates</li>
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