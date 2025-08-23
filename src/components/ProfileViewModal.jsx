import React from 'react';
import { X, Calendar, MapPin, BookOpen, MessageCircle } from 'lucide-react';

const ProfileViewModal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-hidden">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <div className="p-6 overflow-hidden">
          <div className="flex justify-between items-start mb-6 overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-900 break-words">User Profile</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 overflow-hidden">
            <div className="flex-shrink-0 overflow-hidden">
              <div className="w-32 h-32 bg-gradient-to-r from-akan-gold to-akan-red rounded-full mx-auto flex items-center justify-center overflow-hidden">
                <span className="text-white text-4xl font-bold break-words">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            
            <div className="flex-grow min-w-0 overflow-hidden">
              <div className="mb-6 overflow-hidden">
                <h3 className="text-2xl font-bold text-gray-900 mb-1 break-words">{member.name}</h3>
                <p className="text-lg text-gray-600 mb-2 break-words">{member.role}</p>
                <div className="flex items-center text-gray-500 mb-4 overflow-hidden">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="break-words">{member.location}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6 overflow-hidden">
                <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
                  <div className="text-2xl font-bold text-gray-900 break-words">{member.contributions}</div>
                  <div className="text-gray-600 break-words">Contributions</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
                  <div className="text-2xl font-bold text-gray-900 break-words">
                    {new Date(member.joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                  <div className="text-gray-600 break-words">Member Since</div>
                </div>
              </div>
              
              <div className="mb-6 overflow-hidden">
                <h4 className="font-semibold text-gray-900 mb-3 break-words">Specialties</h4>
                <div className="flex flex-wrap gap-2 overflow-hidden">
                  {member.specialties.map((specialty, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm break-words">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 overflow-hidden">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center break-words min-h-[44px]">
                  <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="break-words">Send Message</span>
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors break-words min-h-[44px]">
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
