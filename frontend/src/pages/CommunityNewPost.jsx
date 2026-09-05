import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { createForumPost } from '../api';
import CommunityLayout from '../components/CommunityLayout';

const CommunityNewPost = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ title: '', category: 'Language Learning', content: '', author_name: '', author_email: '' });

  useEffect(() => {
    if (!loading && user) {
      setFormData(prev => ({ ...prev, author_name: user.name || prev.author_name, author_email: user.email || prev.author_email }));
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!user) {
    navigate('/login', { state: { from: '/community/new-post' } });
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createForumPost({ ...formData, author_name: user.name || formData.author_name, author_email: user.email || formData.author_email });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to create post');
    }
  };

  if (submitted) {
    return (
      <CommunityLayout showComposer={false} onToggleComposer={() => {}}>
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3">
          <h2 className="text-xl font-bold">New Forum Post</h2>
        </header>
        <div className="p-4">
          <div className="max-w-lg bg-gray-900 border border-gray-700 rounded-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-green-500 mb-6">Thank You!</h1>
            <p className="text-gray-400 mb-4">Your post has been submitted and is pending review.</p>
            <button onClick={() => navigate('/community')} className="text-yellow-500 hover:underline">Back to Community</button>
          </div>
        </div>
      </CommunityLayout>
    );
  }

  return (
    <CommunityLayout showComposer={false} onToggleComposer={() => {}}>
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3">
        <h2 className="text-xl font-bold">New Forum Post</h2>
      </header>
      <div className="p-4">
        <div className="max-w-lg bg-gray-900 border border-gray-700 rounded-lg p-6">
          {error && <div className="mb-4 p-3 bg-red-900/30 border border-red-700 text-red-400 rounded">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent" required>
                <option>Language Learning</option>
                <option>Cultural Events</option>
                <option>Research</option>
                <option>General Discussion</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
              <textarea name="content" value={formData.content} onChange={handleChange} rows={4} className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
              <input type="text" name="author_name" value={formData.author_name} onChange={handleChange} className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent" required />
            </div>
            <button type="submit" className="w-full bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-600 transition-colors">Submit</button>
          </form>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default CommunityNewPost;
