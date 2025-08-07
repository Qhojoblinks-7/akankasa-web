import { useState } from 'react';

const CommunityJoin = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 flex flex-col items-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-akan-red mb-6">Join Community</h1>
        {submitted ? (
          <div className="text-green-600 text-lg font-semibold text-center">Thank you for joining! (Demo only)</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Your Name</label>
              <input type="text" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input type="email" className="w-full border rounded px-3 py-2" required />
            </div>
            <button type="submit" className="bg-akan-red text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors w-full">Join</button>
          </form>
        )}
      </div>
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    // In a real app, submit join request to backend
    alert(`Thank you for joining the community, ${formData.name}!`);
    navigate('/community/members');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Join the Community</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Interests</label>
          <textarea 
            name="interests" 
            value={formData.interests} 
            onChange={handleChange} 
            className="w-full border rounded px-3 py-2"
            rows="4"
          />
        </div>
        <button 
          type="submit" 
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default CommunityJoin;
