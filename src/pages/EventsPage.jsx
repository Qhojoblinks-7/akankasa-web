import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { getEvents } from '../api';
import ShareButtons from '../components/ShareButtons';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        if (mounted) setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchEvents();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Events & Meetups</h1>
          <p className="text-gray-600">Discover and attend Akan cultural events</p>
        </div>
        <ShareButtons />
      </div>
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading events...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
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
      )}
    </div>
  );
};

export default EventsPage;
