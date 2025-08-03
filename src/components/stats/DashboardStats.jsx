import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, BookOpen, Award, AlertCircle } from 'lucide-react';
import ErrorMessage from '../Layout/ErrorMessage';

const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock stats data
  const mockStats = {
    totalUsers: 1247,
    activeLearners: 856,
    completedLessons: 2340,
    averageProgress: 67,
    monthlyGrowth: 12.5,
    trendings: [
      { label: 'New Registrations', value: 45, change: '+15%' },
      { label: 'Lesson Completions', value: 123, change: '+8%' },
      { label: 'Community Posts', value: 67, change: '+22%' },
      { label: 'Cultural Events', value: 8, change: '+33%' }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats(mockStats);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error}
        onClose={() => setError(null)}
        type="error"
        className="mb-6"
      />
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Active Learners',
      value: stats?.activeLearners || 0,
      icon: BookOpen,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Lessons Completed',
      value: stats?.completedLessons || 0,
      icon: Award,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      title: 'Avg Progress',
      value: `${stats?.averageProgress || 0}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+5%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trending Items */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending This Month</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats?.trendings?.map((trend, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">{trend.label}</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-gray-900">{trend.value}</p>
                <span className="text-sm font-medium text-green-600">{trend.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Growth Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Growth</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Chart visualization coming soon</p>
            <p className="text-2xl font-bold text-green-600 mt-2">+{stats?.monthlyGrowth || 0}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;