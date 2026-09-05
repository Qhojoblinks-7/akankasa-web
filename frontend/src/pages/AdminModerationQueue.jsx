import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Eye, Clock, FileText, User } from 'lucide-react';
import { adminGet, adminPut } from '../api';

const AdminModerationQueue = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('akankasa:admin_token');
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    loadQueue();
  }, [navigate]);

  const loadQueue = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminGet('/api/admin/moderation');
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModerate = async (id, action) => {
    try {
      await adminPut(`/api/admin/moderation/${id}`, { action });
      await loadQueue();
      setSelectedItem(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#564c38] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading moderation queue...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Back to dashboard">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-display font-bold text-[#564c38]">Moderation Queue</h1>
              <p className="text-sm text-gray-600">Review and moderate user-submitted content</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
              {items.length} pending
            </span>
          </div>
        </div>
      </header>

      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg" role="alert" aria-live="assertive">{error}</div>}
        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <CheckCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-[#564c38] mb-2">All caught up!</h2>
            <p className="text-gray-600">There are no items pending moderation at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-amber-200 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-[#564c38]">{item.title}</h3>
                        <p className="text-sm text-gray-500">by {item.author_name || 'Anonymous'}</p>
                        <p className="text-sm text-gray-500">{item.author_email || ''}</p>
                      </div>
                    </div>
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Category</h4>
                      <p className="text-sm text-gray-900 capitalize">{item.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Description</h4>
                      <p className="text-sm text-gray-900">{item.description}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Content Preview</h4>
                      <p className="text-sm text-gray-600 line-clamp-3">{item.content}</p>
                    </div>
                    {item.region && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Region</h4>
                        <p className="text-sm text-gray-900">{item.region}</p>
                      </div>
                    )}
                    {item.tags && item.tags.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Tags</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className="bg-amber-50 text-amber-700 px-2 py-1 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleModerate(item.id, 'approve')}
                      className="flex-1 bg-[#564c38] text-white px-4 py-2 rounded-lg hover:bg-[#695e46] transition-colors flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleModerate(item.id, 'reject')}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </button>
                     <button
                       onClick={() => setSelectedItem(item)}
                       className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                       aria-label={`View details for ${item.title}`}
                     >
                       <Eye className="w-4 h-4" />
                     </button>
                  </div>
                </div>
              ))}
            </div>

            {selectedItem && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                  <h3 className="font-display font-semibold text-[#564c38] mb-4">Full Preview</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Title</h4>
                      <p className="text-sm text-gray-900">{selectedItem.title}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Content</h4>
                      <div className="text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded max-h-96 overflow-y-auto">
                        {selectedItem.content}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleModerate(selectedItem.id, 'approve')}
                        className="flex-1 bg-[#564c38] text-white px-3 py-2 rounded-lg hover:bg-[#695e46] transition-colors text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleModerate(selectedItem.id, 'reject')}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminModerationQueue;
