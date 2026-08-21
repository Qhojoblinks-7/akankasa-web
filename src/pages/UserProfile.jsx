import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProfiles } from '../api';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const profiles = await getProfiles();
        const found = (profiles || []).find(u => String(u.id) === String(id));
        setUser(found);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-akan-red rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-red-600">Error: {error}</div>
    );
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">User not found</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-akan-gold to-akan-red rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
          <p className="text-gray-600 mb-1">{user.role}</p>
          <p className="text-gray-500 mb-1">{user.location}</p>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Specialties</h2>
          <div className="flex flex-wrap gap-2">
            {user.specialties.map((s, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{s}</span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Contributions</h2>
          <div className="text-lg font-bold text-akan-red">{user.contributions}</div>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Joined</h2>
          <div className="text-gray-600">{new Date(user.joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;