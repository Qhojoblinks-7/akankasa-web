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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-hidden" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 p-6 z-10 overflow-hidden">
        <div className="flex items-start justify-between mb-4 overflow-hidden">
          <h2 className="text-xl font-bold break-words">Create New Event</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 min-h-[44px] min-w-[44px] flex items-center justify-center">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 overflow-hidden">
          <div className="overflow-hidden">
            <label className="block font-medium mb-1 break-words">Title</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 box-border overflow-hidden"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
            <div className="overflow-hidden">
              <label className="block font-medium mb-1 break-words">Date</label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 box-border overflow-hidden"
              />
            </div>
            <div className="overflow-hidden">
              <label className="block font-medium mb-1 break-words">Time</label>
              <input
                type="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 box-border overflow-hidden"
              />
            </div>
          </div>

          <div className="overflow-hidden">
            <label className="block font-medium mb-1 break-words">Location</label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 box-border overflow-hidden"
            />
          </div>

          <div className="overflow-hidden">
            <label className="block font-medium mb-1 break-words">Type</label>
            <select
              name="type"
              value={eventData.type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 box-border overflow-hidden"
            >
              <option value="workshop">Workshop</option>
              <option value="exhibition">Exhibition</option>
              <option value="online">Online</option>
            </select>
          </div>

          <div className="overflow-hidden">
            <label className="block font-medium mb-1 break-words">Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border rounded px-3 py-2 box-border overflow-hidden"
            />
          </div>

          <div className="flex justify-end items-center space-x-3 overflow-hidden">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-100 break-words min-h-[44px]">Cancel</button>
            <button type="submit" className="bg-[#8B0000] text-[#FDF6EC] px-4 py-2 rounded hover:bg-[#6a0000] break-words min-h-[44px]">Create Event</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreationModal;
