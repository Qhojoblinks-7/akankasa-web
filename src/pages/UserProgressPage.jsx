import React from 'react';
import { useUserProgress } from '../contexts/UserProgressContext';
import { BookOpen, Flame, Star, Clock, Bookmark, Award } from 'lucide-react';

const UserProgressPage = () => {
  const { progress } = useUserProgress();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Learning Progress</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Study Streak</p>
                <p className="text-3xl font-bold text-[#564c38]">{progress.streak || 0} days</p>
              </div>
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Study Time</p>
                <p className="text-3xl font-bold text-[#564c38]">{Math.round((progress.totalStudyTime || 0) / 60)}h {(progress.totalStudyTime || 0) % 60}m</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Lessons</p>
                <p className="text-3xl font-bold text-[#564c38]">{(progress.completedLessons || []).length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Words</h2>
          {(progress.savedWords || []).length === 0 ? (
            <p className="text-gray-600">No saved words yet. Browse the dictionary and save words to track them here.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {(progress.savedWords || []).map(wordId => (
                <span key={wordId} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                  Word #{wordId}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Bookmarks</h2>
          {(progress.bookmarks || []).length === 0 ? (
            <p className="text-gray-600">No bookmarks yet. Bookmark lessons and articles to find them quickly.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {(progress.bookmarks || []).map(bookmark => (
                <span key={bookmark} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {bookmark}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
          {(progress.achievements || []).length === 0 ? (
            <p className="text-gray-600">No achievements yet. Keep learning to unlock badges!</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {(progress.achievements || []).map(achievement => (
                <div key={achievement} className="flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
                  <Award className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-sm font-medium text-yellow-800 capitalize">{achievement.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProgressPage;
