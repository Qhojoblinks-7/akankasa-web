import { useState } from 'react';
import { MessageSquare, Calendar, Users, Star, MapPin, Clock, Plus, Filter, TrendingUp } from 'lucide-react';
import { forumData, eventsData, userProfiles } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const [activeTab, setActiveTab] = useState('forums');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const tabs = [
    { id: 'forums', label: 'Discussion Forums', icon: MessageSquare },
    { id: 'events', label: 'Events & Meetups', icon: Calendar },
    { id: 'members', label: 'Community Members', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Star }
  ];

  const categories = ['all', 'Language Learning', 'Cultural Events', 'Research', 'General Discussion'];

  const filteredForumPosts = forumData.filter(post => 
    selectedCategory === 'all' || post.category === selectedCategory
  );

  const ForumPostCard = ({ post }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-3">{post.content}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>by {post.author}</span>
            <span>{post.lastActivity}</span>
            <span>{post.replies} replies</span>
          </div>
        </div>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium ml-4">
          {post.category}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, index) => (
          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          Join Discussion →
        </button>
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <Star className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-500">Save</span>
        </div>
      </div>
    </div>
  );

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`h-32 ${
        event.type === 'workshop' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        event.type === 'exhibition' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
        'bg-gradient-to-r from-green-500 to-green-600'
      }`}>
        <div className="p-6 h-full flex items-center">
          <div className="text-white">
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-sm opacity-90">{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-700 mb-4">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {event.time}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => navigate('/community/register-event')}
        >
          Register Now
        </button>
      </div>
    </div>
  );

  const MemberCard = ({ member }) => (
    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
      <div className="w-20 h-20 bg-gradient-to-r from-akan-gold to-akan-red rounded-full mx-auto mb-4 flex items-center justify-center">
        <span className="text-white text-2xl font-bold">
          {member.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{member.role}</p>
      <p className="text-xs text-gray-500 mb-4">{member.location}</p>
      
      <div className="flex justify-center space-x-4 text-sm text-gray-600 mb-4">
        <div className="text-center">
          <div className="font-semibold text-gray-900">{member.contributions}</div>
          <div className="text-xs">Contributions</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-900">
            {new Date(member.joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </div>
          <div className="text-xs">Joined</div>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-1 mb-4">
        {member.specialties.map((specialty, index) => (
          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
            {specialty}
          </span>
        ))}
      </div>
      
      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        onClick={() => navigate(`/profile/${member.id}`)}
      >
        View Profile
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Hub</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Connect with fellow learners, share knowledge, attend events, and be part of the Akan cultural community
          </p>
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-600">Discussions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">23</div>
              <div className="text-sm text-gray-600">Events This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">89%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Forums Tab */}
        {activeTab === 'forums' && (
          <div>
            {/* Forum Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Discussion Forums</h2>
                <p className="text-gray-600">Join conversations about Akan language and culture</p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
                  onClick={() => navigate('/community/new-post')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </button>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-orange-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Trending Topics</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['akan-proverbs', 'twi-pronunciation', 'cultural-festivals', 'adinkra-symbols', 'language-exchange'].map((topic, index) => (
                  <span key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                    #{topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Forum Posts */}
            <div className="space-y-6">
              {filteredForumPosts.map((post) => (
                <ForumPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Events & Meetups</h2>
                <p className="text-gray-600">Discover and attend Akan cultural events</p>
              </div>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                Create Event
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsData.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Community Members</h2>
                <p className="text-gray-600">Connect with learners, researchers, and cultural enthusiasts</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-700 p-2 border border-gray-300 rounded-lg">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  onClick={() => navigate('/community/join')}
                >
                  Join Community
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userProfiles.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Achievements</h2>
              <p className="text-gray-600">Celebrate milestones and recognize outstanding contributions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>
                  <div className="flex justify-center items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      achievement.rarity === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                      achievement.rarity === 'Silver' ? 'bg-gray-100 text-gray-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {achievement.rarity}
                    </span>
                    <span className="text-xs text-gray-500">{achievement.holders} holders</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;