import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2, Edit } from 'lucide-react';
import MediaField from '../../components/media/MediaField';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import { adminGet, adminPost, adminPut, adminDelete } from '../../api';

const AdminDocuments = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', file_url: '', file_type: 'pdf', category: 'general', level: 'beginner', author: '', tags: '', is_published: true });
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
      const data = await adminGet('/api/admin/documents');
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  const startCreate = () => {
    setEditingId(null);
    setForm({ title: '', description: '', file_url: '', file_type: 'pdf', category: 'general', level: 'beginner', author: '', tags: '', is_published: true });
    setShowForm(true);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({ id: item.id, title: item.title || '', description: item.description || '', file_url: item.file_url || '', file_type: item.file_type || 'pdf', category: item.category || 'general', level: item.level || 'beginner', author: item.author || '', tags: item.tags ? item.tags.join(', ') : '', is_published: item.is_published !== undefined ? item.is_published : true });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ title: '', description: '', file_url: '', file_type: 'pdf', category: 'general', level: 'beginner', author: '', tags: '', is_published: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
      if (editingId) {
        await adminPut(`/api/admin/documents/${editingId}`, payload);
      } else {
        await adminPost('/api/admin/documents', payload);
      }
      resetForm();
      load();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    setConfirmDelete({ id, title: 'Delete this document?', message: 'This will permanently remove the document.' });
  };

  const confirmDeleteAction = async () => {
    const id = confirmDelete?.id;
    setConfirmDelete(null);
    if (!id) return;
    try {
      await adminDelete(`/api/admin/documents/${id}`);
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
          <div><h1 className="text-2xl font-display font-bold text-[#564c38]">Documents</h1><p className="text-sm text-gray-600">Manage research papers and learning materials</p></div>
          {!showForm && <button onClick={startCreate} className="ml-auto flex items-center px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors"><Plus className="w-4 h-4 mr-2" /> New Document</button>}
        </div>
      </header>
      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-display font-semibold text-[#564c38]">{editingId ? 'Update Document' : 'Add a New Document'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Document title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} required /></div>
              <MediaField label="Document file" value={form.file_url} onChange={(url) => setForm({...form, file_url: url})} accept=".pdf,.doc,.docx,.txt" hint="PDF, Word, or text document" />
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Category</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }}><option value="general">General</option><option value="research">Research</option><option value="language">Language</option><option value="culture">Culture</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Level</label><select value={form.level} onChange={e => setForm({...form, level: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }}><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Author</label><input value={form.author} onChange={e => setForm({...form, author: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} /></div>
              <div className="flex items-center"><input type="checkbox" id="pub" checked={form.is_published} onChange={e => setForm({...form, is_published: e.target.checked})} className="h-4 w-4 text-[#564c38] border-gray-300 rounded" /><label htmlFor="pub" className="ml-2 text-sm text-gray-700">Published</label></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Tags <span className="text-gray-400">(separate with commas)</span></label><input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow" style={{ '--tw-ring-color': '#564c38' }} /></div>
            <div className="flex items-center space-x-3">
              <button type="submit" className="px-6 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors flex items-center"><Save className="w-4 h-4 mr-2" /> Save</button>
              <button type="button" onClick={resetForm} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead>
              <tbody className="divide-y divide-gray-200">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{item.level}</td>
                    <td className="px-6 py-4 text-sm">{item.is_published ? <span className="text-amber-700 font-medium">Published</span> : <span className="text-gray-500">Draft</span>}</td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button onClick={() => startEdit(item)} className="text-amber-600 hover:text-amber-800 transition-colors mr-3"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && <div className="p-8 text-center text-gray-500">No documents yet.</div>}
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

export default AdminDocuments;

