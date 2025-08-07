import { eventsData } from '../data/mockData';
import { Calendar, Clock, MapPin } from 'lucide-react';

const CommunityEvents = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-akan-red mb-8">Community Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {eventsData.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h2>
            <p className="text-gray-700 mb-2">{event.description}</p>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <Clock className="w-4 h-4 mr-2" />
              {event.time}
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <MapPin className="w-4 h-4 mr-2" />
              {event.location}
            </div>
            <div className="mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-block">
              {event.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CommunityEvents;