import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Homepage from './pages/Homepage';
import LanguageLearning from './pages/LanguageLearning';
import CultureHighlights from './pages/CultureHighlights';
import Dictionary from './pages/Dictionary';
import Research from './pages/Research';
import Community from './pages/Community';
import LessonDetail from './pages/LessonDetail';
import VocabularyModule from './pages/VocabularyModule';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/learn" element={<LanguageLearning />} />
            <Route path="/learn/lesson/:id" element={<LessonDetail />} />
            <Route path="/learn/vocabulary/:moduleId" element={<VocabularyModule />} />
            <Route path="/culture" element={<CultureHighlights />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/research" element={<Research />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
