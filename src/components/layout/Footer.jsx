import React from 'react';

import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import nkyinkyim from '../../assets/nkyinkyim-medium.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const quickLinks = [
    { to: '/learn', label: t('languageLearning') },
    { to: '/culture', label: t('cultureHighlights') },
    { to: '/dictionary', label: t('dictionary') },
    { to: '/research', label: t('research') },
    { to: '/community', label: t('community') }
  ];

  const culturalLinks = [
    { to: '/culture/traditions', label: 'Traditions' },
    { to: '/culture/history', label: 'History' },
    { to: '/culture/arts', label: 'Arts & Crafts' },
    { to: '/culture/music', label: 'Music & Dance' },
    { to: '/culture/folklore', label: 'Folklore' }
  ];

  const resourceLinks = [
    { to: '/learn/alphabet', label: 'Akan Alphabet' },
    { to: '/learn/greetings', label: 'Basic Greetings' },
    { to: '/learn/vocabulary', label: 'Vocabulary' },
    { to: '/research/beginner', label: 'Beginner Resources' },
    { to: '/community/events', label: 'Cultural Events' }
  ];

  return (
    <footer className="text-black" style={{background: 'var(--color-background)'}}>
      {/* Decorative Adinkra Pattern Border */}
      <div className="h-2" style={{background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary) 50%, var(--color-secondary) 100%)'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background: 'var(--color-primary)'}}>
                <img src={nkyinkyim} alt="Nkyinkyim" className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-xl" style={{fontFamily: 'var(--font-display)', color: 'var(--color-primary)'}}>AkanKasa ne Amammere</h3>
                <p className="text-sm" style={{color: 'var(--color-highlight)'}}>Language & Culture</p>
              </div>
            </div>
            <p className="text-sm mb-6" style={{color: 'var(--color-highlight)'}}>
              Preserving and promoting the rich heritage of the Akan people through language learning, 
              cultural education, and community engagement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="transition-colors" style={{color: 'var(--color-highlight)'}}
                 onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--color-highlight)'}>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="transition-colors" style={{color: 'var(--color-highlight)'}}
                 onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--color-highlight)'}>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="transition-colors" style={{color: 'var(--color-highlight)'}}
                 onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--color-highlight)'}>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="transition-colors" style={{color: 'var(--color-highlight)'}}
                 onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--color-highlight)'}>
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4" style={{color: 'var(--color-primary)', fontFamily: 'var(--font-display)'}}>{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="transition-colors text-sm"
                    style={{color: 'var(--color-highlight)'}}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cultural Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4" style={{color: 'var(--color-primary)', fontFamily: 'var(--font-display)'}}>{t('culturalResources')}</h4>
            <ul className="space-y-3">
              {culturalLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="transition-colors text-sm"
                    style={{color: 'var(--color-highlight)'}}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4" style={{color: 'var(--color-primary)', fontFamily: 'var(--font-display)'}}>{t('learningResources')}</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="transition-colors text-sm"
                    style={{color: 'var(--color-highlight)'}}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t mt-12 pt-8" style={{borderColor: 'rgba(28,28,28,0.15)'}}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5" style={{color: 'var(--color-primary)'}} />
              <div>
                <p className="text-sm" style={{color: 'var(--color-secondary)'}}>{t('emailUs')}</p>
                <p className="">info@akankasa.org</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5" style={{color: 'var(--color-primary)'}} />
              <div>
                <p className="text-sm" style={{color: 'var(--color-secondary)'}}>{t('callUs')}</p>
                <p className="">+233 (0) 20 123 4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5" style={{color: 'var(--color-primary)'}} />
              <div>
                <p className="text-sm" style={{color: 'var(--color-secondary)'}}>{t('location')}</p>
                <p className="">Kumasi, Ghana</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center" style={{borderTop: '1px solid rgba(28,28,28,0.15)'}}>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm" style={{color: 'var(--color-highlight)'}}>
              © {currentYear} Akan Kasa ne Amammere. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-sm transition-colors" style={{color: 'var(--color-accent)'}}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-accent)'}>
                {t('privacyPolicy')}
              </Link>
              <Link to="/terms" className="text-sm transition-colors" style={{color: 'var(--color-accent)'}}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-accent)'}>
                {t('termsOfService')}
              </Link>
              <Link to="/accessibility" className="text-sm transition-colors" style={{color: 'var(--color-accent)'}}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-accent)'}>
                {t('accessibility')}
              </Link>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm italic" style={{color: 'var(--color-highlight)', fontFamily: 'var(--font-accent)'}}>
              {t('sankofaQuote')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;