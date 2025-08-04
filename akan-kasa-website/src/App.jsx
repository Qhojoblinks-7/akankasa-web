import React from 'react';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Homepage from './pages/Homepage';
import LanguageLearning from './pages/LanguageLearning';
import CompleteBeginnerPath from './pages/CompleteBeginnerPath';
import HeritageSpeakerPath from './pages/HeritageSpeakerPath';
import AcademicLearnerPath from './pages/AcademicLearnerPath';
import CultureHighlights from './pages/CultureHighlights';
import Dictionary from './pages/Dictionary';
import Research from './pages/Research';
import Community from './pages/Community';
import LessonDetail from './pages/LessonDetail';
import VocabularyModule from './pages/VocabularyModule';
import GreetingsLesson from './pages/GreetingsLesson';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/learn" element={<LanguageLearning />} />
              <Route path="/learn/beginner" element={<CompleteBeginnerPath />} />
              <Route path="/learn/heritage" element={<HeritageSpeakerPath />} />
              <Route path="/learn/academic" element={<AcademicLearnerPath />} />
              <Route path="/learn/lesson/:id" element={<LessonDetail />} />
              <Route path="/learn/vocabulary/:moduleId" element={<VocabularyModule />} />
              <Route path="/learn/greetings" element={<GreetingsLesson />} />
              <Route path="/culture" element={<CultureHighlights />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/research" element={<Research />} />
              <Route path="/community" element={<Community />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
