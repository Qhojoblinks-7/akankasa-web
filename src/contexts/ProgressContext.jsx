import React from 'react';

import { createContext, useContext, useMemo, useState, useEffect } from 'react';

const ProgressContext = createContext(null);

export const useProgress = () => {
	const context = useContext(ProgressContext);
	if (!context) {
		throw new Error('useProgress must be used within a ProgressProvider');
	}
	return context;
};

const STORAGE_KEY = 'akan:learning-progress';

export const ProgressProvider = ({ children }) => {
	const [progressByModuleId, setProgressByModuleId] = useState({});

	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				setProgressByModuleId(JSON.parse(raw));
			}
		} catch {}
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(progressByModuleId));
		} catch {}
	}, [progressByModuleId]);

	const updateLessonProgress = (moduleId, lessonId, isCompleted) => {
		setProgressByModuleId(prev => {
			const prevModule = prev[moduleId] || { lessons: {}, completedAt: null };
			const nextLessons = { ...prevModule.lessons, [lessonId]: !!isCompleted };
			const allCompleted = Object.values(nextLessons).length > 0 && Object.values(nextLessons).every(Boolean);
			return {
				...prev,
				[moduleId]: {
					lessons: nextLessons,
					completedAt: allCompleted ? (prevModule.completedAt || new Date().toISOString()) : null,
				},
			};
		});
	};

	const getModuleProgress = (moduleId, totalLessons) => {
		const module = progressByModuleId[moduleId];
		if (!module || !totalLessons) return 0;
		const completed = Object.values(module.lessons).filter(Boolean).length;
		return Math.min(100, Math.round((completed / totalLessons) * 100));
	};

	const value = useMemo(() => ({
		progressByModuleId,
		updateLessonProgress,
		getModuleProgress,
	}), [progressByModuleId]);

	return (
		<ProgressContext.Provider value={value}>
			{children}
		</ProgressContext.Provider>
	);
};