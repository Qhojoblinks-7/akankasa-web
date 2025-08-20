import React from 'react';

import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Book, Search, Play, Star, Calendar, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import HeroSection from '../components/layout/Hero'
import FeatureSection from '../components/FeatureSection';

const Homepage = () => {
  const { t } = useLanguage();
  
  const featuredContent = [
    {
      title: t('basicGreetings'),
      description: t('basicGreetingsDesc'),
      category: t('languageLearning'),
      link: "/learn/greetings",
  icon: MessageCircle,
  color: "var(--color-yellow-600)"
    },
    {
      title: t('adinkraSymbols'),
      description: t('adinkraSymbolsDesc'),
      category: t('culture'),
      link: "/culture",
  icon: Star,
  color: "var(--color-yellow-500)"
    },
    {
      title: t('akanDictionary'),
      description: t('akanDictionaryDesc'),
      category: t('dictionary'),
      link: "/dictionary",
  icon: Book,
  color: "var(--color-yellow-400)"
    },
    {
      title: t('culturalEvents'),
      description: t('culturalEventsDesc'),
      category: t('community'),
      link: "/community",
  icon: Calendar,
  color: "var(--color-yellow-600)"
    }
  ];

  const stats = [
    { number: "500+", label: t('vocabularyWords') },
    { number: "50+", label: t('culturalArticles') },
    { number: "20+", label: t('interactiveLessons') },
    { number: "1000+", label: t('communityMembers') }
  ];

  return (
    <div className="min-h-screen">
  {/* Hero Section (shared component) */}
  <HeroSection />

  <FeatureSection />

      {/* Featured Content */}
      <section className="py-16 bg-black-70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('featuredContentTitle')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('featuredContentDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredContent.map((content, index) => {
              const Icon = content.icon;
              return (
                <motion.div
                  key={content.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={content.link}
                    className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                  >
                    <div className="h-32 relative" style={{backgroundColor: content.color}}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-12 h-12 text-black" />
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-3" style={{backgroundColor: 'var(--color-primary)', color: 'var(--color-highlight)'}}>
                        {content.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:transition-colors" style={{'&:hover': {color: '#564c38'}}}>
                        {content.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{content.description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
  {/* <section className="py-16 text-white" style={{backgroundColor: 'var(--color-highlight)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('growingTogetherTitle')}
            </h2>
            <p className="text-xl opacity-90">
              {t('growingTogetherDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('readyToBegin')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('readyToBeginDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/learn"
              className="px-8 py-4 rounded-lg font-semibold text-white transition-colors inline-flex items-center justify-center space-x-2"
              style={{backgroundColor: '#ca8a04'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#ca8a04'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
                          >
                <Play className="w-5 h-5" />
                <span>{t('startLearningNow')}</span>
              </Link>
              <Link
                to="/community"
                className="border-2 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
                style={{borderColor: 'var(--color-highlight)', color: 'var(--color-highlight)'}}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f59e0b';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--color-highlight)';
                }}
              >
                <Users className="w-5 h-5" />
                <span>{t('joinCommunity')}</span>
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;