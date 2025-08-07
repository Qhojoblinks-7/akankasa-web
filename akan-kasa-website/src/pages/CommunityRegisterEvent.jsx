import { useState } from 'react';

const CommunityRegisterEvent = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 flex flex-col items-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-akan-red mb-6">Register for Event</h1>
        {submitted ? (
          <div className="text-green-600 text-lg font-semibold text-center">Thank you for registering! (Demo only)</div>
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
            <div>
              <label className="block mb-1 font-semibold">Event</label>
              <input type="text" className="w-full border rounded px-3 py-2" required placeholder="Event Name" />
            </div>
            <button type="submit" className="bg-akan-red text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors w-full">Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CommunityRegisterEvent;