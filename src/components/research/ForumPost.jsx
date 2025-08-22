import React from 'react';

const ForumPost = ({ author, content, replies, date }) => {
  return (
    <div className="border-b py-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{author}</h4>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <p className="mt-2 text-gray-700">{content}</p>
      <p className="text-sm text-gray-500 mt-1">{replies} replies</p>
    </div>
  );
};

export default ForumPost;
