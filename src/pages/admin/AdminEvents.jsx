import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2, Edit } from 'lucide-react';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import Modal from '../../components/ui/Modal';
import { adminGet, adminPost, adminPut, adminDelete } from '../../api';

const AdminEvents = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', event_date: '', event_time: '', location: '', event_type: 'online', max_participants: '', status: 'upcoming' });
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
    try {
      const data = await adminGet('/api/admin/events');
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm({ title: '', description: '', event_date: '', event_time: '', location: '', event_type: 'online', max_participants: '', status: 'upcoming' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ id: item.id, title: item.title || '', description: item.description || '', event_date: item.event_date || '', event_time: item.event_time || '', location: item.location || '', event_type: item.event_type || 'online', max_participants: item.max_participants || '', status: item.status || 'upcoming' });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm({ title: '', description: '', event_date: '', event_time: '', location: '', event_type: 'online', max_participants: '', status: 'upcoming' });
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...form, max_participants: form.max_participants ? Number(form.max_participants) : null };
      if (editingId) {
        await adminPut(`/api/admin/events/${editingId}`, payload);
      } else {
        await adminPost('/api/admin/events', payload);
      }
      closeModal();
      load();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    setConfirmDelete({ id, title: 'Delete this event?', message: 'This event will be permanently removed.' });
  };

  const confirmDeleteAction = async () => {
    const id = confirmDelete?.id;
    setConfirmDelete(null);
    if (!id) return;
    try {
      await adminDelete(`/api/admin/events/${id}`);
      load();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-4">
          <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
          <div><h1 className="text-2xl font-display font-bold text-[#564c38]">Events</h1><p className="text-sm text-gray-600">Organize community gatherings and workshops</p></div>
          <button onClick={openCreate} className="ml-auto flex items-center px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors"><Plus className="w-4 h-4 mr-2" /> New Event</button>
        </div>
      </header>
      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead>
            <tbody className="divide-y divide-gray-200">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.event_date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.location || '-'}</td>
                  <td className="px-6 py-4 text-sm capitalize">{item.status}</td>
                  <td className="px-6 py-4 text-right text-sm">
                    <button onClick={() => openEdit(item)} className="text-amber-600 hover:text-amber-800 transition-colors mr-3"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <div className="p-8 text-center text-gray-500">No events yet.</div>}
        </div>
      </main>

      <Modal open={modalOpen} onClose={closeModal} title={editingId ? 'Update Event' : 'Add a New Event'}>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Event name</label>
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Event type</label>
              <select value={form.event_type} onChange={e => setForm({...form, event_type: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }}>
                <option value="online">Online</option><option value="in-person">In Person</option><option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
              <input type="date" value={form.event_date} onChange={e => setForm({...form, event_date: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Start time</label>
              <input type="time" value={form.event_time} onChange={e => setForm({...form, event_time: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location or meeting link</label>
              <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Maximum attendees</label>
              <input type="number" value={form.max_participants} onChange={e => setForm({...form, max_participants: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }}>
                <option value="upcoming">Upcoming</option><option value="past">Past</option><option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Event description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} />
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

export default AdminEvents;
