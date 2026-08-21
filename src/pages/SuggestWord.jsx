import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Send, CheckCircle } from 'lucide-react';
import { submitDictionarySuggestion } from '../api';

const SuggestWord = () => {
  const [form, setForm] = useState({ primary_akan: '', english_translation: '', part_of_speech: '', etymology: '', notes: '', author_name: '', author_email: '' });
  const [status, setStatus] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      await submitDictionarySuggestion(form);
      setSubmitted(true);
    } catch (err) {
      setStatus(err.message);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your suggestion has been submitted for review. Our team will review it shortly.</p>
          <button onClick={() => { setSubmitted(false); setForm({ primary_akan: '', english_translation: '', part_of_speech: '', etymology: '', notes: '', author_name: '', author_email: '' }); navigate('/dictionary'); }} className="text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg" style={{ backgroundColor: '#564c38' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#695e46'} onMouseLeave={(e) => e.target.style.backgroundColor = '#564c38'}>Back to Dictionary</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="px-6 py-6 border-b border-gray-200" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-[#f1d799]" />
              <div>
                <h1 className="text-2xl font-bold text-white">Suggest a Word</h1>
                <p className="text-sm text-white/80">Help improve our dictionary by suggesting new Akan words</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            {status && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{status}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Akan Word *</label>
                  <input type="text" required value={form.primary_akan} onChange={(e) => setForm({ ...form, primary_akan: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">English Translation *</label>
                  <input type="text" required value={form.english_translation} onChange={(e) => setForm({ ...form, english_translation: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Part of Speech</label>
                  <select value={form.part_of_speech} onChange={(e) => setForm({ ...form, part_of_speech: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }}>
                    <option value="">Select...</option>
                    <option value="noun">Noun</option>
                    <option value="verb">Verb</option>
                    <option value="adjective">Adjective</option>
                    <option value="adverb">Adverb</option>
                    <option value="interjection">Interjection</option>
                    <option value="phrase">Phrase</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Etymology (if known)</label>
                  <input type="text" value={form.etymology} onChange={(e) => setForm({ ...form, etymology: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input type="text" value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                  <input type="email" value={form.author_email} onChange={(e) => setForm({ ...form, author_email: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea rows="4" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
              </div>
              <button type="submit" className="text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 hover:shadow-lg" style={{ backgroundColor: '#564c38' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#695e46'} onMouseLeave={(e) => e.target.style.backgroundColor = '#564c38'}>
                <Send className="w-4 h-4" />
                <span>Submit Suggestion</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestWord;
