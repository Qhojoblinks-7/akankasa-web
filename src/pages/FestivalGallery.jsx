import React from 'react';
import { culturalData } from '../data/mockData';

const FestivalGalleryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 break-words">Festival Photos</h1>
        <p className="text-xl opacity-90 max-w-3xl break-words">
          Explore vibrant cultural celebrations through stunning photography from across Ghana
        </p>
      </div>
    </div>
  );
};

export default FestivalGalleryPage;
