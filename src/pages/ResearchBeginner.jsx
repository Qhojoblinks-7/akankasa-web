import React from 'react';
import { Link } from 'react-router-dom';

const ResearchBeginner = () => (
  <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Beginner Research Resources</h1>
    <p className="mb-4">Introductory materials and project ideas for learners and community researchers.</p>
    <Link to="/research" className="text-blue-600 hover:underline">Back to Research</Link>
  </div>
);

export default ResearchBeginner;
