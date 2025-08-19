import React from 'react'
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactLogo from '../../assets/hero.jpg';

const Hero = () => (
  <section className="relative overflow-hidden" style={{background: '#FDF6EC'}}>
    <div className="absolute inset-0 akan-pattern opacity-10" aria-hidden="true"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex-1 text-center md:text-left">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6"
          style={{color: '#C19A6B', fontFamily: 'Georama, sans-serif'}}
        >
          Akwaaba to Akan Culture
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto md:mx-0"
          style={{color: '#1C1C1C'}}
        >
          Discover the rich heritage of the Akan people through language learning, 
          cultural exploration, and community engagement
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center"
        >
          <Link 
            to="/learn" 
            className="px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2 shadow-lg btn-primary"
          >
            <BookOpen className="w-5 h-5" />
            <span>Start Learning</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            to="/culture" 
            className="px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2 btn-secondary"
          >
            <Users className="w-5 h-5" />
            <span>Explore Culture</span>
          </Link>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex-1 flex justify-center md:justify-end"
      >
        <img src={ReactLogo} alt="Akan cultural patterns and learning" className="w-64 h-64 object-contain drop-shadow-xl" />
      </motion.div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-16" aria-hidden="true"></div>
  </section>
);

export default Hero;