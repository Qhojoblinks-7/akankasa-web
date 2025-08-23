import React from 'react';
import { Link } from 'react-router-dom';
import { communityData } from '../data/mockData';
import { Calendar, MapPin, Clock } from 'lucide-react';

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto p-6 overflow-hidden">
        <h1 className="text-2xl font-bold mb-4 break-words">Events & Meetups</h1>
        <p className="text-gray-600 mb-6 break-words">Discover and attend Akan cultural events</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
          {communityData.events.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow p-4 overflow-hidden">
              <h3 className="font-semibold mb-2 break-words">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-2 break-words">{event.description}</p>
              <div className="text-sm text-gray-500 mb-4 overflow-hidden">
                <div className="flex items-center overflow-hidden">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="break-words">{event.date}</span>
                </div>
                <div className="flex items-center overflow-hidden">
                  <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="break-words">{event.time}</span>
                </div>
                <div className="flex items-center overflow-hidden">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="break-words">{event.location}</span>
                </div>
              </div>
              <Link 
                to={`/community/events/${event.id}/register`} 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded break-words min-h-[44px] flex items-center justify-center"
              >
                Register
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
