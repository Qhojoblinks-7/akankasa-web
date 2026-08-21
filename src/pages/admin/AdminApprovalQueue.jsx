import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, BookOpen, Music, Camera, FileText } from 'lucide-react';
import { getPendingContributions, approveContribution, rejectContribution } from '../../api';

const CONTENT_TYPES = [
  { id: 'folk-stories', label: 'Folk Stories', icon: BookOpen },
  { id: 'drumming', label: 'Drumming', icon: Music },
  { id: 'festival-photos', label: 'Festival Photos', icon: Camera },
  { id: 'research-papers', label: 'Research Papers', icon: FileText },
];

const AdminApprovalQueue = () => {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState('folk-stories');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('akankasa:admin_token');
    if (!token) { navigate('/admin/login', { replace: true }); return;
    }
  }, [navigate]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType]);

  const load = async () => {
    setLoading(true);
    try { setItems(await getPendingContributions(activeType)); }
    catch (err) { console.error(err); setItems([]); }
    finally { setLoading(false); }
  };

  const handleApprove = async (id) => {
    try { await approveContribution(activeType, id); load(); }
    catch (err) { console.error(err); }
  };

  const handleReject = async (id) => {
    try { await rejectContribution(activeType, id); load(); }
    catch (err) { console.error(err); }
  };

  const pendingCounts = CONTENT_TYPES.map(ct => ({
    ...ct,
    count: 0
  }));

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-4">
          <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Back to dashboard"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
          <div><h1 className="text-2xl font-display font-bold text-[#564c38]">Approval Queue</h1><p className="text-sm text-gray-600">Review and approve public contributions</p></div>
        </div>
      </header>
      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {pendingCounts.map(ct => {
            const Icon = ct.icon;
            return (
              <button
                key={ct.id}
                onClick={() => setActiveType(ct.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeType === ct.id ? 'bg-[#564c38] text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {ct.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
            No pending contributions for this category.
          </div>
        ) : (
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    {item.description && <p className="text-sm text-gray-600 mt-1">{item.description}</p>}
                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                      {item.author && <span>By: {item.author}</span>}
                      {item.narrator && <span>Narrator: {item.narrator}</span>}
                      {item.instructor && <span>Instructor: {item.instructor}</span>}
                      {item.photographer && <span>Photographer: {item.photographer}</span>}
                      {item.category && <span>Category: {item.category}</span>}
                      {item.created_at && <span>Submitted: {new Date(item.created_at).toLocaleDateString()}</span>}
                    </div>
                    {item.abstract && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.abstract}</p>}
                    {item.transcript && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.transcript}</p>}
                    {item.tags && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(Array.isArray(item.tags) ? item.tags : item.tags.split(',')).map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{tag}</span>
                        ))}
                      </div>
                    )}
                    {item.keywords && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(Array.isArray(item.keywords) ? item.keywords : item.keywords.split(',')).map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-xs">{kw}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      aria-label={`Approve ${item.title}`}
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      aria-label={`Reject ${item.title}`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminApprovalQueue;
