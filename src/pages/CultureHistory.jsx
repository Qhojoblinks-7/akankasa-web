import React from 'react';
import { Link } from 'react-router-dom';

const CultureHistory = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Akan History</h1>
    <p className="mb-4">Learn about the historical background, migrations, and notable figures in Akan history.</p>
    <Link to="/culture" className="text-blue-600 hover:underline">Back to Culture</Link>
  </div>
);

export default CultureHistory;
