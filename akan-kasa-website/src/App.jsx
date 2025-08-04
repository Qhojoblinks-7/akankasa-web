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
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Accessibility from './pages/Accessibility';
import CommunityNewPost from './pages/CommunityNewPost';
import CommunityRegisterEvent from './pages/CommunityRegisterEvent';
import CommunityJoin from './pages/CommunityJoin';
import ResearchProposeProject from './pages/ResearchProposeProject';
import ResearchNewDiscussion from './pages/ResearchNewDiscussion';

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
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/community/new-post" element={<CommunityNewPost />} />
            <Route path="/community/register-event" element={<CommunityRegisterEvent />} />
            <Route path="/community/join" element={<CommunityJoin />} />
            <Route path="/research/propose-project" element={<ResearchProposeProject />} />
            <Route path="/research/new-discussion" element={<ResearchNewDiscussion />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
