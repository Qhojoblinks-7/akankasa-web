import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2, Edit } from 'lucide-react';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import Modal from '../../components/ui/Modal';
import MediaField from '../../components/media/MediaField';
import { adminGet, adminPost, adminPut, adminDelete } from '../../api';

const AdminVocabulary = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [_loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', is_published: true, publish_at: '', unpublish_at: '' });
  const [wordList, setWordList] = useState([]);
  const [newWord, setNewWord] = useState({ akan: '', english: '', pronunciation: '', audio: '' });
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
      const data = await adminGet('/api/admin/vocabulary');
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm({ title: '', description: '', is_published: true, publish_at: '', unpublish_at: '' });
    setWordList([]);
    setNewWord({ akan: '', english: '', pronunciation: '', audio: '' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ id: item.id, title: item.title || '', description: item.description || '', is_published: item.is_published !== undefined ? item.is_published : true, publish_at: item.publish_at || '', unpublish_at: item.unpublish_at || '' });
    setWordList(Array.isArray(item.words) ? item.words : []);
    setNewWord({ akan: '', english: '', pronunciation: '', audio: '' });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm({ title: '', description: '', is_published: true, publish_at: '', unpublish_at: '' });
    setWordList([]);
    setNewWord({ akan: '', english: '', pronunciation: '', audio: '' });
  };

  const addWord = () => {
    if (!newWord.akan.trim() || !newWord.english.trim()) return;
    setWordList([...wordList, { ...newWord }]);
    setNewWord({ akan: '', english: '', pronunciation: '', audio: '' });
  };

  const removeWord = (index) => {
    setWordList(wordList.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setError('');
    try {
      const payload = { ...form, words: wordList };
      if (editingId) {
        await adminPut(`/api/admin/vocabulary/${editingId}`, payload);
      } else {
        await adminPost('/api/admin/vocabulary', payload);
      }
      closeModal();
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    setConfirmDelete({ id, title: 'Delete this module?', message: 'This will permanently remove the vocabulary module.' });
  };

  const confirmDeleteAction = async () => {
    const id = confirmDelete?.id;
    setConfirmDelete(null);
    if (!id) return;
    try {
      await adminDelete(`/api/admin/vocabulary/${id}`);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-4">
          <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Back to dashboard"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
          <div><h1 className="text-2xl font-display font-bold text-[#564c38]">Vocabulary</h1><p className="text-sm text-gray-600">Create and update word lists for learners</p></div>
          <button onClick={openCreate} className="ml-auto flex items-center px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors"><Plus className="w-4 h-4 mr-2" /> New Module</button>
        </div>
      </header>
      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Words</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead>
            <tbody className="divide-y divide-gray-200">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.words?.length || 0} words</td>
                  <td className="px-6 py-4 text-sm">{item.is_published ? <span className="text-amber-700 font-medium">Published</span> : <span className="text-gray-500">Draft</span>}</td>
                  <td className="px-6 py-4 text-right text-sm">
                    <button onClick={() => openEdit(item)} className="text-amber-600 hover:text-amber-800 transition-colors mr-3" aria-label={`Edit ${item.title}`}><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 transition-colors" aria-label={`Delete ${item.title}`}><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <div className="p-8 text-center text-gray-500">No vocabulary modules yet.</div>}
        </div>
      </main>

      <Modal open={modalOpen} onClose={closeModal} title={editingId ? 'Update Module' : 'Add a New Word List'} size="xl">
        <div className="space-y-5">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Word list title</label>
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} required />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="pub" checked={form.is_published} onChange={e => setForm({...form, is_published: e.target.checked})} className="h-4 w-4 text-[#564c38] border-gray-300 rounded" />
              <label htmlFor="pub" className="ml-2 text-sm text-gray-700">Published</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Publish at</label>
                <input type="datetime-local" value={form.publish_at} onChange={e => setForm({...form, publish_at: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Unpublish at</label>
                <input type="datetime-local" value={form.unpublish_at} onChange={e => setForm({...form, unpublish_at: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Short description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
          </div>

          <div className="border-t border-gray-200 pt-5">
            <h3 className="text-sm font-display font-semibold text-[#564c38] mb-3">Add words</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Akan word</label>
                <input value={newWord.akan} onChange={e => setNewWord({...newWord, akan: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">English meaning</label>
                <input value={newWord.english} onChange={e => setNewWord({...newWord, english: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pronunciation <span className="text-gray-400">(optional)</span></label>
                <input value={newWord.pronunciation} onChange={e => setNewWord({...newWord, pronunciation: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} placeholder="e.g. ah-KWAH-bah" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audio file <span className="text-gray-400">(optional)</span></label>
                <MediaField label="Audio file (optional)" value={newWord.audio} onChange={(url) => setNewWord({...newWord, audio: url})} accept="audio/*" hint="Pronunciation audio for this word" />
              </div>
            </div>
            <button type="button" onClick={addWord} className="px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors flex items-center text-sm"><Plus className="w-4 h-4 mr-1.5" /> Add Word</button>
          </div>

          {wordList.length > 0 && (
            <div>
              <h4 className="text-sm font-display font-semibold text-[#564c38] mb-2">Added words ({wordList.length})</h4>
              <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                {wordList.map((word, index) => (
                  <li key={index} className="flex items-center justify-between px-4 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{word.akan} — {word.english}</p>
                      <p className="text-xs text-gray-500">{word.pronunciation || ''} {word.audio ? `• ${word.audio}` : ''}</p>
                    </div>
                    <button type="button" onClick={() => removeWord(index)} className="text-red-600 hover:text-red-800 text-sm transition-colors">Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
              <button type="button" onClick={handleSubmit} className="px-5 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors flex items-center text-sm"><Save className="w-4 h-4 mr-1.5" /> Save</button>
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

export default AdminVocabulary;
