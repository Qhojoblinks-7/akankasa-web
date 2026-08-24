import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { UserProgressProvider } from './contexts/UserProgressContext';
import { AuthProvider } from './contexts/AuthContext';
import SEO from './components/SEO';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SkipLink from './components/SkipLink';
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
import CommunityHub from './pages/CommunityHub';
import LessonDetail from './pages/LessonDetail';
import VocabularyModule from './pages/VocabularyModule';
import GreetingsLesson from './pages/GreetingsLesson';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import EventCreation from './pages/EventCreation';
import EventsPage from './pages/EventsPage';
import EventRegistration from './pages/EventRegistration';
import CultureArts from './pages/CultureArts';
import CultureDrumming from './pages/CultureDrumming';
import CultureFolkStories from './pages/CultureFolkStories';
import CultureResearchPapers from './pages/CultureResearchPapers';
import FestivalPhotosPage from './pages/FestivalPhotosPage';
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
import Login from './pages/Login';
import Register from './pages/Register';
import Phrasebook from './pages/Phrasebook';
import AdinkraSymbols from './pages/AdinkraSymbols';
import SuggestWord from './pages/SuggestWord';
import CultureDetailPage from './pages/CultureDetailPage';
import UserProgressPage from './pages/UserProgressPage';
import MyProfile from './pages/MyProfile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminDictionary from './pages/admin/AdminDictionary';
import AdminDictionaryEntry from './pages/AdminDictionaryEntry';
import AdminLessons from './pages/admin/AdminLessons';
import AdminVocabulary from './pages/admin/AdminVocabulary';
import AdminGreetings from './pages/admin/AdminGreetings';
import AdminArticles from './pages/admin/AdminArticles';
import AdminDocuments from './pages/admin/AdminDocuments';
import AdminMediaLibrary from './pages/admin/AdminMediaLibrary';
import AdminEvents from './pages/admin/AdminEvents';
import AdminLegal from './pages/admin/AdminLegal';
import AdminHomepage from './pages/admin/AdminHomepage';
import AdminAlphabets from './pages/admin/AdminAlphabets';
import AdminFolkStories from './pages/admin/AdminFolkStories';
import AdminDrumming from './pages/admin/AdminDrumming';
import AdminFestivalPhotos from './pages/admin/AdminFestivalPhotos';
import AdminResearchPapers from './pages/admin/AdminResearchPapers';
import AdminApprovalQueue from './pages/admin/AdminApprovalQueue';
import PublicContributions from './pages/PublicContributions';
import AdminModerationQueue from './pages/AdminModerationQueue';
import AdminForumModeration from './pages/AdminForumModeration';
import AdminSuggestions from './pages/AdminSuggestions';
import AdminUsers from './pages/AdminUsers';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <UserProgressProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <SkipLink />
              <Navbar />
              <main id="main-content" className="flex-1">
                <Routes>
                  <Route path="/" element={
                    <>
                      <SEO
                        title="Preserve & Learn Akan Language & Culture"
                        description="Interactive lessons, dictionary, and community for Akan language learners. Explore greetings, vocabulary, traditions, and cultural heritage."
                        jsonLd={{
                          "@context": "https://schema.org",
                          "@type": "WebSite",
                          "name": "Akankasa",
                          "url": "https://akankasa.com",
                          "description": "Preserve & Learn Akan Language & Culture",
                          "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://akankasa.com/dictionary?q={search_term_string}",
                            "query-input": "required name=search_term_string"
                          }
                        }}
                      />
                      <Homepage />
                    </>
                  } />
                  <Route path="/learn" element={
                    <>
                      <SEO title="Learn Akan Language" description="Comprehensive Akan language learning paths for beginners, heritage speakers, and academic learners." />
                      <LanguageLearning />
                    </>
                  } />
                  <Route path="/learn/beginner" element={
                    <>
                      <SEO title="Beginner Akan Course" description="Start your Akan language journey with our complete beginner course covering alphabet, greetings, and basic vocabulary." />
                      <CompleteBeginnerPath />
                    </>
                  } />
                  <Route path="/learn/heritage" element={
                    <>
                      <SEO title="Heritage Speaker Path" description="Reconnect with Akan language and culture. Resources for heritage speakers looking to improve their skills." />
                      <HeritageSpeakerPath />
                    </>
                  } />
                  <Route path="/learn/academic" element={
                    <>
                      <SEO title="Academic Akan Studies" description="Advanced linguistic resources, research papers, and academic materials for Akan language studies." />
                      <AcademicLearnerPath />
                    </>
                  } />
                  <Route path="/learn/lesson/:id" element={
                    <>
                      <SEO title="Akan Lesson" description="Interactive Akan language lesson with audio pronunciation, examples, and cultural context." />
                      <LessonDetail />
                    </>
                  } />
                  <Route path="/learn/vocabulary/:moduleId" element={
                    <>
                      <SEO title="Vocabulary Module" description="Master Akan vocabulary with themed modules, flashcards, and pronunciation guides." />
                      <VocabularyModule />
                    </>
                  } />
                  <Route path="/learn/greetings" element={
                    <>
                      <SEO title="Akan Greetings" description="Learn essential Akan greetings and phrases for different times of day and social contexts." />
                      <GreetingsLesson />
                    </>
                  } />
                  <Route path="/culture" element={
                    <>
                      <SEO title="Akan Culture & Heritage" description="Explore Akan culture, traditions, history, music, folklore, and arts. Discover the rich heritage of the Akan people." />
                      <CultureHighlights />
                    </>
                  } />
                  <Route path="/dictionary" element={
                    <>
                      <SEO title="Akan Dictionary" description="Search the Akan-English dictionary with audio pronunciation, dialect support, and favorites." />
                      <Dictionary />
                    </>
                  } />
                  {featureFlags.showResearch && <Route path="/research" element={
                    <>
                      <SEO title="Akan Research Hub" description="Academic research, discussions, and collaborative projects on Akan language and culture." />
                      <Research />
                    </>
                  } />}
                  <Route path="/community" element={
                    <>
                      <SEO title="Akan Community" description="Join the Akan language learning community. Participate in discussions, events, and connect with fellow learners." />
                      <Community />
                    </>
                  } />
                  <Route path="/community/members" element={
                    <>
                      <SEO title="Community Members" description="Meet the members of the Akan language learning community." />
                      <Community initialTab="members" />
                    </>
                  } />
                  <Route path="/community/events" element={
                    <>
                      <SEO title="Community Events" description="Discover and register for Akan language exchange events, workshops, and cultural meetups." />
                      <EventsPage />
                    </>
                  } />
                  <Route path="/community/events/:eventId/register" element={
                    <>
                      <SEO title="Event Registration" description="Register for Akan community events and language exchanges." />
                      <EventRegistration />
                    </>
                  } />
                  <Route path="/community/events/new" element={
                    <ProtectedRoute><EventCreation /></ProtectedRoute>
                  } />
                  {featureFlags.showAdvancedCulturePages && (
                    <>
                      <Route path="/culture/traditions" element={
                        <>
                          <SEO title="Akan Traditions" description="Explore Akan cultural traditions, customs, and practices passed down through generations." />
                          <CultureTraditions />
                        </>
                      } />
                      <Route path="/culture/history" element={
                        <>
                          <SEO title="Akan History" description="Learn about the rich history of the Akan people, from ancient kingdoms to modern times." />
                          <CultureHistory />
                        </>
                      } />
                      <Route path="/culture/arts" element={
                        <>
                          <SEO title="Akan Arts & Crafts" description="Discover traditional Akan arts, crafts, and artistic expressions including kente weaving and adinkra symbols." />
                          <CultureArts />
                        </>
                      } />
                      <Route path="/culture/music" element={
                        <>
                          <SEO title="Akan Music & Dance" description="Experience traditional Akan music, drumming, and dance forms that define Akan cultural expression." />
                          <CultureMusic />
                        </>
                      } />
                      <Route path="/culture/folklore" element={
                        <>
                          <SEO title="Akan Folklore" description="Traditional Akan folklore, myths, legends, and oral traditions." />
                          <CultureFolklore />
                        </>
                      } />
                      <Route path="/culture/drumming" element={
                        <>
                          <SEO title="Traditional Akan Drumming" description="Master the rhythms and techniques of traditional Akan drums. Learn from expert instructors." />
                          <CultureDrumming />
                        </>
                      } />
                      <Route path="/culture/folk-stories" element={
                        <>
                          <SEO title="Akan Folk Stories" description="Traditional Akan folk stories, proverbs, and oral traditions passed down through generations." />
                          <CultureFolkStories />
                        </>
                      } />
                      <Route path="/culture/research-papers" element={
                        <>
                          <SEO title="Akan Research Papers" description="Explore academic studies, scholarly articles, and research papers on Akan culture and traditions." />
                          <CultureResearchPapers />
                        </>
                      } />
                      <Route path="/festival-photos" element={
                        <>
                          <SEO title="Akan Festival Photos" description="Browse photos from Akan cultural festivals, ceremonies, and celebrations." />
                          <FestivalPhotosPage />
                        </>
                      } />
                    </>
                  )}
                  <Route path="/learn/alphabet" element={
                    <>
                      <SEO title="Akan Alphabet" description="Learn the Akan alphabet with audio pronunciation guides for each letter." />
                      <LearnAlphabet />
                    </>
                  } />
                  <Route path="/learn/greetings" element={
                    <>
                      <SEO title="Akan Greetings" description="Master essential Akan greetings for different times of day and social situations." />
                      <LearnGreetingsIndex />
                    </>
                  } />
                  <Route path="/learn/vocabulary" element={
                    <>
                      <SEO title="Akan Vocabulary" description="Build your Akan vocabulary with themed word collections and interactive exercises." />
                      <LearnVocabularyIndex />
                    </>
                  } />
                  <Route path="/research/beginner" element={
                    <>
                      <SEO title="Beginner Research Guide" description="Getting started with Akan language research: resources, methodologies, and foundational texts." />
                      <ResearchBeginner />
                    </>
                  } />
                  <Route path="/community/discussion" element={
                    <>
                      <SEO title="Community Discussions" description="Join discussions about Akan language, culture, and learning with community members." />
                      <CommunityHub />
                    </>
                  } />
                  <Route path="/community/discussion/:id" element={
                    <>
                      <SEO title="Discussion Thread" description="View and participate in this community discussion about Akan language and culture." />
                      <CommunityHub />
                    </>
                  } />
                  <Route path="/privacy" element={
                    <>
                      <SEO title="Privacy Policy" description="Privacy policy for Akankasa - Akan language learning platform." noindex />
                      <PrivacyPolicy />
                    </>
                  } />
                  <Route path="/privacy-policy" element={
                    <>
                      <SEO title="Privacy Policy" description="Privacy policy for Akankasa - Akan language learning platform." noindex />
                      <PrivacyPolicy />
                    </>
                  } />
                  <Route path="/terms" element={
                    <>
                      <SEO title="Terms of Service" description="Terms of service for Akankasa - Akan language learning platform." noindex />
                      <TermsOfService />
                    </>
                  } />
                  <Route path="/terms-of-service" element={
                    <>
                      <SEO title="Terms of Service" description="Terms of service for Akankasa - Akan language learning platform." noindex />
                      <TermsOfService />
                    </>
                  } />
                  <Route path="/accessibility" element={
                    <>
                      <SEO title="Accessibility" description="Accessibility statement for Akankasa - Akan language learning platform." noindex />
                      <Accessibility />
                    </>
                  } />
                  
                  {/* Auth & user pages */}
                  <Route path="/login" element={
                    <>
                      <SEO title="Sign In" description="Sign in to your Akankasa account to track progress and participate in the community." noindex />
                      <Login />
                    </>
                  } />
                  <Route path="/register" element={
                    <>
                      <SEO title="Create Account" description="Create a free Akankasa account to start learning Akan language and culture." noindex />
                      <Register />
                    </>
                  } />
                  <Route path="/phrasebook" element={
                    <>
                      <SEO title="Akan Phrasebook" description="Essential Akan phrases for travel, business, and everyday conversations." />
                      <Phrasebook />
                    </>
                  } />
                  <Route path="/adinkra-symbols" element={
                    <>
                      <SEO title="Adinkra Symbols" description="Learn about Adinkra symbols, their meanings, and cultural significance in Akan tradition." />
                      <AdinkraSymbols />
                    </>
                  } />
                  <Route path="/suggest-word" element={
                    <>
                      <SEO title="Suggest a Word" description="Suggest a new word for the Akan dictionary." noindex />
                      <SuggestWord />
                    </>
                  } />
                  <Route path="/culture/:id" element={
                    <>
                      <SEO title="Cultural Article" description="Learn about Akan culture, traditions, and heritage." />
                      <CultureDetailPage />
                    </>
                  } />
                  <Route path="/progress" element={
                    <>
                      <SEO title="My Progress" description="Track your Akan language learning progress and achievements." noindex />
                      <UserProgressPage />
                    </>
                  } />
                  
                  {/* New routes for unconnected pages */}
                  <Route path="/profile/:id" element={
                    <>
                      <SEO title="User Profile" description="View this user's Akan language learning profile and contributions." noindex />
                      <UserProfile />
                    </>
                  } />
                  <Route path="/profile" element={
                    <>
                      <SEO title="My Profile" description="Manage your Akankasa profile and learning preferences." noindex />
                      <MyProfile />
                    </>
                  } />
                  <Route path="/contribute" element={
                    <ProtectedRoute>
                      <>
                        <SEO title="Contribute" description="Contribute content to the Akan language and culture archive." noindex />
                        <Contribute />
                      </>
                    </ProtectedRoute>
                  } />
                  <Route path="/contribute-content" element={
                    <ProtectedRoute><PublicContributions /></ProtectedRoute>
                  } />
                  <Route path="/community/join" element={
                    <>
                      <SEO title="Join Community" description="Join the Akankasa community of Akan language learners and enthusiasts." noindex />
                      <CommunityJoin />
                    </>
                  } />
                  <Route path="/community/new-post" element={
                    <ProtectedRoute>
                      <>
                        <SEO title="New Post" description="Create a new post in the Akan community forum." noindex />
                        <CommunityNewPost />
                      </>
                    </ProtectedRoute>
                  } />
                  <Route path="/community/events/list" element={
                    <>
                      <SEO title="Community Events" description="Browse all upcoming Akan language and culture events." />
                      <CommunityEvents />
                    </>
                  } />
                  <Route path="/community/events/register/:eventId" element={
                    <>
                      <SEO title="Register for Event" description="Register for this Akan community event." noindex />
                      <CommunityRegisterEvent />
                    </>
                  } />
                  <Route path="/festival-gallery" element={
                    <>
                      <SEO title="Festival Gallery" description="Browse photos from Akan cultural festivals and celebrations." />
                      <FestivalGallery />
                    </>
                  } />
                  
                  {/* Research routes (conditionally shown based on feature flag) */}
                  {featureFlags.showResearch && (
                    <>
                      <Route path="/research/new-discussion" element={
                        <ProtectedRoute>
                          <>
                            <SEO title="New Discussion" description="Start a new research discussion about Akan language or culture." noindex />
                            <ResearchNewDiscussion />
                          </>
                        </ProtectedRoute>
                      } />
                      <Route path="/research/propose-project" element={
                        <ProtectedRoute>
                          <>
                            <SEO title="Propose Project" description="Propose a new research project on Akan language or culture." noindex />
                            <ResearchProposeProject />
                          </>
                        </ProtectedRoute>
                      } />
                    </>
                  )}
                  
                  {/* Admin routes */}
                  <Route path="/admin/login" element={
                    <>
                      <SEO title="Admin Login" description="Admin login for Akankasa." noindex />
                      <AdminLogin />
                    </>
                  } />
                  <Route path="/admin/dashboard" element={
                    <>
                      <SEO title="Admin Dashboard" description="Admin dashboard for managing Akankasa content." noindex />
                      <AdminDashboard />
                    </>
                  } />
                  <Route path="/admin/dictionary" element={
                    <>
                      <SEO title="Manage Dictionary" description="Admin interface for managing the Akan dictionary." noindex />
                      <AdminDictionary />
                    </>
                  } />
                  <Route path="/admin/dictionary/new" element={
                    <>
                      <SEO title="New Dictionary Entry" description="Create a new dictionary entry." noindex />
                      <AdminDictionaryEntry />
                    </>
                  } />
                  <Route path="/admin/dictionary/:id" element={
                    <>
                      <SEO title="Edit Dictionary Entry" description="Edit dictionary entry." noindex />
                      <AdminDictionaryEntry />
                    </>
                  } />
                  <Route path="/admin/lessons" element={
                    <>
                      <SEO title="Manage Lessons" description="Admin interface for managing Akan language lessons." noindex />
                      <AdminLessons />
                    </>
                  } />
                  <Route path="/admin/vocabulary" element={
                    <>
                      <SEO title="Manage Vocabulary" description="Admin interface for managing vocabulary modules." noindex />
                      <AdminVocabulary />
                    </>
                  } />
                  <Route path="/admin/greetings" element={
                    <>
                      <SEO title="Manage Greetings" description="Admin interface for managing greetings and phrases." noindex />
                      <AdminGreetings />
                    </>
                  } />
                  <Route path="/admin/articles" element={
                    <>
                      <SEO title="Manage Articles" description="Admin interface for managing cultural articles." noindex />
                      <AdminArticles />
                    </>
                  } />
                  <Route path="/admin/documents" element={
                    <>
                      <SEO title="Manage Documents" description="Admin interface for managing documents and research papers." noindex />
                      <AdminDocuments />
                    </>
                  } />
                  <Route path="/admin/media" element={
                    <>
                      <SEO title="Media Library" description="Admin interface for managing media assets." noindex />
                      <AdminMediaLibrary />
                    </>
                  } />
                  <Route path="/admin/events" element={
                    <>
                      <SEO title="Manage Events" description="Admin interface for managing community events." noindex />
                      <AdminEvents />
                    </>
                  } />
                  <Route path="/admin/legal" element={
                    <>
                      <SEO title="Legal Pages" description="Admin interface for managing legal pages." noindex />
                      <AdminLegal />
                    </>
                  } />
                  <Route path="/admin/homepage" element={
                    <>
                      <SEO title="Manage Homepage" description="Admin interface for managing homepage content." noindex />
                      <AdminHomepage />
                    </>
                  } />
                  <Route path="/admin/alphabets" element={
                    <>
                      <SEO title="Manage Alphabets" description="Admin interface for managing alphabet content." noindex />
                      <AdminAlphabets />
                    </>
                  } />
                  <Route path="/admin/folk-stories" element={
                    <>
                      <SEO title="Manage Folk Stories" description="Admin interface for managing folk stories." noindex />
                      <AdminFolkStories />
                    </>
                  } />
                  <Route path="/admin/drumming" element={
                    <>
                      <SEO title="Manage Drumming" description="Admin interface for managing drumming content." noindex />
                      <AdminDrumming />
                    </>
                  } />
                  <Route path="/admin/festival-photos" element={
                    <>
                      <SEO title="Manage Festival Photos" description="Admin interface for managing festival photos." noindex />
                      <AdminFestivalPhotos />
                    </>
                  } />
                  <Route path="/admin/research-papers" element={
                    <>
                      <SEO title="Manage Research Papers" description="Admin interface for managing research papers." noindex />
                      <AdminResearchPapers />
                    </>
                  } />
                  <Route path="/admin/approval-queue" element={
                    <>
                      <SEO title="Approval Queue" description="Review and approve community contributions." noindex />
                      <AdminApprovalQueue />
                    </>
                  } />
                  <Route path="/admin/moderation" element={
                    <>
                      <SEO title="Moderation Queue" description="Moderate community content and discussions." noindex />
                      <AdminModerationQueue />
                    </>
                  } />
                  <Route path="/admin/forum" element={
                    <>
                      <SEO title="Forum Moderation" description="Moderate community forum posts and comments." noindex />
                      <AdminForumModeration />
                    </>
                  } />
                  <Route path="/admin/suggestions" element={
                    <>
                      <SEO title="Dictionary Suggestions" description="Review and manage dictionary word suggestions." noindex />
                      <AdminSuggestions />
                    </>
                  } />
                  <Route path="/admin/users" element={
                    <>
                      <SEO title="Manage Users" description="Admin interface for managing user accounts." noindex />
                      <AdminUsers />
                    </>
                  } />
                  
                  {/* Alternative routes for consistency */}
                  <Route path="/privacy-alt" element={
                    <>
                      <SEO title="Privacy Policy" description="Privacy policy for Akankasa." noindex />
                      <Privacy />
                    </>
                  } />
                  <Route path="/terms-alt" element={
                    <>
                      <SEO title="Terms of Service" description="Terms of service for Akankasa." noindex />
                      <Terms />
                    </>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </UserProgressProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
