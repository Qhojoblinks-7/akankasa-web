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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <Link to="/learn" className="text-blue-600 hover:text-blue-700">
            Return to Learning Hub
          </Link>
        </div>
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {lesson.level}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {lesson.duration}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Progress</div>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg">
              {/* Lesson Overview */}
              {currentSection === -1 && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson Overview</h2>
                  <p className="text-lg text-gray-700 mb-6">{lesson.content.overview}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Objectives</h3>
                    <ul className="space-y-2">
                      {lesson.content.objectives.map((objective, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button
                    onClick={() => setCurrentSection(0)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    Start Lesson
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              )}

              {/* Lesson Sections */}
              {currentSection >= 0 && currentSection < lesson.content.sections.length && (
                <div className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {lesson.content.sections[currentSection].title}
                      </h2>
                      <span className="text-sm text-gray-500">
                        Section {currentSection + 1} of {lesson.content.sections.length}
                      </span>
                    </div>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {lesson.content.sections[currentSection].content}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                      disabled={currentSection === 0}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentSection(currentSection + 1)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      {currentSection === lesson.content.sections.length - 1 ? 'Take Quiz' : 'Next'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Quiz Section */}
              {currentSection === lesson.content.sections.length && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Quiz Time!</h2>
                  <p className="text-gray-600 mb-6">Test your understanding of the lesson material.</p>
                  
                  {!showQuizResults ? (
                    <div className="space-y-6">
                      {lesson.quiz.map((question, questionIndex) => (
                        <div key={questionIndex} className="border border-gray-200 rounded-lg p-6">
                          <h3 className="font-semibold text-gray-900 mb-4">
                            {questionIndex + 1}. {question.question}
                          </h3>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <label key={optionIndex} className="flex items-center cursor-pointer">
                                <input
                                  type="radio"
                                  name={`question-${questionIndex}`}
                                  value={optionIndex}
                                  onChange={(e) => setQuizAnswers({
                                    ...quizAnswers,
                                    [questionIndex]: parseInt(e.target.value)
                                  })}
                                  className="mr-3 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <button
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Quiz
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                        getQuizScore() >= 70 ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <span className={`text-3xl font-bold ${
                          getQuizScore() >= 70 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {getQuizScore()}%
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {getQuizScore() >= 70 ? 'Congratulations!' : 'Keep Practicing!'}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {getQuizScore() >= 70 
                          ? 'You passed the quiz! You\'re ready for the next lesson.'
                          : 'Review the lesson material and try again to improve your score.'
                        }
                      </p>
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={() => {
                            setShowQuizResults(false);
                            setQuizAnswers({});
                          }}
                          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Retake Quiz
                        </button>
                        <Link
                          to="/learn"
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Lesson Navigation</h3>
              
              <div className="space-y-2 mb-6">
                <button
                  onClick={() => setCurrentSection(-1)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentSection === -1 ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">Overview</div>
                  <div className="text-sm text-gray-500">Lesson introduction</div>
                </button>
                
                {lesson.content.sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentSection === index ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">{section.title}</div>
                    <div className="text-sm text-gray-500">Section {index + 1}</div>
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentSection(lesson.content.sections.length)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentSection === lesson.content.sections.length ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">Quiz</div>
                  <div className="text-sm text-gray-500">Test your knowledge</div>
                </button>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Lesson Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Level:</span>
                    <span className="text-gray-900">{lesson.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="text-gray-900">{lesson.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Progress:</span>
                    <span className="text-gray-900">{Math.round(progress)}%</span>
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