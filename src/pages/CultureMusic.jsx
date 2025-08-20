import React from 'react';
import { Link } from 'react-router-dom';

const CultureMusic = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Music & Dance</h1>
    <p className="mb-4">Exploration of Akan musical traditions, instruments, rhythms, and dance forms.</p>
    <Link to="/culture" className="text-blue-600 hover:underline">Back to Culture</Link>
  </div>
);

export default CultureMusic;
