import React from 'react';
import { Play, Headphones, Video, BookOpen } from 'lucide-react';

const StoryCard = ({ story, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(story)}
    >
      <div className="relative h-48">
        {story.thumbnail ? (
          <img 
            src={story.thumbnail} 
            alt={story.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-300 flex items-center justify-center">
            <div className="text-amber-800 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-2" />
              <span className="font-medium">Folk Story</span>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full flex items-center">
          {story.type === 'video' ? (
            <>
              <Video className="w-3 h-3 mr-1" />
              Video
            </>
          ) : (
            <>
              <Headphones className="w-3 h-3 mr-1" />
              Audio
            </>
          )}
        </div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {story.duration}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-gray-900">{story.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{story.description}</p>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex space-x-2">
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
              {story.category}
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {story.language}
            </span>
          </div>
          <Play className="w-5 h-5 text-amber-600" />
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
          <span>{story.region}</span>
          <span>Narrated by {story.narrator}</span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;