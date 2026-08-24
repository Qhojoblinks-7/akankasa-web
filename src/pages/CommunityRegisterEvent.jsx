import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { registerForEvent } from '../api';
import CommunityLayout from '../components/CommunityLayout';

const CommunityRegisterEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventId) {
      setError('Missing event ID');
      return;
    }
    try {
      await registerForEvent(eventId, formData);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  if (submitted) {
    return (
      <CommunityLayout showComposer={false} onToggleComposer={() => {}}>
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3">
          <h2 className="text-xl font-bold">Event Registration</h2>
        </header>
        <div className="p-4">
          <div className="max-w-lg mx-auto bg-gray-900 border border-gray-700 rounded-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-green-500 mb-6">Registration Successful!</h1>
            <p className="text-gray-400 mb-4">Thank you for registering, {formData.name}.</p>
            <button onClick={() => navigate('/community/events')} className="text-yellow-500 hover:underline">Back to Events</button>
          </div>
        </div>
      </CommunityLayout>
    );
  }

  return (
    <CommunityLayout showComposer={false} onToggleComposer={() => {}}>
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3">
        <h2 className="text-xl font-bold">Register for Event</h2>
      </header>
      <div className="p-4">
        <div className="max-w-lg mx-auto bg-gray-900 border border-gray-700 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Register for Event</h1>
          {error && <div className="mb-4 p-3 bg-red-900/30 border border-red-700 text-red-400 rounded">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent" required />
            </div>
            <button type="submit" className="w-full bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-600 transition-colors">Register</button>
          </form>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default CommunityRegisterEvent;
