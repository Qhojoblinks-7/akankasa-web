import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, BookOpen, Users, Home, Book, Lightbulb } from 'lucide-react';
import { useLanguage, useUI } from '../../hooks/useRadux';

const Navbar = () => {
  const location = useLocation();
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  const { isMobileMenuOpen, setMobileMenu } = useUI();

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/culture', label: 'Culture', icon: Book },
    { path: '/dictionary', label: 'Dictionary', icon: BookOpen },
    { path: '/community', label: 'Community', icon: Users },
    { path: '/research', label: 'Research', icon: Lightbulb },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="shadow-lg w-lvw fixed top-0 z-50 bg-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="flex justify-between items-center h-16 sm:h-18 overflow-hidden">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 overflow-hidden">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#F1D799] flex-shrink-0">
              <span className="font-bold text-lg sm:text-xl text-black">অ</span>
            </div>
            <div className="text-black overflow-hidden min-w-0">
              <h1 className="font-bold text-lg sm:text-xl leading-tight break-words">Akan Kasa</h1>
              <p className="text-xs opacity-90 leading-tight break-words">ne Amammere</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 overflow-hidden">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 min-h-[44px] ${
                    isActive(item.path)
                      ? 'bg-[#F1D799] text-black'
                      : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="break-words">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Language Selector & Mobile Menu Button */}
          <div className="flex items-center space-x-2 sm:space-x-4 overflow-hidden">
            {/* Language Selector */}
            <div className="relative overflow-hidden">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="rounded-lg px-2 sm:px-3 py-2 sm:py-1 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 min-h-[44px] sm:min-h-[36px] max-w-full box-border"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  color: '#000',
                  border: '1px solid rgba(0, 0, 0, 0.08)'
                }}
              >
                <option value="en" style={{color: '#1C1C1C'}}>English</option>
                <option value="tw" style={{color: '#1C1C1C'}}>Twi</option>
              </select>
              <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black pointer-events-none flex-shrink-0" />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenu(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-lg text-black hover:bg-black/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-black/10 bg-white overflow-hidden">
            <div className="flex flex-col space-y-1 overflow-hidden">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className={`px-4 py-4 rounded-lg text-base font-medium transition-all duration-200 flex items-center space-x-3 min-h-[56px] overflow-hidden ${
                      isActive(item.path) 
                        ? 'bg-[#F1D799] text-black' 
                        : 'text-black hover:bg-black/5 active:bg-black/10'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="break-words">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="h-1 opacity-80 bg-[#F1D799] overflow-hidden"></div>
    </nav>
  );
};

export default Navbar;
