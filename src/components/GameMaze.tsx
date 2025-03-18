import React, { useState, useEffect, useCallback } from 'react';
import { Ghost } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface GameState {
  pacman: Position;
  ghosts: Position[];
  pellets: Position[];
  score: number;
  lives: number;
  gameOver: boolean;
}

interface GameMazeProps {
  completedTasks: number;
  taskPoints: number;
}

const GRID_SIZE = 15;
const CELL_SIZE = 30;
const GAME_SPEED = 200;

const GameMaze: React.FC<GameMazeProps> = ({ completedTasks, taskPoints }) => {
  const [gameState, setGameState] = useState<GameState>({
    pacman: { x: 1, y: 1 },
    ghosts: [
      { x: GRID_SIZE - 2, y: 1 },
      { x: 1, y: GRID_SIZE - 2 },
      { x: GRID_SIZE - 2, y: GRID_SIZE - 2 }
    ],
    pellets: Array.from({ length: completedTasks * 2 }, () => ({
      x: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
      y: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1
    })),
    score: taskPoints,
    lives: 3,
    gameOver: false
  });

  // Reset game when completed tasks change
  useEffect(() => {
    setGameState(prev => ({
      ...prev,
      pellets: Array.from({ length: completedTasks * 2 }, () => ({
        x: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
        y: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1
      })),
      score: taskPoints
    }));
  }, [completedTasks, taskPoints]);

  const moveGhosts = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      ghosts: prev.ghosts.map(ghost => {
        const dx = Math.random() < 0.5 ? 1 : -1;
        const dy = Math.random() < 0.5 ? 1 : -1;
        return {
          x: Math.max(1, Math.min(GRID_SIZE - 2, ghost.x + (Math.random() < 0.5 ? dx : 0))),
          y: Math.max(1, Math.min(GRID_SIZE - 2, ghost.y + (Math.random() < 0.5 ? dy : 0)))
        };
      })
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(moveGhosts, GAME_SPEED);
    return () => clearInterval(interval);
  }, [moveGhosts]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameState.gameOver) return;

    setGameState(prev => {
      let newX = prev.pacman.x;
      let newY = prev.pacman.y;

      switch (e.key) {
        case 'ArrowUp': newY = Math.max(1, prev.pacman.y - 1); break;
        case 'ArrowDown': newY = Math.min(GRID_SIZE - 2, prev.pacman.y + 1); break;
        case 'ArrowLeft': newX = Math.max(1, prev.pacman.x - 1); break;
        case 'ArrowRight': newX = Math.min(GRID_SIZE - 2, prev.pacman.x + 1); break;
        default: return prev;
      }

      // Check for pellet collection
      const remainingPellets = prev.pellets.filter(pellet =>
        !(pellet.x === newX && pellet.y === newY)
      );

      // Check for ghost collision
      const ghostCollision = prev.ghosts.some(ghost =>
        ghost.x === newX && ghost.y === newY
      );

      if (ghostCollision) {
        const newLives = prev.lives - 1;
        if (newLives === 0) {
          return { ...prev, gameOver: true };
        }
        return {
          ...prev,
          lives: newLives,
          pacman: { x: 1, y: 1 }
        };
      }

      return {
        ...prev,
        pacman: { x: newX, y: newY },
        pellets: remainingPellets,
        score: prev.score + (remainingPellets.length < prev.pellets.length ? 50 : 0)
      };
    });
  }, [gameState.gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const resetGame = () => {
    setGameState({
      pacman: { x: 1, y: 1 },
      ghosts: [
        { x: GRID_SIZE - 2, y: 1 },
        { x: 1, y: GRID_SIZE - 2 },
        { x: GRID_SIZE - 2, y: GRID_SIZE - 2 }
      ],
      pellets: Array.from({ length: completedTasks * 2 }, () => ({
        x: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
        y: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1
      })),
      score: taskPoints,
      lives: 3,
      gameOver: false
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Game Maze</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span>Score:</span>
            <span className="text-2xl font-bold">{gameState.score}</span>
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: gameState.lives }).map((_, i) => (
              <span key={i} className="text-2xl">❤️</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-900/30 rounded-lg p-8 border border-blue-700">
        <div
          className="relative bg-black rounded-lg overflow-hidden"
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
            margin: '0 auto'
          }}
        >
          {/* Walls */}
          <div className="absolute inset-0 border-2 border-blue-500" />

          {/* Pellets */}
          {gameState.pellets.map((pellet, index) => (
            <div
              key={index}
              className="absolute w-3 h-3 bg-yellow-300 rounded-full"
              style={{
                left: pellet.x * CELL_SIZE + CELL_SIZE/2 - 6,
                top: pellet.y * CELL_SIZE + CELL_SIZE/2 - 6
              }}
            />
          ))}

          {/* Pac-Man */}
          <div
            className="absolute w-6 h-6 bg-yellow-300 rounded-full"
            style={{
              left: gameState.pacman.x * CELL_SIZE + CELL_SIZE/2 - 12,
              top: gameState.pacman.y * CELL_SIZE + CELL_SIZE/2 - 12,
              transition: 'all 0.2s'
            }}
          />

          {/* Ghosts */}
          {gameState.ghosts.map((ghost, index) => (
            <Ghost
              key={index}
              className={`absolute w-6 h-6 ${
                index === 0 ? 'text-red-400' :
                index === 1 ? 'text-blue-400' :
                'text-pink-400'
              }`}
              style={{
                left: ghost.x * CELL_SIZE + CELL_SIZE/2 - 12,
                top: ghost.y * CELL_SIZE + CELL_SIZE/2 - 12,
                transition: 'all 0.2s'
              }}
            />
          ))}

          {/* Game Over Overlay */}
          {gameState.gameOver && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center flex-col">
              <h2 className="text-4xl font-bold mb-4">Game Over</h2>
              <p className="text-xl mb-4">Final Score: {gameState.score}</p>
              <button
                onClick={resetGame}
                className="bg-yellow-300 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-400"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-blue-300">
        <p>Use arrow keys to move Pac-Man</p>
        <p>Complete more tasks to get more pellets!</p>
        <p className="mt-2 text-yellow-300">
          {completedTasks} tasks completed = {completedTasks * 2} pellets
        </p>
      </div>
    </div>
  );
};

export default GameMaze;