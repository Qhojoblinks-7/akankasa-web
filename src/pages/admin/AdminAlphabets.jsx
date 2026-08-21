import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, RefreshCw, Save } from 'lucide-react';
import { adminGet, adminPost, adminPut, adminDelete } from '../../api';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import Modal from '../../components/ui/Modal';
import MediaField from '../../components/media/MediaField';

const AdminAlphabets = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    letter: '',
    pronunciation: '',
    example: '',
    audio_url: '',
    is_published: true
  });

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

  const openCreate = () => {
    setEditingId(null);
    setForm({ letter: '', pronunciation: '', example: '', audio_url: '', is_published: true });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      letter: item.letter || '',
      pronunciation: item.pronunciation || '',
      example: item.example || '',
      audio_url: item.audio_url || '',
      is_published: item.is_published !== undefined ? item.is_published : true
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm({ letter: '', pronunciation: '', example: '', audio_url: '', is_published: true });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        await adminPut(`/api/admin/alphabets/${editingId}`, form);
      } else {
        await adminPost('/api/admin/alphabets', form);
      }
      closeModal();
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
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
          <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Back to dashboard">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div><h1 className="text-2xl font-display font-bold text-[#564c38]">Alphabet</h1><p className="text-sm text-gray-600">Manage Akan letters and pronunciation</p></div>
          <button onClick={openCreate} className="ml-auto flex items-center px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors"><Plus className="w-4 h-4 mr-2" /> New Letter</button>
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
                  <button onClick={() => openEdit(entry)} className="flex items-center px-3 py-1.5 text-sm text-amber-700 hover:text-amber-800 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors"><Edit className="w-4 h-4 mr-1" /> Edit</button>
                  <button onClick={() => handleDelete(entry.id)} className="flex items-center px-3 py-1.5 text-sm text-red-700 hover:text-red-800 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4 mr-1" /> Delete</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && !error && <div className="col-span-full p-8 text-center text-gray-500">No letters found.</div>}
          </div>
        )}
      </main>

      <Modal open={modalOpen} onClose={closeModal} title={editingId ? 'Edit Letter' : 'Add a New Letter'}>
        <div className="space-y-5">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="letter" className="block text-sm font-medium text-gray-700 mb-1.5">Letter <span className="text-red-500">*</span></label>
              <input id="letter" name="letter" type="text" value={form.letter} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label htmlFor="pronunciation" className="block text-sm font-medium text-gray-700 mb-1.5">Pronunciation <span className="text-red-500">*</span></label>
              <input id="pronunciation" name="pronunciation" type="text" value={form.pronunciation} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
          </div>
          <div>
            <label htmlFor="example" className="block text-sm font-medium text-gray-700 mb-1.5">Example word</label>
            <input id="example" name="example" type="text" value={form.example} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
          </div>
          <MediaField label="Audio file" value={form.audio_url} onChange={(url) => setForm({ ...form, audio_url: url })} accept="audio/*" hint="Pronunciation of this letter" />
          <div className="flex items-center">
            <input type="checkbox" id="is_published" name="is_published" checked={form.is_published} onChange={handleChange} className="h-4 w-4 text-[#564c38] border-gray-300 rounded" />
            <label htmlFor="is_published" className="ml-2 text-sm text-gray-700">Published</label>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              {editingId && (
                <button type="button" onClick={() => { closeModal(); handleDelete(editingId); }} className="px-4 py-2 text-sm border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center">
                  <Trash2 className="w-4 h-4 mr-1.5" /> Delete
                </button>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button type="button" onClick={closeModal} className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">Cancel</button>
              <button type="button" onClick={handleSubmit} disabled={saving} className="px-5 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors flex items-center text-sm disabled:opacity-50">
                <Save className="w-4 h-4 mr-1.5" /> {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </Modal>

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
