import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateEventButton from '../components/CreateEventButton';
import { createEvent } from '../api';

const EventCreation = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [eventData, setEventData] = useState({
    title: '',
    event_date: '',
    event_time: '',
    description: '',
    location: '',
    event_type: 'workshop'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createEvent(eventData);
      navigate('/community/events');
    } catch (err) {
      setError(err.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input 
            type="text" 
            name="title" 
            value={eventData.title} 
            onChange={handleChange} 
            required 
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Date</label>
          <input 
            type="date" 
            name="event_date" 
            value={eventData.event_date} 
            onChange={handleChange} 
            required 
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Time</label>
          <input 
            type="time" 
            name="event_time" 
            value={eventData.event_time} 
            onChange={handleChange} 
            required 
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input 
            type="text" 
            name="location" 
            value={eventData.location} 
            onChange={handleChange} 
            required 
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Type</label>
          <select 
            name="event_type" 
            value={eventData.event_type} 
            onChange={handleChange} 
            className="w-full border rounded px-3 py-2"
          >
            <option value="workshop">Workshop</option>
            <option value="exhibition">Exhibition</option>
            <option value="online">Online</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea 
            name="description" 
            value={eventData.description} 
            onChange={handleChange} 
            required 
            className="w-full border rounded px-3 py-2"
            rows="4"
          />
        </div>
        <div>
          <CreateEventButton onClick={() => formRef.current && formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}>
            {loading ? 'Creating...' : 'Create Event'}
          </CreateEventButton>
        </div>
      </form>
    </div>
  );
};

export default EventCreation;
