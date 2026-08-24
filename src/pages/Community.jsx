import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Calendar, Users, Star, MapPin, Clock, Plus, X, MessageCircle, Heart, Repeat2, Share, Image, Smile, BarChart2, MoreHorizontal } from 'lucide-react';
import { getForumPosts, getEvents, getProfiles, createForumPost } from '../api';
import CommunityLayout from '../components/CommunityLayout';
import Toast from '../components/Toast';

const Community = ({ initialTab = 'forums' }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostData, setNewPostData] = useState({
    title: '',
    content: '',
    category: 'Language Learning'
  });
  const [events, setEvents] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showComposer, setShowComposer] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const [posts, evts, profs] = await Promise.all([
          getForumPosts({ category: selectedCategory === 'all' ? undefined : selectedCategory }),
          getEvents(),
          getProfiles(),
        ]);
        if (mounted) {
          setForumPosts(posts.results || posts);
          setEvents(Array.isArray(evts) ? evts : []);
          setMembers(Array.isArray(profs) ? profs : []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, [selectedCategory]);

  const handleJoinDiscussion = useCallback((postId) => {
    navigate(`/community/discussion/${postId}`);
  }, [navigate]);

  const handleCreatePost = async () => {
    try {
      await createForumPost(newPostData);
      setNewPostData({ title: '', content: '', category: 'Language Learning' });
      setShowNewPostModal(false);
      setToast('Post created successfully!');
      setTimeout(() => setToast(null), 3000);
      const posts = await getForumPosts({ category: selectedCategory === 'all' ? undefined : selectedCategory });
      setForumPosts(posts.results || posts);
    } catch (err) {
      alert('Failed to create post: ' + err.message);
    }
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

  const categories = ['all', 'Language Learning', 'Cultural Events', 'Research', 'General Discussion'];

  const filteredForumPosts = selectedCategory === 'all'
    ? forumPosts
    : forumPosts.filter(post => post.category === selectedCategory);

  const tabs = [
    { id: 'forums', label: 'Discussion Forums', icon: MessageSquare },
    { id: 'events', label: 'Events & Meetups', icon: Calendar },
    { id: 'members', label: 'Community Members', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Star },
  ];

  const ForumPostCard = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [reposted, setReposted] = useState(false);
    const [shared, setShared] = useState(false);

    return (
      <article className="border-b border-gray-800 p-4 hover:bg-gray-900/50 transition-colors">
        <div className="flex space-x-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center text-black font-bold flex-shrink-0">
            {(post.author || 'A').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 min-w-0">
                <span className="font-bold text-white truncate">{post.author || 'Anonymous'}</span>
                <span className="text-gray-500 text-sm truncate">@{post.author ? post.author.toLowerCase().replace(/\s/g, '') : 'user'}</span>
                <span className="text-gray-500 text-sm">·</span>
                <span className="text-gray-500 text-sm">{post.created_at ? new Date(post.created_at).toLocaleDateString() : post.lastActivity || ''}</span>
              </div>
              <button className="text-gray-500 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-semibold text-white mt-1 mb-1">{post.title}</h3>
            <p className="text-gray-300 text-sm line-clamp-3">{post.content}</p>
            {post?.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map((tag, index) => (
                  <span key={index} className="text-yellow-500 text-sm hover:underline cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between mt-3 max-w-md">
              <button 
                className="flex items-center space-x-2 text-gray-500 hover:text-yellow-500 group transition-colors"
                onClick={() => handleJoinDiscussion(post.id)}
              >
                <div className="p-2 rounded-full group-hover:bg-yellow-500/10 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-sm">{post.replies || 0}</span>
              </button>
              <button 
                className={`flex items-center space-x-2 group transition-colors ${reposted ? 'text-green-500' : 'text-gray-500 hover:text-green-500'}`}
                onClick={() => setReposted(!reposted)}
              >
                <div className={`p-2 rounded-full transition-colors ${reposted ? 'bg-green-500/10' : 'group-hover:bg-green-500/10'}`}>
                  <Repeat2 className="w-4 h-4" />
                </div>
              </button>
              <button 
                className={`flex items-center space-x-2 group transition-colors ${liked ? 'text-pink-500' : 'text-gray-500 hover:text-pink-500'}`}
                onClick={() => setLiked(!liked)}
              >
                <div className={`p-2 rounded-full transition-colors ${liked ? 'bg-pink-500/10' : 'group-hover:bg-pink-500/10'}`}>
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                </div>
              </button>
              <button 
                className={`flex items-center space-x-2 group transition-colors ${shared ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'}`}
                onClick={() => setShared(!shared)}
              >
                <div className={`p-2 rounded-full transition-colors ${shared ? 'bg-yellow-500/10' : 'group-hover:bg-yellow-500/10'}`}>
                  <Share className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  };

  const EventCard = ({ event }) => (
    <div className="border-2 border-yellow-500/30 bg-gray-900/80 p-4 hover:border-yellow-500 transition-colors">
      <h3 className="font-bold text-white text-sm mb-2 truncate">{event.title}</h3>
      <p className="text-yellow-500 text-xs mb-2 font-medium line-clamp-2">{event.description}</p>
      <div className="flex flex-col space-y-1 text-xs">
        <span className="text-white font-semibold">{new Date(event.date).toLocaleDateString()}</span>
        <span className="text-yellow-400 truncate">{event.location}</span>
      </div>
    </div>
  );

  const MemberCard = ({ member }) => (
    <div className="border-b border-gray-800 p-4 hover:bg-gray-900/50 transition-colors flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center text-black font-bold flex-shrink-0 mb-2">
        {member.name?.charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0">
        <h3 className="font-bold text-white truncate text-sm">{member.name}</h3>
        <p className="text-gray-500 text-xs truncate">{member.role}</p>
      </div>
    </div>
  );

  const AchievementCard = ({ achievement }) => (
    <div className={`border-2 ${achievement.color} p-3 rounded-lg text-center hover:scale-105 transition-transform`}>
      <div className="text-2xl mb-2">{achievement.icon}</div>
      <p className="font-bold text-white text-xs truncate mb-1">{achievement.title}</p>
      <p className="text-gray-400 text-xs truncate">{achievement.description}</p>
      <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-bold border ${
        achievement.rarity === 'Gold' ? 'border-yellow-400 text-yellow-400' :
        achievement.rarity === 'Silver' ? 'border-gray-400 text-gray-300' :
        'border-yellow-600 text-yellow-500'
      }`}>
        {achievement.rarity}
      </span>
    </div>
  );

  const achievements = [
    { title: 'Getting Started', description: 'Completed 5 lessons', icon: '📚', rarity: 'Bronze', color: 'border-yellow-600 bg-yellow-900/20' },
    { title: 'Dedicated Learner', description: 'Completed 10 lessons', icon: '🎓', rarity: 'Silver', color: 'border-gray-400 bg-gray-800/40' },
    { title: 'Word Collector', description: 'Saved 10 words', icon: '📝', rarity: 'Bronze', color: 'border-yellow-600 bg-yellow-900/20' },
    { title: 'Vocabulary Master', description: 'Saved 50 words', icon: '📖', rarity: 'Gold', color: 'border-yellow-400 bg-yellow-900/30' },
    { title: 'Hour of Power', description: 'Studied for 1 hour', icon: '⏱️', rarity: 'Silver', color: 'border-gray-400 bg-gray-800/40' },
    { title: 'Week Warrior', description: '7-day study streak', icon: '🔥', rarity: 'Gold', color: 'border-yellow-400 bg-yellow-900/30' }
  ];

  return (
    <CommunityLayout showComposer={showComposer} onToggleComposer={() => setShowComposer(!showComposer)}>
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="px-4 py-3">
          <h2 className="text-xl font-bold">Community</h2>
        </div>
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 text-sm font-medium transition-colors hover:bg-gray-900/50 ${
                  activeTab === tab.id ? 'text-white border-b-2 border-yellow-500' : 'text-gray-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Composer */}
      {showComposer && activeTab === 'forums' && (
        <div className="border-b border-gray-800 p-4">
          <div className="flex space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center text-black font-bold flex-shrink-0">U</div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="What's happening?"
                value={newPostData.title}
                onChange={(e) => setNewPostData({ ...newPostData, title: e.target.value })}
                className="w-full bg-transparent text-xl placeholder-gray-500 focus:outline-none mb-3"
              />
              <textarea
                placeholder="Tell us more..."
                value={newPostData.content}
                onChange={(e) => setNewPostData({ ...newPostData, content: e.target.value })}
                className="w-full bg-transparent text-base placeholder-gray-500 focus:outline-none resize-none"
                rows="3"
              />
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                <div className="flex items-center space-x-2">
                  <button type="button" className="p-2 text-yellow-500 hover:bg-gray-900 rounded-full transition-colors"><Image className="w-5 h-5" /></button>
                  <button type="button" className="p-2 text-yellow-500 hover:bg-gray-900 rounded-full transition-colors"><Smile className="w-5 h-5" /></button>
                  <button type="button" className="p-2 text-yellow-500 hover:bg-gray-900 rounded-full transition-colors"><BarChart2 className="w-5 h-5" /></button>
                </div>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPostData.title.trim() || !newPostData.content.trim()}
                  className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-2 px-6 rounded-full transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      {activeTab === 'forums' && (
        <div className="border-b border-gray-800 px-4 py-2 flex items-center space-x-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category === 'all' ? 'All Topics' : category}
            </button>
          ))}
        </div>
      )}

      {/* Tab Content */}
      <div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-gray-700 border-t-yellow-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {activeTab === 'forums' && (
              <div>
                {filteredForumPosts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p className="text-lg font-medium">No discussions yet</p>
                    <p className="text-sm">Be the first to start a conversation!</p>
                  </div>
                ) : (
                  filteredForumPosts.map((post) => (
                    <ForumPostCard key={post.id} post={post} />
                  ))
                )}
              </div>
            )}

            {activeTab === 'events' && (
              <div className="p-4">
                {events.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">No upcoming events.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'members' && (
              <div className="p-4">
                {members.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">No members found.</div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {members.map((member) => (
                      <MemberCard key={member.id} member={member} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <AchievementCard key={index} achievement={achievement} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Create New Post</h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={newPostData.title}
                onChange={handlePostInputChange}
                className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter post title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select
                name="category"
                value={newPostData.category}
                onChange={handlePostInputChange}
                className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="Language Learning">Language Learning</option>
                <option value="Cultural Events">Cultural Events</option>
                <option value="Research">Research</option>
                <option value="General Discussion">General Discussion</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
              <textarea
                name="content"
                value={newPostData.content}
                onChange={handlePostInputChange}
                rows="4"
                className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Write your post content here..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-bold"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </CommunityLayout>
  );
};

export default Community;
