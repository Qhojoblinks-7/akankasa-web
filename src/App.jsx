import React from 'react';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProgressProvider } from './contexts/ProgressContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import featureFlags from './config/featureFlags';

const Homepage = React.lazy(() => import('./pages/Homepage'));
const LanguageLearning = React.lazy(() => import('./pages/LanguageLearning'));
const CompleteBeginnerPath = React.lazy(() => import('./pages/CompleteBeginnerPath'));
const HeritageSpeakerPath = React.lazy(() => import('./pages/HeritageSpeakerPath'));
const AcademicLearnerPath = React.lazy(() => import('./pages/AcademicLearnerPath'));
const CultureHighlights = React.lazy(() => import('./pages/CultureHighlights'));
const Dictionary = React.lazy(() => import('./pages/Dictionary'));
const Research = React.lazy(() => import('./pages/Research'));
const Accessibility = React.lazy(() => import('./pages/Accessibility'));
const CultureTraditions = React.lazy(() => import('./pages/CultureTraditions'));
const CultureHistory = React.lazy(() => import('./pages/CultureHistory'));
const CultureMusic = React.lazy(() => import('./pages/CultureMusic'));
const CultureFolklore = React.lazy(() => import('./pages/CultureFolklore'));
const LearnAlphabet = React.lazy(() => import('./pages/LearnAlphabet'));
const LearnGreetingsIndex = React.lazy(() => import('./pages/LearnGreetingsIndex'));
const LearnVocabularyIndex = React.lazy(() => import('./pages/LearnVocabularyIndex'));
const ResearchBeginner = React.lazy(() => import('./pages/ResearchBeginner'));
const Community = React.lazy(() => import('./pages/Community'));
const LessonDetail = React.lazy(() => import('./pages/LessonDetail'));
const VocabularyModule = React.lazy(() => import('./pages/VocabularyModule'));
const GreetingsLesson = React.lazy(() => import('./pages/GreetingsLesson'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const JoinDiscussion = React.lazy(() => import('./pages/JoinDiscussion'));
const DiscussionView = React.lazy(() => import('./pages/DiscussionView'));
const EventCreation = React.lazy(() => import('./pages/EventCreation'));
const EventsPage = React.lazy(() => import('./pages/EventsPage'));
const EventRegistration = React.lazy(() => import('./pages/EventRegistration'));
const CultureArts = React.lazy(() => import('./pages/CultureArts'));
const CultureDrumming = React.lazy(() => import('./pages/CultureDrumming'));
const CultureFolkStories = React.lazy(() => import('./pages/CultureFolkStories'));
const CultureResearchPapers = React.lazy(() => import('./pages/CultureResearchPapers'));
const FestivalPhotosPage = React.lazy(() => import('./pages/FestivalPhotosPage'));
const AdminModeration = React.lazy(() => import('./pages/AdminModeration.jsx'));
const TraditionDetail = React.lazy(() => import('./pages/TraditionDetail'));

function App() {
  return (
    <LanguageProvider>
      <ProgressProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="flex-1">
                <React.Suspense fallback={<div className="p-6">Loading…</div>}>
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
                      </>
                    )}
                    <Route path="/culture/traditions/:traditionId" element={<TraditionDetail />} />
                    <Route path="/learn/alphabet" element={<LearnAlphabet />} />
                    <Route path="/learn/greetings" element={<LearnGreetingsIndex />} />
                    <Route path="/learn/vocabulary" element={<LearnVocabularyIndex />} />
                    <Route path="/research/beginner" element={<ResearchBeginner />} />
                    <Route path="/community/discussion" element={<JoinDiscussion />} />
                    <Route path="/community/discussion/:id" element={<DiscussionView />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/accessibility" element={<Accessibility />} />
                    {featureFlags.showAdmin && <Route path="/admin/moderation" element={<AdminModeration />} />}
                  </Routes>
                </React.Suspense>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ProgressProvider>
    </LanguageProvider>
  );
}

export default App;
