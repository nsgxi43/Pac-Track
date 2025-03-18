import React from 'react';
import { Trophy, Star, Flame, Shield } from 'lucide-react';

interface RanksPageProps {
  totalPoints: number;
  completedTasks: number;
  currentStreak: number;
  highestStreak: number;
}

const RanksPage: React.FC<RanksPageProps> = ({
  totalPoints,
  completedTasks,
  currentStreak,
  highestStreak
}) => {
  const achievements = [
    {
      name: 'Ghost Hunter',
      description: 'Complete all daily tasks',
      progress: (completedTasks / 4) * 100,
      icon: <Trophy className="w-8 h-8 text-yellow-400" />,
      color: 'from-yellow-600 to-yellow-900'
    },
    {
      name: 'Streak Master',
      description: `${currentStreak} day streak`,
      progress: (currentStreak / 7) * 100,
      icon: <Flame className="w-8 h-8 text-orange-400" />,
      color: 'from-orange-600 to-orange-900'
    },
    {
      name: 'Point Champion',
      description: `${totalPoints} points earned`,
      progress: (totalPoints / 1500) * 100,
      icon: <Star className="w-8 h-8 text-purple-400" />,
      color: 'from-purple-600 to-purple-900'
    },
    {
      name: 'Survivor',
      description: 'Complete game with 1 life',
      progress: 60,
      icon: <Shield className="w-8 h-8 text-blue-400" />,
      color: 'from-blue-600 to-blue-900'
    }
  ];

  const leaderboard = [
    { name: 'Player 1', points: 2500, streak: 7 },
    { name: 'Player 2', points: 2000, streak: 5 },
    { name: 'Player 3', points: 1800, streak: 4 },
    { name: 'You', points: totalPoints, streak: currentStreak },
    { name: 'Player 4', points: 1200, streak: 2 }
  ].sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Rankings & Achievements</h2>
        <div className="flex items-center space-x-2">
          <Flame className="w-6 h-6 text-orange-400" />
          <span className="text-xl">
            {currentStreak} Day Streak (Best: {highestStreak})
          </span>
        </div>
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.name}
            className="bg-[#2b2d42] rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-800 rounded-lg">
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{achievement.name}</h3>
                <p className="text-sm text-gray-400">{achievement.description}</p>
                <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${achievement.color} transition-all duration-500`}
                    style={{ width: `${Math.min(100, achievement.progress)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="bg-[#2b2d42] rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Global Leaderboard</h3>
        <div className="space-y-4">
          {leaderboard.map((player, index) => (
            <div
              key={player.name}
              className={`flex items-center justify-between p-3 rounded-lg ${
                player.name === 'You'
                  ? 'bg-yellow-500/20 border border-yellow-500/50'
                  : 'bg-gray-800/50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-gray-500">
                  #{index + 1}
                </span>
                <span className="font-semibold">{player.name}</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span>{player.streak}</span>
                </div>
                <div className="w-24 text-right font-bold text-yellow-400">
                  {player.points} pts
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RanksPage;