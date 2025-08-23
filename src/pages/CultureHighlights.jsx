// src/components/CultureHighlights.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, X,Users, Music, Palette, BookOpen, Play, Image, ChevronRight, Filter } from 'lucide-react';
import { culturalData } from '../data/mockData';
import ContributeModal from './ContributeModal';

const MOD_QUEUE_KEY = 'akan:moderation-queue:culture';
const PUBLISHED_CULTURE_KEY = 'akan:published:culture';

const CultureHighlights = () => {
	const [activeSection, setActiveSection] = useState('traditions');
	const [selectedRegion, setSelectedRegion] = useState('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // New state to hold the selected item
  const [published, setPublished] = useState([]);

	const sections = [
		{ id: 'traditions', label: 'Traditions & Customs', icon: Users, color: '#564c38' },
		{ id: 'history', label: 'History & Heritage', icon: BookOpen, color: '#695e46' },
// 		{ id: 'arts', label: 'Arts & Crafts', icon: Palette, color: '#77705c' },
// 		{ id: 'music', label: 'Music & Dance', icon: Music, color: '#c2ae81' }
	];

	const regions = ['all', 'Ashanti Region', 'Eastern Region', 'Central Region', 'Western Region'];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PUBLISHED_CULTURE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      setPublished(list.filter(i => !i.publishAt || new Date(i.publishAt) <= new Date()));
    } catch { setPublished([]); }
  }, []);

	const getCurrentSectionData = () => {
		const base = culturalData[activeSection] || [];
    const extra = published.filter(p => p.section === activeSection);
		return [...base, ...extra];
	};

	const filteredContent = getCurrentSectionData().filter(item => {
		const matchesSearch = !searchTerm ||
			item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.description.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesRegion = selectedRegion === 'all' ||
			item.region === selectedRegion;

		return matchesSearch && matchesRegion;
	});

	const handleContributeSubmit = (newContent) => {
		try {
			const raw = localStorage.getItem(MOD_QUEUE_KEY);
			const queue = raw ? JSON.parse(raw) : [];
			queue.push({ ...newContent, submittedAt: new Date().toISOString(), status: 'pending' });
			localStorage.setItem(MOD_QUEUE_KEY, JSON.stringify(queue));
			alert('Thank you! Your submission was queued for moderation.');
		} catch {
			alert('Saved locally for moderation.');
		}
	};

  const handleLearnMore = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetailView = () => {
    setSelectedItem(null);
  };

	// Helpers for History visuals
	const parseTimelineStart = (timelineStr) => {
		if (!timelineStr) return 0;
		const match = String(timelineStr).match(/(\d{3,4})/);
		return match ? parseInt(match[1], 10) : 0;
	};
	const historyItems = activeSection === 'history' ? filteredContent.slice().sort((a, b) => parseTimelineStart(a.timeline) - parseTimelineStart(b.timeline)) : [];
	const regionCounts = historyItems.reduce((acc, item) => {
		const key = item.region || 'Unknown';
		acc[key] = (acc[key] || 0) + 1;
		return acc;
	}, {});
	const regionList = Object.entries(regionCounts).sort((a, b) => b[1] - a[1]);


  const CultureCard = ({ item, sectionType }) => (
		<div className="bg.white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
			<div className="relative h-48" style={{background: 'linear-gradient(135deg, #f1d799 0%, #564c38 100%)'}}>
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-white text-center">
						<h3 className="text-xl font-bold mb-2">{item.title}</h3>
						<p className="text-sm opacity-90">{item.description}</p>
					</div>
				</div>
				<div className="absolute top-4 right-4">
					<span className="bg-white/20 text.white px-2 py-1 rounded-full text-xs">
						{item.region || 'All Regions'}
					</span>
				</div>
			</div>
			<div className="p-6">
				<div className="mb-4">
					<p className="text-gray-700 leading-relaxed">{item.content}</p>
				</div>

				{sectionType === 'history' && item.timeline && (
					<div className="mb-4">
						<div className="flex items-center text-sm text-gray-600">
							<Calendar className="w-4 h-4 mr-2" />
							<span>{item.timeline}</span>
						</div>
						{item.significance && (
							<div className="mt-2">
								<span className="font-semibold text-gray-900">Significance:</span>
								<p className="text-gray-700 text-sm">{item.significance}</p>
							</div>
						)}
					</div>
				)}

				{sectionType === 'arts' && item.examples && (
					<div className="mb-4">
						<h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
						<div className="space-y-2">
							{item.examples.map((example, index) => (
								<div key={index} className="bg.gray-50 p-3 rounded-lg">
									<div className="font-medium text-gray-900">{example.symbol}</div>
									<div className="text-sm text-gray-600">{example.meaning}</div>
									<div className="text-xs text-gray-500">{example.description}</div>
								</div>
							))}
						</div>
					</div>
				)}

				{sectionType === 'music' && item.instruments && (
					<div className="mb-4">
						<h4 className="font-semibold text-gray-900 mb-2">Instruments:</h4>
						<div className="flex flex-wrap gap-2">
							{item.instruments.map((instrument, index) => (
								<span key={index} className="px-2 py-1 rounded-full text-sm" style={{backgroundColor: '#f1d799', color: '#564c38'}}>
									{instrument}
								</span>
							))}
						</div>
					</div>
				)}

				{item.tags && (
					<div className="flex flex-wrap gap-2">
						{item.tags.map((tag, index) => (
							<span key={index} className="bg.gray-100 text-gray-700 px-2 py-1 rounded text-xs">
								#{tag}
							</span>
						))}
					</div>
				)}

				<div className="mt-4 pt-4 border-t border-gray-200">
					{sectionType === 'traditions' ? (
						<a
							href={`/culture/traditions/${item.id}`}
							className="font-medium text-sm flex items-center transition-colors"
							style={{color: '#564c38'}}
						>
							Learn More
							<ChevronRight className="w-4 h-4 ml-1" />
						</a>
					) : (
						<button
							onClick={() => handleLearnMore(item)}
							className="font-medium text-sm flex items-center transition-colors"
							style={{color: '#564c38'}}
							onMouseEnter={(e) => e.target.style.color = '#695e46'}
							onMouseLeave={(e) => e.target.style.color = '#564c38'}
						>
							Learn More
							<ChevronRight className="w-4 h-4 ml-1" />
						</button>
					)}
				</div>
			</div>
		</div>
	);

  const DetailView = ({ item, onClose }) => {
    if (!item) return null;

    // Determine the section icon for the detail view
    const section = sections.find(s => s.id === activeSection);
    const Icon = section?.icon;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
        <div className="relative p-8 w-full max-w-2xl bg.white rounded-lg shadow-xl m-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center mb-4">
            {Icon && (
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4`} style={{backgroundColor: section.color}}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            )}
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
          
          <div className="prose max-w-none text-gray-700">
            <p>{item.content}</p>
            
            {activeSection === 'history' && (
              <>
                <h4 className="font-semibold text-gray-900 mt-4">Timeline:</h4>
                <p>{item.timeline}</p>
                <h4 className="font-semibold text-gray-900 mt-4">Significance:</h4>
                <p>{item.significance}</p>
              </>
            )}

            {item.region && (
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1" /> {item.region}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Akan Culture Highlights</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Explore Akan traditions, history, arts, music, and social customs through rich media and stories
          </p>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className="flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors"
                  style={activeSection === section.id 
                    ? {borderColor: '#564c38', color: '#564c38'} 
                    : {borderColor: 'transparent', color: '#6b7280'}}
                >
                  <Icon className="w-5 h-5" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search cultural topics..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Contribute Content
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* History Visuals */}
      {activeSection === 'history' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Region Legend / Chips */}
          {regionList.length > 0 && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Regions activity</h3>
                <button
                  className="text-xs text-gray-600 underline"
                  onClick={() => setSelectedRegion('all')}
                >
                  Reset
                </button>
              </div>
              <div className="flex items-center flex-wrap gap-2">
                {regionList.map(([regionName, count]) => {
                  const intensity = Math.min(1, 0.4 + count * 0.15);
                  const isActive = selectedRegion === regionName;
                  return (
                    <button
                      key={regionName}
                      onClick={() => setSelectedRegion(isActive ? 'all' : regionName)}
                      className={`px-3 py-1 rounded-full text-xs border ${isActive ? 'text-white' : 'text-gray-800'}`}
                      style={{
                        backgroundColor: isActive ? '#564c38' : `rgba(241,215,153,${intensity.toFixed(2)})`,
                        borderColor: '#e5e7eb'
                      }}
                      aria-pressed={isActive}
                    >
                      {regionName} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Historical timeline</h3>
            {historyItems.length === 0 ? (
              <p className="text-sm text-gray-600">No items match your filters.</p>
            ) : (
              <ol className="relative border-l border-gray-200 pl-6">
                {historyItems.map((item, idx) => (
                  <li key={item.id} className="mb-6 ml-2">
                    <span className="absolute -left-[9px] flex items-center justify-center w-4 h-4 bg-yellow-500 rounded-full ring-2 ring-white"></span>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                      <Calendar className="w-3 h-3" />
                      <span>{item.timeline || 'Undated'}</span>
                      {item.region && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                          <MapPin className="w-3 h-3 mr-1" /> {item.region}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                        {item.significance && (
                          <p className="text-sm text-gray-700 mt-1">{item.significance}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleLearnMore(item)}
                        className="text-sm font-medium"
                        style={{color: '#564c38'}}
                      >
                        View
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <CultureCard key={item.id} item={item} sectionType={activeSection} />
          ))}
        </div>
      </div>

      {/* Contribute Modal */}
      <ContributeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleContributeSubmit}
      />
      <DetailView item={selectedItem} onClose={handleCloseDetailView} />
    </div>
  );
};

export default CultureHighlights;