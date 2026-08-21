import React from 'react';
import { Link } from 'react-router-dom';

const CultureFolklore = () => (
  <div classNameName="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Folklore</h1>
    <p className="mb-4">Stories, proverbs, and folktales passed down through generations.</p>
    <Link to="/culture" className="text-blue-600 hover:underline">Back to Culture</Link>
  </div>
);

export default CultureFolklore;
