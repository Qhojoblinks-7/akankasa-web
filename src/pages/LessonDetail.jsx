import React from 'react';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Clock, Book, Users, Star, ArrowRight } from 'lucide-react';
import { lessonsData } from '../data/mockData';

const LessonDetail = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const foundLesson = lessonsData.find(l => l.id === parseInt(id));
    setLesson(foundLesson);
  }, [id]);

  useEffect(() => {
    if (lesson) {
      const totalSections = lesson.content.sections.length + 1; // +1 for quiz
      const completedSections = currentSection + 1;
      setProgress((completedSections / totalSections) * 100);
    }
  }, [currentSection, lesson]);

  const handleQuizSubmit = () => {
    setShowQuizResults(true);
  };

  const getQuizScore = () => {
    if (!lesson || !lesson.quiz) return 0;
    let correct = 0;
    lesson.quiz.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / lesson.quiz.length) * 100);
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center overflow-x-hidden">
        <div className="text-center overflow-hidden">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 break-words">Lesson Not Found</h1>
          <Link to="/learn" className="text-blue-600 hover:text-blue-700 break-words min-h-[44px] inline-flex items-center justify-center">
            Return to Learning Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
          <div className="flex items-center justify-between overflow-hidden">
            <div className="flex items-center space-x-4 overflow-hidden">
              <Link
                to="/learn"
                className="text-gray-600 hover:text-gray-700 flex items-center min-h-[44px] break-words"
              >
                <ArrowLeft className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="break-words">Back to Learning</span>
              </Link>
              <div className="h-6 border-l border-gray-300 flex-shrink-0"></div>
              <div className="overflow-hidden min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 break-words">{lesson.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1 overflow-hidden">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full break-words">
                    {lesson.level}
                  </span>
                  <span className="flex items-center break-words">
                    <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="break-words">{lesson.duration}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right overflow-hidden">
              <div className="text-sm text-gray-500 mb-1 break-words">Progress</div>
              <div className="flex items-center space-x-2 overflow-hidden">
                <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 break-words">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 overflow-hidden">
          {/* Main Content */}
          <div className="lg:col-span-3 overflow-hidden">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Lesson Overview */}
              {currentSection === -1 && (
                <div className="p-8 overflow-hidden">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 break-words">Lesson Overview</h2>
                  <p className="text-lg text-gray-700 mb-6 break-words">{lesson.content.overview}</p>
                  
                  <div className="mb-6 overflow-hidden">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 break-words">Learning Objectives</h3>
                    <ul className="space-y-2 overflow-hidden">
                      {lesson.content.objectives.map((objective, index) => (
                        <li key={index} className="flex items-center text-gray-700 overflow-hidden">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="break-words">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button
                    onClick={() => setCurrentSection(0)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center min-h-[44px] break-words"
                  >
                    <span className="break-words">Start Lesson</span>
                    <ArrowRight className="w-5 h-5 ml-2 flex-shrink-0" />
                  </button>
                </div>
              )}

              {/* Lesson Sections */}
              {currentSection >= 0 && currentSection < lesson.content.sections.length && (
                <div className="p-8 overflow-hidden">
                  <div className="mb-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-4 overflow-hidden">
                      <h2 className="text-2xl font-bold text-gray-900 break-words">
                        {lesson.content.sections[currentSection].title}
                      </h2>
                      <span className="text-sm text-gray-500 break-words">
                        Section {currentSection + 1} of {lesson.content.sections.length}
                      </span>
                    </div>
                    <div className="prose max-w-none overflow-hidden">
                      <p className="text-gray-700 leading-relaxed break-words">
                        {lesson.content.sections[currentSection].content}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between overflow-hidden">
                    <button
                      onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                      disabled={currentSection === 0}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center min-h-[44px] break-words"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="break-words">Previous</span>
                    </button>
                    <button
                      onClick={() => setCurrentSection(currentSection + 1)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center min-h-[44px] break-words"
                    >
                      <span className="break-words">{currentSection === lesson.content.sections.length - 1 ? 'Take Quiz' : 'Next'}</span>
                      <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                    </button>
                  </div>
                </div>
              )}

              {/* Quiz Section */}
              {currentSection === lesson.content.sections.length && (
                <div className="p-8 overflow-hidden">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 break-words">Quiz Time!</h2>
                  <p className="text-gray-600 mb-6 break-words">Test your understanding of the lesson material.</p>
                  
                  {!showQuizResults ? (
                    <div className="space-y-6 overflow-hidden">
                      {lesson.quiz.map((question, questionIndex) => (
                        <div key={questionIndex} className="border border-gray-200 rounded-lg p-6 overflow-hidden">
                          <h3 className="font-semibold text-gray-900 mb-4 break-words">
                            {questionIndex + 1}. {question.question}
                          </h3>
                          <div className="space-y-2 overflow-hidden">
                            {question.options.map((option, optionIndex) => (
                              <label key={optionIndex} className="flex items-center cursor-pointer overflow-hidden">
                                <input
                                  type="radio"
                                  name={`question-${questionIndex}`}
                                  value={optionIndex}
                                  onChange={(e) => setQuizAnswers({
                                    ...quizAnswers,
                                    [questionIndex]: parseInt(e.target.value)
                                  })}
                                  className="mr-3 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                                />
                                <span className="text-gray-700 break-words">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <button
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] break-words"
                      >
                        Submit Quiz
                      </button>
                    </div>
                  ) : (
                    <div className="text-center overflow-hidden">
                      <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center overflow-hidden ${
                        getQuizScore() >= 70 ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <span className={`text-3xl font-bold break-words ${
                          getQuizScore() >= 70 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {getQuizScore()}%
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 break-words">
                        {getQuizScore() >= 70 ? 'Congratulations!' : 'Keep Practicing!'}
                      </h3>
                      <p className="text-gray-600 mb-6 break-words">
                        {getQuizScore() >= 70 
                          ? 'You passed the quiz! You\'re ready for the next lesson.'
                          : 'Review the lesson material and try again to improve your score.'
                        }
                      </p>
                      <div className="flex justify-center space-x-4 overflow-hidden">
                        <button
                          onClick={() => {
                            setShowQuizResults(false);
                            setQuizAnswers({});
                          }}
                          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors min-h-[44px] break-words"
                        >
                          Retake Quiz
                        </button>
                        <Link
                          to="/learn"
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors min-h-[44px] inline-flex items-center justify-center break-words"
                        >
                          Continue Learning
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 overflow-hidden">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24 overflow-hidden">
              <h3 className="font-semibold text-gray-900 mb-4 break-words">Lesson Navigation</h3>
              
              <div className="space-y-2 mb-6 overflow-hidden">
                <button
                  onClick={() => setCurrentSection(-1)}
                  className={`w-full text-left p-3 rounded-lg transition-colors min-h-[44px] break-words ${
                    currentSection === -1 ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium break-words">Overview</div>
                  <div className="text-sm text-gray-500 break-words">Lesson introduction</div>
                </button>
                
                {lesson.content.sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors min-h-[44px] break-words ${
                      currentSection === index ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium break-words">{section.title}</div>
                    <div className="text-sm text-gray-500 break-words">Section {index + 1}</div>
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentSection(lesson.content.sections.length)}
                  className={`w-full text-left p-3 rounded-lg transition-colors min-h-[44px] break-words ${
                    currentSection === lesson.content.sections.length ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium break-words">Quiz</div>
                  <div className="text-sm text-gray-500 break-words">Test your knowledge</div>
                </button>
              </div>

              <div className="border-t border-gray-200 pt-4 overflow-hidden">
                <h4 className="font-medium text-gray-900 mb-3 break-words">Lesson Info</h4>
                <div className="space-y-2 text-sm overflow-hidden">
                  <div className="flex justify-between overflow-hidden">
                    <span className="text-gray-500 break-words">Level:</span>
                    <span className="text-gray-900 break-words">{lesson.level}</span>
                  </div>
                  <div className="flex justify-between overflow-hidden">
                    <span className="text-gray-500 break-words">Duration:</span>
                    <span className="text-gray-900 break-words">{lesson.duration}</span>
                  </div>
                  <div className="flex justify-between overflow-hidden">
                    <span className="text-gray-500 break-words">Progress:</span>
                    <span className="text-gray-900 break-words">{Math.round(progress)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;