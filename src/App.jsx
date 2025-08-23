import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'radux';
import { store } from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import featureFlags from './config/featureFlags';

// Lazy load all pages for better performance
const Homepage = lazy(() => import('./pages/Homepage'));
const LanguageLearning = lazy(() => import('./pages/LanguageLearning'));
const CultureHighlights = lazy(() => import('./pages/CultureHighlights'));
const Dictionary = lazy(() => import('./pages/Dictionary'));
const Community = lazy(() => import('./pages/Community'));
const Research = lazy(() => import('./pages/Research'));
const HistoryDetail = lazy(() => import('./pages/HistoryDetail'));
const TraditionsDetail = lazy(() => import('./pages/TraditionsDetail'));
const VocabularyModule = lazy(() => import('./pages/VocabularyModule'));
const LessonDetail = lazy(() => import('./pages/LessonDetail'));
const GreetingsLesson = lazy(() => import('./pages/GreetingsLesson'));
const CompleteBeginnerPath = lazy(() => import('./pages/CompleteBeginnerPath'));
const HeritageSpeakerPath = lazy(() => import('./pages/HeritageSpeakerPath'));
const AcademicLearnerPath = lazy(() => import('./pages/AcademicLearnerPath'));
const FestivalGallery = lazy(() => import('./pages/FestivalGallery'));
const CultureDrumming = lazy(() => import('./pages/CultureDrumming'));
const CultureFolkStories = lazy(() => import('./pages/CultureFolkStories'));
const CultureResearchPapers = lazy(() => import('./pages/CultureResearchPapers'));
const DiscussionView = lazy(() => import('./pages/DiscussionView'));
const EventCreation = lazy(() => import('./pages/EventCreation'));
const EventRegistration = lazy(() => import('./pages/EventRegistration'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Accessibility = lazy(() => import('./pages/Accessibility'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading AkanKasa...</p>
    </div>
  </div>
);

function AppContent() {
          useEffect(() => {
          // Initialize store data when app loads
          store.dispatch({ type: 'culture/loadCulturalData' });
          store.dispatch({ type: 'language/loadTranslations' });
          store.dispatch({ type: 'ui/resetUI' });
          store.dispatch({ type: 'user/resetUser' });
        }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Home and Main Pages */}
              <Route path="/" element={<Homepage />} />
              <Route path="/learn" element={<LanguageLearning />} />
              <Route path="/culture" element={<CultureHighlights />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/community" element={<Community />} />
              <Route path="/research" element={<Research />} />
              
              {/* Learning Paths */}
              <Route path="/learn/beginner" element={<CompleteBeginnerPath />} />
              <Route path="/learn/heritage" element={<HeritageSpeakerPath />} />
              <Route path="/learn/academic" element={<AcademicLearnerPath />} />
              
              {/* Language Learning */}
              <Route path="/learn/alphabet" element={<VocabularyModule />} />
              <Route path="/learn/greetings" element={<GreetingsLesson />} />
              <Route path="/learn/vocabulary/:moduleId" element={<VocabularyModule />} />
              <Route path="/learn/lesson/:lessonId" element={<LessonDetail />} />
              
              {/* Cultural Content */}
              <Route path="/culture/history/:id" element={<HistoryDetail />} />
              <Route path="/culture/traditions/:id" element={<TraditionsDetail />} />
              <Route path="/culture/drumming" element={<CultureDrumming />} />
              <Route path="/culture/folk-stories" element={<CultureFolkStories />} />
              <Route path="/culture/research-papers" element={<CultureResearchPapers />} />
              <Route path="/festival-photos" element={<FestivalGallery />} />
              
              {/* Community Features */}
              <Route path="/community/discussion/:id" element={<DiscussionView />} />
              <Route path="/community/events/create" element={<EventCreation />} />
              <Route path="/community/events/register/:eventId" element={<EventRegistration />} />
              <Route path="/community/events" element={<EventsPage />} />
              
              {/* User and Settings */}
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/accessibility" element={<Accessibility />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
