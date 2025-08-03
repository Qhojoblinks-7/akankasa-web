import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, BookOpen, Users, Search, Home, Book, Lightbulb } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentLanguage, setCurrentLanguage, t } = useLanguage();

  const navigationItems = [
    { path: '/', label: t('home'), icon: Home },
    { path: '/learn', label: t('learnAkan'), icon: BookOpen },
    { path: '/culture', label: t('culture'), icon: Users },
    { path: '/dictionary', label: t('dictionary'), icon: Book },
    { path: '/research', label: t('research'), icon: Search },
    { path: '/community', label: t('community'), icon: Lightbulb }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="shadow-lg sticky top-0 z-50" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: '#f1d799'}}>
              <span className="font-bold text-xl" style={{color: '#564c38'}}>অ</span>
            </div>
            <div className="text-white">
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
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
                  style={isActive(item.path) 
                    ? {backgroundColor: '#f1d799', color: '#564c38', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'} 
                    : {color: 'white'}}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.backgroundColor = 'transparent';
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
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                  color: 'white', 
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  focusRingColor: 'rgba(255, 255, 255, 0.5)'
                }}
              >
                <option value="en" style={{color: '#564c38'}}>English</option>
                <option value="tw" style={{color: '#564c38'}}>Twi</option>
              </select>
              <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-3"
                    style={isActive(item.path) 
                      ? {backgroundColor: '#f1d799', color: '#564c38'} 
                      : {color: 'white'}}
                    onMouseEnter={(e) => {
                      if (!isActive(item.path)) {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.path)) {
                        e.target.style.backgroundColor = 'transparent';
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

      {/* Decorative Adinkra Pattern */}
      <div className="h-1 opacity-50" style={{background: 'linear-gradient(90deg, #f1d799 0%, #c2ae81 50%, #f1d799 100%)'}}></div>
    </nav>
  );
};

export default Navbar;