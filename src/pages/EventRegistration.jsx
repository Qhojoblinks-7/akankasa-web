import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEvents, registerForEvent } from '../api';
import CommunityLayout from '../components/CommunityLayout';

const EventRegistration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const events = await getEvents();
        const found = (events || []).find(e => String(e.id) === String(eventId));
        setEvent(found);
      } catch (err) {
        setError(err.message || 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <CommunityLayout>
        <div className="p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Error</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <Link to="/community/events" className="text-yellow-500 hover:underline">Back to Events</Link>
          </div>
        </div>
      </CommunityLayout>
    );
  }

  if (!event) {
    return (
      <CommunityLayout>
        <div className="p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
            <Link to="/community/events" className="text-yellow-500 hover:underline">Back to Events</Link>
          </div>
        </div>
      </CommunityLayout>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerForEvent(eventId, formData);
      const regId = result?.id || `REG-${Date.now().toString(36).toUpperCase()}`;
      setRegistrationId(regId);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  if (submitted) {
    return (
      <CommunityLayout>
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3">
          <h2 className="text-xl font-bold">Event Registration</h2>
        </header>
        <div className="p-4">
          <div className="max-w-md mx-auto bg-gray-900 border border-gray-700 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-900/30 border border-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-green-500">Registration Successful!</h2>
            <p className="text-gray-400 mb-2">Thank you for registering, {formData.name}.</p>
            <p className="text-sm text-gray-500 mb-4">A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
            {registrationId && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-400 mb-1">Registration ID</p>
                <p className="text-lg font-mono font-bold text-yellow-500">{registrationId}</p>
              </div>
            )}
            <div className="space-x-4">
              <button onClick={() => navigate('/community/events')} className="text-yellow-500 hover:underline">Back to Events</button>
              <button onClick={() => { setSubmitted(false); setRegistrationId(null); }} className="text-gray-400 hover:underline">Register Another</button>
            </div>
          </div>
        </div>
      </CommunityLayout>
    );
  }

  return (
    <CommunityLayout>
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3">
        <h2 className="text-xl font-bold">Register for Event</h2>
      </header>
      <div className="p-4">
        <div className="max-w-lg bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-white mb-4">Register for Event: {event.title}</h1>
          {error && <div className="mb-4 p-3 bg-red-900/30 border border-red-700 text-red-400 rounded">{error}</div>}
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
            <button 
              type="submit" 
              className="w-full bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default EventRegistration;
