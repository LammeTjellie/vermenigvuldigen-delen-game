import React from 'react';

interface EndScreenProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  duration: number; // in seconds
}

const formatDuration = (seconds: number) => {
  if (seconds === 0) return '';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  let result = "Totale tijd: ";
  if (minutes > 0) {
    result += `${minutes} ${minutes === 1 ? 'minuut' : 'minuten'}`;
  }
  if (remainingSeconds > 0) {
    if (minutes > 0) result += " en ";
    result += `${remainingSeconds} ${remainingSeconds === 1 ? 'seconde' : 'seconden'}`;
  }
  return result;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, totalQuestions, onPlayAgain, duration }) => {
  const percentage = Math.round((score / (totalQuestions * 10)) * 100);
  let message = "Goed geprobeerd! Blijf oefenen!";
  if (percentage >= 90) {
    message = "Uitstekend werk! Je bent een Rekenkampioen!";
  } else if (percentage >= 70) {
    message = "Goed gedaan! Bijna een kampioen!";
  }

  const handlePlayAgainClick = () => {
    onPlayAgain();
  }

  return (
    <div 
      className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-2xl text-center flex flex-col items-center border border-white/20 animate-[fade-in_0.5s_ease-in-out]"
      style={{ transform: 'rotateX(-5deg) rotateY(5deg)' }}
    >
      <h2 className="text-3xl font-bold text-yellow-300">Spel Voorbij!</h2>
      <p className="mt-2 text-lg">Je eindscore is:</p>
      <p className="text-6xl font-bold my-2">{score}</p>
      <p className="text-base text-sky-200">{message}</p>
      <p className="text-sm mt-1 text-white/80">{formatDuration(duration)}</p>
      <button
        onClick={handlePlayAgainClick}
        className="mt-4 px-8 py-2 bg-yellow-400 text-slate-800 font-bold text-lg rounded-xl shadow-lg border-b-8 border-yellow-600 hover:bg-yellow-300 active:bg-yellow-500 active:border-b-4 active:translate-y-1 transform transition-all duration-150 ease-in-out hover:scale-105"
      >
        Opnieuw Spelen
      </button>
    </div>
  );
};

export default EndScreen;