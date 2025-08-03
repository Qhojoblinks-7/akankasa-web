import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/learn', label: 'Language Learning' },
    { to: '/culture', label: 'Culture Highlights' },
    { to: '/dictionary', label: 'Dictionary' },
    { to: '/research', label: 'Research' },
    { to: '/community', label: 'Community' }
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
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Decorative Adinkra Pattern Border */}
      <div className="h-2 bg-gradient-to-r from-primary-deep via-accent-gold to-primary-muted"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-accent-gold to-primary-deep rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">অ</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">Akan Kasa ne Amammere</h3>
                <p className="text-sm text-gray-300">Language & Culture</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-6">
              Preserving and promoting the rich heritage of the Akan people through language learning, 
              cultural education, and community engagement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-gold transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-accent-gold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cultural Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-accent-gold">Cultural Resources</h4>
            <ul className="space-y-3">
              {culturalLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-accent-gold">Learning Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-accent-gold" />
              <div>
                <p className="text-sm text-gray-300">Email Us</p>
                <p className="text-white">info@akankasa.org</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-accent-gold" />
              <div>
                <p className="text-sm text-gray-300">Call Us</p>
                <p className="text-white">+233 (0) 20 123 4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-accent-gold" />
              <div>
                <p className="text-sm text-gray-300">Location</p>
                <p className="text-white">Kumasi, Ghana</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-gray-400 text-sm">
              © {currentYear} Akan Kasa ne Amammere. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-white text-sm transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-400 italic">
              "Sankofa" - Go back and get it
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;