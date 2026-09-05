import React from 'react';
import { Link } from 'react-router-dom';

const CultureTraditions = () => (
  <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Akan Traditions</h1>
    <p className="mb-4">An overview of Akan traditions, customs, and social practices that shape community life.</p>
    <Link to="/culture" className="text-blue-600 hover:underline">Back to Culture</Link>
  </div>
);

export default CultureTraditions;
