import React, { useState, useEffect } from 'react';
import { Target, Play, Trophy, User, Coffee, Book, FileText, Users, Plus, X } from 'lucide-react';
import GameMaze from './components/GameMaze';
import RanksPage from './components/RanksPage';
import ProfilePage from './components/ProfilePage';

interface Task {
  id: string;
  name: string;
  category: 'power-pellet' | 'big-bite' | 'quick-snack' | 'ghost-buster';
  points: number;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', name: 'Complete Project Report', category: 'power-pellet', points: 100, completed: false },
    { id: '2', name: 'Team Meeting', category: 'quick-snack', points: 50, completed: false },
    { id: '3', name: 'Daily Exercise', category: 'quick-snack', points: 25, completed: false },
    { id: '4', name: 'Read a Book', category: 'ghost-buster', points: 75, completed: false },
  ]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', category: 'quick-snack' as Task['category'] });
  const [currentView, setCurrentView] = useState<'tasks' | 'play' | 'ranks' | 'profile'>('tasks');
  const [level, setLevel] = useState(5);
  const [currentStreak, setCurrentStreak] = useState(3);
  const [highestStreak, setHighestStreak] = useState(7);
  const [lastCompletionDate, setLastCompletionDate] = useState<string | null>(null);

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalPoints = tasks.reduce((sum, task) => sum + (task.completed ? task.points : 0), 0);
  const progress = (totalPoints / 1500) * 100; // 1500 points needed for level completion
  const lives = 3;

  // Check and update streak
  useEffect(() => {
    const today = new Date().toDateString();
    
    if (completedTasks === tasks.length) {
      if (lastCompletionDate !== today) {
        setCurrentStreak(prev => {
          const newStreak = prev + 1;
          if (newStreak > highestStreak) {
            setHighestStreak(newStreak);
          }
          return newStreak;
        });
        setLastCompletionDate(today);
      }
    }
  }, [completedTasks, tasks.length, lastCompletionDate, highestStreak]);

  // Check for level up
  useEffect(() => {
    if (totalPoints >= 1500) {
      setLevel(prev => prev + 1);
    }
  }, [totalPoints]);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addNewTask = () => {
    if (newTask.name.trim()) {
      const points = {
        'power-pellet': 100,
        'big-bite': 80,
        'quick-snack': 50,
        'ghost-buster': 25
      }[newTask.category];

      setTasks([...tasks, {
        id: Date.now().toString(),
        name: newTask.name,
        category: newTask.category,
        points,
        completed: false
      }]);
      setNewTask({ name: '', category: 'quick-snack' });
      setShowAddTask(false);
    }
  };

  const getCategoryIcon = (category: Task['category']) => {
    switch (category) {
      case 'power-pellet': return <Target className="w-6 h-6" />;
      case 'big-bite': return <FileText className="w-6 h-6" />;
      case 'quick-snack': return <Coffee className="w-6 h-6" />;
      case 'ghost-buster': return <Book className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1b26] text-white">
      {/* Header */}
      <header className="bg-[#2b2d42] p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-300">Pac-Track</h1>
          <nav className="flex space-x-8">
            <button 
              onClick={() => setCurrentView('tasks')}
              className={`flex items-center space-x-2 ${currentView === 'tasks' ? 'text-yellow-300' : 'text-blue-300'}`}
            >
              <Target className="w-5 h-5" />
              <span>Tasks</span>
            </button>
            <button 
              onClick={() => setCurrentView('play')}
              className={`flex items-center space-x-2 ${currentView === 'play' ? 'text-yellow-300' : 'text-blue-300'}`}
            >
              <Play className="w-5 h-5" />
              <span>Play</span>
            </button>
            <button 
              onClick={() => setCurrentView('ranks')}
              className={`flex items-center space-x-2 ${currentView === 'ranks' ? 'text-yellow-300' : 'text-blue-300'}`}
            >
              <Trophy className="w-5 h-5" />
              <span>Ranks</span>
            </button>
            <button 
              onClick={() => setCurrentView('profile')}
              className={`flex items-center space-x-2 ${currentView === 'profile' ? 'text-yellow-300' : 'text-blue-300'}`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {currentView === 'tasks' && (
          <div className="space-y-8">
            {/* Level and Lives */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Daily Tasks</h2>
                <p className="text-blue-300">Level {level} • {totalPoints} Points</p>
              </div>
              <div className="flex space-x-1">
                {Array.from({ length: lives }).map((_, i) => (
                  <span key={i} role="img" aria-label="life" className="text-2xl">❤️</span>
                ))}
              </div>
            </div>

            {/* Task List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map(task => (
                <div 
                  key={task.id}
                  className={`p-4 rounded-lg border ${
                    task.category === 'power-pellet' ? 'bg-red-900/30 border-red-700' :
                    task.category === 'big-bite' ? 'bg-purple-900/30 border-purple-700' :
                    task.category === 'quick-snack' ? 'bg-green-900/30 border-green-700' :
                    'bg-blue-900/30 border-blue-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(task.category)}
                      <div>
                        <h3 className="font-semibold">{task.name}</h3>
                        <p className="text-sm text-gray-400">
                          {task.category.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold">+{task.points} pts</span>
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`w-6 h-6 rounded ${
                          task.completed ? 'bg-yellow-300' : 'border-2 border-gray-400'
                        }`}
                      >
                        {task.completed && <span className="text-black">✓</span>}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="bg-blue-900/30 rounded-lg p-6 border border-blue-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Daily Progress</h3>
                <button
                  onClick={() => setCurrentView('play')}
                  className="bg-yellow-300 text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-400"
                >
                  Play Now
                </button>
              </div>
              <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-300 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center mt-2 text-blue-300">
                Complete {tasks.length - completedTasks} more tasks to clear the level!
              </p>
            </div>

            {/* Add Task Button */}
            <button
              onClick={() => setShowAddTask(true)}
              className="fixed bottom-6 right-6 bg-yellow-300 text-black p-4 rounded-full shadow-lg hover:bg-yellow-400"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        )}

        {currentView === 'play' && (
          <GameMaze 
            completedTasks={completedTasks}
            taskPoints={totalPoints}
          />
        )}

        {currentView === 'ranks' && (
          <RanksPage
            totalPoints={totalPoints}
            completedTasks={completedTasks}
            currentStreak={currentStreak}
            highestStreak={highestStreak}
          />
        )}

        {currentView === 'profile' && (
          <ProfilePage
            totalPoints={totalPoints}
            completedTasks={completedTasks}
            currentStreak={currentStreak}
            highestStreak={highestStreak}
            level={level}
          />
        )}

        {/* Add Task Modal */}
        {showAddTask && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-[#2b2d42] p-6 rounded-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Add New Task</h3>
                <button onClick={() => setShowAddTask(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <input
                type="text"
                placeholder="Task name"
                className="w-full p-2 mb-4 bg-gray-700 rounded"
                value={newTask.name}
                onChange={e => setNewTask({ ...newTask, name: e.target.value })}
              />
              <select
                className="w-full p-2 mb-4 bg-gray-700 rounded"
                value={newTask.category}
                onChange={e => setNewTask({ ...newTask, category: e.target.value as Task['category'] })}
              >
                <option value="power-pellet">Power Pellet (100 pts)</option>
                <option value="big-bite">Big Bite (80 pts)</option>
                <option value="quick-snack">Quick Snack (50 pts)</option>
                <option value="ghost-buster">Ghost Buster (25 pts)</option>
              </select>
              <button
                onClick={addNewTask}
                className="w-full bg-yellow-300 text-black p-2 rounded font-bold hover:bg-yellow-400"
              >
                Add Task
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;