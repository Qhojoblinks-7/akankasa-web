import React, { useState } from 'react';
import { MapPin, Info } from 'lucide-react';

const DialectMap = ({ onDialectSelect, selectedDialect = 'all' }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // Simplified map of Ghana with major Akan dialect regions
  const regions = [
    {
      id: 'ashanti',
      name: 'Ashanti (Twi)',
      center: { x: 50, y: 120 },
      color: '#f59e0b',
      description: 'Central region, includes Kumasi'
    },
    {
      id: 'fante',
      name: 'Fante',
      center: { x: 30, y: 180 },
      color: '#10b981',
      description: 'Coastal region, includes Cape Coast'
    },
    {
      id: 'akuapem',
      name: 'Akuapem',
      center: { x: 80, y: 100 },
      color: '#3b82f6',
      description: 'Eastern region, includes Akropong'
    },
    {
      id: 'akyem',
      name: 'Akyem',
      center: { x: 100, y: 140 },
      color: '#8b5cf6',
      description: 'Eastern region, includes Kibi'
    },
    {
      id: 'kwahu',
      name: 'Kwahu',
      center: { x: 70, y: 150 },
      color: '#ec4899',
      description: 'Eastern region, includes Abetifi'
    }
  ];

  const handleRegionClick = (regionId) => {
    onDialectSelect(regionId);
  };

  const handleRegionHover = (regionId) => {
    setHoveredRegion(regionId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-yellow-600" />
        Akan Dialect Regions
      </h3>
      
      <div className="relative bg-gray-100 rounded-lg p-4 mb-4">
        {/* Simplified map visualization */}
        <div className="relative h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded border border-gray-300">
          {/* Ghana outline approximation */}
          <div className="absolute inset-4 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg border-2 border-green-300">
            {/* Region markers */}
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => handleRegionClick(region.id)}
                onMouseEnter={() => handleRegionHover(region.id)}
                onMouseLeave={() => handleRegionHover(null)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                  selectedDialect === region.id 
                    ? 'scale-125 z-10' 
                    : hoveredRegion === region.id 
                    ? 'scale-110 z-5' 
                    : 'scale-100'
                }`}
                style={{
                  left: `${region.center.x}%`,
                  top: `${region.center.y}%`
                }}
                aria-label={`Select ${region.name} dialect`}
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-colors ${
                    selectedDialect === region.id
                      ? 'bg-yellow-500 ring-2 ring-yellow-300'
                      : hoveredRegion === region.id
                      ? 'bg-yellow-400'
                      : 'bg-gray-400'
                  }`}
                  style={{ backgroundColor: region.color }}
                >
                  <span className="text-white text-xs font-bold">
                    {region.name.charAt(0)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Region information */}
        {hoveredRegion && (
          <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200 max-w-xs z-20">
            <div className="flex items-start mb-2">
              <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  {regions.find(r => r.id === hoveredRegion)?.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {regions.find(r => r.id === hoveredRegion)?.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Region legend */}
      <div className="grid grid-cols-2 gap-2">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => handleRegionClick(region.id)}
            className={`flex items-center p-2 rounded text-sm transition-colors ${
              selectedDialect === region.id
                ? 'bg-yellow-100 border-yellow-300'
                : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
            } border`}
          >
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: region.color }}
            />
            <span className="font-medium">{region.name}</span>
          </button>
        ))}
        <button
          onClick={() => handleRegionClick('all')}
          className={`flex items-center p-2 rounded text-sm transition-colors ${
            selectedDialect === 'all'
              ? 'bg-gray-200 border-gray-300'
              : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
          } border col-span-2`}
        >
          <div className="w-3 h-3 rounded-full mr-2 bg-gray-400" />
          <span className="font-medium">All Dialects</span>
        </button>
      </div>

      {/* Selected region info */}
      {selectedDialect && selectedDialect !== 'all' && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-1">
            {regions.find(r => r.id === selectedDialect)?.name}
          </h4>
          <p className="text-sm text-blue-700">
            {regions.find(r => r.id === selectedDialect)?.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default DialectMap;
