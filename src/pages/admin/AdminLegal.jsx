import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2, Edit } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import { adminGet, adminPost, adminPut, adminDelete } from '../../api';

const AdminLegal = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ slug: '', title: '', content: '' });
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
      const data = await adminGet('/api/admin/legal');
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  const startCreate = () => {
    setEditingId(null);
    setForm({ slug: '', title: '', content: '' });
    setShowForm(true);
  };

  const startEdit = (item) => {
    setEditingId(item.slug);
    setForm({ slug: item.slug || '', title: item.title || '', content: item.content || '' });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ slug: '', title: '', content: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await adminPut(`/api/admin/legal/${editingId}`, form);
      } else {
        await adminPost('/api/admin/legal', form);
      }
      resetForm();
      load();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (slug) => {
    setConfirmDelete({ id: slug, title: 'Delete this page?', message: 'This legal page will be permanently removed.' });
  };

  const confirmDeleteAction = async () => {
    const slug = confirmDelete?.id;
    setConfirmDelete(null);
    if (!slug) return;
    try {
      await adminDelete(`/api/admin/legal/${slug}`);
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
          <div><h1 className="text-2xl font-display font-bold text-[#564c38]">Legal Pages</h1><p className="text-sm text-gray-600">Update privacy policy, terms, and other legal notices</p></div>
          {!showForm && <button onClick={startCreate} className="ml-auto flex items-center px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors"><Plus className="w-4 h-4 mr-2" /> New Page</button>}
        </div>
      </header>
      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-display font-semibold text-[#564c38]">{editingId ? 'Update Page' : 'Add a New Legal Page'}</h2>
            <p className="text-sm text-gray-600 mb-4">Use this for privacy policy, terms of service, and similar pages.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Page name</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow"
                  style={{ '--tw-ring-color': '#564c38' }}
                  required
                  disabled={!!editingId}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Page name</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent transition-shadow"
                  style={{ '--tw-ring-color': '#564c38' }}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page content</label>
              <RichTextEditor value={form.content} onChange={(html) => setForm({ ...form, content: html })} minHeight="300px" />
            </div>
            <div className="flex items-center space-x-3">
              <button type="submit" className="px-6 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors flex items-center"><Save className="w-4 h-4 mr-2" /> Save</button>
              <button type="button" onClick={resetForm} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.slug} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.slug}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.title}</td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button onClick={() => startEdit(item)} className="text-amber-600 hover:text-amber-800 transition-colors mr-3"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item.slug)} className="text-red-600 hover:text-red-800 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && <div className="p-8 text-center text-gray-500">No legal pages yet.</div>}
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

export default AdminLegal;

