import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Search } from 'lucide-react';
import { adminGet, adminDelete } from '../../api';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';

const AdminDictionary = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
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
      const data = await adminGet('/api/admin/dictionary');
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setConfirmDelete({ id, title: 'Delete this word?', message: 'This dictionary entry will be permanently removed.' });
  };

  const confirmDeleteAction = async () => {
    const id = confirmDelete?.id;
    setConfirmDelete(null);
    if (!id) return;
    try {
      await adminDelete(`/api/admin/dictionary/${id}`);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const filtered = items.filter(item => {
    const term = (item.primary_akan || '').toLowerCase();
    const translation = (item.english_translation || '').toLowerCase();
    const q = search.toLowerCase();
    return term.includes(q) || translation.includes(q);
  });

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-4">
          <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
          <div><h1 className="text-2xl font-display font-bold text-[#564c38]">Dictionary</h1><p className="text-sm text-gray-600">Manage all dictionary words</p></div>
          <button onClick={() => navigate('/admin/dictionary/new')} className="ml-auto flex items-center px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors"><Plus className="w-4 h-4 mr-2" /> New Word</button>
        </div>
      </header>
      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex items-center">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search words..." className="w-full border-0 focus:ring-0 text-gray-900 placeholder-gray-400 bg-transparent" />
        </div>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(entry => (
              <div key={entry.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-amber-300 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-display font-semibold text-[#564c38]">{entry.primary_akan}</h3>
                    <p className="text-gray-600">{entry.english_translation}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${entry.is_published ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>
                    {entry.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 capitalize mb-4">{entry.part_of_speech}</p>
                <div className="flex items-center space-x-2">
                  <button onClick={() => navigate(`/admin/dictionary/${entry.id}`)} className="flex items-center px-3 py-1.5 text-sm text-amber-700 hover:text-amber-800 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors"><Edit className="w-4 h-4 mr-1" /> Edit</button>
                  <button onClick={() => handleDelete(entry.id)} className="flex items-center px-3 py-1.5 text-sm text-red-700 hover:text-red-800 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4 mr-1" /> Delete</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="col-span-full p-8 text-center text-gray-500">No words found.</div>}
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

export default AdminDictionary;
