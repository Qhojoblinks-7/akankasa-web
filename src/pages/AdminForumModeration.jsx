import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Eye, MessageSquare, Clock } from 'lucide-react';
import { adminGet, adminPut } from '../api';

const AdminForumModeration = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('posts');
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('akankasa:admin_token');
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminGet('/api/admin/forum');
      setPosts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (postId) => {
    try {
      const data = await adminGet(`/api/admin/forum/${postId}/comments`);
      setComments(data || []);
      setSelectedPost(postId);
      setActiveView('comments');
    } catch (err) {
      setError(err.message);
    }
  };

  const moderatePost = async (id, status) => {
    try {
      await adminPut(`/api/admin/forum/${id}/status`, { status });
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const moderateComment = async (id, status) => {
    try {
      await adminPut(`/api/admin/forum/comments/${id}/status`, { status });
      if (selectedPost) loadComments(selectedPost);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#564c38] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading forum moderation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-display font-bold text-[#564c38]">Forum Moderation</h1>
              <p className="text-sm text-gray-600">Review and moderate forum posts and comments</p>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-4">
              <button onClick={() => { setActiveView('posts'); setSelectedPost(null); }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'posts' ? 'bg-[#564c38] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Posts</button>
              <button onClick={() => setActiveView('comments')} disabled={!selectedPost} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'comments' ? 'bg-[#564c38] text-white' : 'text-gray-600 hover:bg-gray-100'} ${!selectedPost ? 'opacity-50 cursor-not-allowed' : ''}`}>Comments</button>
            </div>
          </div>

          {activeView === 'posts' && (
            <div className="p-6">
              {posts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No forum posts yet.</div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-display font-semibold text-[#564c38]">{post.title}</h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.content}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>By {post.author_name || 'Anonymous'}</span>
                            <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-700">{post.category}</span>
                            <span className={`px-2 py-1 rounded-full ${post.status === 'approved' ? 'bg-green-100 text-green-700' : post.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{post.status}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => loadComments(post.id)} className="p-2 text-gray-600 hover:text-gray-900 transition-colors" title="View comments">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button onClick={() => moderatePost(post.id, 'approved')} className="p-2 text-amber-600 hover:bg-amber-50 rounded transition-colors" title="Approve">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={() => moderatePost(post.id, 'rejected')} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Reject">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeView === 'comments' && (
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <button onClick={() => setActiveView('posts')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Back to posts</button>
              </div>
              {comments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No comments for this post.</div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border border-gray-200 rounded-xl p-4">
                      <p className="text-gray-800">{comment.content}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500">By {comment.author_name || 'Anonymous'}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${comment.status === 'approved' ? 'bg-green-100 text-green-700' : comment.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{comment.status}</span>
                          <button onClick={() => moderateComment(comment.id, 'approved')} className="p-1 text-amber-600 hover:bg-amber-50 rounded transition-colors"><CheckCircle className="w-4 h-4" /></button>
                          <button onClick={() => moderateComment(comment.id, 'rejected')} className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"><XCircle className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminForumModeration;
