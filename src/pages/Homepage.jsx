import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Book, Search, Play, Star, Calendar, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useRadux';
import HeroSection from '../components/layout/Hero';
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

      {/* Featured Content - Mobile First */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              {t('featuredContentTitle')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-2 sm:px-0">
              {t('featuredContentDesc')}
            </p>
          </div>
          
          {/* Mobile-first grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredContent.map((content, index) => {
              const Icon = content.icon;
              return (
                <motion.div
                  key={content.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={content.link}
                    className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group h-full"
                    aria-label={`Learn about ${content.title}`}
                  >
                    <div className="h-24 sm:h-28 lg:h-32 relative" style={{backgroundColor: content.color}}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-black" />
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 lg:p-6 flex flex-col h-full">
                      <span 
                        className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-full mb-2 sm:mb-3 self-start" 
                        style={{backgroundColor: 'var(--color-primary)', color: 'var(--color-highlight)'}}
                      >
                        {content.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors leading-tight">
                        {content.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed flex-grow">{content.description}</p>
                      <div className="mt-3 sm:mt-4 flex items-center text-yellow-600 group-hover:text-yellow-700 transition-colors">
                        <span className="text-sm font-medium">Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section - Mobile First */}
      <section className="py-8 sm:py-12 lg:py-16 text-white" style={{background: 'linear-gradient(135deg, #ca8a04 0%, #f59e0b 100%)'}}>
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              {t('growingTogetherTitle')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 px-2 sm:px-0">
              {t('growingTogetherDesc')}
            </p>
          </div>
          
          {/* Mobile-first grid: 2 columns on mobile, 4 on larger screens */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 leading-tight">{stat.number}</div>
                <div className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Mobile First */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {t('readyToBegin')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 px-2 sm:px-0 leading-relaxed">
            {t('readyToBeginDesc')}
          </p>
          
          {/* Mobile-first button layout: stacked on mobile, side-by-side on larger screens */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              to="/learn"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-white transition-all duration-300 inline-flex items-center justify-center space-x-2 min-h-[44px] shadow-md hover:shadow-lg active:scale-95"
              style={{backgroundColor: '#ca8a04'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#a16207'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ca8a04'}
              aria-label="Start learning Akan language and culture"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">{t('startLearningNow')}</span>
            </Link>
            
            <Link
              to="/community"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center space-x-2 min-h-[44px] border-2 shadow-md hover:shadow-lg active:scale-95"
              style={{borderColor: '#ca8a04', color: '#ca8a04'}}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#ca8a04';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#ca8a04';
              }}
              aria-label="Join the Akan community"
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">{t('joinCommunity')}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;