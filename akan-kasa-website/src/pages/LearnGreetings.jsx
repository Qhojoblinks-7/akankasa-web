import { greetingsData } from '../data/mockData';
import { Play } from 'lucide-react';
import { useState } from 'react';

const LearnGreetings = () => {
  const [playingAudio, setPlayingAudio] = useState(null);
  const playAudio = (audioSrc) => {
    setPlayingAudio(audioSrc);
    setTimeout(() => setPlayingAudio(null), 1000);
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-akan-red mb-8">Essential Akan Greetings</h1>
        <div className="space-y-6">
          {greetingsData.map((greeting) => (
            <div key={greeting.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{greeting.akan}</h2>
                  <p className="text-lg text-gray-600 mb-2">{greeting.english}</p>
                  <p className="text-sm text-gray-500 mb-2">Pronunciation: {greeting.pronunciation}</p>
                  <p className="text-sm text-blue-600">{greeting.context}</p>
                </div>
                <button
                  onClick={() => playAudio(greeting.audio)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Play className={`w-5 h-5 mr-2 ${playingAudio === greeting.audio ? 'animate-pulse' : ''}`} />
                  Listen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnGreetings;