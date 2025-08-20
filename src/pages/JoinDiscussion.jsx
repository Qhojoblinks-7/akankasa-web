import React from 'react';
import { Link } from 'react-router-dom';

const JoinDiscussion = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{backgroundColor: 'var(--color-background)'}}>
      <div className="max-w-md w-full text-center bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4" style={{color: 'var(--color-highlight)'}}>Join the Conversation</h1>
        <p className="text-gray-600 mb-6">Connect with learners and cultural enthusiasts — share questions, resources, and stories.</p>
        <Link to="/community/discussion" className="inline-block px-6 py-3 rounded-md font-medium transition-colors" style={{backgroundColor: 'var(--color-accent)', color: 'var(--color-background)'}}>
          Join Discussion →
        </Link>
      </div>
    </div>
  );
};

export default JoinDiscussion;
