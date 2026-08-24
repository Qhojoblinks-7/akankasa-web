import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityLayout from '../components/CommunityLayout';

const CommunityJoin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for joining the community, ${formData.name}!`);
    navigate('/community');
  };

  return (
    <CommunityLayout>
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3">
        <h2 className="text-xl font-bold">Join the Community</h2>
      </header>
      <div className="p-4">
        <div className="max-w-lg bg-gray-900 border border-gray-700 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Interests</label>
              <textarea 
                name="interests" 
                value={formData.interests} 
                onChange={handleChange} 
                className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                rows="4"
              />
            </div>
            <button 
              type="submit" 
              className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default CommunityJoin;
