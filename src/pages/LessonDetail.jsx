import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Clock, Book, Users, Star, ArrowRight } from 'lucide-react';
import { getLesson } from '../api';

const LessonDetail = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchLesson = async () => {
      try {
        const data = await getLesson(id);
        if (mounted) setLesson(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchLesson();
    return () => { mounted = false; };
  }, [id]);

  useEffect(() => {
    if (lesson) {
      const totalSections = (lesson.content?.sections?.length || 0) + 1;
      const completedSections = currentSection + 1;
      setProgress((completedSections / totalSections) * 100);
    }
  }, [currentSection, lesson]);

  const handleQuizSubmit = () => {
    setShowQuizResults(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading lesson...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Lesson not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link to="/learn" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lessons
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{lesson.title}</h1>
          <p className="text-xl opacity-90 mb-6">{lesson.description}</p>
          <div className="flex items-center space-x-4 text-sm">
            <span className="px-3 py-1 rounded-full bg-white/20">{lesson.level}</span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {lesson.duration}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Progress</h2>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#564c38] h-2 rounded-full transition-all duration-300" style={{width: `${progress}%`}}></div>
            </div>
          </div>

          <div className="p-6">
            {lesson.content?.sections?.map((section, index) => (
              <div key={index} className={`mb-8 ${index === currentSection ? '' : 'hidden'}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: section.body || section.content || '' }}></div>
                {section.audio && (
                  <div className="mt-4">
                    <button className="flex items-center px-4 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors">
                      <Play className="w-4 h-4 mr-2" />
                      Play Audio
                    </button>
                  </div>
                )}
              </div>
            ))}

            {lesson.quiz && (
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quiz</h3>
                {lesson.quiz.map((q, qIndex) => (
                  <div key={qIndex} className="mb-6">
                    <p className="text-gray-900 mb-3">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((option, oIndex) => (
                        <label key={oIndex} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`q-${qIndex}`}
                            value={option}
                            checked={quizAnswers[`q-${qIndex}`] === option}
                            onChange={(e) => setQuizAnswers({...quizAnswers, [`q-${qIndex}`]: e.target.value})}
                            className="h-4 w-4 text-[#564c38] border-gray-300"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                {!showQuizResults ? (
                  <button onClick={handleQuizSubmit} className="mt-4 px-6 py-3 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors">
                    Submit Quiz
                  </button>
                ) : (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-medium">Quiz submitted! Keep learning.</p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentSection(Math.min((lesson.content?.sections?.length || 0) - 1, currentSection + 1))}
                disabled={currentSection >= (lesson.content?.sections?.length || 0) - 1}
                className="px-6 py-3 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
