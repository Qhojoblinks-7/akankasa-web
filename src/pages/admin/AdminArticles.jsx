import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Plus, Save, Trash2, Edit, Eye, FileText, Clock, Tag, Check,
} from 'lucide-react';
import CollaborativeEditor from '../../components/editor/CollaborativeEditor';
import MediaField from '../../components/media/MediaField';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import { adminGet, adminPost, adminPut, adminDelete } from '../../api';

const CATEGORIES = [
  { value: 'traditions', label: 'Traditions & Customs' },
  { value: 'history', label: 'History & Heritage' },
  { value: 'arts', label: 'Arts & Crafts' },
  { value: 'music', label: 'Music & Dance' },
  { value: 'folklore', label: 'Folklore & Oral Traditions' },
  { value: 'general', label: 'General' },
];

const REGIONS = [
  { value: '', label: 'All Regions' },
  { value: 'Ashanti Region', label: 'Ashanti Region' },
  { value: 'Eastern Region', label: 'Eastern Region' },
  { value: 'Central Region', label: 'Central Region' },
  { value: 'Western Region', label: 'Western Region' },
  { value: 'Brong-Ahafo', label: 'Brong-Ahafo Region' },
  { value: 'Volta Region', label: 'Volta Region' },
];

const emptyForm = () => ({
  id: null, title: '', description: '', content: '', category: 'traditions',
  region: '', timeline: '', significance: '', tags: '', image_url: '', is_published: false,
});

const AdminArticles = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [items, setItems] = useState([]);
  const [view, setView] = useState('list');
  const [form, setForm] = useState(emptyForm());
  const [previewOpen, setPreviewOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('akankasa:admin_token');
    if (!token) { navigate('/admin/login', { replace: true }); return; }
    load();
  }, [navigate]);

  const load = async () => {
    try {
      const data = await adminGet('/api/admin/articles');
      setItems(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditor = useCallback((item) => {
    setForm(item ? {
      id: item.id, title: item.title || '', description: item.description || '',
      content: item.content || '', category: item.category || 'traditions',
      region: item.region || '', timeline: item.timeline || '',
      significance: item.significance || '', tags: item.tags ? item.tags.join(', ') : '',
      image_url: item.image_url || '', is_published: item.is_published ?? false,
    } : emptyForm());
    setView('editor');
    setTimeout(() => editorRef.current?.setContent(item?.content || '', { preserveCaret: false }), 0);
  }, []);

  const closeEditor = useCallback(() => {
    setView('list');
    setForm(emptyForm());
  }, []);

  const handleSubmit = async () => {
    const content = editorRef.current?.getContent() || '';
    if (!content.trim()) { setError('Cannot save an empty article.'); return; }
    if (!form.title.trim()) { setError('Please give the article a title.'); return; }
    setStatus('saving');
    setError('');
    try {
      const payload = { ...form, content, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) };
      if (form.id) {
        await adminPut(`/api/admin/articles/${form.id}`, payload);
      } else {
        await adminPost('/api/admin/articles', payload);
      }
      setStatus('idle');
      closeEditor();
      load();
    } catch (err) {
      setStatus('idle');
      setError(err.message || 'Save failed');
    }
  };

  const handleDelete = (item) => {
    setConfirmDelete({ id: item.id, title: 'Delete this article?', message: 'This article will be permanently removed.' });
  };

  const confirmDeleteAction = async () => {
    const id = confirmDelete?.id;
    setConfirmDelete(null);
    if (!id) return;
    try {
      await adminDelete(`/api/admin/articles/${id}`);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const content = editorRef.current?.getContent() || form.content || '';
  const { words, chars, reading } = (() => {
    const txt = new DOMParser().parseFromString(content, 'text/html').documentElement.textContent || '';
    const w = txt.trim().split(/\s+/).filter((g) => g.length > 0);
    return { words: w.length, chars: txt.trim().length, reading: Math.max(1, Math.ceil(w.length / 180)) };
  })();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {view === 'list' ? (
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-display font-bold text-[#564c38]">Articles</h1>
                  <p className="text-sm text-gray-600">Write and publish stories about Akan culture</p>
                </div>
              </div>
              <button onClick={() => openEditor(null)} className="flex items-center px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors">
                <Plus className="w-4 h-4 mr-2" /> New Article
              </button>
            </div>
          </header>
          <main className="flex-1 w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{item.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.region || '-'}</td>
                      <td className="px-6 py-4 text-sm">
                        {item.is_published
                          ? <span className="inline-flex items-center text-amber-700 font-medium"><Check className="w-3.5 h-3.5 mr-1" /> Published</span>
                          : <span className="text-gray-500">Draft</span>}
                      </td>
                      <td className="px-6 py-4 text-right text-sm">
                        <button onClick={() => openEditor(item)} className="text-amber-600 hover:text-amber-800 transition-colors mr-3"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(item)} className="text-red-600 hover:text-red-800 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {items.length === 0 && <div className="p-8 text-center text-gray-500">No articles yet.</div>}
            </div>
          </main>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <button type="button" onClick={closeEditor} className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors" title="Back">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#564c38]" />
                <span className="font-semibold text-gray-800">{form.id ? 'Edit Article' : 'New Article'}</span>
              </div>
            </div>

            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Article title"
              className="text-center text-lg font-bold text-gray-900 bg-transparent border-b-2 border-transparent focus:border-[#f1d799] outline-none transition-colors w-64 sm:w-80"
            />

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 hidden sm:inline">
                {chars > 0 && `${words} words · ${reading} min read`}
              </span>
              <button type="button" onClick={() => setPreviewOpen(true)} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors" title="Preview">
                <Eye className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => setPreviewOpen(false)} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors md:hidden" title="Details">
                <Tag className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === 'saving'}
                className="px-3 py-1.5 rounded-lg bg-[#564c38] text-white font-medium hover:bg-[#695e46] transition-colors flex items-center gap-1 disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">{form.id ? 'Update' : 'Publish'}</span>
              </button>
            </div>
          </header>

          <div className="flex-1 flex overflow-hidden">
            <main className="flex-1 flex flex-col overflow-hidden p-4">
              <div className="flex-1 overflow-auto">
                <CollaborativeEditor
                  ref={editorRef}
                  docId={form.id ? `article-${form.id}` : `article-new-${Date.now()}`}
                  defaultValue={form.content}
                  placeholder="Write your article about Akan culture..."
                  height="100%"
                />
              </div>
              <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>{form.id ? `Editing article #${form.id}` : 'New article'}</span>
                {form.is_published && <span className="text-amber-700 font-medium">· Published</span>}
              </div>
            </main>

            <aside className="w-80 border-l border-gray-200 bg-white flex flex-col overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Details</h3>
              </div>

              <div className="p-4 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:border-[#564c38]" style={{ '--tw-ring-color': '#ca8a04' }}>
                    {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  <select value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:border-[#564c38]" style={{ '--tw-ring-color': '#ca8a04' }}>
                    {REGIONS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short summary</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:border-[#564c38]" placeholder="A brief description of this article" style={{ '--tw-ring-color': '#ca8a04' }} />
                </div>

                <MediaField label="Cover image" value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} accept="image/*" />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                  <input type="text" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:border-[#564c38]" placeholder="e.g. 17th century – present" style={{ '--tw-ring-color': '#ca8a04' }} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Significance</label>
                  <input type="text" value={form.significance} onChange={(e) => setForm({ ...form, significance: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:border-[#564c38]" placeholder="Why this matters" style={{ '--tw-ring-color': '#ca8a04' }} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:border-[#564c38]" placeholder="Separate with commas, e.g. #festival, #royalty" style={{ '--tw-ring-color': '#ca8a04' }} />
                </div>

                <div className="flex items-center pt-1">
                  <input type="checkbox" id="is_published" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="h-4 w-4 text-[#564c38] border-gray-300 rounded" />
                  <label htmlFor="is_published" className="ml-2 text-sm text-gray-700">Published</label>
                </div>
              </div>

              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <button type="button" onClick={closeEditor} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium transition-colors">
                  {form.id ? 'Back to list' : 'Cancel'}
                </button>
              </div>
            </aside>
          </div>
        </div>
      )}

      {previewOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[85vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Preview</h3>
              <button type="button" onClick={() => setPreviewOpen(false)} className="p-1 rounded hover:bg-gray-100" title="Close">
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-auto flex-1 p-8">
              <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
        </div>
      )}

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

export default AdminArticles;
