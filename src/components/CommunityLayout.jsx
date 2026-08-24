import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Calendar, Users, Star, Plus, Search, MoreHorizontal, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getEvents } from '../api';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: MessageSquare, label: 'Discussion', href: '/community/discussion' },
  { icon: Calendar, label: 'Events', href: '/community/events' },
  { icon: Users, label: 'Members', href: '/community/members' },
  { icon: Star, label: 'Achievements', href: '/community' },
];

const trends = [
  { category: 'Akan Language · Trending', topic: '#AkanProverbs', posts: '2,451 posts' },
  { category: 'Culture · Trending', topic: '#TwiPronunciation', posts: '1,832 posts' },
  { category: 'Learning · Trending', topic: '#LanguageExchange', posts: '956 posts' },
  { category: 'Heritage · Trending', topic: '#AkanHeritage', posts: '3,210 posts' },
  { category: 'Festivals · Trending', topic: '#AdinkraSymbols', posts: '1,104 posts' },
];

const CommunityLayout = ({ children, showComposer, onToggleComposer }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        if (mounted) setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
    return () => { mounted = false; };
  }, []);

  const isActive = (path) => {
    if (path === '/community') {
      return location.pathname === '/community' || location.pathname.startsWith('/community/events') || location.pathname.startsWith('/community/join') || location.pathname.startsWith('/community/new-post');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto flex">
        {/* Left Sidebar */}
        <aside className="w-64 h-screen sticky top-0 border-r border-gray-800 hidden md:flex flex-col justify-between p-4">
          <div>
            <div className="mb-8 px-4">
              <Link to="/" className="text-3xl font-bold" style={{ color: '#f59e0b' }}>Akan Kasa</Link>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center space-x-4 px-4 py-3 rounded-full transition-colors text-xl ${
                      isActive(item.href) ? 'font-bold text-white' : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            {showComposer && (
              <button
                onClick={onToggleComposer}
                className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition-colors"
              >
                Post
              </button>
            )}
          </div>
          <div className="px-4 py-2">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-gray-500 text-xs">@{user.name?.toLowerCase().replace(/\s/g, '') || 'user'}</p>
                  </div>
                </div>
                <button onClick={logout} className="text-gray-500 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">?</div>
                <div>
                  <p className="font-medium text-sm">Sign In</p>
                  <p className="text-gray-500 text-xs">Join the community</p>
                </div>
              </Link>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen border-r border-gray-800">
          {children}
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 hidden lg:block p-4 space-y-4">
          <div className="bg-gray-900 rounded-2xl p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search discussions..."
                className="w-full bg-gray-800 text-white rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700"
              />
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-4">
            <h3 className="text-xl font-bold mb-4">Trends for you</h3>
            <div className="space-y-3">
              {trends.map((trend, index) => (
                <button key={index} type="button" className="cursor-pointer hover:bg-gray-800 p-3 rounded-lg transition-colors w-full text-left">
                  <p className="text-xs text-gray-500 truncate">{trend.category}</p>
                  <p className="font-bold text-white text-sm truncate">{trend.topic}</p>
                  <p className="text-xs text-gray-500 truncate">{trend.posts}</p>
                </button>
              ))}
            </div>
            <button className="mt-4 text-yellow-500 hover:text-yellow-400 text-sm">Show more</button>
          </div>

          <div className="bg-gray-900 rounded-2xl p-4">
            <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
            <div className="flex flex-col space-y-3">
              {events.length === 0 ? (
                <p className="text-gray-500 text-sm">No upcoming events.</p>
              ) : (
                events.slice(0, 5).map((event) => (
                  <Link key={event.id} to={`/community/events/${event.id}/register`} className="hover:bg-gray-800 p-2 -mx-2 rounded-lg transition-colors block">
                    <p className="font-bold text-white text-sm truncate">{event.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{new Date(event.date).toLocaleDateString()} · {event.location}</p>
                  </Link>
                ))
              )}
            </div>
            <Link to="/community/events" className="mt-4 text-yellow-500 hover:text-yellow-400 text-sm inline-block">Show more</Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CommunityLayout;
