import React from 'react';
import { Play, Headphones, Video, Music } from 'lucide-react';

const LessonCard = ({ lesson, onClick }) => {
  const {
    thumbnail,
    title = "Untitled Lesson",
    description = "No description available.",
    type = "audio",
    duration = "N/A",
    instrument = "Unknown",
    difficulty = "N/A",
    bpm = "--",
    region = "Unspecified",
    instructor = "Anonymous"
  } = lesson || {};

  const mediaBadge = type === "video" ? (
    <>
      <Video className="w-3 h-3 mr-1" />
      Video
    </>
  ) : (
    <>
      <Headphones className="w-3 h-3 mr-1" />
      Audio
    </>
  );

  return (
    <article
      role="button"
      tabIndex={0}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick?.(lesson)}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(lesson)}
    >
      {/* Thumbnail Section */}
      <div className="relative h-48">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
            <div className="text-blue-800 text-center">
              <Music className="w-12 h-12 mx-auto mb-2" />
              <span className="font-medium">Drum Lesson</span>
            </div>
          </div>
        )}

        {/* Media Type */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full flex items-center">
          {mediaBadge}
        </div>

        {/* Duration */}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center mt-3">
          <div className="flex space-x-2">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {instrument}
            </span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              {difficulty}
            </span>
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              {bpm} BPM
            </span>
          </div>
          <Play className="w-5 h-5 text-blue-600" />
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
          <span>{region}</span>
          <span>By {instructor}</span>
        </div>
      </div>
    </article>
  );
};

export default LessonCard;
