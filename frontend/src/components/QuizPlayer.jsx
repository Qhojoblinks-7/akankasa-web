import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

const QuizPlayer = ({ quiz, onComplete, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const questions = quiz?.questions || quiz || [];
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setSelectedAnswer(null);
  }, [quiz]);

  const handleAnswer = (answer) => {
    if (answered) return;
    setSelectedAnswer(answer);
    setAnswered(true);
    if (answer === currentQuestion.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
      if (onComplete) onComplete({ score, total: questions.length });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  if (!questions.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-600">No quiz questions available.</p>
        {onClose && <button onClick={onClose} className="mt-4 text-[#564c38] font-medium">Close</button>}
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h3>
        <p className="text-4xl font-bold mb-2" style={{ color: '#564c38' }}>{score}/{questions.length}</p>
        <p className="text-gray-600 mb-6">{percentage}% correct</p>
        <div className="flex items-center justify-center space-x-4">
          <button onClick={handleRestart} className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"><RotateCcw className="w-4 h-4" /><span>Retry</span></button>
          {onClose && <button onClick={onClose} className="px-4 py-2 bg-[#564c38] text-white rounded-lg text-sm">Close</button>}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">Question {currentIndex + 1} of {questions.length}</span>
        <span className="text-sm font-medium" style={{ color: '#564c38' }}>Score: {score}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div className="bg-[#564c38] h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">{currentQuestion.question}</h3>
      <div className="space-y-3">
        {(currentQuestion.options || []).map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === currentQuestion.correct;
          const showCorrect = answered && isCorrect;
          const showWrong = answered && isSelected && !isCorrect;
          return (
            <button key={index} onClick={() => handleAnswer(option)} disabled={answered} className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${showCorrect ? 'border-green-500 bg-green-50 text-green-700' : showWrong ? 'border-red-500 bg-red-50 text-red-700' : isSelected ? 'border-[#564c38] bg-[#564c38]/5' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'} disabled:cursor-default`}>
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                {showWrong && <XCircle className="w-5 h-5 text-red-600" />}
              </div>
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-6 flex justify-end">
          <button onClick={handleNext} className="flex items-center space-x-2 px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] text-sm">
            <span>{currentIndex + 1 < questions.length ? 'Next' : 'Finish'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPlayer;