import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Book, Search, Play, Star, Calendar, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import HeroSection from '../components/layout/Hero'
import FeatureSection from '../components/FeatureSection';
import { getHomepage } from '../api';

const iconMap = {
  'basicGreetings': MessageCircle,
  'adinkraSymbols': Star,
  'akanDictionary': Book,
  'culturalEvents': Calendar,
};

const colorMap = {
  'basicGreetings': '#ca8a04',
  'adinkraSymbols': '#f59e0b',
  'akanDictionary': '#fbbf24',
  'culturalEvents': '#ca8a04',
};

const Homepage = () => {
  const { t } = useLanguage();
  const [featuredContent, setFeaturedContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getHomepage();
        const features = (data || []).filter(item => item.section === 'feature');
        setFeaturedContent(features.map((item, index) => {
          const key = Object.keys(iconMap)[index] || `feature-${index}`;
          const Icon = iconMap[key] || BookOpen;
          return {
            title: item.title || key,
            description: item.body || item.subtitle || '',
            category: item.subtitle || 'Feature',
            link: item.link_url || '/',
            icon: Icon,
            color: colorMap[key] || '#fbbf24',
          };
        }));
      } catch (err) {
        console.error(err);
        setFeaturedContent([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-white">
  {/* Hero Section (shared component) */}
  <HeroSection />

  <FeatureSection />

      {/* Featured Content */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              {t('featuredContentTitle')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              {t('featuredContentDesc')}
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading featured content...</div>
          ) : featuredContent.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No featured content available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                       className="block bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group border border-gray-100 h-full"
                     >
                      <div className="h-28 sm:h-32 relative" style={{backgroundColor: content.color}}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-black/80" />
                        </div>
                      </div>
                       <div className="p-4">
                        <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full mb-2.5 sm:mb-3 bg-[#564c38] text-white">
                          {content.category}
                        </span>
                         <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#564c38] transition-colors">
                          {content.title}
                        </h3>
                         <p className="text-gray-600 text-sm leading-relaxed">{content.description}</p>
                      </div>
                     </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 text-white bg-[#564c38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              {t('growingTogetherTitle')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              {t('growingTogetherDesc')}
            </p>
          </div>
          
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { number: '500+', label: 'Dictionary Words' },
              { number: '50+', label: 'Audio Pronunciations' },
              { number: '12', label: 'Learning Modules' },
              { number: '1000+', label: 'Community Members' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                 <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-sm sm:text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t('readyToBegin')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto">
            {t('readyToBeginDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
             <Link
               to="/learn"
               className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white transition-all duration-200 inline-flex items-center justify-center space-x-2 hover:shadow-lg hover:-translate-y-0.5 text-sm sm:text-base"
               style={{backgroundColor: '#f59e0b'}}
               onMouseEnter={(e) => e.target.style.backgroundColor = '#ca8a04'}
               onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
                           >
                <Play className="w-5 h-5" />
                <span>{t('startLearningNow')}</span>
             </Link>
              <Link
                to="/community"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 inline-flex items-center justify-center space-x-2 hover:shadow-lg hover:-translate-y-0.5 border-2 text-sm sm:text-base"
                style={{borderColor: '#564c38', color: '#564c38'}}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#564c38';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#564c38';
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
