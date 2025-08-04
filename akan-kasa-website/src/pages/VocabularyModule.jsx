import React from 'react';

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
          <QuizMode 
            module={module} 
            setCurrentMode={setCurrentMode}
          />
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

const QuizMode = ({ module, mastered, setMastered, setCurrentMode }) => {
  const [quizType, setQuizType] = useState('multiple'); // multiple, audio, reverse
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [questionWord, setQuestionWord] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);

  // Initialize quiz
  useEffect(() => {
    if (module && module.words.length > 0) {
      generateQuestion(0);
    }
  }, [module, quizType]);

  // Generate a question
  const generateQuestion = (questionIndex) => {
    if (!module || !module.words || module.words.length === 0) return;
    
    const words = [...module.words];
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    
    setQuestionWord(word);
    setCurrentQuestion(questionIndex);
    setSelectedOption(null);
    
    // Generate options based on quiz type
    let opts = [];
    if (quizType === 'multiple') {
      // Multiple choice: Akan word shown, select English translation
      opts = [word.english];
      const otherWords = words.filter(w => w.english !== word.english);
      while (opts.length < 4 && otherWords.length > 0) {
        const randomWordIndex = Math.floor(Math.random() * otherWords.length);
        const randomWord = otherWords[randomWordIndex];
        if (!opts.includes(randomWord.english)) {
          opts.push(randomWord.english);
        }
        otherWords.splice(randomWordIndex, 1);
      }
      // Shuffle options
      opts = opts.sort(() => Math.random() - 0.5);
    } else if (quizType === 'reverse') {
      // Reverse translation: English word shown, select Akan translation
      opts = [word.akan];
      const otherWords = words.filter(w => w.akan !== word.akan);
      while (opts.length < 4 && otherWords.length > 0) {
        const randomWordIndex = Math.floor(Math.random() * otherWords.length);
        const randomWord = otherWords[randomWordIndex];
        if (!opts.includes(randomWord.akan)) {
          opts.push(randomWord.akan);
        }
        otherWords.splice(randomWordIndex, 1);
      }
      // Shuffle options
      opts = opts.sort(() => Math.random() - 0.5);
    } else if (quizType === 'audio') {
      // Audio recognition: Audio played, select Akan word
      opts = [word.akan];
      const otherWords = words.filter(w => w.akan !== word.akan);
      while (opts.length < 4 && otherWords.length > 0) {
        const randomWordIndex = Math.floor(Math.random() * otherWords.length);
        const randomWord = otherWords[randomWordIndex];
        if (!opts.includes(randomWord.akan)) {
          opts.push(randomWord.akan);
        }
        otherWords.splice(randomWordIndex, 1);
      }
      // Shuffle options
      opts = opts.sort(() => Math.random() - 0.5);
    }
    
    setOptions(opts);
  };

  // Handle answer selection
  const handleAnswer = (option) => {
    if (showResults) return;
    
    setSelectedOption(option);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = {
      question: questionWord,
      selected: option,
      correct: 
        quizType === 'multiple' ? questionWord.english === option :
        quizType === 'reverse' ? questionWord.akan === option :
        quizType === 'audio' ? questionWord.akan === option :
        false
    };
    setUserAnswers(newUserAnswers);
  };

  // Move to next question or show results
  const nextQuestion = () => {
    if (currentQuestion < 9) { // 10 questions per quiz
      generateQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  // Restart quiz
  const restartQuiz = () => {
    setUserAnswers([]);
    setShowResults(false);
    setCurrentQuestion(0);
    setSelectedOption(null);
    generateQuestion(0);
  };

  // Go back to study mode
  const goBackToStudy = () => {
    setCurrentMode('study');
  };

  // Play audio
  const playAudio = (audioSrc) => {
    setPlayingAudio(audioSrc);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  // Calculate score
  const calculateScore = () => {
    if (userAnswers.length === 0) return 0;
    const correctAnswers = userAnswers.filter(answer => answer.correct).length;
    return Math.round((correctAnswers / userAnswers.length) * 100);
  };

  // Render quiz question
  const renderQuestion = () => {
    if (!questionWord) return null;

    return (
      <div className="space-y-6">
        {/* Question header */}
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Question {currentQuestion + 1} of 10
          </h3>
          {quizType === 'multiple' && (
            <p className="text-gray-600">What is the English translation of this Akan word?</p>
          )}
          {quizType === 'reverse' && (
            <p className="text-gray-600">What is the Akan translation of this English word?</p>
          )}
          {quizType === 'audio' && (
            <p className="text-gray-600">What Akan word did you hear?</p>
          )}
        </div>

        {/* Question content */}
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          {quizType === 'multiple' && (
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{questionWord.akan}</h2>
          )}
          {quizType === 'reverse' && (
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{questionWord.english}</h2>
          )}
          {quizType === 'audio' && (
            <div>
              <button
                onClick={() => playAudio(questionWord.audio)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto mb-4"
              >
                <Volume2 className={`w-5 h-5 mr-2 ${playingAudio === questionWord.audio ? 'animate-pulse' : ''}`} />
                Play Audio
              </button>
              <p className="text-gray-600">Click the button above to hear the pronunciation</p>
            </div>
          )}
          {quizType !== 'audio' && (
            <p className="text-lg text-gray-500">/{questionWord.pronunciation}/</p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={selectedOption !== null}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedOption === option
                  ? option === 
                    (quizType === 'multiple' ? questionWord.english :
                     quizType === 'reverse' ? questionWord.akan :
                     questionWord.akan)
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-red-500 bg-red-50 text-red-700'
                  : selectedOption && option === 
                    (quizType === 'multiple' ? questionWord.english :
                     quizType === 'reverse' ? questionWord.akan :
                     questionWord.akan)
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {selectedOption === option && (
                  <CheckCircle className="w-5 h-5" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={goBackToStudy}
            className="text-gray-600 hover:text-gray-800"
          >
            Back to Study
          </button>
          {selectedOption !== null && (
            <button
              onClick={nextQuestion}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              {currentQuestion < 9 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    );
  };

  // Render quiz results
  const renderResults = () => {
    const score = calculateScore();
    const correctAnswers = userAnswers.filter(answer => answer.correct).length;
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Results</h2>
          <div className={`text-4xl font-bold ${
            score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {score}%
          </div>
          <p className="text-gray-600">
            You got {correctAnswers} out of {userAnswers.length} questions correct
          </p>
        </div>

        {/* Detailed results */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Review Your Answers</h3>
          {userAnswers.map((answer, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {answer.question.akan} → {answer.question.english}
                  </h4>
                  <p className="text-sm text-gray-500">/{answer.question.pronunciation}/</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-sm ${
                  answer.correct 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {answer.correct ? 'Correct' : 'Incorrect'}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Your answer: {answer.selected}
              </div>
              {!answer.correct && (
                <div className="text-sm text-green-600 mt-1">
                  Correct answer: {
                    answer.question.akan === answer.selected ? 
                      answer.question.english : 
                      answer.question.english === answer.selected ? 
                        answer.question.akan : 
                        (answer.question.akan || answer.question.english)
                  }
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={restartQuiz}
            className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Take Quiz Again
          </button>
          <button
            onClick={goBackToStudy}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Study
          </button>
        </div>
      </div>
    );
  };

  // Render quiz type selector
  const renderQuizTypeSelector = () => {
    if (showResults) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Select Quiz Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {['multiple', 'audio', 'reverse'].map((type) => (
            <button
              key={type}
              onClick={() => setQuizType(type)}
              className={`p-3 rounded-lg border transition-colors ${
                quizType === type
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">
                {type === 'multiple' && 'Multiple Choice'}
                {type === 'audio' && 'Audio Recognition'}
                {type === 'reverse' && 'Reverse Translation'}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {type === 'multiple' && 'Akan → English'}
                {type === 'audio' && 'Listen & Select'}
                {type === 'reverse' && 'English → Akan'}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Practice Quiz</h2>
      <p className="text-gray-600 mb-6">Test your knowledge of the vocabulary words.</p>
      
      {renderQuizTypeSelector()}
      
      {showResults ? renderResults() : renderQuestion()}
    </div>
  );
};

export default VocabularyModule;
