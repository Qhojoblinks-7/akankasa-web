import React from 'react';

import { useParams, Link } from 'react-router-dom';
import { culturalData } from '../data/mockData';
import { ArrowLeft, MapPin, Info, BookOpen } from 'lucide-react';

const TraditionDetail = () => {
  const { traditionId } = useParams();
  const idNum = parseInt(traditionId);
  const tradition = (culturalData.traditions || []).find(t => t.id === idNum);

  if (!tradition) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Tradition Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find details for this tradition.</p>
          <Link to="/culture" className="inline-flex items-center text-white px-4 py-2 rounded" style={{backgroundColor: '#564c38'}}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Culture
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <Link to="/culture" className="inline-flex items-center text-white/90 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4">{tradition.title}</h1>
          <p className="text-white/90 text-lg mt-2 max-w-3xl">{tradition.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {tradition.region && (
              <span className="inline-flex items-center text-sm bg-white/15 text-white px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4 mr-1" /> {tradition.region}
              </span>
            )}
            {tradition.importance && (
              <span className="inline-flex items-center text-sm bg-white/15 text-white px-3 py-1 rounded-full">
                <Info className="w-4 h-4 mr-1" /> Importance: {tradition.importance}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-xl shadow-md p-6 md:p-8 leading-relaxed text-gray-800">
          <section className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-3 flex items-center"><BookOpen className="w-5 h-5 mr-2 text-yellow-600" /> Overview</h2>
            <p className="text-lg mb-6">{tradition.content}</p>

            {/* Reader-friendly tips section to enhance UX */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Key Points</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Historical and cultural significance highlighted</li>
                  <li>Common regions: {tradition.region || 'Various'}</li>
                  <li>Importance: {tradition.importance || 'Varies'}</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">How to Experience</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Visit local festivals and community gatherings</li>
                  <li>Speak with elders and cultural custodians</li>
                  <li>Explore museum archives and oral histories</li>
                </ul>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default TraditionDetail;