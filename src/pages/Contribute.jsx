import React from 'react';

import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UploadCloud, CheckCircle2 } from 'lucide-react';

const CONTRIB_KEY = 'akan:contributions';

const Contribute = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    category: 'traditions',
    title: '',
    description: '',
    content: '',
    region: '',
    tags: '',
    consent: false,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.consent) {
      setError('Please accept the contribution policy.');
      return;
    }
    setIsSubmitting(true);
    const payload = {
      id: Date.now(),
      ...form,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      submittedAt: new Date().toISOString(),
    };
    try {
      const raw = localStorage.getItem(CONTRIB_KEY);
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(payload);
      localStorage.setItem(CONTRIB_KEY, JSON.stringify(list));
    } catch {}
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white" style={{ background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between">
            <Link to="/culture" className="inline-flex items-center text-white/90 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4">Contribute Cultural Content</h1>
          <p className="text-white/90 text-lg mt-2 max-w-3xl">
            Share your knowledge, stories, and resources to help preserve Akan language and culture.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              {!submitted ? (
                <form onSubmit={onSubmit} className="space-y-6" aria-describedby={error ? 'form-error' : undefined}>
                  {error && (
                    <div id="form-error" className="text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  {/* Your Info */}
                  <div>
                    <h2 className="text-xl font-bold mb-3">Your Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                        <input id="name" name="name" value={form.name} onChange={onChange} required className="w-full border rounded px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" value={form.email} onChange={onChange} required className="w-full border rounded px-3 py-2" />
                      </div>
                    </div>
                  </div>

                  {/* Contribution Details */}
                  <div>
                    <h2 className="text-xl font-bold mb-3">Contribution Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
                        <select id="category" name="category" value={form.category} onChange={onChange} className="w-full border rounded px-3 py-2">
                          <option value="traditions">Traditions & Customs</option>
                          <option value="history">History & Heritage</option>
                          <option value="arts">Arts & Crafts</option>
                          <option value="music">Music & Dance</option>
                          <option value="dictionary">Dictionary</option>
                          <option value="research">Research</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="region">Region (optional)</label>
                        <input id="region" name="region" value={form.region} onChange={onChange} className="w-full border rounded px-3 py-2" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
                      <input id="title" name="title" value={form.title} onChange={onChange} required className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-1" htmlFor="description">Short Description</label>
                      <textarea id="description" name="description" rows={3} value={form.description} onChange={onChange} required className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-1" htmlFor="content">Full Content</label>
                      <textarea id="content" name="content" rows={6} value={form.content} onChange={onChange} required className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-1" htmlFor="tags">Tags (comma-separated)</label>
                      <input id="tags" name="tags" value={form.tags} onChange={onChange} className="w-full border rounded px-3 py-2" placeholder="e.g., festival, ceremony" />
                    </div>
                  </div>

                  {/* Media Upload (optional) */}
                  <div>
                    <h2 className="text-xl font-bold mb-3">Media (optional)</h2>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center"
                      role="group"
                      aria-label="Upload media"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      style={{ cursor: 'pointer' }}
                    >
                      <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Drag and drop files here, or click to select</p>
                      <input ref={fileInputRef} type="file" className="hidden" multiple aria-hidden="true" />
                    </div>
                  </div>

                  {/* Consent & Submit */}
                  <div className="flex items-center justify-between">
                    <label className="inline-flex items-center text-sm text-gray-700">
                      <input type="checkbox" name="consent" checked={form.consent} onChange={onChange} className="mr-2" />
                      I confirm this content is accurate and I have rights to submit it.
                    </label>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-2 rounded text-white ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      style={{ backgroundColor: '#564c38' }}
                    >
                      {isSubmitting ? 'Submitting…' : 'Submit Contribution'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Thank you for your contribution!</h2>
                  <p className="text-gray-600 mb-6">Our moderators will review your submission. You can continue exploring the culture library.</p>
                  <Link to="/culture" className="inline-flex items-center text-white px-5 py-2 rounded" style={{ backgroundColor: '#564c38' }}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Culture
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Tips */}
          <aside className="space-y-4">
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-semibold mb-2">Tips for a great submission</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Use clear, respectful language</li>
                <li>Add specific details (names, dates, places)</li>
                <li>Include references or sources where possible</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-semibold mb-2">What happens next?</h3>
              <p className="text-sm text-gray-700">Your submission is queued for moderation. Once approved, it will appear in the relevant section.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Contribute;