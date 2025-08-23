import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { forumData } from '../data/mockData';

const POSTS_KEY = 'akan:forum:posts';
const REPLIES_KEY_PREFIX = 'akan:forum:replies:';

const DiscussionView = () => {
  const { id } = useParams();
  const numericId = parseInt(id);
  const storedPosts = (() => {
    try { const raw = localStorage.getItem(POSTS_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
  })();
  const builtIn = forumData.find(p => p.id === numericId);
  const stored = storedPosts.find(p => p.id === numericId);
  const post = stored || builtIn;

  const storageKey = `${REPLIES_KEY_PREFIX}${id}`;
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');

  useEffect(() => {
    try { const raw = localStorage.getItem(storageKey); setReplies(raw ? JSON.parse(raw) : (post?.repliesList || [])); } catch { setReplies(post?.repliesList || []); }
  }, [storageKey, post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Discussion Not Found</h2>
          <Link to="/community" className="text-blue-600 hover:underline">Back to Community</Link>
        </div>
      </div>
    );
  }

  const handleAddReply = () => {
    if (newReply.trim() === '') return;
    const reply = {
      id: Date.now(),
      author: 'You',
      content: newReply,
      time: 'now'
    };
    const next = [...replies, reply];
    setReplies(next);
    setNewReply('');
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4">
      <Link to="/community" className="flex items-center text-blue-600 hover:underline mb-4">
        <ArrowLeft className="mr-2" /> Back to Community
      </Link>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">by {post.author || 'Community'}</div>
          <div className="text-sm text-gray-500">{replies.length} replies</div>
        </div>
        <p className="mb-4 text-gray-700">{post.content}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Conversation</h2>

        {replies.length === 0 ? (
          <p className="text-gray-600">No replies yet. Be the first to reply!</p>
        ) : (
          <ul className="space-y-4">
            {replies.map(reply => (
              <li key={reply.id} className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{backgroundColor: 'var(--color-primary)'}}>{(reply.author || 'U').slice(0,1)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">{reply.author}</div>
                    <div className="text-xs text-gray-500">{reply.time || ''}</div>
                  </div>
                  <div className="mt-1 text-gray-700 p-3 bg-gray-50 rounded">{reply.content}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows="4"
          value={newReply}
          onChange={e => setNewReply(e.target.value)}
          placeholder="Write your reply here..."
        />
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Posting as <strong>You</strong></div>
          <div className="flex items-center space-x-3">
            <button
              className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
              onClick={() => setNewReply('')}
            >
              Clear
            </button>
            <button
              className="px-4 py-2 rounded"
              style={{backgroundColor: 'var(--color-accent)', color: 'var(--color-background)'}}
              onClick={handleAddReply}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.85)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}
            >
              Add Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionView;
