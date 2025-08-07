import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { forumData } from '../data/mockData';

const DiscussionView = () => {
  const { postId } = useParams();
  const post = forumData.find(p => p.id === parseInt(postId));
  const [replies, setReplies] = useState(post ? post.repliesList || [] : []);
  const [newReply, setNewReply] = useState('');

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
    setReplies([...replies, { id: Date.now(), content: newReply }]);
    setNewReply('');
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4">
      <Link to="/community" className="flex items-center text-blue-600 hover:underline mb-4">
        <ArrowLeft className="mr-2" /> Back to Community
      </Link>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="mb-4">{post.content}</p>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Replies</h2>
        {replies.length === 0 ? (
          <p className="text-gray-600">No replies yet. Be the first to reply!</p>
        ) : (
          <ul className="space-y-4">
            {replies.map(reply => (
              <li key={reply.id} className="border p-3 rounded">{reply.content}</li>
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
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAddReply}
        >
          Add Reply
        </button>
      </div>
    </div>
  );
};

export default DiscussionView;
