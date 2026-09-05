import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Save, Send, Eye, Share2, Trash2, FileText, Clock,
  BookOpen, Users, MapPin, Tag, ArrowLeft, Plus,
} from 'lucide-react';
import CollaborativeEditor from '../components/editor/CollaborativeEditor';
import Toast from '../components/Toast';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';
import { submitCultureArticle } from '../api';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../hooks/useAuth';

const CATEGORIES = [
  { value: 'traditions', label: 'Traditions & Customs', icon: Users },
  { value: 'history', label: 'History & Heritage', icon: BookOpen },
  { value: 'arts', label: 'Arts & Crafts', icon: FileText },
  { value: 'music', label: 'Music & Dance', icon: Users },
  { value: 'folklore', label: 'Folklore & Oral Traditions', icon: BookOpen },
  { value: 'general', label: 'General', icon: FileText },
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

const STORAGE_KEY = 'akankasa:drafts';
const genId = () => `d_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const shareText = 'Share';

function loadDraftsList() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

function saveDraftsList(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

const ContentEditor = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const initialDocId = searchParams.get('doc') || undefined;
  const [docId, setDocId] = useState(initialDocId ? initialDocId : genId());

  const [title, setTitle] = useState('Untitled document');
  const [category, setCategory] = useState('traditions');
  const [region, setRegion] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState(user?.name || '');
  const [authorEmail, setAuthorEmail] = useState(user?.email || '');
   const [status, setStatus] = useState('idle');
   const [sidebarOpen, setSidebarOpen] = useState(true);
   const [previewOpen, setPreviewOpen] = useState(false);
   const [toasts, setToasts] = useState([]);
   const [drafts, setDrafts] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
   const [docContent, setDocContent] = useState('');

  const addToast = useCallback((message, duration = 2500) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  }, []);

  const syncUrl = useCallback((id) => {
    setSearchParams(id ? { doc: id } : {});
  }, [setSearchParams]);

  useEffect(() => {
    syncUrl(docId);
    setDrafts(loadDraftsList());
  }, [docId, syncUrl]);

  const loadDraft = useCallback((id) => {
    const content = localStorage.getItem(`akankasa:draft:${id}:content`);
    const list = loadDraftsList();
    const meta = list.find((d) => d.id === id);
    if (meta) {
      setDocId(id);
      setTitle(meta.title || 'Untitled document');
      setCategory(meta.category || 'traditions');
      setRegion(meta.region || '');
      setDescription(meta.description || '');
      setTags(meta.tags || '');
      setAuthor(meta.author || '');
      setAuthorEmail(meta.authorEmail || '');
      syncUrl(id);
      if (content !== null) {
        setTimeout(() => editorRef.current?.setContent(content, { preserveCaret: true }), 0);
      }
      addToast(`Loaded: ${meta.title}`);
    }
  }, [syncUrl, addToast]);

  const saveDraft = useCallback(() => {
    const content = editorRef.current?.getContent() || '';
    const list = loadDraftsList();
    const existing = list.findIndex((d) => d.id === docId);
    const entry = {
      id: docId,
      title,
      category,
      region,
      description,
      tags,
      author,
      authorEmail,
      updatedAt: new Date().toISOString(),
    };
    if (existing >= 0) list[existing] = entry;
    else list.unshift(entry);
    saveDraftsList(list);
    localStorage.setItem(`akankasa:draft:${docId}:content`, content);
    setDrafts(list);
    addToast('Draft saved');
  }, [docId, title, category, region, description, tags, author, authorEmail, addToast]);

  useEffect(() => {
    const onKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveDraft();
      }
    };
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [saveDraft]);

  useEffect(() => {
    const stored = localStorage.getItem(`akankasa:draft:${docId}:content`);
    if (stored) {
      setTimeout(() => editorRef.current?.setContent(stored, { preserveCaret: true }), 0);
    }
  }, [docId]);

  const handleSubmit = useCallback(async () => {
    const content = editorRef.current?.getContent() || '';
    if (!content.trim()) {
      addToast('Cannot submit an empty article.');
      return;
    }
    if (!title || title === 'Untitled document') {
      addToast('Please give your document a title.');
      return;
    }
    setStatus('submitting');
    try {
      await submitCultureArticle({
        title,
        description,
        content,
        category,
        region,
        timeline: '',
        significance: '',
        examples: '',
        instruments: '',
        tags: tags
          .split(',')
          .map((g) => g.trim())
          .filter(Boolean),
        author_name: author || 'Anonymous',
        author_email: authorEmail,
      });
      setStatus('idle');
      addToast('Submitted for moderation! It will appear after review.');
      saveDraft();
    } catch (err) {
      setStatus('idle');
      addToast(err.message || 'Submission failed');
    }
  }, [title, description, category, region, tags, author, authorEmail, addToast, saveDraft]);

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/contribute?doc=${docId}`;
    try {
      await navigator.clipboard.writeText(url);
      addToast('Share link copied to clipboard');
    } catch {
      addToast(url);
    }
  }, [docId, addToast]);

  const handleNewDocument = () => {
    const newId = genId();
    setDocId(newId);
    setTitle('Untitled document');
    setCategory('traditions');
    setRegion('');
    setDescription('');
    setTags('');
    setAuthor('');
    setAuthorEmail('');
    setTimeout(() => {
      editorRef.current?.setContent('', { preserveCaret: false });
      editorRef.current?.focus();
    }, 0);
  };

  const handleDeleteDraft = (id) => {
    if (id === docId) return;
    setConfirmDelete({ id, title: 'Delete this draft?', message: 'It cannot be undone.' });
  };

  const confirmDeleteAction = () => {
    const id = confirmDelete?.id;
    setConfirmDelete(null);
    if (!id) return;
    const list = loadDraftsList().filter((d) => d.id !== id);
    saveDraftsList(list);
    localStorage.removeItem(`akankasa:draft:${id}:content`);
    setDrafts(list);
  };

  const content = docContent || '';
  const { words, chars, reading } = (() => {
    const txt = new DOMParser().parseFromString(content, 'text/html').documentElement.textContent || '';
    const w = txt.trim().split(/\s+/).filter((g) => g.length > 0);
    return { words: w.length, chars: txt.trim().length, reading: Math.max(1, Math.ceil(w.length / 180)) };
  })();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#564c38]" />
            <span className="font-semibold text-gray-800">Contribute Content</span>
          </div>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Document title"
          className="text-center text-lg font-bold text-gray-900 bg-transparent border-b-2 border-transparent focus:border-[#f1d799] outline-none transition-colors w-64 sm:w-80"
        />

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 hidden sm:inline">
            {chars > 0 && `${words} words · ${reading} min read`}
          </span>
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            title={shareText}
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors md:hidden"
            title="Sidebar"
          >
            <Tag className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={saveDraft}
            className="px-3 py-1.5 rounded-lg bg-[#564c38] text-white font-medium hover:bg-[#695e46] transition-colors flex items-center gap-1"
            title="Save draft (Ctrl+S)"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save draft</span>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === 'submitting'}
            className="px-3 py-1.5 rounded-lg bg-[#f59e0b] text-white font-medium hover:bg-[#ca8a04] transition-colors flex items-center gap-1 disabled:opacity-60"
            title="Submit for moderation"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{status === 'submitting' ? 'Submitting…' : 'Submit'}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 flex flex-col overflow-hidden p-4">
          <div className="flex-1 overflow-auto">
            <CollaborativeEditor
              ref={editorRef}
              docId={docId}
              userName={author || undefined}
              defaultValue=""
              placeholder={t('readyToBegin') || 'Start writing...'}
              height="100%"
              onChange={setDocContent}
            />
          </div>
          <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
            <Clock className="w-3 h-3" />
            <span>Document ID: {docId}</span>
            <span>· Share the link to collaborate in real time</span>
          </div>
        </main>

        {sidebarOpen && (
          <aside className="w-80 border-l border-gray-200 bg-white flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Details</h3>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-1 rounded text-gray-400 hover:bg-gray-100"
                title="Close"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:border-[#564c38]"
                  style={{ '--tw-ring-color': '#ca8a04' }}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:border-[#564c38]"
                  style={{ '--tw-ring-color': '#ca8a04' }}
                >
                  {REGIONS.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short summary</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:border-[#564c38]"
                  placeholder="A brief description for the moderation queue"
                  style={{ '--tw-ring-color': '#ca8a04' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:border-[#564c38]"
                  placeholder="Separate with commas, e.g. #festival, #royalty"
                  style={{ '--tw-ring-color': '#ca8a04' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:border-[#564c38]"
                  placeholder="Displayed with your contribution"
                  style={{ '--tw-ring-color': '#ca8a04' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (for review replies)</label>
                <input
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:border-[#564c38]"
                  placeholder="you@example.com"
                  style={{ '--tw-ring-color': '#ca8a04' }}
                />
              </div>
            </div>

            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={handleNewDocument}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" />
                New document
              </button>
            </div>

            <div className="p-3 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1">
              <FileText className="w-3 h-3" /> Recent drafts
            </h4>
              <ul className="space-y-1 max-h-48 overflow-y-auto">
                {drafts
                  .filter((d) => d.id !== docId)
                  .slice(0, 10)
                  .map((d) => (
                    <li key={d.id} className="group flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => loadDraft(d.id)}
                        className="flex-1 text-left truncate text-sm text-gray-700 hover:text-[#564c38] py-1"
                        title={d.title}
                      >
                        {d.title || 'Untitled'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDraft(d.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded text-red-600 hover:bg-red-50 transition-all"
                        title="Delete draft"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                {drafts.filter((d) => d.id !== docId).length === 0 && (
                  <li className="text-xs text-gray-400 py-2">No other drafts yet</li>
                )}
              </ul>
            </div>
          </aside>
        )}
      </div>

      {previewOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[85vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Preview</h3>
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="p-1 rounded hover:bg-gray-100"
                title="Close"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-auto flex-1 p-8">
              <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
        </div>
      )}

      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} />
      ))}

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

export default ContentEditor;
