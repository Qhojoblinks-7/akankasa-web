import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEvents, registerForEvent } from '../api';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/community/events" className="text-blue-600 hover:underline">Back to Events</Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
          <Link to="/community/events" className="text-blue-600 hover:underline">Back to Events</Link>
        </div>
      </div>
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-green-600">Registration Successful!</h2>
          <p className="text-gray-600 mb-2">Thank you for registering, {formData.name}.</p>
          <p className="text-sm text-gray-500 mb-4">A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
          {registrationId && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Registration ID</p>
              <p className="text-lg font-mono font-bold text-[#564c38]">{registrationId}</p>
            </div>
          )}
          <div className="space-x-4">
            <button onClick={() => navigate('/community/events')} className="text-blue-600 hover:underline">Back to Events</button>
            <button onClick={() => { setSubmitted(false); setRegistrationId(null); }} className="text-gray-600 hover:underline">Register Another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Register for Event: {event.title}</h1>
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}
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
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default EventRegistration;
