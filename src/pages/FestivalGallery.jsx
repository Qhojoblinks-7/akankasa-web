import React from 'react';
import FestivalGallery from '../components/FestivalGallery';

const FestivalGalleryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Festival Photos</h1>
        <p className="text-xl opacity-90 max-w-3xl">
          Explore vibrant cultural celebrations through stunning photography from across Ghana
        </p>
        <FestivalGallery />
      </div>
    </div>
  );
};

export default FestivalGalleryPage;
