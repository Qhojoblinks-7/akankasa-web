import React from 'react';
import { Link } from 'react-router-dom';

const LearnAlphabet = () => (
  <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4 text-gray-900">Akan Alphabet</h1>
    <p className="mb-4 text-gray-600">A guide to the Akan alphabet and pronunciation basics.</p>
    <Link 
      to="/learn" 
      className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors duration-200"
    >
      Back to Learning
    </Link>
  </div>
);

export default LearnAlphabet;
