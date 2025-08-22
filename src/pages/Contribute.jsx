import React, { useState } from 'react';

const Contribute = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 flex flex-col items-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-akan-red mb-6">Contribute Content</h1>
        {submitted ? (
          <div className="text-green-600 text-lg font-semibold text-center">Thank you for your contribution! (Demo only)</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Your Name</label>
              <input type="text" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Content Title</label>
              <input type="text" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Content Description</label>
              <textarea className="w-full border rounded px-3 py-2" rows={4} required />
            </div>
            <button type="submit" className="bg-akan-red text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors w-full">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contribute;