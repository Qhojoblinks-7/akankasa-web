import React from 'react';
import { Link } from 'react-router-dom';

const CultureResearchPapers = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Research Papers</h1>
    <p className="mb-4">Academic studies, research papers, and scholarly articles on Akan culture and traditions.</p>
    <Link to="/culture" className="text-blue-600 hover:underline">Back to Culture</Link>
  </div>
);

export default CultureResearchPapers;