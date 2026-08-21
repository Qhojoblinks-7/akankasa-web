import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Volume2, Users, Plus, Search, Edit, Trash2, Upload, ArrowLeft, Clock, MessageSquare, FileText, Calendar, Home, HelpCircle, Shield } from 'lucide-react';
import { adminGet } from '../api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalTerms: 0, totalAudio: 0, totalUsers: 0 });
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('akankasa:admin_token');
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    setIsAuthed(true);
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const data = await adminGet('/api/admin/dashboard');
      setStats(data);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  if (!isAuthed) return null;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-[#564c38]">Content Manager</h1>
            <p className="text-sm text-gray-600 mt-1">Welcome back. Here is a quick overview of your website.</p>
          </div>
          <button
            onClick={() => { localStorage.removeItem('akankasa:admin_token'); navigate('/admin/login'); }}
            className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-amber-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dictionary Words</p>
                <p className="text-3xl font-display font-bold text-[#564c38]">{stats.totalTerms}</p>
              </div>
              <BookOpen className="w-8 h-8 text-amber-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-amber-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Audio Files</p>
                <p className="text-3xl font-display font-bold text-[#564c38]">{stats.totalAudio}</p>
              </div>
              <Volume2 className="w-8 h-8 text-amber-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-amber-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-3xl font-display font-bold text-[#564c38]">{stats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-amber-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-amber-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Suggestions</p>
                <p className="text-3xl font-display font-bold text-[#564c38]">{stats.pendingSuggestions || 0}</p>
              </div>
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-amber-200 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Forum</p>
                <p className="text-3xl font-display font-bold text-[#564c38]">{stats.pendingForum || 0}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
          <h2 className="text-lg font-display font-semibold text-[#564c38] mb-1">What would you like to manage?</h2>
          <p className="text-sm text-gray-600 mb-6">Choose a section below to add, edit, or remove content.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button onClick={() => navigate('/admin/alphabets')} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-center bg-white"><BookOpen className="w-6 h-6 text-amber-500 mx-auto mb-2" /><span className="text-sm font-medium text-[#564c38]">Alphabet</span></button>
            <button onClick={() => navigate('/admin/dictionary')} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-center bg-white"><BookOpen className="w-6 h-6 text-amber-500 mx-auto mb-2" /><span className="text-sm font-medium text-[#564c38]">Dictionary</span></button>
            <button onClick={() => navigate('/admin/lessons')} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-center bg-white"><BookOpen className="w-6 h-6 text-amber-500 mx-auto mb-2" /><span className="text-sm font-medium text-[#564c38]">Lessons</span></button>
            <button onClick={() => navigate('/admin/vocabulary')} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-center bg-white"><BookOpen className="w-6 h-6 text-amber-500 mx-auto mb-2" /><span className="text-sm font-medium text-[#564c38]">Vocabulary</span></button>
            <button onClick={() => navigate('/admin/greetings')} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-center bg-white"><MessageSquare className="w-6 h-6 text-amber-500 mx-auto mb-2" /><span className="text-sm font-medium text-[#564c38]">Greetings</span></button>
            <button onClick={() => navigate('/admin/articles')} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-center bg-white"><FileText className="w-6 h-6 text-amber-500 mx-auto mb-2" /><span className="text-sm font-medium text-[#564c38]">Articles</span></button>
            <button onClick={() => navigate('/admin/documents')} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-center bg-white"><FileText className="w-6 h-6 text-amber-500 mx-auto mb-2" /><span className="text-sm font-medium text-[#564c38]">Documents</span></button>
            <button onClick={() => navigate('/admin/events')} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-center bg-white"><Calendar className="w-6 h-6 text-amber-500 mx-auto mb-2" /><span className="text-sm font-medium text-[#564c38]">Events</span></button>
            <button onClick={() => navigate('/admin/legal')} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-center bg-white"><FileText className="w-6 h-6 text-amber-500 mx-auto mb-2" /><span className="text-sm font-medium text-[#564c38]">Legal Pages</span></button>
            <button onClick={() => navigate('/admin/homepage')} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-center bg-white"><Home className="w-6 h-6 text-amber-500 mx-auto mb-2" /><span className="text-sm font-medium text-[#564c38]">Homepage</span></button>
            <button onClick={() => navigate('/admin/moderation')} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-center bg-white"><Shield className="w-6 h-6 text-amber-500 mx-auto mb-2" /><span className="text-sm font-medium text-[#564c38]">Moderation</span></button>
            <button onClick={() => navigate('/admin/forum')} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-center bg-white"><MessageSquare className="w-6 h-6 text-amber-500 mx-auto mb-2" /><span className="text-sm font-medium text-[#564c38]">Forum</span></button>
            <button onClick={() => navigate('/admin/suggestions')} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-center bg-white"><BookOpen className="w-6 h-6 text-amber-500 mx-auto mb-2" /><span className="text-sm font-medium text-[#564c38]">Suggestions</span></button>
            <button onClick={() => navigate('/admin/users')} className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-center bg-white"><Users className="w-6 h-6 text-amber-500 mx-auto mb-2" /><span className="text-sm font-medium text-[#564c38]">Users</span></button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

