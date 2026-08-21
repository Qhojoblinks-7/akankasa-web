import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2, Edit } from 'lucide-react';
import MediaField from '../../components/media/MediaField';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import Modal from '../../components/ui/Modal';
import { getAdminDrumming, saveDrumming, deleteDrumming } from '../../api';

const AdminDrumming = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [form, setForm] = useState({
    title: '', description: '', thumbnail: '', instrument: '', difficulty: 'Beginner',
    bpm: '', type: 'video', video_url: '', audio_url: '', patternNotation: '',
    transcript: '', instructor: '', duration: '', region: '', is_published: true
  });

  useEffect(() => {
    const token = localStorage.getItem('akankasa:admin_token');
    if (!token) { navigate('/admin/login', { replace: true }); return; }
    load();
  }, [navigate]);

  const load = async () => {
    try { setItems(await getAdminDrumming()); } catch (err) { console.error(err); }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm({ title: '', description: '', thumbnail: '', instrument: '', difficulty: 'Beginner', bpm: '', type: 'video', video_url: '', audio_url: '', patternNotation: '', transcript: '', instructor: '', duration: '', region: '', is_published: true });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      id: item.id, title: item.title || '', description: item.description || '',
      thumbnail: item.thumbnail || '', instrument: item.instrument || '', difficulty: item.difficulty || 'Beginner',
      bpm: item.bpm || '', type: item.type || 'video', video_url: item.videoUrl || '',
      audio_url: item.audioUrl || '', patternNotation: item.patternNotation || '',
      transcript: item.transcript || '', instructor: item.instructor || '',
      duration: item.duration || '', region: item.region || '', is_published: item.is_published !== undefined ? item.is_published : true
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm({ title: '', description: '', thumbnail: '', instrument: '', difficulty: 'Beginner', bpm: '', type: 'video', video_url: '', audio_url: '', patternNotation: '', transcript: '', instructor: '', duration: '', region: '', is_published: true });
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const payload = { ...form, videoUrl: form.video_url, audioUrl: form.audio_url };
      delete payload.video_url;
      delete payload.audio_url;
      await saveDrumming(payload);
      closeModal();
      load();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = (id) => {
    setConfirmDelete({ id, title: 'Delete this lesson?', message: 'This drumming lesson will be permanently removed.' });
  };

  const confirmDeleteAction = async () => {
    const id = confirmDelete?.id;
    setConfirmDelete(null);
    if (!id) return;
    try { await deleteDrumming(id); load(); } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-4">
          <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Back to dashboard"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
          <div><h1 className="text-2xl font-display font-bold text-[#564c38]">Drumming</h1><p className="text-sm text-gray-600">Manage traditional Akan drumming lessons and techniques</p></div>
          <button onClick={openCreate} className="ml-auto flex items-center px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors"><Plus className="w-4 h-4 mr-2" /> New Lesson</button>
        </div>
      </header>
      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50"><tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instrument</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-200">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.instrument || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.difficulty || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.instructor || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    {item.status === 'pending' ? <span className="text-amber-600 font-medium">Pending</span> : item.status === 'rejected' ? <span className="text-red-600">Rejected</span> : <span className="text-green-700 font-medium">Published</span>}
                  </td>
                   <td className="px-6 py-4 text-right text-sm">
                     <button onClick={() => openEdit(item)} className="text-amber-600 hover:text-amber-800 transition-colors mr-3" aria-label={`Edit ${item.title}`}><Edit className="w-4 h-4" /></button>
                     <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 transition-colors" aria-label={`Delete ${item.title}`}><Trash2 className="w-4 h-4" /></button>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <div className="p-8 text-center text-gray-500">No drumming lessons yet.</div>}
        </div>
      </main>

      <Modal open={modalOpen} onClose={closeModal} title={editingId ? 'Edit Drumming Lesson' : 'Add a New Drumming Lesson'} size="lg">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Instrument</label>
              <input value={form.instrument} onChange={e => setForm({...form, instrument: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} placeholder="e.g. Kagan, Atumpan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Difficulty</label>
              <select value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }}>
                <option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">BPM</label>
              <input type="number" value={form.bpm} onChange={e => setForm({...form, bpm: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
              <input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} placeholder="e.g. 15 minutes" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Instructor</label>
              <input value={form.instructor} onChange={e => setForm({...form, instructor: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Region</label>
              <input value={form.region} onChange={e => setForm({...form, region: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
          </div>
          <MediaField label="Thumbnail image" value={form.thumbnail} onChange={(url) => setForm({...form, thumbnail: url})} accept="image/*" />
          <MediaField label="Audio file" value={form.audio_url} onChange={(url) => setForm({...form, audio_url: url})} accept="audio/*" />
          <MediaField label="Video file" value={form.video_url} onChange={(url) => setForm({...form, video_url: url})} accept="video/*" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Rhythm Pattern</label>
            <input value={form.patternNotation} onChange={e => setForm({...form, patternNotation: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow font-mono text-sm" style={{ '--tw-ring-color': '#564c38' }} placeholder="e.g. Tone - Tone - Slap - Tone" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Transcript / Notes</label>
            <textarea value={form.transcript} onChange={e => setForm({...form, transcript: e.target.value})} rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="pub" checked={form.is_published} onChange={e => setForm({...form, is_published: e.target.checked})} className="h-4 w-4 text-[#564c38] border-gray-300 rounded" />
            <label htmlFor="pub" className="ml-2 text-sm text-gray-700">Published</label>
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
              <button type="button" onClick={handleSubmit} disabled={saving} className="px-5 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors flex items-center text-sm disabled:opacity-50"><Save className="w-4 h-4 mr-1.5" /> {saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmationDialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)} onConfirm={confirmDeleteAction} title={confirmDelete?.title || 'Are you sure?'} message={confirmDelete?.message || ''} confirmText="Delete" type="danger" />
    </div>
  );
};

export default AdminDrumming;
