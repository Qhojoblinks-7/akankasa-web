import React, { useState } from 'react';
import { BookOpen, Volume2, Copy, Heart } from 'lucide-react';

const PhraseBook = ({ onAddToFavorites }) => {
  const [playingAudio, setPlayingAudio] = useState(null);
  const [copiedPhrase, setCopiedPhrase] = useState(null);

  // Common Akan phrases organized by category
  const phraseCategories = [
    {
      id: 'greetings',
      title: 'Greetings & Basics',
      phrases: [
        {
          akan: 'Akwaaba',
          english: 'Welcome',
          pronunciation: 'ah-KWAH-bah',
          audio: '/audio/akwaaba.mp3',
          context: 'Universal welcome greeting'
        },
        {
          akan: 'Ɛte sɛn?',
          english: 'How are you?',
          pronunciation: 'eh-tay-sen',
          audio: '/audio/etesen.mp3',
          context: 'Common greeting to ask about wellbeing'
        },
        {
          akan: 'Me ho yɛ',
          english: 'I am fine',
          pronunciation: 'may-ho-yay',
          audio: '/audio/mehoye.mp3',
          context: 'Standard response to how are you'
        },
        {
          akan: 'Medaase',
          english: 'Thank you',
          pronunciation: 'may-DAH-say',
          audio: '/audio/medaase.mp3',
          context: 'Expression of gratitude'
        }
      ]
    },
    {
      id: 'directions',
      title: 'Directions & Locations',
      phrases: [
        {
          akan: 'Ɛhe na ɛwɔ?',
          english: 'Where is it?',
          pronunciation: 'eh-heh nah eh-woh',
          audio: '/audio/ehenaewo.mp3',
          context: 'Asking for location'
        },
        {
          akan: 'Kɔ nifa',
          english: 'Go right',
          pronunciation: 'koh nee-fah',
          audio: '/audio/konifa.mp3',
          context: 'Giving directions'
        },
        {
          akan: 'Kɔ benkum',
          english: 'Go left',
          pronunciation: 'koh ben-koom',
          audio: '/audio/kobenkum.mp3',
          context: 'Giving directions'
        },
        {
          akan: 'Ɛwɔ ha',
          english: 'It is here',
          pronunciation: 'eh-woh hah',
          audio: '/audio/ewoha.mp3',
          context: 'Pointing out location'
        }
      ]
    },
    {
      id: 'food',
      title: 'Food & Dining',
      phrases: [
        {
          akan: 'Mepɛ aduane',
          english: 'I want food',
          pronunciation: 'may-peh ah-doo-ah-nay',
          audio: '/audio/mepeaduane.mp3',
          context: 'Expressing hunger'
        },
        {
          akan: 'Nsuo pɛ',
          english: 'I want water',
          pronunciation: 'n-soo-oh peh',
          audio: '/audio/nsuope.mp3',
          context: 'Asking for water'
        },
        {
          akan: 'Ɛyɛ dɛ',
          english: 'It is delicious',
          pronunciation: 'eh-yeh deh',
          audio: '/audio/eyede.mp3',
          context: 'Complimenting food'
        },
        {
          akan: 'Meda wo ase',
          english: 'Thank you (for food)',
          pronunciation: 'may-dah woh ah-say',
          audio: '/audio/medawoase.mp3',
          context: 'Thanks after eating'
        }
      ]
    },
    {
      id: 'emergency',
      title: 'Emergency & Help',
      phrases: [
        {
          akan: 'Boa me',
          english: 'Help me',
          pronunciation: 'boh-ah may',
          audio: '/audio/boame.mp3',
          context: 'Asking for help'
        },
        {
          akan: 'Ɛyɛ haw',
          english: 'It is urgent',
          pronunciation: 'eh-yeh how',
          audio: '/audio/eyehow.mp3',
          context: 'Expressing urgency'
        },
        {
          akan: 'Frɛ oduruyɛfo',
          english: 'Call a doctor',
          pronunciation: 'fray oh-doo-roo-yeh-foh',
          audio: '/audio/freoduruyefo.mp3',
          context: 'Medical emergency'
        },
        {
          akan: 'Mete ahokyere',
          english: 'I need assistance',
          pronunciation: 'may-tay ah-hoh-chay-ray',
          audio: '/audio/meteahokyere.mp3',
          context: 'General assistance needed'
        }
      ]
    }
  ];

  const playAudio = (audioSrc) => {
    setPlayingAudio(audioSrc);
    // Simulate audio playing
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPhrase(text);
      setTimeout(() => setCopiedPhrase(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <BookOpen className="w-6 h-6 text-yellow-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">Common Phrases</h3>
      </div>

      <div className="space-y-6">
        {phraseCategories.map((category) => (
          <div key={category.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">
              {category.title}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.phrases.map((phrase, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="text-lg font-semibold text-gray-900 mr-2">
                          {phrase.akan}
                        </span>
                        {copiedPhrase === phrase.akan && (
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                            Copied!
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-1">{phrase.english}</p>
                      <p className="text-sm text-gray-500 font-mono mb-2">
                        {phrase.pronunciation}
                      </p>
                      <p className="text-xs text-gray-600 italic">
                        {phrase.context}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-2 ml-3">
                      <button
                        onClick={() => playAudio(phrase.audio)}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label="Listen to pronunciation"
                      >
                        <Volume2
                          className={`w-4 h-4 text-blue-600 ${
                            playingAudio === phrase.audio ? 'animate-pulse' : ''
                          }`}
                        />
                      </button>
                      
                      <button
                        onClick={() => copyToClipboard(phrase.akan)}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label="Copy phrase"
                      >
                        <Copy className="w-4 h-4 text-gray-600" />
                      </button>
                      
                      <button
                        onClick={() => onAddToFavorites && onAddToFavorites(phrase)}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label="Add to favorites"
                      >
                        <Heart className="w-4 h-4 text-red-400 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-900 mb-2">Quick Actions</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => copyToClipboard('Akwaaba')}
            className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm hover:bg-yellow-200"
          >
            Copy "Welcome"
          </button>
          <button
            onClick={() => copyToClipboard('Ɛte sɛn?')}
            className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm hover:bg-yellow-200"
          >
            Copy "How are you?"
          </button>
          <button
            onClick={() => copyToClipboard('Medaase')}
            className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm hover:bg-yellow-200"
          >
            Copy "Thank you"
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhraseBook;
