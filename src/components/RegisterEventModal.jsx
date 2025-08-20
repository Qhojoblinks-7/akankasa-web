import React, { useState } from 'react';

const RegisterEventModal = ({ event, onClose, onRegister }) => {
  const [form, setForm] = useState({ name: '', email: '', tickets: 1 });
  const [submitting, setSubmitting] = useState(false);

  if (!event) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'tickets' ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert('Please enter your name and email.');
      return;
    }
    setSubmitting(true);
    // simulate async registration
    setTimeout(() => {
      setSubmitting(false);
      if (onRegister) onRegister({ eventId: event.id, ...form, registeredAt: new Date().toISOString() });
      if (onClose) onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 z-10">
        <h3 className="text-lg font-semibold mb-2">Register for: {event.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{event.date} • {event.time} • {event.location}</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tickets</label>
            <input name="tickets" value={form.tickets} onChange={handleChange} type="number" min="1" className="w-24 border rounded px-3 py-2" />
          </div>

          <div className="flex justify-end items-center space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-100">Cancel</button>
            <button type="submit" className="bg-[#8B0000] text-[#FDF6EC] px-4 py-2 rounded hover:bg-[#6a0000]">
              {submitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterEventModal;
