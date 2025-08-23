import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import featureFlags from './config/featureFlags';

// Lazy load pages for better performance
const Homepage = lazy(() => import('./pages/Homepage'));
const LanguageLearning = lazy(() => import('./pages/LanguageLearning'));
const CompleteBeginnerPath = lazy(() => import('./pages/CompleteBeginnerPath'));
const HeritageSpeakerPath = lazy(() => import('./pages/HeritageSpeakerPath'));
const AcademicLearnerPath = lazy(() => import('./pages/AcademicLearnerPath'));
const CultureHighlights = lazy(() => import('./pages/CultureHighlights'));
const Dictionary = lazy(() => import('./pages/Dictionary'));
const Research = lazy(() => import('./pages/Research'));
const Accessibility = lazy(() => import('./pages/Accessibility'));
const CultureTraditions = lazy(() => import('./pages/CultureTraditions'));
const CultureHistory = lazy(() => import('./pages/CultureHistory'));
const HistoryDetail = lazy(() => import('./pages/HistoryDetail'));
const TraditionsDetail = lazy(() => import('./pages/TraditionsDetail'));
const CultureMusic = lazy(() => import('./pages/CultureMusic'));
const CultureFolklore = lazy(() => import('./pages/CultureFolklore'));
const LearnAlphabet = lazy(() => import('./pages/LearnAlphabet'));
const LearnGreetingsIndex = lazy(() => import('./pages/LearnGreetingsIndex'));
const LearnVocabularyIndex = lazy(() => import('./pages/LearnVocabularyIndex'));
const ResearchBeginner = lazy(() => import('./pages/ResearchBeginner'));
const Community = lazy(() => import('./pages/Community'));
const LessonDetail = lazy(() => import('./pages/LessonDetail'));
const VocabularyModule = lazy(() => import('./pages/VocabularyModule'));
const GreetingsLesson = lazy(() => import('./pages/GreetingsLesson'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const JoinDiscussion = lazy(() => import('./pages/JoinDiscussion'));
const DiscussionView = lazy(() => import('./pages/DiscussionView'));
const EventCreation = lazy(() => import('./pages/EventCreation'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const EventRegistration = lazy(() => import('./pages/EventRegistration'));
const CultureArts = lazy(() => import('./pages/CultureArts'));
const CultureDrumming = lazy(() => import('./pages/CultureDrumming'));
const CultureFolkStories = lazy(() => import('./pages/CultureFolkStories'));
const CultureResearchPapers = lazy(() => import('./pages/CultureResearchPapers'));
const FestivalPhotosPage = lazy(() => import('./pages/FestivalPhotosPage'));

// Loading component for better UX
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
      <p className="text-gray-600 text-sm sm:text-base">Loading Akan Kasa...</p>
    </div>
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
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
                    <Route path="/culture/traditions/:id" element={<TraditionsDetail />} />
                    <Route path="/culture/history" element={<CultureHistory />} />
                    <Route path="/culture/history/:id" element={<HistoryDetail />} />
                    <Route path="/culture/arts" element={<CultureArts />} />
                    <Route path="/culture/music" element={<CultureMusic />} />
                    <Route path="/culture/folklore" element={<CultureFolklore />} />
                    <Route path="/culture/drumming" element={<CultureDrumming />} />
                    <Route path="/culture/folk-stories" element={<CultureFolkStories />} />
                    <Route path="/culture/research-papers" element={<CultureResearchPapers />} />
                    <Route path="/festival-photos" element={<FestivalPhotosPage />} />
                  </>
                )}
                <Route path="/learn/alphabet" element={<LearnAlphabet />} />
                <Route path="/learn/greetings" element={<LearnGreetingsIndex />} />
                <Route path="/learn/vocabulary" element={<LearnVocabularyIndex />} />
                <Route path="/research/beginner" element={<ResearchBeginner />} />
                <Route path="/community/discussion" element={<JoinDiscussion />} />
                <Route path="/community/discussion/:id" element={<DiscussionView />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/accessibility" element={<Accessibility />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
