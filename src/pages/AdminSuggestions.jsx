import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Eye, BookOpen, Clock } from 'lucide-react';
import { adminGet, adminPost, adminPut } from '../api';

const AdminSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('akankasa:admin_token');
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    loadSuggestions();
  }, [navigate]);

  const loadSuggestions = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminGet('/api/admin/dictionary/suggestions');
      setSuggestions(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const moderate = async (id, action) => {
    try {
      if (action === 'approve') {
        await adminPost(`/api/admin/dictionary/suggestions/${id}/approve`, {});
      } else {
        await adminPut(`/api/admin/dictionary/suggestions/${id}`, {
          status: action === 'reject' ? 'rejected' : 'reviewed',
          admin_notes: action === 'reject' ? 'Not approved' : ''
        });
      }
      loadSuggestions();
      setSelected(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#564c38] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading suggestions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-display font-bold text-[#564c38]">Dictionary Suggestions</h1>
              <p className="text-sm text-gray-600">Review user-submitted word suggestions</p>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}
        {suggestions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <CheckCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-[#564c38] mb-2">All caught up!</h2>
            <p className="text-gray-600">There are no pending dictionary suggestions.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {suggestions.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-amber-200 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-display font-bold text-[#564c38]">{item.primary_akan}</h3>
                      <p className="text-gray-600">{item.english_translation}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.status === 'pending' ? 'bg-amber-100 text-amber-800' : item.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.status}</span>
                  </div>
                  {item.part_of_speech && <p className="text-sm text-gray-600 mb-2">Part of Speech: {item.part_of_speech}</p>}
                  {item.etymology && <p className="text-sm text-gray-600 mb-2">Etymology: {item.etymology}</p>}
                  {item.notes && <p className="text-sm text-gray-600 mb-2">Notes: {item.notes}</p>}
                  <p className="text-xs text-gray-500">By {item.author_name || 'Anonymous'} ({item.author_email})</p>
                  {item.status === 'pending' && (
                    <div className="flex items-center space-x-2 mt-4">
                      <button onClick={() => moderate(item.id, 'approve')} className="flex items-center space-x-1 px-3 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors text-sm"><CheckCircle className="w-4 h-4" /><span>Approve</span></button>
                      <button onClick={() => moderate(item.id, 'reject')} className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"><XCircle className="w-4 h-4" /><span>Reject</span></button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              {selected && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-display font-semibold text-[#564c38] mb-4">Details</h3>
                  <div className="space-y-3 text-sm">
                    <div><span className="text-gray-600">Akan:</span> <span className="font-medium">{selected.primary_akan}</span></div>
                    <div><span className="text-gray-600">English:</span> <span className="font-medium">{selected.english_translation}</span></div>
                    <div><span className="text-gray-600">POS:</span> <span className="font-medium">{selected.part_of_speech || '-'}</span></div>
                    <div><span className="text-gray-600">Etymology:</span> <span className="font-medium">{selected.etymology || '-'}</span></div>
                    <div><span className="text-gray-600">Notes:</span> <span className="font-medium">{selected.notes || '-'}</span></div>
                    <div><span className="text-gray-600">Author:</span> <span className="font-medium">{selected.author_name || 'Anonymous'}</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminSuggestions;
