import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createForumPost } from '../api';

const ResearchNewDiscussion = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ title: '', content: '', category: 'Research', author_name: '', author_email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createForumPost(formData);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to start discussion');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex flex-col items-center">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-6">Thank You!</h1>
          <p className="text-gray-600 mb-4">Your discussion has been started and is pending review.</p>
          <button onClick={() => navigate('/research')} className="text-blue-600 hover:underline">Back to Research</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex flex-col items-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-akan-red mb-6">New Research Discussion</h1>
        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Content</label>
            <textarea name="content" value={formData.content} onChange={handleChange} rows={4} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Your Name</label>
            <input type="text" name="author_name" value={formData.author_name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <button type="submit" className="bg-akan-red text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors w-full">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ResearchNewDiscussion;
