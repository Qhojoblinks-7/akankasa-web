import React from 'react';

import { useState, useEffect } from 'react';
import { Search, Download, Filter, BookOpen, Users, GraduationCap, FileText, ExternalLink, MessageSquare, Plus } from 'lucide-react';
import { researchData, forumData } from '../data/mockData';
import ResearchUploadModal from '../components/ResearchUploadModal.jsx';
import { submitResearchUpload } from '../api';

const PUBLISHED_RESEARCH_KEY = 'akan:published:research';

const Research = () => {
  const [activeTab, setActiveTab] = useState('resources');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Advanced filters
  const [selectedMethodology, setSelectedMethodology] = useState('all');
  const [selectedTags, setSelectedTags] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [published, setPublished] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PUBLISHED_RESEARCH_KEY);
      const list = raw ? JSON.parse(raw) : [];
      setPublished(list.filter(i => !i.publishAt || new Date(i.publishAt) <= new Date()));
    } catch { setPublished([]); }
  }, []);

  const tabs = [
    { id: 'resources', label: 'Resource Library', icon: BookOpen },
    { id: 'forum', label: 'Research Forum', icon: MessageSquare },
    { id: 'tools', label: 'Analysis Tools', icon: GraduationCap },
    { id: 'collaboration', label: 'Collaboration', icon: Users }
  ];

  const levels = ['all', 'beginner', 'intermediate', 'advanced'];
  const types = ['all', 'article', 'research paper', 'thesis', 'book', 'video', 'dataset'];
  const methodologies = ['all', 'descriptive', 'comparative', 'corpus', 'ethnographic', 'experimental'];

  const getAllResources = () => {
    return [...(researchData.papers || []), ...published];
  };

  const filteredResources = getAllResources().filter(resource => {
    const matchesSearch = !searchTerm || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.abstract && resource.abstract.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === 'all' || (resource.level || '').toLowerCase() === selectedLevel;

    const matchesMethodology = selectedMethodology === 'all' || (resource.methodology || '').toLowerCase() === selectedMethodology;

    const tagTokens = selectedTags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
    const matchesTags = tagTokens.length === 0 || (resource.tags || []).some(t => tagTokens.includes(t.toLowerCase()));

    const date = resource.publicationDate ? new Date(resource.publicationDate) : null;
    const fromOk = !dateFrom || (date && date >= new Date(dateFrom));
    const toOk = !dateTo || (date && date <= new Date(dateTo));

    return matchesSearch && matchesLevel && matchesMethodology && matchesTags && fromOk && toOk;
  });

  const ResourceCard = ({ resource }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
          <p className="text-sm text-gray-600 mb-2">by {resource.author}</p>
          <p className="text-gray-700 mb-4">{resource.abstract}</p>
        </div>
        <div className="flex flex-col items.end space-y-2 ml-4">
          <span className="px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: (resource.level || '').toLowerCase() === 'beginner' ? '#f1d799' : 
                                 (resource.level || '').toLowerCase() === 'intermediate' ? '#c2ae81' : '#77705c',
                  color: '#564c38'
                }}>
            {resource.level || 'N/A'}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
            {(resource.methodology || 'methodology').toString()}
          </span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {(resource.tags || []).map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <button 
          className="font-medium text-sm flex items-center transition-colors"
          style={{color: '#564c38'}}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Details
        </button>
        <a 
          href={resource.downloadUrl}
          className="text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm"
          style={{backgroundColor: '#564c38'}}
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </a>
      </div>
    </div>
  );

  const ForumPost = ({ post }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items.start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-3">{post.content}</p>
          <div className="flex items-center space.x-4 text-sm text-gray-500">
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

  const submitUpload = async (payload) => {
    await submitResearchUpload(payload);
    alert('Thank you! Your research upload was queued for moderation.');
  };

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
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Methodology</label>
                  <select
                    value={selectedMethodology}
                    onChange={(e) => setSelectedMethodology(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {methodologies.map(m => (
                      <option key={m} value={m}>
                        {m === 'all' ? 'All Methodologies' : m.charAt(0).toUpperCase() + m.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    value={selectedTags}
                    onChange={(e) => setSelectedTags(e.target.value)}
                    placeholder="e.g. phonology, corpus"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full border rounded px-3 py-2" />
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <div></div>
                <button onClick={() => setIsUploadOpen(true)} className="px-3 py-2 rounded text-white flex items-center text-sm" style={{backgroundColor: '#564c38'}}>
                  <Plus className="w-4 h-4 mr-1" /> Upload Resource
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((r, idx) => (
                <ResourceCard resource={r} key={idx} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'forum' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {forumData.posts.map((p) => (
              <ForumPost post={p} key={p.id} />
            ))}
          </div>
        )}
      </div>

      <ResearchUploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} onSubmit={submitUpload} />
    </div>
  );
};

export default Research;