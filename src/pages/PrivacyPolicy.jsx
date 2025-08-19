import React from 'react';

import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-4 py-6" style={{backgroundColor: '#564c38'}}>
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
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="text-xl mt-2" style={{color: '#f1d799'}}>
            How we protect and use your information
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Last Updated */}
        <div className="bg-white rounded-lg p-6 mb-8 border-l-4" style={{borderColor: '#f1d799'}}>
          <p className="text-sm text-gray-600">
            <strong>Last Updated:</strong> January 15, 2025
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-8 h-8" style={{color: '#564c38'}} />
            <h2 className="text-2xl font-bold" style={{color: '#564c38'}}>Introduction</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            At Akan Kasa ne Amammere, we are committed to protecting your privacy and ensuring the security 
            of your personal information. This Privacy Policy explains how we collect, use, disclose, and 
            safeguard your information when you visit our website and use our services.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Eye className="w-8 h-8" style={{color: '#564c38'}} />
            <h2 className="text-2xl font-bold" style={{color: '#564c38'}}>Information We Collect</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{color: '#695e46'}}>
                Personal Information
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Name and email address when you create an account</li>
                <li>Learning progress and preferences</li>
                <li>Community forum posts and comments</li>
                <li>Contact information when you reach out to us</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3" style={{color: '#695e46'}}>
                Usage Information
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Pages you visit and time spent on our site</li>
                <li>Lesson completion and quiz results</li>
                <li>Device and browser information</li>
                <li>IP address and general location data</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Information */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-8 h-8" style={{color: '#564c38'}} />
            <h2 className="text-2xl font-bold" style={{color: '#564c38'}}>How We Use Your Information</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg" style={{backgroundColor: '#f1d799'}}>
              <h3 className="font-semibold mb-2" style={{color: '#564c38'}}>Educational Services</h3>
              <p className="text-sm" style={{color: '#564c38'}}>
                Track your learning progress, provide personalized lessons, and recommend content.
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{backgroundColor: '#c2ae81'}}>
              <h3 className="font-semibold mb-2" style={{color: '#564c38'}}>Communication</h3>
              <p className="text-sm" style={{color: '#564c38'}}>
                Send updates about new features, cultural events, and educational content.
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{backgroundColor: '#77705c', color: 'white'}}>
              <h3 className="font-semibold mb-2">Improvement</h3>
              <p className="text-sm">
                Analyze usage patterns to enhance our platform and develop new features.
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{backgroundColor: '#695e46', color: 'white'}}>
              <h3 className="font-semibold mb-2">Security</h3>
              <p className="text-sm">
                Protect against fraud, abuse, and ensure the safety of our community.
              </p>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="w-8 h-8" style={{color: '#564c38'}} />
            <h2 className="text-2xl font-bold" style={{color: '#564c38'}}>Data Security</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            We implement appropriate technical and organizational security measures to protect your 
            personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 border rounded-lg" style={{borderColor: '#f1d799'}}>
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" 
                   style={{backgroundColor: '#f1d799'}}>
                <Lock className="w-6 h-6" style={{color: '#564c38'}} />
              </div>
              <h4 className="font-semibold" style={{color: '#564c38'}}>Encryption</h4>
              <p className="text-sm text-gray-600 mt-1">All data transmitted is encrypted using SSL/TLS</p>
            </div>
            <div className="text-center p-4 border rounded-lg" style={{borderColor: '#c2ae81'}}>
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" 
                   style={{backgroundColor: '#c2ae81'}}>
                <Shield className="w-6 h-6" style={{color: '#564c38'}} />
              </div>
              <h4 className="font-semibold" style={{color: '#564c38'}}>Access Control</h4>
              <p className="text-sm text-gray-600 mt-1">Limited access to authorized personnel only</p>
            </div>
            <div className="text-center p-4 border rounded-lg" style={{borderColor: '#77705c'}}>
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" 
                   style={{backgroundColor: '#77705c'}}>
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold" style={{color: '#564c38'}}>Regular Audits</h4>
              <p className="text-sm text-gray-600 mt-1">Continuous monitoring and security assessments</p>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6" style={{color: '#564c38'}}>Your Rights</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#f1d799'}}></div>
              <p className="text-gray-700"><strong>Access:</strong> Request a copy of the personal data we hold about you</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#c2ae81'}}></div>
              <p className="text-gray-700"><strong>Correction:</strong> Update or correct inaccurate personal information</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#77705c'}}></div>
              <p className="text-gray-700"><strong>Deletion:</strong> Request deletion of your personal data</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#695e46'}}></div>
              <p className="text-gray-700"><strong>Portability:</strong> Transfer your data to another service</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-lg p-8 text-center" style={{backgroundColor: '#564c38', color: 'white'}}>
          <h2 className="text-2xl font-bold mb-4">Questions About This Policy?</h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy or our data practices, 
            please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:privacy@akankasa.org"
              className="px-6 py-3 rounded-lg font-medium transition-colors"
              style={{backgroundColor: '#f1d799', color: '#564c38'}}
            >
              Email Us
            </a>
            <Link
              to="/community"
              className="px-6 py-3 rounded-lg font-medium transition-colors border"
              style={{borderColor: '#f1d799', color: '#f1d799'}}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f1d799';
                e.target.style.color = '#564c38';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#f1d799';
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

export default PrivacyPolicy;