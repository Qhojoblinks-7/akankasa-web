import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Trash2, Image, Film, Music, FileText, Loader2 } from 'lucide-react';

const AdminMediaLibrary = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('akankasa:admin_token');
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    load();
  }, [navigate, filter, search]);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.set('type', filter);
      if (search) params.set('search', search);
      params.set('limit', '48');
      const res = await fetch(`/api/media?${params.toString()}`, {
        headers: { Authorization: localStorage.getItem('akankasa:admin_token') }
      });
      if (!res.ok) throw new Error('Failed to load media');
      const data = await res.json();
      setItems(data.results || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this media item?')) return;
    try {
      const res = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
        headers: { Authorization: localStorage.getItem('akankasa:admin_token') }
      });
      if (!res.ok) throw new Error('Delete failed');
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'video': return Film;
      case 'audio': return Music;
      case 'image': return Image;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-4">
          <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Back to dashboard"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
          <div><h1 className="text-2xl font-display font-bold text-[#564c38]">Media Library</h1><p className="text-sm text-gray-600">Browse and manage uploaded media files</p></div>
        </div>
      </header>
      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search media..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': '#564c38' }}
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': '#564c38' }}
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="document">Documents</option>
            </select>
            <span className="text-sm text-gray-600">{total} items</span>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-500">
              <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading...
            </div>
          ) : items.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No media found.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
              {items.map((item) => {
                const Icon = getIcon(item.media_type);
                return (
                  <div key={item.id} className="relative group rounded-lg overflow-hidden border border-gray-200 hover:border-amber-300 transition-colors bg-gray-50 aspect-square flex items-center justify-center">
                    {item.media_type === 'image' && item.url ? (
                      <img src={item.url} alt={item.alt_text || item.original_name || 'media'} className="w-full h-full object-cover" />
                    ) : item.media_type === 'video' && item.url ? (
                      <video src={item.url} className="w-full h-full object-cover" muted preload="metadata" />
                    ) : (
                      <Icon className="w-8 h-8 text-gray-400" />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                        aria-label={`Delete ${item.original_name || item.filename}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-xs text-white truncate">{item.original_name || item.filename}</p>
                      <p className="text-[10px] text-white/80 capitalize">{item.media_type}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminMediaLibrary;
