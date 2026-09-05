import React from 'react';
import { MessageCircle, Heart, Share2, Bookmark, MoreHorizontal } from 'lucide-react';

const ForumPost = ({ author, content, replies, date, title, category, tags, onJoinDiscussion }) => {
  return (
    <div className="border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 rounded-full bg-[#564c38] flex items-center justify-center text-white font-medium flex-shrink-0">
          {(author || 'A').charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">{author || 'Anonymous'}</span>
              {category && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  {category}
                </span>
              )}
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors" aria-label="More options">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
          </p>
          {title && <h4 className="font-semibold text-gray-900 mt-2 mb-1">{title}</h4>}
          <p className="text-gray-700 text-sm leading-relaxed">{content}</p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs hover:bg-gray-200 transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1.5 text-gray-500 hover:text-[#564c38] transition-colors group">
                <div className="p-1.5 rounded-full group-hover:bg-amber-50 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-sm">{replies || 0} replies</span>
              </button>
              <button className="flex items-center space-x-1.5 text-gray-500 hover:text-pink-500 transition-colors group">
                <div className="p-1.5 rounded-full group-hover:bg-pink-50 transition-colors">
                  <Heart className="w-4 h-4" />
                </div>
              </button>
              <button className="flex items-center space-x-1.5 text-gray-500 hover:text-green-500 transition-colors group">
                <div className="p-1.5 rounded-full group-hover:bg-green-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                </div>
              </button>
            </div>
            <button className="flex items-center space-x-1.5 text-gray-500 hover:text-[#564c38] transition-colors group">
              <div className="p-1.5 rounded-full group-hover:bg-amber-50 transition-colors">
                <Bookmark className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPost;
