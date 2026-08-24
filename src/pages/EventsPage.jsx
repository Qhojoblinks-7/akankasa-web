import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { getEvents } from '../api';
import CommunityLayout from '../components/CommunityLayout';

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
    <CommunityLayout>
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3">
        <h2 className="text-xl font-bold">Events & Meetups</h2>
      </header>
      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-gray-700 border-t-yellow-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {events.map(event => (
              <div key={event.id} className="border-2 border-yellow-500/30 bg-gray-900/80 p-4 hover:border-yellow-500 transition-colors">
                <h3 className="font-bold text-white text-sm mb-2 truncate">{event.title}</h3>
                <p className="text-yellow-500 text-xs mb-2 font-medium line-clamp-2">{event.description}</p>
                <div className="flex flex-col space-y-1 text-xs">
                  <span className="text-white font-semibold">{new Date(event.date).toLocaleDateString()}</span>
                  <span className="text-yellow-400 truncate">{event.location}</span>
                </div>
                <Link to={`/community/events/${event.id}/register`} className="inline-block mt-3 bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-600 transition-colors">
                  Register
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </CommunityLayout>
  );
};

export default EventsPage;
