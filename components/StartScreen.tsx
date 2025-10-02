import React, { useState } from 'react';
import { Difficulty, GameType } from '../types';

interface StartScreenProps {
  onStart: (difficulty: Difficulty, gameType: GameType) => void;
}

const OptionButton: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}> = ({ onClick, isActive, children }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-bold text-base shadow-md border-b-4 transform transition-all duration-150 ease-in-out";
  const activeClasses = "bg-yellow-400 text-slate-800 border-yellow-600 scale-105";
  const inactiveClasses = "bg-white/20 text-white border-white/30 hover:bg-white/30";
  
  const handleClick = () => {
    onClick();
  }

  return (
    <button onClick={handleClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {children}
    </button>
  );
};

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [gameType, setGameType] = useState<GameType | null>(null);

  const canStart = difficulty && gameType;

  return (
    <div className="text-center flex flex-col items-center animate-[fade-in_1s_ease-in-out] w-full max-w-2xl">
      <div style={{ transform: 'rotateX(15deg)' }}>
        <h1 className="text-7xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500"
          style={{ WebkitTextStroke: '3px rgba(0,0,0,0.2)' }}>
          Rekenkampioen
        </h1>
      </div>
      <p className="mt-2 mb-6 text-base md:text-lg text-sky-100 max-w-md">
        Klaar om een rekenwonder te worden? Kies je uitdaging!
      </p>

      <div className="bg-black/20 p-4 rounded-2xl w-full">
        <h2 className="text-xl font-semibold mb-3 text-yellow-300">Kies een moeilijkheidsgraad</h2>
        <div className="flex justify-center gap-4">
          {Object.values(Difficulty).map(d => (
            <OptionButton key={d} onClick={() => setDifficulty(d)} isActive={difficulty === d}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </OptionButton>
          ))}
        </div>
      </div>

      <div className="bg-black/20 p-4 rounded-2xl w-full mt-4">
        <h2 className="text-xl font-semibold mb-3 text-yellow-300">Kies een speltype</h2>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {Object.values(GameType).map(t => (
            <OptionButton key={t} onClick={() => setGameType(t)} isActive={gameType === t}>
              {t}
            </OptionButton>
          ))}
        </div>
      </div>

      <button
        onClick={() => canStart && onStart(difficulty!, gameType!)}
        disabled={!canStart}
        className="mt-8 px-10 py-3 bg-green-500 text-white font-bold text-xl rounded-xl shadow-lg border-b-8 border-green-700 hover:bg-green-400 active:bg-green-600 active:border-b-4 active:translate-y-1 transform transition-all duration-150 ease-in-out hover:scale-105 disabled:bg-gray-400 disabled:border-gray-500 disabled:cursor-not-allowed disabled:scale-100"
      >
        Start Spel
      </button>
    </div>
  );
};

export default StartScreen;