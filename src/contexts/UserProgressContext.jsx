import React, { createContext, useContext, useState, useEffect } from 'react';

const UserProgressContext = createContext();

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};

const STORAGE_KEY = 'akankasa:user_progress';

export const UserProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {
        userId: 'local-user',
        bookmarks: [],
        completedLessons: [],
        vocabularyMastery: {},
        quizScores: {},
        streak: 0,
        lastStudyDate: null,
        totalStudyTime: 0,
        savedWords: [],
        achievements: []
      };
    } catch {
      return {
        userId: 'local-user',
        bookmarks: [],
        completedLessons: [],
        vocabularyMastery: {},
        quizScores: {},
        streak: 0,
        lastStudyDate: null,
        totalStudyTime: 0,
        savedWords: [],
        achievements: []
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
      console.error('[UserProgress] save failed', err);
    }
  }, [progress]);

  const updateProgress = (updates) => {
    setProgress(prev => ({ ...prev, ...updates }));
  };

  const markLessonComplete = (lessonId) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId]
    }));
  };

  const saveQuizScore = (quizId, score) => {
    setProgress(prev => ({
      ...prev,
      quizScores: { ...prev.quizScores, [quizId]: score }
    }));
  };

  const toggleBookmark = (itemId) => {
    setProgress(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.includes(itemId)
        ? prev.bookmarks.filter(id => id !== itemId)
        : [...prev.bookmarks, itemId]
    }));
  };

  const toggleSavedWord = (wordId) => {
    setProgress(prev => ({
      ...prev,
      savedWords: prev.savedWords.includes(wordId)
        ? prev.savedWords.filter(id => id !== wordId)
        : [...prev.savedWords, wordId]
    }));
  };

  const recordStudyTime = (minutes) => {
    setProgress(prev => {
      const today = new Date().toISOString().split('T')[0];
      const isNewDay = prev.lastStudyDate !== today;
      return {
        ...prev,
        totalStudyTime: prev.totalStudyTime + minutes,
        streak: isNewDay ? prev.streak + 1 : prev.streak,
        lastStudyDate: today
      };
    });
  };

  const checkAchievements = () => {
    setProgress(prev => {
      const earned = prev.achievements || [];
      const newAchievements = [];
      if ((prev.completedLessons || []).length >= 5 && !earned.includes('lessons_5')) newAchievements.push('lessons_5');
      if ((prev.completedLessons || []).length >= 10 && !earned.includes('lessons_10')) newAchievements.push('lessons_10');
      if ((prev.savedWords || []).length >= 10 && !earned.includes('words_10')) newAchievements.push('words_10');
      if ((prev.savedWords || []).length >= 50 && !earned.includes('words_50')) newAchievements.push('words_50');
      if ((prev.totalStudyTime || 0) >= 60 && !earned.includes('study_1h')) newAchievements.push('study_1h');
      if ((prev.streak || 0) >= 7 && !earned.includes('streak_7')) newAchievements.push('streak_7');
      if (newAchievements.length > 0) {
        return { ...prev, achievements: [...(prev.achievements || []), ...newAchievements] };
      }
      return prev;
    });
  };

  const value = {
    progress,
    updateProgress,
    markLessonComplete,
    saveQuizScore,
    toggleBookmark,
    toggleSavedWord,
    recordStudyTime,
    checkAchievements
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
};

export default UserProgressContext;
