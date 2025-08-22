import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

function HeroSection() {
  const { t } = useLanguage();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[url('/src/assets/hero.jpg')] bg-cover bg-center"
    >
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur bg-gray/50" />
      {/* Intro Banner */}
      <div className="flex flex-wrap z-30 mt-10 items-center justify-center gap-2.5 mb-6 border border-gray-300 rounded-full bg-gray-100/80 pl-4 p-1 text-sm text-gray-700 max-w-full">
        <p>Discover the Akan Language and Culture</p>
        <Link to="/learn" className="flex items-center cursor-pointer gap-2 bg-white border border-gray-300 rounded-2xl px-3 py-1 whitespace-nowrap hover:bg-gray-200 transition">
          <span>{t('getStarted')}</span>
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl z-30 sm:text-4xl md:text-6xl font-bold max-w-3xl text-white">
        {t('welcomeTitle')}
      </h1>

      {/* Description */}
      <p className="max-w-xl z-30 text-center mt-6 px-4 text-white">
        {t('welcomeDescription')}
      </p>

      {/* Action Buttons */}
      <div className="flex z-30 flex-col sm:flex-row items-center justify-center gap-4 pt-6">
        <Link to="/learn" className="px-7 py-3 rounded bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium transition">
          {t('startLearning')}
        </Link>
        <button
          className="group px-7 py-2.5 flex items-center gap-2 font-medium text-white hover:text-yellow-500 transition"
          onClick={scrollToAbout}
        >
          Learn More
          <svg className="transform group-hover:translate-x-1   pt-0.5" width="12" height="9" viewBox="0 0 12 9"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

    </div>
  );
}

export default HeroSection;