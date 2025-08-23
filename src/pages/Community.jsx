import React from 'react';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Calendar, Users, Star, MapPin, Clock, Plus, Filter, TrendingUp, X } from 'lucide-react';
import { communityData, userProfiles, forumData } from '../data/mockData';
import ProfileViewModal from '../components/ProfileViewModal';
import CreateEventButton from '../components/CreateEventButton';
import EventCreationModal from '../components/EventCreationModal';
import RegisterEventModal from '../components/RegisterEventModal';
import Toast from '../components/Toast';


const Community = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('forums');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [newPostData, setNewPostData] = useState({
    title: '',
    content: '',
    category: 'Language Learning'
  });
  const [events, setEvents] = useState(communityData.events || []);
  const [registerModalEvent, setRegisterModalEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [toast, setToast] = useState(null);
  
  // Use useCallback to memoize navigate function usage
  const handleJoinDiscussion = useCallback((postId) => {
    navigate(`/community/discussion/${postId}`);
  }, [navigate]);

  const tabs = [
    { id: 'forums', label: 'Discussion Forums', icon: MessageSquare },
    { id: 'events', label: 'Events & Meetups', icon: Calendar },
    { id: 'members', label: 'Community Members', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Star }
  ];

  const categories = ['all', 'Language Learning', 'Cultural Events', 'Research', 'General Discussion'];

  const filteredForumPosts = selectedCategory === 'all' 
    ? forumData 
    : forumData.filter(post => post.category === selectedCategory);

  const handleNewPostClick = () => {
    setShowNewPostModal(true);
  };

  const handleCreatePost = () => {
    // In a real app, this would send data to a backend
    console.log('Creating new post:', newPostData);
    // Reset form and close modal
    setNewPostData({ title: '', content: '', category: 'Language Learning' });
    setShowNewPostModal(false);
    // Show success message
    alert('Post created successfully!');
  };

  const handlePostInputChange = (e) => {
    const { name, value } = e.target;
    setNewPostData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCloseModal = () => {
    setShowNewPostModal(false);
    setNewPostData({ title: '', content: '', category: 'Language Learning' });
  };

  const NewPostModal = () => {
    if (!showNewPostModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden">
        <div className="bg-white rounded-lg p-6 w-full max-w-md overflow-hidden">
          <h3 className="text-xl font-bold mb-4 break-words">Create New Post</h3>
          
          <div className="mb-4 overflow-hidden">
            <label className="block text-sm font-medium text-gray-700 mb-1 break-words">Title</label>
            <input
              type="text"
              name="title"
              value={newPostData.title}
              onChange={handlePostInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent box-border overflow-hidden"
              placeholder="Enter post title"
            />
          </div>
          
          <div className="mb-4 overflow-hidden">
            <label className="block text-sm font-medium text-gray-700 mb-1 break-words">Category</label>
            <select
              name="category"
              value={newPostData.category}
              onChange={handlePostInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent box-border overflow-hidden"
            >
              <option value="Language Learning">Language Learning</option>
              <option value="Cultural Events">Cultural Events</option>
              <option value="Research">Research</option>
              <option value="General Discussion">General Discussion</option>
            </select>
          </div>
          
          <div className="mb-4 overflow-hidden">
            <label className="block text-sm font-medium text-gray-700 mb-1 break-words">Content</label>
            <textarea
              name="content"
              value={newPostData.content}
              onChange={handlePostInputChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent box-border overflow-hidden"
              placeholder="Write your post content here..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 overflow-hidden">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors break-words min-h-[44px]"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePost}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors break-words min-h-[44px]"
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ForumPostCard = ({ post }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="flex justify-between items-start mb-4 overflow-hidden">
        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 break-words">{post.title}</h3>
          <p className="text-gray-700 mb-3 break-words">{post.content}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 overflow-hidden">
            <span className="break-words">by {post.author}</span>
            <span className="break-words">{post.lastActivity}</span>
            <span className="break-words">{post.replies} replies</span>
          </div>
        </div>
        <span className="px-2 py-1 rounded-full text-xs font-medium ml-4 flex-shrink-0 break-words" style={{backgroundColor: '#f1d799', color: '#564c38'}}>
          {post.category}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4 overflow-hidden">
        {post?.tags?.map((tag, index) => (
          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs break-words">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center overflow-hidden">
        <button 
          className="font-medium text-sm transition-colors break-words min-h-[44px]"
          style={{color: '#564c38'}}
          onMouseEnter={(e) => e.target.style.color = '#695e46'}
          onMouseLeave={(e) => e.target.style.color = '#564c38'}
          onClick={() => handleJoinDiscussion(post.id)}
        >
          Join Discussion →
        </button>
        <div className="flex items-center space-x-2 overflow-hidden">
          <button className="text-gray-400 hover:text-red-500 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
            <Star className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-500 break-words">Save</span>
        </div>
      </div>
    </div>
  );

  const EventCard = ({ event, onRegisterClick }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`h-32 ${
        event.type === 'workshop' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
        event.type === 'exhibition' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
        'bg-gradient-to-r from-[#564C38] to-[#564C38]'
      } overflow-hidden`}>
        <div className="p-6 h-full flex items-center overflow-hidden">
          <div className="text-white overflow-hidden">
            <h3 className="text-xl font-bold mb-2 break-words">{event.title}</h3>
            <p className="text-sm opacity-90 break-words">{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 overflow-hidden">
        <div className="flex items-center space-x-2 mb-3 overflow-hidden">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-600 break-words">{event.location}</span>
        </div>
        <div className="flex items-center space-x-2 mb-4 overflow-hidden">
          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-600 break-words">{event.date}</span>
        </div>
        <p className="text-gray-700 mb-4 break-words">{event.description}</p>
        <div className="flex justify-between items-center overflow-hidden">
          <span className="text-sm text-gray-500 break-words">{event.attendees} attending</span>
          <button
            onClick={() => onRegisterClick(event)}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors break-words min-h-[44px]"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );

  const MemberCard = ({ member }) => (
    <div className="bg-white rounded-lg shadow-md p-6 text-center overflow-hidden">
      <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4 overflow-hidden">
        <span className="text-2xl font-bold text-yellow-600 break-words">{member.name.charAt(0)}</span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 break-words">{member.name}</h3>
      <p className="text-sm text-gray-600 mb-3 break-words">{member.role}</p>
      <div className="flex items-center justify-center space-x-2 mb-4 overflow-hidden">
        <span className="text-xs text-gray-500 break-words">{member.location}</span>
        <span className="text-xs text-gray-400">•</span>
        <span className="text-xs text-gray-500 break-words">{member.memberSince}</span>
      </div>
      <div className="flex justify-center space-x-2 overflow-hidden">
        <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium break-words min-h-[44px]">
          View Profile
        </button>
        <button className="text-gray-600 hover:text-gray-700 text-sm font-medium break-words min-h-[44px]">
          Message
        </button>
      </div>
    </div>
  );

  const handleOpenRegisterModal = (event) => {
    setRegisterModalEvent(event);
  };

  const handleCloseRegisterModal = () => {
    setRegisterModalEvent(null);
  };

  const handleRegister = (registrationData) => {
    const newRegistration = {
      ...registrationData,
      registeredAt: new Date().toISOString()
    };
    setRegistrations(prev => [newRegistration, ...prev]);
    setToast('Registration successful!');
    handleCloseRegisterModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {showProfileModal && (
        <ProfileViewModal 
          member={selectedMember} 
          onClose={() => setShowProfileModal(false)} 
        />
      )}
      {showEventModal && (
        <EventCreationModal
          onClose={() => setShowEventModal(false)}
          onCreate={(newEvent) => {
            const created = { id: Date.now(), ...newEvent };
            setEvents(prev => [created, ...prev]);
          }}
        />
      )}
      
      {registerModalEvent && (
        <RegisterEventModal
          event={registerModalEvent}
          onClose={handleCloseRegisterModal}
          onRegister={handleRegister}
        />
      )}
      
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      
      {/* Header */}
      <div style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}} className="text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 break-words">Community Hub</h1>
          <p className="text-xl opacity-90 max-w-3xl break-words">
            Connect with fellow learners, share knowledge, attend events, and be part of the Akan cultural community
          </p>
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-white border-b border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 overflow-hidden">
            <div className="text-center overflow-hidden">
              <div className="text-2xl font-bold text-gray-900 break-words">1,247</div>
              <div className="text-sm text-gray-600 break-words">Active Members</div>
            </div>
            <div className="text-center overflow-hidden">
              <div className="text-2xl font-bold text-gray-900 break-words">156</div>
              <div className="text-sm text-gray-600 break-words">Discussions</div>
            </div>
            <div className="text-center overflow-hidden">
              <div className="text-2xl font-bold text-gray-900 break-words">23</div>
              <div className="text-sm text-gray-600 break-words">Events This Month</div>
            </div>
            <div className="text-center overflow-hidden">
              <div className="text-2xl font-bold text-gray-900 break-words">89%</div>
              <div className="text-sm text-gray-600 break-words">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="flex space-x-8 overflow-x-auto overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap min-h-[44px] ${
                    activeTab === tab.id
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="break-words">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        {/* Forums Tab */}
        {activeTab === 'forums' && (
          <div className="overflow-hidden">
            {/* Forum Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0 overflow-hidden">
              <div className="overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 break-words">Discussion Forums</h2>
                <p className="text-gray-600 break-words">Join conversations about Akan language and culture</p>
              </div>
              <div className="flex items-center space-x-4 overflow-hidden">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent box-border overflow-hidden"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                <button 
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center min-h-[44px]"
                  onClick={handleNewPostClick}
                >
                  <Plus className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="break-words">New Post</span>
                </button>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 overflow-hidden">
              <div className="flex items-center mb-4 overflow-hidden">
                <TrendingUp className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" />
                <h3 className="font-semibold text-gray-900 break-words">Trending Topics</h3>
              </div>
              <div className="flex flex-wrap gap-2 overflow-hidden">
                {['akan-proverbs', 'twi-pronunciation', 'cultural-festivals', 'adinkra-symbols', 'language-exchange'].map((topic, index) => (
                  <span key={index} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm break-words">
                    #{topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Forum Posts */}
            <div className="space-y-6 overflow-hidden">
              {filteredForumPosts.map((post) => (
                <ForumPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="overflow-hidden">
            <div className="flex justify-between items-center mb-6 overflow-hidden">
              <div className="overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 break-words">Events & Meetups</h2>
                <p className="text-gray-600 break-words">Discover and attend Akan cultural events</p>
              </div>
              <CreateEventButton onClick={() => setShowEventModal(true)}>
                Create Event
              </CreateEventButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
              {events.map((event) => (
                <EventCard key={event.id} event={event} onRegisterClick={handleOpenRegisterModal} />
              ))}
            </div>

            {registrations.length > 0 && (
              <div className="mt-8 overflow-hidden">
                <h3 className="text-lg font-semibold mb-3 break-words">Recent Registrations</h3>
                <div className="space-y-2 overflow-hidden">
                  {registrations.map((r, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded flex justify-between items-center overflow-hidden">
                      <div className="overflow-hidden min-w-0">
                        <div className="font-medium break-words">{r.name}</div>
                        <div className="text-xs text-gray-500 break-words">{r.email} • {r.tickets} ticket(s)</div>
                      </div>
                      <div className="text-xs text-gray-400 break-words flex-shrink-0">{new Date(r.registeredAt).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="overflow-hidden">
            <div className="flex justify-between items-center mb-6 overflow-hidden">
              <div className="overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 break-words">Community Members</h2>
                <p className="text-gray-600 break-words">Connect with learners, researchers, and cultural enthusiasts</p>
              </div>
              <div className="flex items-center space-x-4 overflow-hidden">
                <button className="text-gray-600 hover:text-gray-700 p-2 border border-gray-300 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center">
                  <Filter className="w-4 h-4" />
                </button>
                <button 
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors break-words min-h-[44px]"
                  onClick={() => alert('Join Community functionality would go here')}
                >
                  Join Community
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-hidden">
              {userProfiles.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="overflow-hidden">
            <div className="text-center mb-8 overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 break-words">Community Achievements</h2>
              <p className="text-gray-600 break-words">Celebrate milestones and recognize outstanding contributions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
              {[
                {
                  title: 'Language Champion',
                  description: 'Completed 50 vocabulary lessons',
                  icon: '🏆',
                  rarity: 'Gold',
                  holders: 23
                },
                {
                  title: 'Cultural Ambassador',
                  description: 'Shared 25 cultural insights',
                  icon: '🌟',
                  rarity: 'Silver',
                  holders: 67
                },
                {
                  title: 'Community Helper',
                  description: 'Helped 100 other learners',
                  icon: '🤝',
                  rarity: 'Bronze',
                  holders: 156
                },
                {
                  title: 'Research Pioneer',
                  description: 'Contributed to 5 research projects',
                  icon: '🔬',
                  rarity: 'Gold',
                  holders: 12
                },
                {
                  title: 'Event Organizer',
                  description: 'Organized 10 community events',
                  icon: '📅',
                  rarity: 'Silver',
                  holders: 34
                },
                {
                  title: 'Storyteller',
                  description: 'Shared 20 traditional stories',
                  icon: '📚',
                  rarity: 'Bronze',
                  holders: 89
                }
              ].map((achievement, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center overflow-hidden">
                  <div className="text-4xl mb-4 overflow-hidden">{achievement.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2 break-words">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 break-words">{achievement.description}</p>
                  <div className="flex justify-center items-center space-x-4 overflow-hidden">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium break-words ${
                      achievement.rarity === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                      achievement.rarity === 'Silver' ? 'bg-gray-100 text-gray-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {achievement.rarity}
                    </span>
                    <span className="text-xs text-gray-500 break-words">{achievement.holders} holders</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <NewPostModal />
    </div>
  );
};

export default Community;
