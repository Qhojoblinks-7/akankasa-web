import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Volume2, RotateCcw, CheckCircle, X, RefreshCw, Star, Eye, EyeOff } from 'lucide-react';
import { vocabularyModules } from '../data/mockData';

const VocabularyModule = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [currentMode, setCurrentMode] = useState('study'); // study, flashcards, quiz
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(true);
  const [mastered, setMastered] = useState(new Set());
  const [quizResults, setQuizResults] = useState({});
  const [playingAudio, setPlayingAudio] = useState(null);

  useEffect(() => {
    const foundModule = vocabularyModules.find(m => m.id === moduleId);
    setModule(foundModule);
  }, [moduleId]);

  const playAudio = (audioSrc) => {
    setPlayingAudio(audioSrc);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  const toggleMastered = (wordIndex) => {
    const newMastered = new Set(mastered);
    if (newMastered.has(wordIndex)) {
      newMastered.delete(wordIndex);
    } else {
      newMastered.add(wordIndex);
    }
    setMastered(newMastered);
  };

  const nextWord = () => {
    if (module && currentWordIndex < module.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowTranslation(currentMode === 'study');
    }
  };

  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowTranslation(currentMode === 'study');
    }
  };

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h1>
          <Link to="/learn" className="text-blue-600 hover:text-blue-700">
            Return to Learning Hub
          </Link>
        </div>
      </div>
    );
  }

  const currentWord = module.words[currentWordIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/learn"
                className="text-gray-600 hover:text-gray-700 flex items-center"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Learning
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
                <p className="text-gray-600">{module.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Progress</div>
              <div className="text-lg font-semibold text-gray-900">
                {currentWordIndex + 1} / {module.words.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-6">
            {[
              { id: 'study', label: 'Study Mode' },
              { id: 'flashcards', label: 'Flashcards' },
              { id: 'quiz', label: 'Practice Quiz' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setCurrentMode(mode.id);
                  setShowTranslation(mode.id === 'study');
                  setCurrentWordIndex(0);
                }}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  currentMode === mode.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Study Mode */}
        {currentMode === 'study' && (
          <div className="space-y-8">
            {/* Current Word Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="mb-6">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{currentWord.akan}</h2>
                <p className="text-xl text-gray-600 mb-4">{currentWord.english}</p>
                <p className="text-lg text-gray-500 mb-6">/{currentWord.pronunciation}/</p>
                
                <button
                  onClick={() => playAudio(currentWord.audio)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto"
                >
                  <Volume2 className={`w-5 h-5 mr-2 ${playingAudio === currentWord.audio ? 'animate-pulse' : ''}`} />
                  Listen
                </button>
              </div>

              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={() => toggleMastered(currentWordIndex)}
                  className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                    mastered.has(currentWordIndex)
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Star className={`w-4 h-4 mr-2 ${mastered.has(currentWordIndex) ? 'fill-current' : ''}`} />
                  {mastered.has(currentWordIndex) ? 'Mastered' : 'Mark as Mastered'}
                </button>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={previousWord}
                  disabled={currentWordIndex === 0}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <span className="text-gray-500">
                  {currentWordIndex + 1} of {module.words.length}
                </span>
                
                <button
                  onClick={nextWord}
                  disabled={currentWordIndex === module.words.length - 1}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>

            {/* All Words Grid */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">All Words in this Module</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {module.words.map((word, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentWordIndex(index)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      index === currentWordIndex
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{word.akan}</h4>
                      {mastered.has(index) && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{word.english}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(word.audio);
                      }}
                      className="mt-2 text-green-600 hover:text-green-700"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Flashcard Mode */}
        {currentMode === 'flashcards' && (
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div 
                className="bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => setShowTranslation(!showTranslation)}
                style={{ minHeight: '300px' }}
              >
                <div className="flex justify-center mb-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    {showTranslation ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                </div>
                
                <div className="mb-6">
                  {showTranslation ? (
                    <>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">{currentWord.akan}</h2>
                      <p className="text-xl text-gray-600 mb-4">{currentWord.english}</p>
                      <p className="text-lg text-gray-500">/{currentWord.pronunciation}/</p>
                    </>
                  ) : (
                    <h2 className="text-3xl font-bold text-gray-900">{currentWord.akan}</h2>
                  )}
                </div>

                <div className="mb-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(currentWord.audio);
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Listen
                  </button>
                </div>

                <p className="text-sm text-gray-500">Click card to {showTranslation ? 'hide' : 'show'} translation</p>
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={previousWord}
                  disabled={currentWordIndex === 0}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Previous
                </button>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleMastered(currentWordIndex)}
                    className={`p-2 rounded-lg transition-colors ${
                      mastered.has(currentWordIndex)
                        ? 'text-yellow-500'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Star className={`w-5 h-5 ${mastered.has(currentWordIndex) ? 'fill-current' : ''}`} />
                  </button>
                  
                  <span className="text-gray-500 text-sm">
                    {currentWordIndex + 1} / {module.words.length}
                  </span>
                </div>

                <button
                  onClick={nextWord}
                  disabled={currentWordIndex === module.words.length - 1}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Mode */}
        {currentMode === 'quiz' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Quiz</h2>
            <p className="text-gray-600 mb-6">Test your knowledge of the vocabulary words.</p>
            
            <div className="text-center py-12">
              <RefreshCw className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quiz Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                Interactive quizzes with multiple choice questions, audio recognition, and more are being developed.
              </p>
              <button
                onClick={() => setCurrentMode('study')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue Studying
              </button>
            </div>
          </div>
        )}

        {/* Progress Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{module.words.length}</div>
              <div className="text-sm text-gray-600">Total Words</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{mastered.size}</div>
              <div className="text-sm text-gray-600">Mastered</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((mastered.size / module.words.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Completion</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{currentWordIndex + 1}</div>
              <div className="text-sm text-gray-600">Current Word</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyModule;