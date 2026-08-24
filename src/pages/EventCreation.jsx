import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api';
import { useAuth } from '../hooks/useAuth';
import CommunityLayout from '../components/CommunityLayout';

const EventCreation = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const formRef = useRef(null);
  const [eventData, setEventData] = useState({
    title: '',
    event_date: '',
    event_time: '',
    description: '',
    location: '',
    event_type: 'workshop'
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { state: { from: '/community/events/new' } });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoadingSubmit(true);
    setError('');
    try {
      await createEvent(eventData);
      navigate('/community/events');
    } catch (err) {
      setError(err.message || 'Failed to create event');
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <CommunityLayout showComposer={false} onToggleComposer={() => {}}>
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3">
        <h2 className="text-xl font-bold">Create New Event</h2>
      </header>
      <div className="p-4">
        <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-700 rounded-lg p-6">
          {error && <div className="mb-4 p-3 bg-red-900/30 border border-red-700 text-red-400 rounded">{error}</div>}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input 
                type="text" 
                name="title" 
                value={eventData.title} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
              <input 
                type="date" 
                name="event_date" 
                value={eventData.event_date} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Time</label>
              <input 
                type="time" 
                name="event_time" 
                value={eventData.event_time} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
              <input 
                type="text" 
                name="location" 
                value={eventData.location} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
              <select 
                name="event_type" 
                value={eventData.event_type} 
                onChange={handleChange} 
                className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="workshop">Workshop</option>
                <option value="exhibition">Exhibition</option>
                <option value="online">Online</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea 
                name="description" 
                value={eventData.description} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                rows="4"
              />
            </div>
            <button 
              type="submit" 
              disabled={loadingSubmit}
              className="w-full bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-600 transition-colors disabled:opacity-50"
            >
              {loadingSubmit ? 'Creating...' : 'Create Event'}
            </button>
          </form>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default EventCreation;
