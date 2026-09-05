import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../api';

const MyProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('akankasa:auth_token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    const load = async () => {
      try {
        const res = await fetch('/api/users/me', {
          headers: { Authorization: token }
        });
        if (!res.ok) throw new Error('Failed to load profile');
        const data = await res.json();
        setForm({ name: data.name || '', email: data.email || '' });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setMessage(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const updated = await updateUserProfile(form);
      setForm({ name: updated.name || '', email: updated.email || '' });
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded" role="alert" aria-live="assertive">{error}</div>}
          {message && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded" role="status" aria-live="polite">{message}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': '#564c38' }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': '#564c38' }}
                required
              />
            </div>
            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
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
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
