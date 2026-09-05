import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Upload, Volume2 } from 'lucide-react';
import RichTextEditor from '../components/admin/RichTextEditor';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';
import { adminGet, adminPost, adminPut, adminDelete } from '../api';

const AdminDictionaryEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';
  const [form, setForm] = useState({
    primary_akan: '',
    english_translation: '',
    part_of_speech: 'noun',
    etymology: '',
    is_published: true,
    variations: [{ dialect: 'Twi', spelling: '', phonetic_script: '', example_sentence_akan: '', example_sentence_english: '' }],
    pronunciations: [{ dialect: 'Twi', audio_url: '', speaker_gender: '', is_verified: false }]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('akankasa:admin_token');
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    setIsAuthed(true);

    if (!isNew) {
      setLoading(true);
      adminGet(`/api/admin/dictionary/${id}`)
        .then(data => {
          setForm({
            primary_akan: data.primary_akan || '',
            english_translation: data.english_translation || '',
            part_of_speech: data.part_of_speech || 'noun',
            etymology: data.etymology || '',
            is_published: data.is_published !== undefined ? !!data.is_published : true,
            variations: data.variations && data.variations.length > 0
              ? data.variations.map(v => ({
                  dialect: v.dialect || 'Twi',
                  spelling: v.spelling || '',
                  phonetic_script: v.phonetic_script || '',
                  example_sentence_akan: v.example_sentence_akan || '',
                  example_sentence_english: v.example_sentence_english || ''
                }))
              : [{ dialect: 'Twi', spelling: '', phonetic_script: '', example_sentence_akan: '', example_sentence_english: '' }],
            pronunciations: data.pronunciations && data.pronunciations.length > 0
              ? data.pronunciations.map(p => ({
                  dialect: p.dialect || 'Twi',
                  audio_url: p.audio_url || '',
                  speaker_gender: p.speaker_gender || '',
                  is_verified: !!p.is_verified
                }))
              : [{ dialect: 'Twi', audio_url: '', speaker_gender: '', is_verified: false }]
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

  const handleRichTextChange = (name) => (html) => {
    setForm(prev => ({
      ...prev,
      [name]: html
    }));
  };

  const handleVariationChange = (index, field, value) => {
    setForm(prev => {
      const variations = [...prev.variations];
      variations[index] = { ...variations[index], [field]: value };
      return { ...prev, variations };
    });
  };

  const handlePronunciationChange = (index, field, value) => {
    setForm(prev => {
      const pronunciations = [...prev.pronunciations];
      pronunciations[index] = { ...pronunciations[index], [field]: value };
      return { ...prev, pronunciations };
    });
  };

  const addVariation = () => {
    setForm(prev => ({
      ...prev,
      variations: [...prev.variations, { dialect: 'Twi', spelling: '', phonetic_script: '', example_sentence_akan: '', example_sentence_english: '' }]
    }));
  };

  const removeVariation = (index) => {
    setForm(prev => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== index)
    }));
  };

  const addPronunciation = () => {
    setForm(prev => ({
      ...prev,
      pronunciations: [...prev.pronunciations, { dialect: 'Twi', audio_url: '', speaker_gender: '', is_verified: false }]
    }));
  };

  const removePronunciation = (index) => {
    setForm(prev => ({
      ...prev,
      pronunciations: prev.pronunciations.filter((_, i) => i !== index)
    }));
  };

  const handleAudioUpload = async (file, index) => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/uploads', { method: 'POST', body: fd });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Upload failed');
    }
    const data = await res.json();
    handlePronunciationChange(index, 'audio_url', data.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...form,
        variations: form.variations.filter(v => v.spelling.trim() !== ''),
        pronunciations: form.pronunciations.filter(p => p.audio_url.trim() !== '')
      };

      if (isNew) {
        await adminPost('/api/admin/dictionary', payload);
      } else {
        await adminPut(`/api/admin/dictionary/${id}`, payload);
      }

      navigate('/admin/dictionary');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => setConfirmDelete(true);

  const confirmDeleteAction = async () => {
    setConfirmDelete(false);
    try {
      await adminDelete(`/api/admin/dictionary/${id}`);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isAuthed) return null;

  if (loading && !isNew) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-4">
          <button onClick={() => navigate('/admin/dictionary')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Back to dictionary">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div><h1 className="text-2xl font-display font-bold text-[#564c38]">{isNew ? 'Add a New Word' : 'Edit Word'}</h1><p className="text-sm text-gray-600">Add the Akan word, its English meaning, and any audio or variations.</p></div>
        </div>
      </header>

      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-display font-semibold text-[#564c38] mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="primary_akan" className="block text-sm font-medium text-gray-700 mb-2">
                  Akan word <span className="text-red-500">*</span>
                </label>
                <input
                  id="primary_akan"
                  name="primary_akan"
                  type="text"
                  value={form.primary_akan}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent bg-white transition-shadow"
                  style={{ '--tw-ring-color': '#564c38' }}
                />
              </div>
              <div>
                <label htmlFor="english_translation" className="block text-sm font-medium text-gray-700 mb-2">
                  English meaning <span className="text-red-500">*</span>
                </label>
                <input
                  id="english_translation"
                  name="english_translation"
                  type="text"
                  value={form.english_translation}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent bg-white transition-shadow"
                  style={{ '--tw-ring-color': '#564c38' }}
                />
              </div>
              <div>
                <label htmlFor="part_of_speech" className="block text-sm font-medium text-gray-700 mb-2">
                  Word type <span className="text-red-500">*</span>
                </label>
                <select
                  id="part_of_speech"
                  name="part_of_speech"
                  value={form.part_of_speech}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:border-transparent bg-white transition-shadow"
                  style={{ '--tw-ring-color': '#564c38' }}
                >
                  <option value="noun">Noun</option>
                  <option value="verb">Verb</option>
                  <option value="adjective">Adjective</option>
                  <option value="adverb">Adverb</option>
                  <option value="pronoun">Pronoun</option>
                  <option value="preposition">Preposition</option>
                  <option value="conjunction">Conjunction</option>
                  <option value="interjection">Interjection</option>
                  <option value="proverb">Proverb</option>
                  <option value="phrase">Phrase</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  id="is_published"
                  name="is_published"
                  type="checkbox"
                  checked={form.is_published}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#564c38] border-gray-300 rounded"
                />
                <label htmlFor="is_published" className="ml-2 text-sm text-gray-700">
                  Published
                </label>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="etymology" className="block text-sm font-medium text-gray-700 mb-2">
                  Word origin or history
                </label>
                <RichTextEditor
                  value={form.etymology}
                  onChange={handleRichTextChange('etymology')}
                  minHeight="200px"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-display font-semibold text-[#564c38]">Spelling variations by region</h2>
              <button type="button" onClick={addVariation} className="flex items-center text-sm text-amber-700 hover:text-amber-800 font-medium transition-colors">
                <Plus className="w-4 h-4 mr-1" /> Add Variation
              </button>
            </div>
            <div className="space-y-4">
              {form.variations.map((v, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-medium text-gray-700">Variation {index + 1}</h3>
                    {form.variations.length > 1 && (
                      <button type="button" onClick={() => removeVariation(index)} className="text-red-500 hover:text-red-700 transition-colors" aria-label={`Remove variation ${index + 1}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Dialect</label>
                      <select value={v.dialect} onChange={(e) => handleVariationChange(index, 'dialect', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white">
                        <option value="Twi">Twi</option>
                        <option value="Fante">Fante</option>
                        <option value="Akuapem">Akuapem</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Spelling</label>
                      <input type="text" value={v.spelling} onChange={(e) => handleVariationChange(index, 'spelling', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Phonetic Script</label>
                      <input type="text" value={v.phonetic_script} onChange={(e) => handleVariationChange(index, 'phonetic_script', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Example (Akan)</label>
                      <input type="text" value={v.example_sentence_akan} onChange={(e) => handleVariationChange(index, 'example_sentence_akan', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Example (English)</label>
                      <input type="text" value={v.example_sentence_english} onChange={(e) => handleVariationChange(index, 'example_sentence_english', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-display font-semibold text-[#564c38]">Audio recordings</h2>
              <button type="button" onClick={addPronunciation} className="flex items-center text-sm text-amber-700 hover:text-amber-800 font-medium transition-colors">
                <Plus className="w-4 h-4 mr-1" /> Add Audio
              </button>
            </div>
            <div className="space-y-4">
              {form.pronunciations.map((p, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-medium text-gray-700">Audio {index + 1}</h3>
                    {form.pronunciations.length > 1 && (
                      <button type="button" onClick={() => removePronunciation(index)} className="text-red-500 hover:text-red-700 transition-colors" aria-label={`Remove audio ${index + 1}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Dialect</label>
                      <select value={p.dialect} onChange={(e) => handlePronunciationChange(index, 'dialect', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white">
                        <option value="Twi">Twi</option>
                        <option value="Fante">Fante</option>
                        <option value="Akuapem">Akuapem</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Audio URL</label>
                      <input type="text" value={p.audio_url} onChange={(e) => handlePronunciationChange(index, 'audio_url', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" placeholder="/audio/word.mp3" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Upload Audio</label>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => e.target.files[0] && handleAudioUpload(e.target.files[0], index)}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              {!isNew && (
                <button type="button" onClick={handleDelete} className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors">
                  Delete Entry
                </button>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button type="button" onClick={() => navigate('/admin/dictionary')} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="flex items-center px-6 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors disabled:opacity-50">
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Entry'}
              </button>
            </div>
          </div>
        </form>
      </main>
      <ConfirmationDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={confirmDeleteAction}
        title="Delete this entry?"
        message="This dictionary entry will be permanently removed."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default AdminDictionaryEntry;
