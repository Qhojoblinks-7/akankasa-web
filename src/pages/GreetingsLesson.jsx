/* eslint-disable no-unused-vars */
import React from 'react';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2, Play, CheckCircle, RotateCcw } from 'lucide-react';
// import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const GreetingsLesson = () => {
  const { t } = useLanguage();
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [completedGreetings, setCompletedGreetings] = useState(new Set());
  const [showTranslation, setShowTranslation] = useState(false);

  const greetings = [
    {
      akan: "Akwaaba",
      english: "Welcome",
      pronunciation: "ah-KWAH-bah",
      context: "Used to welcome someone, very common greeting",
      audio: "/audio/akwaaba.mp3"
    },
    {
      akan: "Maakye",
      english: "Good morning",
      pronunciation: "MAH-chay",
      context: "Morning greeting, used until around 11 AM",
      audio: "/audio/maakye.mp3"
    },
    {
      akan: "Maaha",
      english: "Good afternoon",
      pronunciation: "MAH-hah",
      context: "Afternoon greeting, used from 11 AM to 6 PM",
      audio: "/audio/maaha.mp3"
    },
    {
      akan: "Maadwo",
      english: "Good evening",
      pronunciation: "MAH-dwo",
      context: "Evening greeting, used from 6 PM onwards",
      audio: "/audio/maadwo.mp3"
    },
    {
      akan: "Ɛte sɛn?",
      english: "How are you?",
      pronunciation: "eh-tay-sen",
      context: "Common way to ask how someone is doing",
      audio: "/audio/etesen.mp3"
    },
    {
      akan: "Me ho yɛ",
      english: "I am fine",
      pronunciation: "may-ho-yay",
      context: "Standard response to 'How are you?'",
      audio: "/audio/mehoye.mp3"
    },
    {
      akan: "Nante yie",
      english: "Goodbye (when someone is leaving)",
      pronunciation: "nahn-tay-yee-ay",
      context: "Said to someone who is going somewhere",
      audio: "/audio/nanteyie.mp3"
    },
    {
      akan: "Medaase",
      english: "Thank you",
      pronunciation: "may-DAH-ah-say",
      context: "Expression of gratitude",
      audio: "/audio/medaase.mp3"
    }
  ];

  const playAudio = (audioFile) => {
    // Simulate audio playing - in real app would use actual audio files
    console.log(`Playing audio: ${audioFile}`);
  };

  const markAsCompleted = () => {
    setCompletedGreetings(prev => new Set([...prev, currentGreeting]));
  };

  const nextGreeting = () => {
    if (currentGreeting < greetings.length - 1) {
      setCurrentGreeting(currentGreeting + 1);
      setShowTranslation(false);
    }
  };

  const prevGreeting = () => {
    if (currentGreeting > 0) {
      setCurrentGreeting(currentGreeting - 1);
      setShowTranslation(false);
    }
  };

  const currentData = greetings[currentGreeting];
  const progress = ((currentGreeting + 1) / greetings.length) * 100;
  const completionRate = (completedGreetings.size / greetings.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-4" style={{backgroundColor: '#C19A6B'}}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            to="/learn" 
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
            style={{color: '#1C1C1C'}}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(28, 28, 28, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Lessons</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium" style={{color: '#1C1C1C'}}>
              Progress: {currentGreeting + 1}/{greetings.length}
            </div>
            <div className="w-32 h-2 rounded-full" style={{backgroundColor: 'rgba(28, 28, 28, 0.2)'}}>
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{backgroundColor: '#C19A6B', width: `${progress}%`}}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Lesson Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{color: '#C19A6B', fontFamily: 'Georama, sans-serif'}}>
            Basic Akan Greetings
          </h1>
          <p className="text-xl text-gray-600">
            Learn essential daily greetings to start conversations in Akan
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium" 
               style={{backgroundColor: '#3B7A57', color: 'white'}}>
            {completedGreetings.size} of {greetings.length} completed
          </div>
        </div>

        {/* Main Content Card */}
        <div 
          key={currentGreeting}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="text-center">
            {/* Akan Text */}
            <div className="mb-6">
              <h2 className="text-5xl font-bold mb-4" style={{color: '#C19A6B', fontFamily: 'Georama, sans-serif'}}>
                {currentData.akan}
              </h2>
              <button
                onClick={() => playAudio(currentData.audio)}
                className="btn-primary px-4 py-2 rounded-lg"
                style={{backgroundColor: '#C19A6B', color: '#1C1C1C'}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#a98253'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#C19A6B'}
              >
                <Volume2 className="w-5 h-5" />
                <span>Play Audio</span>
              </button>
            </div>

            {/* Pronunciation */}
            <div className="mb-6">
              <p className="text-lg text-gray-600 mb-2">Pronunciation:</p>
              <p className="text-2xl font-mono" style={{color: '#1C1C1C'}}>
                [{currentData.pronunciation}]
              </p>
            </div>

            {/* Translation Toggle */}
            <div className="mb-6">
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className="px-6 py-3 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: showTranslation ? '#C19A6B' : '#1C1C1C',
                  color: 'white'
                }}
              >
                {showTranslation ? 'Hide Translation' : 'Show Translation'}
              </button>
              
              {showTranslation && (
                <div
                  className="mt-4"
                >
                  <p className="text-3xl font-semibold" style={{color: '#1C1C1C'}}>
                    "{currentData.english}"
                  </p>
                </div>
              )}
            </div>

            {/* Context */}
            <div className="p-4 rounded-lg" style={{backgroundColor: '#C19A6B', color: '#1C1C1C'}}>
              <p className="font-medium mb-1">When to use:</p>
              <p>{currentData.context}</p>
            </div>
          </div>
        </div>

        {/* Navigation and Actions */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={prevGreeting}
            disabled={currentGreeting === 0}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{backgroundColor: '#1C1C1C', color: 'white'}}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-4">
            <button
              onClick={markAsCompleted}
              disabled={completedGreetings.has(currentGreeting)}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              style={{
                backgroundColor: completedGreetings.has(currentGreeting) ? '#3B7A57' : '#C19A6B',
                color: 'white'
              }}
            >
              <CheckCircle className="w-5 h-5" />
              <span>{completedGreetings.has(currentGreeting) ? 'Completed' : 'Mark Complete'}</span>
            </button>

            <button
              onClick={() => setShowTranslation(false)}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors"
              style={{backgroundColor: '#8B0000', color: 'white'}}
            >
              <RotateCcw className="w-5 h-5" />
              <span>Practice Again</span>
            </button>
          </div>

          <button
            onClick={nextGreeting}
            disabled={currentGreeting === greetings.length - 1}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{backgroundColor: '#1C1C1C', color: 'white'}}
          >
            <span>Next</span>
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4" style={{color: '#C19A6B', fontFamily: 'Georama, sans-serif'}}>
            Lesson Progress
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {greetings.map((greeting, index) => (
              <button
                key={index}
                onClick={() => setCurrentGreeting(index)}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  index === currentGreeting ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{
                  backgroundColor: completedGreetings.has(index) 
                    ? '#3B7A57' 
                    : index === currentGreeting 
                      ? '#C19A6B' 
                      : '#1C1C1C',
                  color: completedGreetings.has(index) || index === currentGreeting 
                    ? '#1C1C1C' 
                    : 'white',
                  ringColor: '#C19A6B'
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Completion: {Math.round(completionRate)}%
          </div>
        </div>

        {/* Completion Message */}
        {completedGreetings.size === greetings.length && (
          <div
            className="mt-8 bg-white rounded-lg p-6 text-center border-2"
            style={{borderColor: '#C19A6B'}}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2" style={{color: '#C19A6B', fontFamily: 'Georama, sans-serif'}}>
              Congratulations!
            </h3>
            <p className="text-gray-600 mb-4">
              You've completed the Basic Greetings lesson. You're ready to start conversations in Akan!
            </p>
            <Link
              to="/learn"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors"
              style={{backgroundColor: '#1C1C1C', color: 'white'}}
            >
              <span>Continue to Next Lesson</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GreetingsLesson;