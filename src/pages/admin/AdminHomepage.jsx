import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2, Edit } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';
import MediaField from '../../components/media/MediaField';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import { adminGet, adminPost, adminPut, adminDelete } from '../../api';

const AdminHomepage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ section: '', title: '', subtitle: '', body: '', image_url: '', link_url: '', link_text: '', sort_order: 0, is_active: true });
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
      const data = await adminGet('/api/admin/homepage');
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  const startCreate = () => {
    setEditingId(null);
    setForm({ section: '', title: '', subtitle: '', body: '', image_url: '', link_url: '', link_text: '', sort_order: 0, is_active: true });
    setShowForm(true);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({ id: item.id, section: item.section || '', title: item.title || '', subtitle: item.subtitle || '', body: item.body || '', image_url: item.image_url || '', link_url: item.link_url || '', link_text: item.link_text || '', sort_order: item.sort_order || 0, is_active: item.is_active !== undefined ? item.is_active : true });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ section: '', title: '', subtitle: '', body: '', image_url: '', link_url: '', link_text: '', sort_order: 0, is_active: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await adminPut(`/api/admin/homepage/${editingId}`, form);
      } else {
        await adminPost('/api/admin/homepage', form);
      }
      resetForm();
      load();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    setConfirmDelete({ id, title: 'Delete this section?', message: 'This homepage section will be permanently removed.' });
  };

  const confirmDeleteAction = async () => {
    const id = confirmDelete?.id;
    setConfirmDelete(null);
    if (!id) return;
    try {
      await adminDelete(`/api/admin/homepage/${id}`);
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
          <div><h1 className="text-2xl font-display font-bold text-[#564c38]">Homepage</h1><p className="text-sm text-gray-600">Update the main page sections and featured content</p></div>
          {!showForm && <button onClick={startCreate} className="ml-auto flex items-center px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors"><Plus className="w-4 h-4 mr-2" /> New Section</button>}
        </div>
      </header>
      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-display font-semibold text-[#564c38]">{editingId ? 'Update Section' : 'Add a New Homepage Section'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Section name</label><input value={form.section} onChange={e => setForm({...form, section: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} required /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label><input type="number" value={form.sort_order} onChange={e => setForm({...form, sort_order: Number(e.target.value)})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Heading</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Subheading</label><input value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Body content</label><RichTextEditor value={form.body} onChange={html => setForm({...form, body: html})} minHeight="200px" /></div>
              <MediaField label="Image" value={form.image_url} onChange={(url) => setForm({...form, image_url: url})} accept="image/*" hint="Homepage section image" />
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Button link</label><input value={form.link_url} onChange={e => setForm({...form, link_url: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Button text</label><input value={form.link_text} onChange={e => setForm({...form, link_text: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} /></div>
              <div className="flex items-center"><input type="checkbox" id="pub" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} className="h-4 w-4 text-[#564c38] border-gray-300 rounded" /><label htmlFor="pub" className="ml-2 text-sm text-gray-700">Show this section on the homepage</label></div>
            </div>
            <div className="flex items-center space-x-3">
              <button type="submit" className="px-6 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors flex items-center"><Save className="w-4 h-4 mr-2" /> Save</button>
              <button type="button" onClick={resetForm} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead>
              <tbody className="divide-y divide-gray-200">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 capitalize">{item.section}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.sort_order}</td>
                    <td className="px-6 py-4 text-sm">{item.is_active ? <span className="text-amber-700 font-medium">Active</span> : <span className="text-gray-500">Inactive</span>}</td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button onClick={() => startEdit(item)} className="text-amber-600 hover:text-amber-800 transition-colors mr-3"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && <div className="p-8 text-center text-gray-500">No homepage sections yet.</div>}
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

export default AdminHomepage;

