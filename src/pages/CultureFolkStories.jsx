import React from 'react';
import { Link } from 'react-router-dom';

const CultureFolkStories = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Folk Stories</h1>
    <p className="mb-4">Traditional Akan folk stories, proverbs, and oral traditions passed down through generations.</p>
    <Link to="/culture" className="text-blue-600 hover:underline">Back to Culture</Link>
  </div>
);

export default CultureFolkStories;