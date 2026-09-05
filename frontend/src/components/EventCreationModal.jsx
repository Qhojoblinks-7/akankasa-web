import React, { useState } from 'react';

const EventCreationModal = ({ onClose, onCreate }) => {
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
    // Placeholder: call onCreate with eventData
    if (onCreate) onCreate(eventData);
    // Close modal after create
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 p-6 z-10">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-bold">Create New Event</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              rows="4"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end items-center space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-100">Cancel</button>
            <button type="submit" className="bg-[#8B0000] text-[#FDF6EC] px-4 py-2 rounded hover:bg-[#6a0000]">Create Event</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreationModal;
