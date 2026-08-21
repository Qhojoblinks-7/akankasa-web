import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight, RotateCcw, Check } from 'lucide-react';

const FlashcardModule = ({ words, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState([]);
  const [playingAudio, setPlayingAudio] = useState(null);

  const currentWord = words[currentIndex];
  const totalWords = words.length;
  const progress = mastered.length;

  const playAudio = (audio) => {
    setPlayingAudio(audio);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalWords) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleMastered = () => {
    if (!mastered.includes(currentWord.id || currentIndex)) {
      setMastered(prev => [...prev, currentWord.id || currentIndex]);
    }
    handleNext();
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMastered([]);
  };

  if (!words.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-600">No words available in this module.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title || 'Flashcards'}</h3>
          <p className="text-sm text-gray-600">{currentIndex + 1} / {totalWords} words</p>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={handleRestart} className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100" title="Restart">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-[#564c38] h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / totalWords) * 100}%` }} />
        </div>

        <div className="flex justify-center mb-6">
          <div onClick={() => setIsFlipped(!isFlipped)} className="w-full max-w-md aspect-[3/2] cursor-pointer perspective-1000">
            <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#564c38] to-[#695e46] rounded-xl shadow-lg flex flex-col items-center justify-center p-6 text-white" style={{ backfaceVisibility: 'hidden' }}>
                <p className="text-3xl font-bold mb-2">{currentWord.akan || currentWord.word}</p>
                <p className="text-sm opacity-80 mb-4">{currentWord.pronunciation || ''}</p>
                {currentWord.audio && <button onClick={(e) => { e.stopPropagation(); playAudio(currentWord.audio); }} className={`p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors ${playingAudio === currentWord.audio ? 'animate-pulse' : ''}`}><Volume2 className="w-5 h-5" /></button>}
                <p className="text-xs opacity-60 mt-4">Click to reveal translation</p>
              </div>
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg border-2 border-gray-200 flex flex-col items-center justify-center p-6" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <p className="text-2xl font-bold text-gray-900 mb-2">{currentWord.english || currentWord.translation}</p>
                {currentWord.context && <p className="text-sm text-gray-600 text-center">{currentWord.context}</p>}
                <p className="text-xs text-gray-400 mt-4">Click to see word</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button onClick={handlePrev} disabled={currentIndex === 0} className={`p-3 rounded-full border ${currentIndex === 0 ? 'border-gray-200 text-gray-300' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={handleMastered} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"><Check className="w-4 h-4" /><span>Got it</span></button>
          <button onClick={handleNext} disabled={currentIndex === totalWords - 1} className={`p-3 rounded-full border ${currentIndex === totalWords - 1 ? 'border-gray-200 text-gray-300' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}><ChevronRight className="w-5 h-5" /></button>
        </div>

        {progress > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">{progress} of {totalWords} words mastered</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardModule;