import React from 'react';
import { Link } from 'react-router-dom';

const LearnGreetingsIndex = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4 text-gray-900">Basic Greetings</h1>
    <p className="mb-4 text-gray-600">Short lessons and examples for common Akan greetings.</p>
    <Link 
      to="/learn" 
      className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors duration-200"
    >
      Back to Learning
    </Link>
  </div>
);

export default LearnGreetingsIndex;
