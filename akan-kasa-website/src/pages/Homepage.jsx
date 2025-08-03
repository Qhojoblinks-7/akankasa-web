import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Book, Search, Play, Star, Calendar, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Homepage = () => {
  const featuredContent = [
    {
      title: "Learn Basic Greetings",
      description: "Start your Akan journey with essential daily greetings",
      category: "Language Learning",
      link: "/learn/greetings",
      icon: MessageCircle,
      color: "bg-akan-deep-brown"
    },
    {
      title: "Adinkra Symbols",
      description: "Discover the wisdom embedded in traditional Akan symbols",
      category: "Culture",
      link: "/culture/arts",
      icon: Star,
      color: "bg-akan-muted-olive"
    },
    {
      title: "Akan Dictionary",
      description: "Explore our comprehensive bilingual dictionary",
      category: "Dictionary",
      link: "/dictionary",
      icon: Book,
      color: "bg-akan-warm-gray"
    },
    {
      title: "Cultural Events",
      description: "Join upcoming Akan cultural celebrations",
      category: "Community",
      link: "/community/events",
      icon: Calendar,
      color: "bg-akan-soft-beige"
    }
  ];

  const stats = [
    { number: "500+", label: "Vocabulary Words" },
    { number: "50+", label: "Cultural Articles" },
    { number: "20+", label: "Interactive Lessons" },
    { number: "1000+", label: "Community Members" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative akan-gradient overflow-hidden">
        <div className="absolute inset-0 akan-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Akwaaba to Akan Culture
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            >
              Discover the rich heritage of the Akan people through language learning, 
              cultural exploration, and community engagement
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                to="/learn" 
                className="bg-akan-pale-gold text-akan-deep-brown px-8 py-4 rounded-lg font-semibold hover:bg-akan-soft-beige transition-colors inline-flex items-center space-x-2 shadow-lg"
              >
                <BookOpen className="w-5 h-5" />
                <span>Start Learning</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/culture" 
                className="border-2 border-akan-pale-gold text-akan-pale-gold px-8 py-4 rounded-lg font-semibold hover:bg-akan-pale-gold hover:text-akan-deep-brown transition-colors inline-flex items-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Explore Culture</span>
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
              Start Your Akan Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your path to explore the beautiful Akan language and culture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Learn Language",
                description: "Interactive lessons, alphabet, and vocabulary",
                link: "/learn",
                color: "from-akan-deep-brown to-akan-muted-olive"
              },
              {
                icon: Users,
                title: "Explore Culture",
                description: "Traditions, history, arts, and customs",
                link: "/culture",
                color: "from-akan-muted-olive to-akan-warm-gray"
              },
              {
                icon: Book,
                title: "Use Dictionary",
                description: "Comprehensive Akan-English dictionary",
                link: "/dictionary",
                color: "from-akan-warm-gray to-akan-soft-beige"
              },
              {
                icon: Search,
                title: "Research Hub",
                description: "Academic resources and research tools",
                link: "/research",
                color: "from-akan-soft-beige to-akan-pale-gold"
              }
            ].map((item, index) => {
              const Icon = item.icon;
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
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <div className="mt-4 flex items-center text-akan-deep-brown group-hover:text-akan-muted-olive">
                      <span className="text-sm font-medium">Get Started</span>
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
              Featured Content
            </h2>
            <p className="text-xl text-gray-600">
              Discover the most popular and engaging content on our platform
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
                    <div className={`h-32 ${content.color} relative`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-akan-pale-gold text-akan-deep-brown text-xs font-medium rounded-full mb-3">
                        {content.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-akan-deep-brown transition-colors">
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
      <section className="py-16 bg-akan-deep-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Growing Together
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of learners preserving and celebrating Akan heritage
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
            Ready to Begin Your Akan Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of learners, researchers, and culture enthusiasts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/learn"
              className="bg-akan-deep-brown text-white px-8 py-4 rounded-lg font-semibold hover:bg-akan-muted-olive transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Start Learning Now</span>
            </Link>
            <Link
              to="/community"
              className="border-2 border-akan-deep-brown text-akan-deep-brown px-8 py-4 rounded-lg font-semibold hover:bg-akan-deep-brown hover:text-white transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Join Community</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;