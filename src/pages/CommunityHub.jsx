import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Home, Bookmark, User, MoreHorizontal, Search, ArrowLeft, MessageSquare, Calendar, Users, Star, MessageCircle, Heart, Repeat2, Share, Image, Smile, BarChart2 } from 'lucide-react';
import { getForumPosts, createForumPost, getEvents, getProfiles, getForumPost, getForumComments, createForumComment } from '../api';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Bookmark, label: 'Bookmarks', href: '#' },
  { icon: User, label: 'Profile', href: '/profile' },
];

const trends = [
  { category: 'Akan Language · Trending', topic: '#Akan Proverbs', posts: '2,451 posts' },
  { category: 'Culture · Trending', topic: '#TwiPronunciation', posts: '1,832 posts' },
  { category: 'Learning · Trending', topic: '#LanguageExchange', posts: '956 posts' },
  { category: 'Heritage · Trending', topic: '#AkanHeritage', posts: '3,210 posts' },
  { category: 'Festivals · Trending', topic: '#AdinkraSymbols', posts: '1,104 posts' },
];

const tabs = [
  { id: 'forums', label: 'Discussion Forums', icon: MessageSquare },
  { id: 'events', label: 'Events & Meetups', icon: Calendar },
  { id: 'members', label: 'Community Members', icon: Users },
  { id: 'achievements', label: 'Achievements', icon: Star },
];

const CommunityHub = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'Language Learning' });
  const [showComposer, setShowComposer] = useState(false);
  const [activeTab, setActiveTab] = useState('forums');

  // Thread state
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const isThread = Boolean(id);

  useEffect(() => {
    if (isThread) {
      loadThread();
    } else {
      loadFeed();
    }
  }, [id, activeTab]);

  const loadFeed = async () => {
    setLoading(true);
    try {
      if (activeTab === 'forums') {
        const data = await getForumPosts({ limit: 50 });
        setPosts(data.results || data || []);
      } else if (activeTab === 'events') {
        const data = await getEvents();
        setEvents(data || []);
      } else if (activeTab === 'members') {
        const data = await getProfiles();
        setProfiles(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadThread = async () => {
    setLoading(true);
    try {
      const [postData, commentsData, eventsData] = await Promise.all([
        getForumPost(id),
        getForumComments(id),
        getEvents()
      ]);
      setPost(postData);
      setComments(commentsData || []);
      setEvents(eventsData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    try {
      await createForumPost(newPost);
      setNewPost({ title: '', content: '', category: 'Language Learning' });
      setShowComposer(false);
      loadFeed();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddReply = async () => {
    if (!newReply.trim() || !id) return;
    try {
      const comment = await createForumComment(id, {
        content: newReply,
        author_name: 'You'
      });
      setComments([...comments, comment]);
      setNewReply('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar */}
        <aside className="w-64 h-screen sticky top-0 border-r border-gray-800 hidden md:flex flex-col justify-between p-4">
          <div>
            <div className="mb-8 px-4">
              <Link to="/" className="text-3xl font-bold" style={{ color: '#f59e0b' }}>Akan Kasa</Link>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.label} to={item.href} className="flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-gray-900 transition-colors text-xl">
                    <Icon className="w-6 h-6" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            {!isThread && (
              <button
                onClick={() => setShowComposer(!showComposer)}
                className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition-colors"
              >
                Post
              </button>
            )}
          </div>
          <div className="px-4 py-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">U</div>
              <div>
                <p className="font-medium text-sm">User</p>
                <p className="text-gray-500 text-xs">@user</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen border-r border-gray-800">
          <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate(-1)} className="md:hidden p-2 hover:bg-gray-900 rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">{isThread ? 'Thread' : 'Home'}</h2>
            </div>
            {!isThread && (
              <div className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    className="bg-gray-900 text-white rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700"
                  />
                </div>
              </div>
            )}
          </header>

          {!isThread && (
            <div className="sticky top-[53px] z-10 bg-black/80 backdrop-blur-md border-b border-gray-800">
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
            </div>
          )}

          {/* Feed View */}
          {!isThread && activeTab === 'forums' && (
            <>
              {showComposer && (
                <div className="border-b border-gray-800 p-4">
                  <form onSubmit={handleCreatePost}>
                    <div className="flex space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium flex-shrink-0">U</div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="What's happening?"
                          value={newPost.title}
                          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                          className="w-full bg-transparent text-xl placeholder-gray-500 focus:outline-none mb-3"
                        />
                        <textarea
                          placeholder="Tell us more..."
                          value={newPost.content}
                          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                          className="w-full bg-transparent text-base placeholder-gray-500 focus:outline-none resize-none"
                          rows="3"
                        />
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                          <div className="flex items-center space-x-2">
                            <button type="button" className="p-2 text-yellow-500 hover:bg-gray-900 rounded-full transition-colors"><Image className="w-5 h-5" /></button>
                            <button type="button" className="p-2 text-yellow-500 hover:bg-gray-900 rounded-full transition-colors"><Smile className="w-5 h-5" /></button>
                            <button type="button" className="p-2 text-yellow-500 hover:bg-gray-900 rounded-full transition-colors"><BarChart2 className="w-5 h-5" /></button>
                          </div>
                          <button type="submit" disabled={!newPost.title.trim() || !newPost.content.trim()} className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-2 px-6 rounded-full transition-colors">
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              <div>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-4 border-gray-700 border-t-yellow-500 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  posts.map((post) => (
                    <article key={post.id} className="border-b border-gray-800 p-4 hover:bg-gray-900/50 transition-colors cursor-pointer" onClick={() => navigate(`/community/discussion/${post.id}`)}>
                      <div className="flex space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium flex-shrink-0">
                          {(post.author_name || 'A').charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 min-w-0">
                              <span className="font-bold text-white truncate">{post.author_name || 'Anonymous'}</span>
                              <span className="text-gray-500 text-sm truncate">@{post.author_name ? post.author_name.toLowerCase().replace(/\s/g, '') : 'user'}</span>
                              <span className="text-gray-500 text-sm">·</span>
                              <span className="text-gray-500 text-sm">{post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}</span>
                            </div>
                            <button className="text-gray-500 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                          <h3 className="font-semibold text-white mt-1 mb-1">{post.title}</h3>
                          <p className="text-gray-300 text-sm line-clamp-3">{post.content}</p>
                          <div className="flex items-center justify-between mt-3 max-w-md">
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-yellow-500 group transition-colors">
                              <div className="p-2 rounded-full group-hover:bg-yellow-500/10 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                              </div>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 group transition-colors">
                              <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                                <Repeat2 className="w-4 h-4" />
                              </div>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-pink-500 group transition-colors">
                              <div className="p-2 rounded-full group-hover:bg-pink-500/10 transition-colors">
                                <Heart className="w-4 h-4" />
                              </div>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-yellow-500 group transition-colors">
                              <div className="p-2 rounded-full group-hover:bg-yellow-500/10 transition-colors">
                                <Share className="w-4 h-4" />
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </>
          )}

          {/* Thread View */}
          {isThread && (
            <>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-gray-700 border-t-yellow-500 rounded-full animate-spin"></div>
                </div>
              ) : post ? (
                <>
                  {/* Original Post */}
                  <article className="border-b border-gray-800 p-4 hover:bg-gray-900/50 transition-colors">
                    <div className="flex space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium flex-shrink-0">
                        {(post.author_name || 'A').charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 min-w-0">
                            <span className="font-bold text-white truncate">{post.author_name || 'Anonymous'}</span>
                            <span className="text-gray-500 text-sm truncate">@{post.author_name ? post.author_name.toLowerCase().replace(/\s/g, '') : 'user'}</span>
                            <span className="text-gray-500 text-sm">·</span>
                            <span className="text-gray-500 text-sm">{post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}</span>
                          </div>
                          <button className="text-gray-500 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                        <h3 className="font-bold text-white text-xl mt-1 mb-2">{post.title}</h3>
                        <p className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap">{post.content}</p>
                        <div className="flex items-center justify-between mt-4 max-w-md">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-yellow-500 group transition-colors">
                            <div className="p-2 rounded-full group-hover:bg-yellow-500/10 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                            </div>
                            <span className="text-sm">{comments.length}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 group transition-colors">
                            <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                              <Repeat2 className="w-4 h-4" />
                            </div>
                          </button>
                          <button onClick={() => setLiked(!liked)} className={`flex items-center space-x-2 group transition-colors ${liked ? 'text-pink-500' : 'text-gray-500 hover:text-pink-500'}`}>
                            <div className={`p-2 rounded-full transition-colors ${liked ? 'bg-pink-500/10' : 'group-hover:bg-pink-500/10'}`}>
                              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                            </div>
                            <span className="text-sm">{liked ? '1' : '0'}</span>
                          </button>
                          <button onClick={() => setBookmarked(!bookmarked)} className={`flex items-center space-x-2 group transition-colors ${bookmarked ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'}`}>
                            <div className={`p-2 rounded-full transition-colors ${bookmarked ? 'bg-yellow-500/10' : 'group-hover:bg-yellow-500/10'}`}>
                              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>

                  {/* Reply Composer */}
                  <div className="border-b border-gray-800 p-4">
                    <div className="flex space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium flex-shrink-0">U</div>
                      <div className="flex-1">
                        <textarea
                          placeholder="Post your reply"
                          value={newReply}
                          onChange={(e) => setNewReply(e.target.value)}
                          className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none text-lg"
                          rows="2"
                        />
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-800">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-yellow-500 hover:bg-gray-900 rounded-full transition-colors"><Image className="w-5 h-5" /></button>
                            <button className="p-2 text-yellow-500 hover:bg-gray-900 rounded-full transition-colors"><Smile className="w-5 h-5" /></button>
                          </div>
                          <button
                            onClick={handleAddReply}
                            disabled={!newReply.trim()}
                            className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-2 px-6 rounded-full transition-colors"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  <div>
                    {comments.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
                        <p className="text-lg font-medium">No replies yet</p>
                        <p className="text-sm">Be the first to reply to this discussion!</p>
                      </div>
                    ) : (
                      comments.map((reply) => (
                        <article key={reply.id} className="border-b border-gray-800 p-4 hover:bg-gray-900/50 transition-colors">
                          <div className="flex space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium flex-shrink-0">
                              {(reply.author_name || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1 min-w-0">
                                  <span className="font-bold text-white truncate">{reply.author_name || 'Anonymous'}</span>
                                  <span className="text-gray-500 text-sm truncate">@{reply.author_name ? reply.author_name.toLowerCase().replace(/\s/g, '') : 'user'}</span>
                                  <span className="text-gray-500 text-sm">·</span>
                                  <span className="text-gray-500 text-sm">{reply.created_at ? new Date(reply.created_at).toLocaleDateString() : ''}</span>
                                </div>
                                <button className="text-gray-500 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors">
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-gray-300 text-base mt-1 leading-relaxed whitespace-pre-wrap">{reply.content}</p>
                              <div className="flex items-center justify-between mt-3 max-w-md">
                                <button className="flex items-center space-x-2 text-gray-500 hover:text-yellow-500 group transition-colors">
                                  <div className="p-2 rounded-full group-hover:bg-yellow-500/10 transition-colors">
                                    <MessageCircle className="w-4 h-4" />
                                  </div>
                                </button>
                                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 group transition-colors">
                                  <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                                    <Repeat2 className="w-4 h-4" />
                                  </div>
                                </button>
                                <button className="flex items-center space-x-2 text-gray-500 hover:text-pink-500 group transition-colors">
                                  <div className="p-2 rounded-full group-hover:bg-pink-500/10 transition-colors">
                                    <Heart className="w-4 h-4" />
                                  </div>
                                </button>
                                <button className="flex items-center space-x-2 text-gray-500 hover:text-yellow-500 group transition-colors">
                                  <div className="p-2 rounded-full group-hover:bg-yellow-500/10 transition-colors">
                                    <Share className="w-4 h-4" />
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Discussion Not Found</h2>
                    <button onClick={() => navigate('/community/feed')} className="text-yellow-500 hover:underline">Back to Feed</button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Feed Tabs Content */}
          {!isThread && activeTab !== 'forums' && (
            <>
              {activeTab === 'events' && (
                <div className="p-4">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="w-8 h-8 border-4 border-gray-700 border-t-yellow-500 rounded-full animate-spin"></div>
                    </div>
                  ) : events.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">No upcoming events.</div>
                  ) : (
                    <div className="grid grid-cols-3 gap-4">
                      {events.map((event) => (
                        <div key={event.id} className="border-2 border-yellow-500/30 bg-gray-900/80 p-4 hover:border-yellow-500 transition-colors">
                          <h3 className="font-bold text-white text-sm mb-2 truncate">{event.title}</h3>
                          <p className="text-yellow-500 text-xs mb-2 font-medium line-clamp-2">{event.description}</p>
                          <div className="flex flex-col space-y-1 text-xs">
                            <span className="text-white font-semibold">{new Date(event.date).toLocaleDateString()}</span>
                            <span className="text-yellow-400 truncate">{event.location}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'members' && (
                <div className="p-4">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="w-8 h-8 border-4 border-gray-700 border-t-yellow-500 rounded-full animate-spin"></div>
                    </div>
                  ) : profiles.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">No members found.</div>
                  ) : (
                    <div className="grid grid-cols-3 gap-4">
                      {profiles.map((member) => (
                        <div key={member.id} className="border-b border-gray-800 p-4 hover:bg-gray-900/50 transition-colors flex flex-col items-center text-center">
                          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium flex-shrink-0 mb-2">
                            {member.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-white truncate text-sm">{member.name}</h3>
                            <p className="text-gray-500 text-xs truncate">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { title: 'Getting Started', description: 'Completed 5 lessons', icon: '📚', rarity: 'Bronze', color: 'border-yellow-600 bg-yellow-900/20' },
                      { title: 'Dedicated Learner', description: 'Completed 10 lessons', icon: '🎓', rarity: 'Silver', color: 'border-gray-400 bg-gray-800/40' },
                      { title: 'Word Collector', description: 'Saved 10 words', icon: '📝', rarity: 'Bronze', color: 'border-yellow-600 bg-yellow-900/20' },
                      { title: 'Vocabulary Master', description: 'Saved 50 words', icon: '📖', rarity: 'Gold', color: 'border-yellow-400 bg-yellow-900/30' },
                      { title: 'Hour of Power', description: 'Studied for 1 hour', icon: '⏱️', rarity: 'Silver', color: 'border-gray-400 bg-gray-800/40' },
                      { title: 'Week Warrior', description: '7-day study streak', icon: '🔥', rarity: 'Gold', color: 'border-yellow-400 bg-yellow-900/30' }
                    ].map((achievement, index) => (
                      <div key={index} className={`border-2 ${achievement.color} p-3 rounded-lg text-center hover:scale-105 transition-transform`}>
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
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Right Sidebar */}
          <aside className="w-80 hidden lg:block p-4 space-y-4">
            <div className="bg-gray-900 rounded-2xl p-4">
              <h3 className="text-xl font-bold mb-4">Trends for you</h3>
              <div className="grid grid-cols-3 gap-3">
                {trends.slice(0, 9).map((trend, index) => (
                  <div key={index} className="cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors">
                    <p className="text-xs text-gray-500 truncate">{trend.category}</p>
                    <p className="font-bold text-white text-sm truncate">{trend.topic}</p>
                    <p className="text-xs text-gray-500 truncate">{trend.posts}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-yellow-500 hover:text-yellow-400 text-sm">Show more</button>
            </div>

            <div className="bg-gray-900 rounded-2xl p-4">
              <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
              <div className="flex flex-col space-y-4">
                {events.length === 0 ? (
                  <p className="text-gray-500 text-sm">No upcoming events.</p>
                ) : (
                  events.slice(0, 5).map((event) => (
                    <div key={event.id} className="hover:bg-gray-800 p-2 -mx-2 rounded-lg transition-colors">
                      <p className="font-bold text-white text-sm">{event.title}</p>
                      <p className="text-gray-500 text-xs mt-1">{new Date(event.date).toLocaleDateString()} · {event.location}</p>
                    </div>
                  ))
                )}
              </div>
              <button className="mt-4 text-yellow-500 hover:text-yellow-400 text-sm">Show more</button>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default CommunityHub;
