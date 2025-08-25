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
import Accessibility from './pages/Accessibility';
import CultureTraditions from './pages/CultureTraditions';
import CultureHistory from './pages/CultureHistory';
import CultureMusic from './pages/CultureMusic';
import CultureFolklore from './pages/CultureFolklore';
import LearnAlphabet from './pages/LearnAlphabet';
import LearnGreetingsIndex from './pages/LearnGreetingsIndex';
import LearnVocabularyIndex from './pages/LearnVocabularyIndex';
import ResearchBeginner from './pages/ResearchBeginner';
import Community from './pages/Community';
import LessonDetail from './pages/LessonDetail';
import VocabularyModule from './pages/VocabularyModule';
import GreetingsLesson from './pages/GreetingsLesson';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import JoinDiscussion from './pages/JoinDiscussion';
import DiscussionView from './pages/DiscussionView';
import EventCreation from './pages/EventCreation';
import EventsPage from './pages/EventsPage';
import EventRegistration from './pages/EventRegistration';
import CultureArts from './pages/CultureArts';
import CultureDrumming from './pages/CultureDrumming';
import CultureFolkStories from './pages/CultureFolkStories';
import CultureResearchPapers from './pages/CultureResearchPapers';
import FestivalPhotosPage from './pages/FestivalPhotosPage';
import CultureDetail from './pages/CultureDetail';
import featureFlags from './config/featureFlags';
import UserProfile from './pages/UserProfile';
import Contribute from './pages/Contribute';
import ResearchNewDiscussion from './pages/ResearchNewDiscussion';
import ResearchProposeProject from './pages/ResearchProposeProject';
import CommunityNewPost from './pages/CommunityNewPost';
import CommunityJoin from './pages/CommunityJoin';
import CommunityEvents from './pages/CommunityEvents';
import CommunityRegisterEvent from './pages/CommunityRegisterEvent';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FestivalGallery from './pages/FestivalGallery';

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
              {featureFlags.showResearch && <Route path="/research" element={<Research />} />}
              <Route path="/community" element={<Community />} />
              <Route path="/community/events" element={<EventsPage />} />
              <Route path="/community/events/:eventId/register" element={<EventRegistration />} />
              <Route path="/community/events/new" element={<EventCreation />} />
              {featureFlags.showAdvancedCulturePages && (
                <>
                  <Route path="/culture/traditions" element={<CultureTraditions />} />
                  <Route path="/culture/history" element={<CultureHistory />} />
                  <Route path="/culture/arts" element={<CultureArts />} />
                  <Route path="/culture/music" element={<CultureMusic />} />
                  <Route path="/culture/folklore" element={<CultureFolklore />} />
                  <Route path="/culture/drumming" element={<CultureDrumming />} />
                  <Route path="/culture/folk-stories" element={<CultureFolkStories />} />
                  <Route path="/culture/research-papers" element={<CultureResearchPapers />} />
                  <Route path="/festival-photos" element={<FestivalPhotosPage />} />
                  <Route path="/culture/:section/:id" element={<CultureDetail />} />
                </>
              )}
              <Route path="/learn/alphabet" element={<LearnAlphabet />} />
              <Route path="/learn/greetings" element={<LearnGreetingsIndex />} />
              <Route path="/learn/vocabulary" element={<LearnVocabularyIndex />} />
              <Route path="/research/beginner" element={<ResearchBeginner />} />
              <Route path="/community/discussion" element={<JoinDiscussion />} />
              <Route path="/community/discussion/:id" element={<DiscussionView />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/accessibility" element={<Accessibility />} />
              
              {/* New routes for unconnected pages */}
              <Route path="/profile/:id" element={<UserProfile />} />
              <Route path="/contribute" element={<Contribute />} />
              <Route path="/community/join" element={<CommunityJoin />} />
              <Route path="/community/new-post" element={<CommunityNewPost />} />
              <Route path="/community/events/list" element={<CommunityEvents />} />
              <Route path="/community/events/register/:eventId" element={<CommunityRegisterEvent />} />
              <Route path="/festival-gallery" element={<FestivalGallery />} />
              
              {/* Research routes (conditionally shown based on feature flag) */}
              {featureFlags.showResearch && (
                <>
                  <Route path="/research/new-discussion" element={<ResearchNewDiscussion />} />
                  <Route path="/research/propose-project" element={<ResearchProposeProject />} />
                </>
              )}
              
              {/* Alternative routes for consistency */}
              <Route path="/privacy-alt" element={<Privacy />} />
              <Route path="/terms-alt" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
