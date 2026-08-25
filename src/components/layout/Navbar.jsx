import React from 'react';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import featureFlags from '../../config/featureFlags';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentLanguage, setCurrentLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  const publicNavigationItems = [
    { path: '/', label: t('home') },
    { path: '/learn', label: t('learnAkan') },
    { path: '/culture', label: t('culture') },
    { path: '/dictionary', label: t('dictionary') },
    { path: '/community', label: t('community') },
    ...(featureFlags.showResearch ? [{ path: '/research', label: t('research') }] : []),
  ];

  const authenticatedNavigationItems = [
    ...publicNavigationItems,
    { path: '/contribute', label: t('contribute') },
  ];

  const navigationItems = user ? authenticatedNavigationItems : publicNavigationItems;

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="shadow-lg sticky top-0 z-50 bg-white">
      <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#F1D799]">
              <span className="font-bold text-lg sm:text-xl text-black">অ</span>
            </div>
            <div className="text-black">
              <h1 className="font-bold text-[clamp(1rem,2vw+0.5rem,1.25rem)]">Akan Kasa</h1>
              <p className="text-[clamp(0.6rem,1vw+0.2rem,0.75rem)] opacity-90">ne Amammere</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.path) ? 'bg-[#F1D799] text-black shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)]' : 'text-black hover:bg-black/5'}`}
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
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {user ? (
              <div className="flex items-center space-x-2 ml-2">
                <Link to="/profile" className="px-4 py-2 rounded-lg text-sm font-medium text-black hover:bg-black/5">
                  <span>{user.name}</span>
                </Link>
                <button onClick={logout} className="px-4 py-2 rounded-lg text-sm font-medium text-black hover:bg-black/5">
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <Link to="/login" className="px-3 py-2 rounded-lg text-sm font-medium text-black hover:bg-black/5" aria-label="Login">
                  <LogIn className="w-5 h-5" />
                </Link>
                <Link to="/register" className="px-3 py-2 rounded-lg text-sm font-medium bg-[#564c38] text-white hover:bg-[#695e46]" aria-label="Register">
                  <UserPlus className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>

          {/* Language Selector & Mobile Menu Button */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="rounded-lg pl-2 sm:pl-3 pr-7 sm:pr-8 py-1 text-[clamp(0.7rem,1vw+0.2rem,0.875rem)] appearance-none focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  color: '#000',
                  border: '1px solid rgba(0, 0, 0, 0.08)'
                }}
              >
                <option value="en" style={{color: '#1C1C1C'}}>English</option>
                <option value="tw" style={{color: '#1C1C1C'}}>Twi</option>
              </select>
              <Globe className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-black/60 pointer-events-none" />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-black hover:bg-black/5 transition-colors"
              aria-label={isMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-black/10">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.path) ? 'bg-[#F1D799] text-black' : 'text-black hover:bg-black/5'}`}
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
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-black hover:bg-black/5">
                    <span>{user.name}</span>
                  </Link>
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="px-4 py-3 rounded-lg text-sm font-medium text-black hover:bg-black/5">
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="px-3 py-3 rounded-lg text-sm font-medium text-black hover:bg-black/5" aria-label="Login">
                    <LogIn className="w-5 h-5" />
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="px-3 py-3 rounded-lg text-sm font-medium bg-[#564c38] text-white hover:bg-[#695e46]" aria-label="Register">
                    <UserPlus className="w-5 h-5" />
                  </Link>
                </>
              )}
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
