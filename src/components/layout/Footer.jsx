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
    <footer className="text-black" style={{background: '#FDF6EC'}}>
      {/* Decorative Adinkra Pattern Border */}
      <div className="h-2" style={{background: 'linear-gradient(90deg, #8B0000 0%, #C19A6B 50%, #3B7A57 100%)'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background: '#C19A6B'}}>
                <img src={nkyinkyim} alt="Nkyinkyim" className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-xl" style={{fontFamily: 'Georama, sans-serif', color: '#C19A6B'}}>AkanKasa ne Amammere</h3>
                <p className="text-sm" style={{color: '#1C1C1C'}}>Language & Culture</p>
              </div>
            </div>
            <p className="text-sm mb-6" style={{color: '#1C1C1C'}}>
              Preserving and promoting the rich heritage of the Akan people through language learning, 
              cultural education, and community engagement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="transition-colors" style={{color: '#1C1C1C'}}
                 onMouseEnter={(e) => e.target.style.color = '#8B0000'}
                 onMouseLeave={(e) => e.target.style.color = '#1C1C1C'}>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="transition-colors" style={{color: '#1C1C1C'}}
                 onMouseEnter={(e) => e.target.style.color = '#8B0000'}
                 onMouseLeave={(e) => e.target.style.color = '#1C1C1C'}>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="transition-colors" style={{color: '#1C1C1C'}}
                 onMouseEnter={(e) => e.target.style.color = '#8B0000'}
                 onMouseLeave={(e) => e.target.style.color = '#1C1C1C'}>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="transition-colors" style={{color: '#1C1C1C'}}
                 onMouseEnter={(e) => e.target.style.color = '#8B0000'}
                 onMouseLeave={(e) => e.target.style.color = '#1C1C1C'}>
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4" style={{color: '#C19A6B', fontFamily: 'Georama, sans-serif'}}>{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="transition-colors text-sm"
                    style={{color: '#1C1C1C'}}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cultural Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4" style={{color: '#C19A6B', fontFamily: 'Georama, sans-serif'}}>{t('culturalResources')}</h4>
            <ul className="space-y-3">
              {culturalLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="transition-colors text-sm"
                    style={{color: '#1C1C1C'}}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4" style={{color: '#C19A6B', fontFamily: 'Georama, sans-serif'}}>{t('learningResources')}</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="transition-colors text-sm"
                    style={{color: '#1C1C1C'}}
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
              <Mail className="w-5 h-5" style={{color: '#C19A6B'}} />
              <div>
                <p className="text-sm" style={{color: '#3B7A57'}}>{t('emailUs')}</p>
                <p className="">info@akankasa.org</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5" style={{color: '#C19A6B'}} />
              <div>
                <p className="text-sm" style={{color: '#3B7A57'}}>{t('callUs')}</p>
                <p className="">+233 (0) 20 123 4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5" style={{color: '#C19A6B'}} />
              <div>
                <p className="text-sm" style={{color: '#3B7A57'}}>{t('location')}</p>
                <p className="">Kumasi, Ghana</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center" style={{borderTop: '1px solid rgba(28,28,28,0.15)'}}>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm" style={{color: '#1C1C1C'}}>
              © {currentYear} Akan Kasa ne Amammere. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-sm transition-colors" style={{color: '#8B0000'}}
                    onMouseEnter={(e) => e.target.style.color = '#3B7A57'}
                    onMouseLeave={(e) => e.target.style.color = '#8B0000'}>
                {t('privacyPolicy')}
              </Link>
              <Link to="/terms" className="text-sm transition-colors" style={{color: '#8B0000'}}
                    onMouseEnter={(e) => e.target.style.color = '#3B7A57'}
                    onMouseLeave={(e) => e.target.style.color = '#8B0000'}>
                {t('termsOfService')}
              </Link>
              <Link to="/accessibility" className="text-sm transition-colors" style={{color: '#8B0000'}}
                    onMouseEnter={(e) => e.target.style.color = '#3B7A57'}
                    onMouseLeave={(e) => e.target.style.color = '#8B0000'}>
                {t('accessibility')}
              </Link>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm italic" style={{color: '#1C1C1C', fontFamily: 'EB Garamond, serif'}}>
              {t('sankofaQuote')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;