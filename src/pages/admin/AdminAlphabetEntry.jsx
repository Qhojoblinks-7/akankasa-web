import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import MediaField from '../../components/media/MediaField';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import { adminGet, adminPost, adminPut, adminDelete } from '../../api';

const AdminAlphabetEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isNew = !id;

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
    setIsAuthed(true);
    if (!isNew) {
      setLoading(true);
      adminGet(`/api/admin/alphabets/${id}`)
        .then(data => {
          setForm({
            letter: data.letter || '',
            pronunciation: data.pronunciation || '',
            example: data.example || '',
            audio_url: data.audio_url || '',
            is_published: data.is_published !== undefined ? data.is_published : true
          });
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id, isNew, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (isNew) {
        await adminPost('/api/admin/alphabets', form);
      } else {
        await adminPut(`/api/admin/alphabets/${id}`, form);
      }
      navigate('/admin/alphabets');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => setConfirmDelete(true);

  const confirmDeleteAction = async () => {
    setConfirmDelete(false);
    try {
      await adminDelete(`/api/admin/alphabets/${id}`);
      navigate('/admin/alphabets');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isAuthed) return null;
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-4">
          <button onClick={() => navigate('/admin/alphabets')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Back to alphabet list">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-display font-bold text-[#564c38]">{isNew ? 'Add a New Letter' : 'Edit Letter'}</h1>
            <p className="text-sm text-gray-600">Add or update an Akan alphabet letter</p>
          </div>
        </div>
      </header>

      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="letter" className="block text-sm font-medium text-gray-700 mb-2">
                Letter <span className="text-red-500">*</span>
              </label>
              <input
                id="letter"
                name="letter"
                type="text"
                value={form.letter}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent bg-white transition-shadow"
                style={{ '--tw-ring-color': '#564c38' }}
              />
            </div>
            <div>
              <label htmlFor="pronunciation" className="block text-sm font-medium text-gray-700 mb-2">
                Pronunciation <span className="text-red-500">*</span>
              </label>
              <input
                id="pronunciation"
                name="pronunciation"
                type="text"
                value={form.pronunciation}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent bg-white transition-shadow"
                style={{ '--tw-ring-color': '#564c38' }}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="example" className="block text-sm font-medium text-gray-700 mb-2">
                Example word
              </label>
              <input
                id="example"
                name="example"
                type="text"
                value={form.example}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent bg-white transition-shadow"
                style={{ '--tw-ring-color': '#564c38' }}
              />
            </div>
            <div className="md:col-span-2">
              <MediaField label="Audio file" value={form.audio_url} onChange={(url) => setForm({...form, audio_url: url})} accept="audio/*" hint="Pronunciation of this letter" />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_published"
                name="is_published"
                checked={form.is_published}
                onChange={handleChange}
                className="h-4 w-4 text-[#564c38] border-gray-300 rounded"
              />
              <label htmlFor="is_published" className="ml-2 text-sm text-gray-700">
                Published
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors flex items-center disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/alphabets')}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            {!isNew && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center ml-auto"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            )}
          </div>
        </form>
      </main>
      <ConfirmationDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={confirmDeleteAction}
        title="Delete this letter?"
        message="This alphabet letter entry will be permanently removed."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default AdminAlphabetEntry;

