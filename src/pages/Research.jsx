import React, { useState, useEffect } from 'react';

import { Search, Download, Filter, BookOpen, Users, GraduationCap, FileText, ExternalLink, MessageSquare } from 'lucide-react';
import { getDocuments, getForumPosts } from '../api';

const Research = () => {
  const [activeTab, setActiveTab] = useState('resources');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'resources', label: 'Resource Library', icon: BookOpen },
    { id: 'forum', label: 'Research Forum', icon: MessageSquare },
    { id: 'collaboration', label: 'Collaboration', icon: Users }
  ];

  const levels = ['all', 'beginner', 'intermediate', 'advanced'];
  const types = ['all', 'article', 'research paper', 'thesis', 'book', 'video', 'dataset'];

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [docs, posts] = await Promise.all([
          getDocuments({ category: selectedType === 'all' ? undefined : selectedType, level: selectedLevel === 'all' ? undefined : selectedLevel, q: searchTerm || undefined, limit: 50 }),
          getForumPosts({ category: 'Research' }),
        ]);
        if (mounted) {
          setResources(Array.isArray(docs) ? docs : (docs.results || []));
          setForumPosts(Array.isArray(posts) ? posts : (posts.results || []));
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, [searchTerm, selectedLevel, selectedType]);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = !searchTerm || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.description && resource.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === 'all' || resource.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  const ResourceCard = ({ resource }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
          <p className="text-sm text-gray-600 mb-2">by {resource.author}</p>
          <p className="text-gray-700 mb-4">{resource.description}</p>
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
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {resource.file_type}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center">
          <FileText className="w-4 h-4 mr-1" />
          {resource.category}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button className="flex items-center px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Download
        </button>
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <ExternalLink className="w-4 h-4 mr-2" />
          View
        </button>
      </div>
    </div>
  );

  const ForumPostCard = ({ post }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-3">{post.content}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>by {post.author_name || 'Anonymous'}</span>
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <span className="px-2 py-1 rounded-full text-xs font-medium ml-4" style={{backgroundColor: '#f1d799', color: '#564c38'}}>
          {post.category}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Research & Resources</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Access academic papers, linguistic resources, and collaborative research tools for Akan studies
          </p>
        </div>
      </div>

      <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40 mb-8">
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

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  style={{'--tw-ring-color': '#564c38'}}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {activeTab === 'resources' ? `Resources (${filteredResources.length})` : `Forum Posts (${forumPosts.length})`}
            </h2>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-gray-500">Loading...</div>
          ) : activeTab === 'resources' ? (
            <div className="divide-y divide-gray-200">
              {filteredResources.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or filters.</p>
                </div>
              ) : (
                filteredResources.map((resource) => (
                  <div key={resource.id} className="px-6 py-6">
                    <ResourceCard resource={resource} />
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {forumPosts.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No forum posts found</h3>
                  <p className="text-gray-600">Be the first to start a discussion!</p>
                </div>
              ) : (
                forumPosts.map((post) => (
                  <div key={post.id} className="px-6 py-6">
                    <ForumPostCard post={post} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Research;
