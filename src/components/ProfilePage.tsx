import React from 'react';
import { Trophy, Star, Flame, Shield, Award, Target } from 'lucide-react';

interface ProfilePageProps {
  totalPoints: number;
  completedTasks: number;
  currentStreak: number;
  highestStreak: number;
  level: number;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  totalPoints,
  completedTasks,
  currentStreak,
  highestStreak,
  level
}) => {
  const stats = [
    {
      label: 'Current Level',
      value: level,
      icon: <Target className="w-6 h-6 text-blue-400" />
    },
    {
      label: 'Total Points',
      value: totalPoints,
      icon: <Star className="w-6 h-6 text-yellow-400" />
    },
    {
      label: 'Tasks Completed',
      value: completedTasks,
      icon: <Trophy className="w-6 h-6 text-purple-400" />
    },
    {
      label: 'Current Streak',
      value: currentStreak,
      icon: <Flame className="w-6 h-6 text-orange-400" />
    }
  ];

  const recentActivity = [
    { type: 'task', name: 'Completed Project Report', points: 100, time: '2h ago' },
    { type: 'game', name: 'Perfect Game Run', points: 300, time: '3h ago' },
    { type: 'streak', name: 'New Streak Record', points: 150, time: '1d ago' },
    { type: 'achievement', name: 'Ghost Hunter Badge', points: 200, time: '2d ago' }
  ];

  const badges = [
    { name: 'Early Bird', icon: <Award className="w-8 h-8 text-yellow-400" /> },
    { name: 'Task Master', icon: <Trophy className="w-8 h-8 text-purple-400" /> },
    { name: 'Perfect Week', icon: <Flame className="w-8 h-8 text-orange-400" /> },
    { name: 'Champion', icon: <Shield className="w-8 h-8 text-blue-400" /> }
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-[#2b2d42] rounded-lg p-6 border border-gray-700">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center text-4xl font-bold">
            P
          </div>
          <div>
            <h2 className="text-2xl font-bold">Player One</h2>
            <p className="text-gray-400">Joined 30 days ago</p>
            <div className="mt-2 flex items-center space-x-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span>{currentStreak} Day Streak</span>
              <span className="text-gray-500">
                (Best: {highestStreak} days)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#2b2d42] rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center space-x-3">
              {stat.icon}
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="bg-[#2b2d42] rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Earned Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.name}
              className="flex flex-col items-center space-y-2 p-4 bg-gray-800/50 rounded-lg"
            >
              <div className="p-3 bg-gray-700 rounded-full">
                {badge.icon}
              </div>
              <span className="text-sm font-medium">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#2b2d42] rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {activity.type === 'task' && (
                  <Target className="w-5 h-5 text-blue-400" />
                )}
                {activity.type === 'game' && (
                  <Trophy className="w-5 h-5 text-purple-400" />
                )}
                {activity.type === 'streak' && (
                  <Flame className="w-5 h-5 text-orange-400" />
                )}
                {activity.type === 'achievement' && (
                  <Award className="w-5 h-5 text-yellow-400" />
                )}
                <div>
                  <div className="font-medium">{activity.name}</div>
                  <div className="text-sm text-gray-400">{activity.time}</div>
                </div>
              </div>
              <div className="text-yellow-400 font-bold">
                +{activity.points} pts
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;