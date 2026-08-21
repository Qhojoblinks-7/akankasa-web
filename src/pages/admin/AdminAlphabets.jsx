import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Search, RefreshCw } from 'lucide-react';
import { adminGet, adminDelete } from '../../api';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';

const AdminAlphabets = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('akankasa:admin_token');
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    load();
  }, [navigate]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminGet('/api/admin/alphabets');
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Something went wrong while loading letters.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setConfirmDelete({ id, title: 'Delete this letter?', message: 'This alphabet letter entry will be permanently removed.' });
  };

  const confirmDeleteAction = async () => {
    const id = confirmDelete?.id;
    setConfirmDelete(null);
    if (!id) return;
    try {
      await adminDelete(`/api/admin/alphabets/${id}`);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const filtered = items.filter(item => {
    const letter = (item.letter || '').toLowerCase();
    const pronunciation = (item.pronunciation || '').toLowerCase();
    const q = search.toLowerCase();
    return letter.includes(q) || pronunciation.includes(q);
  });

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-4">
          <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
          <div><h1 className="text-2xl font-display font-bold text-[#564c38]">Alphabet</h1><p className="text-sm text-gray-600">Manage Akan letters and pronunciation</p></div>
          <button onClick={() => navigate('/admin/alphabets/new')} className="ml-auto flex items-center px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors"><Plus className="w-4 h-4 mr-2" /> New Letter</button>
        </div>
      </header>
      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex items-center">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search letters..." className="w-full border-0 focus:ring-0 text-gray-900 placeholder-gray-400 bg-transparent" />
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
            <span className="text-sm">{error}</span>
            <button onClick={load} className="ml-4 inline-flex items-center text-sm px-3 py-1.5 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
              <RefreshCw className="w-4 h-4 mr-1" /> Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(entry => (
              <div key={entry.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-amber-300 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-[#564c38]">{entry.letter}</h3>
                    <p className="text-gray-600 font-medium">/{entry.pronunciation}/</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${entry.is_published ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>
                    {entry.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{entry.example || ''}</p>
                {entry.audio_url && <p className="text-xs text-gray-400 mb-4">Audio: {entry.audio_url}</p>}
                <div className="flex items-center space-x-2">
                  <button onClick={() => navigate(`/admin/alphabets/${entry.id}`)} className="flex items-center px-3 py-1.5 text-sm text-amber-700 hover:text-amber-800 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors"><Edit className="w-4 h-4 mr-1" /> Edit</button>
                  <button onClick={() => handleDelete(entry.id)} className="flex items-center px-3 py-1.5 text-sm text-red-700 hover:text-red-800 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4 mr-1" /> Delete</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && !error && <div className="col-span-full p-8 text-center text-gray-500">No letters found.</div>}
          </div>
        )}
      </main>
      <ConfirmationDialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={confirmDeleteAction}
        title={confirmDelete?.title || 'Are you sure?'}
        message={confirmDelete?.message || 'This action cannot be undone.'}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default AdminAlphabets;

