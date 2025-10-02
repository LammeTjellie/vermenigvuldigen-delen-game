import React from 'react';

interface AnswerButtonProps {
  answer: number;
  onClick: () => void;
  disabled: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ answer, onClick, disabled, isCorrect, isIncorrect }) => {
  const getButtonClasses = () => {
    let baseClasses = "w-full py-6 text-4xl font-bold rounded-xl shadow-lg transform transition-all duration-150 ease-in-out ";
    let colorClasses = "bg-white text-indigo-600 border-b-8 border-gray-300 hover:bg-gray-100 active:bg-gray-200 active:border-b-4 active:translate-y-1";

    if (disabled) {
        if (isCorrect) {
            colorClasses = "bg-green-500 text-white border-b-8 border-green-700 scale-110 animate-bounce";
        } else {
            colorClasses = "bg-gray-300 text-gray-500 border-b-8 border-gray-400 opacity-50 cursor-not-allowed";
        }
    }
    
    return baseClasses + colorClasses;
  };
  
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={getButtonClasses()}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {answer}
    </button>
  );
};

export default AnswerButton;