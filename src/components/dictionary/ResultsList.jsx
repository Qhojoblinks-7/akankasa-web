import React from 'react';

import AudioPlayer from '../../components/AudioPlayer';
import { Heart, Plus } from 'lucide-react';

const ResultsList = ({ words, favorites, playingAudio, onPlaySrc, onPause, onToggleFavorite, onAddToActiveList }) => {
  if (!words || words.length === 0) return null;

  return (
    <div className="divide-y divide-gray-200">
      {words.map((word) => (
        <div key={word.id} className="px-6 py-6 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{word.akan}</h3>
                <div>
                  <AudioPlayer
                    src={word.audio}
                    playing={playingAudio === word.audio}
                    onPlay={() => onPlaySrc(word.audio)}
                    onPause={onPause}
                  />
                </div>
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                  {word.partOfSpeech}
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {word.dialect}
                </span>
              </div>
              <p className="text-lg text-gray-700 mb-2">{word.english}</p>
              <p className="text-sm text-gray-500 mb-4">
                Pronunciation: <span className="font-mono">{word.pronunciation}</span>
              </p>

              {word.examples && word.examples.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                  {word.examples.map((example, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{example.akan}</p>
                          <p className="text-gray-600">{example.english}</p>
                        </div>
                        <AudioPlayer
                          src={example.audio}
                          playing={playingAudio === example.audio}
                          onPlay={() => onPlaySrc(example.audio)}
                          onPause={onPause}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {word.etymology && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Etymology:</h4>
                  <p className="text-sm text-gray-600 italic">{word.etymology}</p>
                </div>
              )}
            </div>

            <div className="ml-4 flex flex-col items-center space-y-2">
              <button
                onClick={() => onToggleFavorite(word.id)}
                className={`p-2 rounded-full transition-colors ${
                  favorites.includes(word.id)
                    ? 'text-red-500 bg-red-50 hover:bg-red-100'
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
                aria-pressed={favorites.includes(word.id)}
                title="Toggle favorite"
              >
                <Heart className={`w-5 h-5 ${favorites.includes(word.id) ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => onAddToActiveList(word.id)}
                className="p-2 rounded-full hover:bg-gray-100"
                title="Add to active list"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsList;