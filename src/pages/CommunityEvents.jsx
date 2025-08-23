import { eventsData } from '../data/mockData';
import { Calendar, Clock, MapPin } from 'lucide-react';

const CommunityEvents = () => (
  <div className="min-h-screen bg-gray-50 py-12 overflow-x-hidden">
    <div className="max-w-4xl mx-auto px-4 overflow-hidden">
      <h1 className="text-3xl font-bold text-akan-red mb-8 break-words">Community Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
        {eventsData.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
            <h2 className="text-xl font-bold text-gray-900 mb-2 break-words">{event.title}</h2>
            <p className="text-gray-700 mb-2 break-words">{event.description}</p>
            <div className="flex items-center text-sm text-gray-600 mb-1 overflow-hidden">
              <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="break-words">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-1 overflow-hidden">
              <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="break-words">{event.time}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-1 overflow-hidden">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="break-words">{event.location}</span>
            </div>
            <div className="mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-block break-words">
              {event.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CommunityEvents;