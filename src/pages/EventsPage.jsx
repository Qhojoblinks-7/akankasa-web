import React from 'react';
import { Link } from 'react-router-dom';
import { communityData } from '../data/mockData';
import { Calendar, MapPin, Clock } from 'lucide-react';

const EventsPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Events & Meetups</h1>
      <p className="text-gray-600 mb-6">Discover and attend Akan cultural events</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communityData.events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">{event.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{event.description}</p>
            <div className="text-sm text-gray-500 mb-4">
              <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />{event.date}</div>
              <div className="flex items-center"><Clock className="w-4 h-4 mr-2" />{event.time}</div>
              <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{event.location}</div>
            </div>
            <Link to={`/community/events/${event.id}/register`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Register</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
