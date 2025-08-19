import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventCreation = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    location: '',
    type: 'workshop'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, submit eventData to backend
    alert('Event created successfully!');
    navigate('/community/events');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            name="date" 
            value={eventData.date} 
            onChange={handleChange} 
            required 
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Time</label>
          <input 
            type="time" 
            name="time" 
            value={eventData.time} 
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
            name="type" 
            value={eventData.type} 
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
        <button 
          type="submit" 
          className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventCreation;
