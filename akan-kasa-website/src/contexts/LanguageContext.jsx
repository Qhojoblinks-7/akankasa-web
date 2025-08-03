import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data
const translations = {
  en: {
    // Navigation
    home: 'Home',
    learnAkan: 'Learn Akan',
    culture: 'Culture',
    dictionary: 'Dictionary',
    research: 'Research',
    community: 'Community',
    
    // Homepage
    welcomeTitle: 'Akwaaba to Akan Culture',
    welcomeDescription: 'Discover the rich heritage of the Akan people through language learning, cultural exploration, and community engagement',
    startLearning: 'Start Learning',
    exploreCulture: 'Explore Culture',
    
    // Quick Start Section
    quickStartTitle: 'Start Your Akan Journey',
    quickStartDescription: 'Choose your path to explore the beautiful Akan language and culture',
    learnLanguage: 'Learn Language',
    learnLanguageDesc: 'Interactive lessons, alphabet, and vocabulary',
    exploreKulture: 'Explore Culture',
    exploreCultureDesc: 'Traditions, history, arts, and customs',
    useDictionary: 'Use Dictionary',
    useDictionaryDesc: 'Comprehensive Akan-English dictionary',
    researchHub: 'Research Hub',
    researchHubDesc: 'Academic resources and research tools',
    getStarted: 'Get Started',
    
    // Featured Content
    featuredContentTitle: 'Featured Content',
    featuredContentDesc: 'Discover the most popular and engaging content on our platform',
    basicGreetings: 'Learn Basic Greetings',
    basicGreetingsDesc: 'Start your Akan journey with essential daily greetings',
    adinkraSymbols: 'Adinkra Symbols',
    adinkraSymbolsDesc: 'Discover the wisdom embedded in traditional Akan symbols',
    akanDictionary: 'Akan Dictionary',
    akanDictionaryDesc: 'Explore our comprehensive bilingual dictionary',
    culturalEvents: 'Cultural Events',
    culturalEventsDesc: 'Join upcoming Akan cultural celebrations',
    
    // Stats Section
    growingTogetherTitle: 'Growing Together',
    growingTogetherDesc: 'Join thousands of learners preserving and celebrating Akan heritage',
    vocabularyWords: 'Vocabulary Words',
    culturalArticles: 'Cultural Articles',
    interactiveLessons: 'Interactive Lessons',
    communityMembers: 'Community Members',
    
    // Call to Action
    readyToBegin: 'Ready to Begin Your Akan Journey?',
    readyToBeginDesc: 'Join our community of learners, researchers, and culture enthusiasts',
    startLearningNow: 'Start Learning Now',
    joinCommunity: 'Join Community',
    
    // Footer
    quickLinks: 'Quick Links',
    culturalResources: 'Cultural Resources',
    learningResources: 'Learning Resources',
    languageLearning: 'Language Learning',
    cultureHighlights: 'Culture Highlights',
    emailUs: 'Email Us',
    callUs: 'Call Us',
    location: 'Location',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    accessibility: 'Accessibility',
    sankofaQuote: '"Sankofa" - Go back and get it'
  },
  tw: {
    // Navigation
    home: 'Fie',
    learnAkan: 'Sua Akan',
    culture: 'Amammere',
    dictionary: 'Nsɛmfua',
    research: 'Nhwehwɛmu',
    community: 'Mpɔtam',
    
    // Homepage
    welcomeTitle: 'Akwaaba Akan Amammere mu',
    welcomeDescription: 'Hunu Akanfoɔ abakɔsɛm a emu dɔ denam kasa sua, amammere nhwehwɛmu, ne mpɔtam dwumadie so',
    startLearning: 'Hyɛ Adesua ase',
    exploreCulture: 'Hwehwɛ Amammere',
    
    // Quick Start Section
    quickStartTitle: 'Hyɛ wo Akan Akwantuo ase',
    quickStartDescription: 'Paw ɔkwan a wobɛfa so ahwehwɛ Akan kasa ne amammere fɛɛfɛ no',
    learnLanguage: 'Sua Kasa',
    learnLanguageDesc: 'Adesua a ɛyɛ anigye, nsɛmfua, ne kasasin',
    exploreKulture: 'Hwehwɛ Amammere',
    exploreCultureDesc: 'Amammere, abakɔsɛm, adwinni, ne amammerɛ',
    useDictionary: 'Fa Nsɛmfua di dwuma',
    useDictionaryDesc: 'Akan-Borɔfo nsɛmfua a emu dɔ',
    researchHub: 'Nhwehwɛmu Beaeɛ',
    researchHubDesc: 'Adesua ne nhwehwɛmu nneɛma',
    getStarted: 'Hyɛ ase',
    
    // Featured Content
    featuredContentTitle: 'Nneɛma Titire',
    featuredContentDesc: 'Hunu nneɛma a ɛyɛ anigye na ɛyɛ fɛ wɔ yɛn platform so',
    basicGreetings: 'Sua Nkyana Foforo',
    basicGreetingsDesc: 'Hyɛ wo Akan akwantuo ase wɔ da biara nkyana ho',
    adinkraSymbols: 'Adinkra Nsɛnkyerɛnne',
    adinkraSymbolsDesc: 'Hunu nyansa a ɛwɔ amammere nsɛnkyerɛnne mu',
    akanDictionary: 'Akan Nsɛmfua',
    akanDictionaryDesc: 'Hwehwɛ yɛn nsɛmfua a emu dɔ',
    culturalEvents: 'Amammere Dwumadie',
    culturalEventsDesc: 'Bra bɛka Akan amammere afahyɛ ho',
    
    // Stats Section
    growingTogetherTitle: 'Yɛrenyini Bom',
    growingTogetherDesc: 'Ka mpem pii a wɔresua na wɔregye Akan agyapadeɛ to mu',
    vocabularyWords: 'Nsɛmfua',
    culturalArticles: 'Amammere Nsɛm',
    interactiveLessons: 'Adesua a Ɛyɛ Anigye',
    communityMembers: 'Mpɔtam Mufoɔ',
    
    // Call to Action
    readyToBegin: 'Wosiesie sɛ wobɛhyɛ wo Akan Akwantuo ase?',
    readyToBeginDesc: 'Ka yɛn adesua, nhwehwɛmufoɔ, ne amammere dɔfoɔ kuw ho',
    startLearningNow: 'Hyɛ Adesua ase Seisei',
    joinCommunity: 'Ka Mpɔtam ho',
    
    // Footer
    quickLinks: 'Mmirika Links',
    culturalResources: 'Amammere Nneɛma',
    learningResources: 'Adesua Nneɛma',
    languageLearning: 'Kasa Adesua',
    cultureHighlights: 'Amammere Titire',
    emailUs: 'Mena Yɛn',
    callUs: 'Frɛ Yɛn',
    location: 'Beaeɛ',
    privacyPolicy: 'Kokoamsɛm Nhyehyɛeɛ',
    termsOfService: 'Dwumadie Nhyehyɛeɛ',
    accessibility: 'Kwan a Wɔbɛfa',
    sankofaQuote: '"Sankofa" - San kɔ na fa'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const t = (key) => {
    return translations[currentLanguage][key] || key;
  };

  const value = {
    currentLanguage,
    setCurrentLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};