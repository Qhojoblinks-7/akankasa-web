import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2, Edit, History } from 'lucide-react';
import MediaField from '../../components/media/MediaField';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import Modal from '../../components/ui/Modal';
import VersionHistory from '../../components/admin/VersionHistory';
import { getAdminFolkStories, saveFolkStory, deleteFolkStory } from '../../api';

const AdminFolkStories = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', thumbnail: '', category: '', language: 'Twi',
    duration: '', type: 'audio', audio_url: '', video_url: '', transcript: '',
    narrator: '', region: '', is_published: true, publish_at: '', unpublish_at: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('akankasa:admin_token');
    if (!token) { navigate('/admin/login', { replace: true }); return; }
    load();
  }, [navigate]);

  const load = async () => {
    try { setItems(await getAdminFolkStories()); } catch (err) { console.error(err); }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm({ title: '', description: '', thumbnail: '', category: '', language: 'Twi', duration: '', type: 'audio', audio_url: '', video_url: '', transcript: '', narrator: '', region: '', is_published: true, publish_at: '', unpublish_at: '' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      id: item.id, title: item.title || '', description: item.description || '',
      thumbnail: item.thumbnail || '', category: item.category || '', language: item.language || 'Twi',
      duration: item.duration || '', type: item.type || 'audio', audio_url: item.audioUrl || '',
      video_url: item.videoUrl || '', transcript: item.transcript || '', narrator: item.narrator || '',
      region: item.region || '', is_published: item.is_published !== undefined ? item.is_published : true,
      publish_at: item.publish_at || '', unpublish_at: item.unpublish_at || ''
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm({ title: '', description: '', thumbnail: '', category: '', language: 'Twi', duration: '', type: 'audio', audio_url: '', video_url: '', transcript: '', narrator: '', region: '', is_published: true, publish_at: '', unpublish_at: '' });
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const payload = { ...form, audioUrl: form.audio_url, videoUrl: form.video_url };
      delete payload.audio_url;
      delete payload.video_url;
      await saveFolkStory(payload);
      closeModal();
      load();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = (id) => {
    setConfirmDelete({ id, title: 'Delete this story?', message: 'This folk story will be permanently removed.' });
  };

  const confirmDeleteAction = async () => {
    const id = confirmDelete?.id;
    setConfirmDelete(null);
    if (!id) return;
    try { await deleteFolkStory(id); load(); } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-4">
          <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Back to dashboard"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
          <div><h1 className="text-2xl font-display font-bold text-[#564c38]">Folk Stories</h1><p className="text-sm text-gray-600">Manage traditional Akan folk stories and oral traditions</p></div>
          <button onClick={openCreate} className="ml-auto flex items-center px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors"><Plus className="w-4 h-4 mr-2" /> New Story</button>
        </div>
      </header>
      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50"><tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Narrator</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-200">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.category || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">{item.type || 'audio'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.narrator || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    {item.status === 'pending' ? <span className="text-amber-600 font-medium">Pending</span> : item.status === 'rejected' ? <span className="text-red-600">Rejected</span> : <span className="text-green-700 font-medium">Published</span>}
                  </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button onClick={() => { setSelectedStoryId(item.id); setShowHistory(true); }} className="text-blue-600 hover:text-blue-800 transition-colors mr-3" aria-label={`Version history for ${item.title}`}><History className="w-4 h-4" /></button>
                      <button onClick={() => openEdit(item)} className="text-amber-600 hover:text-amber-800 transition-colors mr-3" aria-label={`Edit ${item.title}`}><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 transition-colors" aria-label={`Delete ${item.title}`}><Trash2 className="w-4 h-4" /></button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <div className="p-8 text-center text-gray-500">No folk stories yet.</div>}
        </div>
        {showHistory && (
          <div className="mt-8">
            <VersionHistory tableName="folk_stories" recordId={selectedStoryId} />
          </div>
        )}
      </main>

      <Modal open={modalOpen} onClose={closeModal} title={editingId ? 'Edit Folk Story' : 'Add a New Folk Story'} size="lg">
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} placeholder="e.g. Animal Fables" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Language</label>
              <select value={form.language} onChange={e => setForm({...form, language: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }}>
                <option value="Twi">Twi</option><option value="Fante">Fante</option><option value="Akuapem">Akuapem</option><option value="English">English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Narrator</label>
              <input value={form.narrator} onChange={e => setForm({...form, narrator: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Region</label>
              <input value={form.region} onChange={e => setForm({...form, region: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
              <input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} placeholder="e.g. 12 minutes" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Media Type</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }}>
                <option value="audio">Audio</option><option value="video">Video</option>
              </select>
            </div>
          </div>
          <MediaField label="Thumbnail image" value={form.thumbnail} onChange={(url) => setForm({...form, thumbnail: url})} accept="image/*" />
          <MediaField label="Audio file" value={form.audio_url} onChange={(url) => setForm({...form, audio_url: url})} accept="audio/*" />
          <MediaField label="Video file" value={form.video_url} onChange={(url) => setForm({...form, video_url: url})} accept="video/*" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Transcript</label>
            <textarea value={form.transcript} onChange={e => setForm({...form, transcript: e.target.value})} rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow font-mono text-sm" style={{ '--tw-ring-color': '#564c38' }} />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="pub" checked={form.is_published} onChange={e => setForm({...form, is_published: e.target.checked})} className="h-4 w-4 text-[#564c38] border-gray-300 rounded" />
            <label htmlFor="pub" className="ml-2 text-sm text-gray-700">Published</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Publish at</label>
              <input type="datetime-local" value={form.publish_at} onChange={e => setForm({...form, publish_at: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Unpublish at</label>
              <input type="datetime-local" value={form.unpublish_at} onChange={e => setForm({...form, unpublish_at: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
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

export default AdminFolkStories;
