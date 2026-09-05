import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfiles } from '../api';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

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

  const handleEdit = () => {
    if (user) {
      setForm({ name: user.name || '', email: user.email || '' });
    }
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('akankasa:auth_token')
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setUser(prev => ({ ...prev, name: updated.name, email: updated.email }));
      setIsEditing(false);
      setMessage('Profile updated successfully');
    } catch (err) {
      setError(err.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-akan-red rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-2xl text-red-600">Error: {error}</div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">User not found</div>;
  }

  const initials = user.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors text-sm"
              >
                Edit Profile
              </button>
            )}
          </div>
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded" role="alert" aria-live="assertive">{error}</div>}
          {message && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded" role="status" aria-live="polite">{message}</div>}
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-akan-gold to-akan-red rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {initials}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': '#564c38' }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': '#564c38' }}
                  required
                />
              </div>
              <div className="flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-akan-gold to-akan-red rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {initials}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
                <p className="text-gray-600 mb-1">{user.role}</p>
                <p className="text-gray-500 mb-1">{user.location}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {user.specialties.map((s, i) => (
                    <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{s}</span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Contributions</h3>
                <div className="text-lg font-bold text-akan-red">{user.contributions}</div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Joined</h3>
                <div className="text-gray-600">{new Date(user.joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;