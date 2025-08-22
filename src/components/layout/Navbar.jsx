import React from 'react';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, BookOpen, Users, Home, Book, Lightbulb } from 'lucide-react';
import featureFlags from '../../config/featureFlags';
import { useLanguage } from '../../contexts/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentLanguage, setCurrentLanguage, t } = useLanguage();

  const navigationItems = [
    { path: '/', label: t('home'), icon: Home },
    { path: '/learn', label: t('learnAkan'), icon: BookOpen },
    // culture main page kept but subpages hidden by flags
    { path: '/culture', label: t('culture'), icon: Users },
    { path: '/dictionary', label: t('dictionary'), icon: Book },
    { path: '/community', label: t('community'), icon: Lightbulb },
    // include research link only when the feature flag is enabled
    ...(featureFlags.showResearch ? [{ path: '/research', label: t('research'), icon: Lightbulb }] : []),
  ];  

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="shadow-lg sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F1D799]">
              <span className="font-bold text-xl text-black">অ</span>
            </div>
            <div className="text-black">
              <h1 className="font-bold text-xl">Akan Kasa</h1>
              <p className="text-xs opacity-90">ne Amammere</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${isActive(item.path) ? 'bg-[#F1D799] text-black shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)]' : 'text-black hover:bg-black/5'}`}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Language Selector & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="rounded-lg px-3 py-1 text-sm appearance-none focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  color: '#000',
                  border: '1px solid rgba(0, 0, 0, 0.08)'
                }}
              >
                <option value="en" style={{color: '#1C1C1C'}}>English</option>
                <option value="tw" style={{color: '#1C1C1C'}}>Twi</option>
              </select>
              <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black pointer-events-none" />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-black hover:bg-black/5 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-black/10">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-3 ${isActive(item.path) ? 'bg-[#F1D799] text-black' : 'text-black hover:bg-black/5'}`}
                    onMouseEnter={(e) => {
                      if (!isActive(item.path)) {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.path)) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Decorative accent line */}
      <div className="h-1 opacity-80 bg-[#F1D799]"></div>
    </nav>
  );
};

export default Navbar;
