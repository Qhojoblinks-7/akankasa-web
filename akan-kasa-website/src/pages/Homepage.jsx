import { Link, useNavigate } from 'react-router-dom';
import { Book, Search, Play, Star, Calendar, MessageCircle, Users, ArrowRight, BookOpen } from 'lucide-react';
import Hero from '../components/layout/Hero';

import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Homepage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const featuredContent = [
    {
      title: t('basicGreetings'),
      description: t('basicGreetingsDesc'),
      category: t('languageLearning'),
      link: "/learn/greetings",
      icon: MessageCircle,
      color: "#564c38"
    },
    {
      title: t('adinkraSymbols'),
      description: t('adinkraSymbolsDesc'),
      category: t('culture'),
      link: "/culture",
      icon: Star,
      color: "#695e46"
    },
    {
      title: t('akanDictionary'),
      description: t('akanDictionaryDesc'),
      category: t('dictionary'),
      link: "/dictionary",
      icon: Book,
      color: "#77705c"
    },
    {
      title: t('culturalEvents'),
      description: t('culturalEventsDesc'),
      category: t('community'),
      link: "/community",
      icon: Calendar,
      color: "#c2ae81"
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
      {/* Hero Section */}
      <Hero />
      <section className="relative overflow-hidden" style={{background: 'linear-gradient(135deg, #695e46 0%, #564c38 100%)'}}>
        <div className="absolute inset-0 akan-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              {t('welcomeTitle')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            >
              {t('welcomeDescription')}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                to="/learn" 
                className="px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2 shadow-lg"
                style={{backgroundColor: '#f1d799', color: '#564c38'}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#c2ae81'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f1d799'}
              >
                <BookOpen className="w-5 h-5" />
                <span>{t('startLearning')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/culture" 
                className="border-2 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
                style={{borderColor: '#f1d799', color: '#f1d799'}}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f1d799';
                  e.target.style.color = '#564c38';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#f1d799';
                }}
              >
                <Users className="w-5 h-5" />
                <span>{t('exploreCulture')}</span>
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('quickStartTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('quickStartDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Book,
                title: "Learn Language",
                description: "Interactive lessons, alphabet, and vocabulary",

                link: "/learn",
                color: "linear-gradient(135deg, #564c38 0%, #695e46 100%)"
              },
              {
                icon: Users,
                title: t('exploreCulture'),
                description: t('exploreCultureDesc'),
                link: "/culture",
                color: "linear-gradient(135deg, #695e46 0%, #77705c 100%)"
              },
              {
                icon: Book,
                title: t('useDictionary'),
                description: t('useDictionaryDesc'),
                link: "/dictionary",
                color: "linear-gradient(135deg, #77705c 0%, #c2ae81 100%)"
              },
              {
                icon: Search,
                title: t('researchHub'),
                description: t('researchHubDesc'),
                link: "/research",
                color: "linear-gradient(135deg, #c2ae81 0%, #f1d799 100%)"
              }
            ].map((item, index) => {
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={item.link}
                    className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {item.title === 'Learn Language' && <BookOpen className="w-6 h-6 text-white" />}
                      {item.title === 'Explore Culture' && <Users className="w-6 h-6 text-white" />}
                      {item.title === 'Use Dictionary' && <Book className="w-6 h-6 text-white" />}
                      {item.title === 'Research Hub' && <Search className="w-6 h-6 text-white" />}

                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <div className="mt-4 flex items-center transition-colors" style={{color: '#564c38'}}>
                      <span className="text-sm font-medium">{t('getStarted')}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 bg-gray-50">
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
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-3" style={{backgroundColor: '#f1d799', color: '#564c38'}}>
                        {content.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:transition-colors" style={{'&:hover': {color: '#564c38'}}}>
                        {content.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{content.description}</p>
                      <button
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                        onClick={e => { e.preventDefault(); navigate(content.link); }}
                      >
                        Learn More
                      </button>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 text-white" style={{backgroundColor: '#564c38'}}>
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
      </section>

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
              style={{backgroundColor: '#564c38'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#695e46'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#564c38'}
                          >
                <Play className="w-5 h-5" />
                <span>{t('startLearningNow')}</span>
              </Link>
              <Link
                to="/community"
                className="border-2 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
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