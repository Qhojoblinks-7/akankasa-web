import React from 'react';

import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Users, Shield, AlertTriangle } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen" style={{background: '#FDF6EC'}}>
      {/* Header */}
      <div className="px-4 py-6" style={{backgroundColor: '#C19A6B'}}>
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-white mb-4"
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
          <p className="text-xl mt-2" style={{color: '#8B0000'}}>
            Terms and conditions for using Akan Kasa ne Amammere
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Last Updated */}
        <div className="bg-white rounded-lg p-6 mb-8 border-l-4" style={{borderColor: '#8B0000'}}>
          <p className="text-sm text-gray-600">
            <strong>Last Updated:</strong> January 15, 2025
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Effective Date:</strong> January 1, 2025
          </p>
        </div>

        {/* Acceptance of Terms */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Scale className="w-8 h-8" style={{color: '#1C1C1C'}} />
            <h2 className="text-2xl font-bold" style={{color: '#1C1C1C'}}>Acceptance of Terms</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing and using the Akan Kasa ne Amammere website ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you do not agree to abide by the above, please do not use this service.
          </p>
        </div>

        {/* Use License */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="w-8 h-8" style={{color: '#C19A6B'}} />
            <h2 className="text-2xl font-bold" style={{color: '#1C1C1C'}}>Use License</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{color: '#8B0000'}}>
                Permitted Uses
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Personal, non-commercial use of educational content</li>
                <li>Sharing content with proper attribution</li>
                <li>Participating in community discussions and forums</li>
                <li>Creating an account for progress tracking</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3" style={{color: '#3B7A57'}}>
                Prohibited Uses
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Commercial use without written permission</li>
                <li>Modifying or copying materials without authorization</li>
                <li>Using content for competing educational platforms</li>
                <li>Attempting to decompile or reverse engineer our software</li>
                <li>Violating intellectual property rights</li>
              </ul>
            </div>
          </div>
        </div>

        {/* User Responsibilities */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-8 h-8" style={{color: '#C19A6B'}} />
            <h2 className="text-2xl font-bold" style={{color: '#1C1C1C'}}>User Responsibilities</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg" style={{backgroundColor: '#C19A6B', color: '#1C1C1C'}}>
              <h3 className="font-semibold mb-2">Account Security</h3>
              <p className="text-sm">
                You are responsible for maintaining the confidentiality of your account credentials.
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{backgroundColor: '#3B7A57', color: 'white'}}>
              <h3 className="font-semibold mb-2">Content Guidelines</h3>
              <p className="text-sm">
                All user-generated content must be respectful and culturally appropriate.
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{backgroundColor: '#1C1C1C', color: 'white'}}>
              <h3 className="font-semibold mb-2">Accurate Information</h3>
              <p className="text-sm">
                Provide accurate information when creating accounts or participating in forums.
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{backgroundColor: '#8B0000', color: 'white'}}>
              <h3 className="font-semibold mb-2">Compliance</h3>
              <p className="text-sm">
                Follow all applicable laws and respect the cultural significance of Akan heritage.
              </p>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6" style={{color: '#1C1C1C'}}>Intellectual Property</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#C19A6B'}}></div>
              <p className="text-gray-700"><strong>Original Content:</strong> All original educational materials, designs, and code are owned by Akan Kasa ne Amammere</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#3B7A57'}}></div>
              <p className="text-gray-700"><strong>Cultural Heritage:</strong> Traditional Akan cultural content belongs to the Akan people and is shared with respect</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#1C1C1C'}}></div>
              <p className="text-gray-700"><strong>User Content:</strong> You retain ownership of content you create, but grant us license to use it on the platform</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#8B0000'}}></div>
              <p className="text-gray-700"><strong>Third-Party Content:</strong> We respect all third-party intellectual property and expect users to do the same</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <AlertTriangle className="w-8 h-8" style={{color: '#C19A6B'}} />
            <h2 className="text-2xl font-bold" style={{color: '#1C1C1C'}}>Disclaimer</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, we:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
            <li>Exclude all representations and warranties relating to this website and its contents</li>
            <li>Exclude all liability for damages arising out of or in connection with your use of this website</li>
            <li>Do not guarantee the accuracy or completeness of cultural or linguistic information</li>
            <li>Reserve the right to modify or discontinue services without notice</li>
          </ul>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{color: '#1C1C1C'}}>Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. 
            Your continued use of the service after changes constitutes acceptance of the new terms.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We will notify users of significant changes through our website or email notifications.
          </p>
        </div>

        {/* Contact Information */}
        <div className="rounded-lg p-8 text-center" style={{backgroundColor: '#1C1C1C', color: 'white'}}>
          <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
          <p className="mb-6">
            If you have any questions about these Terms of Service, please contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:legal@akankasa.org"
              className="px-6 py-3 rounded-lg font-medium transition-colors btn-primary"
              style={{backgroundColor: '#C19A6B', color: '#1C1C1C'}}
            >
              Email Legal Team
            </a>
            <Link
              to="/community"
              className="px-6 py-3 rounded-lg font-medium transition-colors border btn-secondary"
              style={{borderColor: '#1C1C1C', color: '#1C1C1C'}}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1C1C1C';
                e.target.style.color = '#FDF6EC';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#1C1C1C';
              }}
            >
              Join Community Discussion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;