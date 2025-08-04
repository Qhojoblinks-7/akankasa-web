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
import PlaceholderPage from './pages/PlaceholderPage';
import LearnGreetings from './pages/LearnGreetings';
import CultureArts from './pages/CultureArts';
import CommunityEvents from './pages/CommunityEvents';
import UserProfile from './pages/UserProfile';
import Contribute from './pages/Contribute';

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
            {/* Placeholder routes for demo */}
            <Route path="/learn/greetings" element={<LearnGreetings />} />
            <Route path="/culture/arts" element={<CultureArts />} />
            <Route path="/community/events" element={<CommunityEvents />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
            <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
            <Route path="/accessibility" element={<PlaceholderPage title="Accessibility" />} />
            <Route path="/community/new-post" element={<PlaceholderPage title="New Forum Post" />} />
            <Route path="/community/register-event" element={<PlaceholderPage title="Register for Event" />} />
            <Route path="/community/join" element={<PlaceholderPage title="Join Community" />} />
            <Route path="/research/propose-project" element={<PlaceholderPage title="Propose Research Project" />} />
            <Route path="/research/new-discussion" element={<PlaceholderPage title="New Research Discussion" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
