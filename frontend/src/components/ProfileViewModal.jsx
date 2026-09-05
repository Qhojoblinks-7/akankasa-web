import React from 'react';
import { X, Calendar, MapPin, BookOpen, MessageCircle } from 'lucide-react';

const ProfileViewModal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white">User Profile</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto flex items-center justify-center">
                <span className="text-black text-4xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-lg text-gray-400 mb-2">{member.role}</p>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{member.location}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-white">{member.contributions}</div>
                  <div className="text-gray-400">Contributions</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-white">
                    {new Date(member.joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                  <div className="text-gray-400">Member Since</div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, index) => (
                    <span key={index} className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 px-3 py-1 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 bg-yellow-500 text-black py-2 rounded-lg font-bold hover:bg-yellow-600 transition-colors flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </button>
                <button className="flex-1 border border-gray-700 text-gray-300 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewModal;
