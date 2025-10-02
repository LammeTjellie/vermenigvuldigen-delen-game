
import React from 'react';
import { Operation } from '../types';

interface QuestionCardProps {
  num1: number;
  num2: number;
  operator: Operation;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ num1, num2, operator }) => {
  const operatorSymbol = operator === 'multiplication' ? '×' : '÷';
  
  return (
    <div
      className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30"
      style={{ transform: 'rotateY(-10deg) rotateX(10deg)', transformStyle: 'preserve-3d' }}
    >
      <div className="flex justify-center items-center space-x-6 text-7xl md:text-8xl font-bold text-slate-800">
        <span className="bg-white px-4 py-2 rounded-lg shadow-lg">{num1}</span>
        <span className="text-white text-6xl">{operatorSymbol}</span>
        <span className="bg-white px-4 py-2 rounded-lg shadow-lg">{num2}</span>
      </div>
    </div>
  );
};

export default QuestionCard;
