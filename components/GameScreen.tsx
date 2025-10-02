import React, { useState, useEffect } from 'react';
import type { Question } from '../types';
import { Difficulty } from '../types';
import QuestionCard from './QuestionCard';
import AnswerButton from './AnswerButton';
import NumberPadInput from './NumberPadInput';

interface GameScreenProps {
  question: Question;
  onAnswer: (selectedAnswer: number) => void;
  score: number;
  questionNumber: number;
  totalQuestions: number;
  isReviewing: boolean;
  reviewCount: number;
  difficulty: Difficulty;
}

type Feedback = 'correct' | 'incorrect' | null;

const GameScreen: React.FC<GameScreenProps> = ({ question, onAnswer, score, questionNumber, totalQuestions, isReviewing, reviewCount, difficulty }) => {
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setIsAnswered(false);
    setFeedback(null);
    setKey(prev => prev + 1);
  }, [question]);

  const handleSelectAnswer = (answer: number) => {
    if (isAnswered) return;

    setIsAnswered(true);
    const isCorrect = answer === question.correctAnswer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      onAnswer(answer);
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6 px-4">
        <div className="bg-black/20 px-4 py-2 rounded-lg shadow-md">
          <span className="font-bold text-xl">Score: {score}</span>
        </div>
        <div className="bg-black/20 px-4 py-2 rounded-lg shadow-md">
          {isReviewing ? (
            <div className="text-center">
              <div className="font-bold text-yellow-300 text-lg">Bonusronde!</div>
              <div className="font-bold text-xl">Nog te gaan: {reviewCount}</div>
            </div>
          ) : (
            <div className="font-bold text-xl">Vraag: {questionNumber > totalQuestions ? totalQuestions : questionNumber} / {totalQuestions}</div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-center w-full">
        <QuestionCard key={key} num1={question.num1} num2={question.num2} operator={question.operator} />
      </div>

      {difficulty === Difficulty.Easy ? (
        <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-md">
          {question.options.map((option, index) => (
            <AnswerButton
              key={index}
              answer={option}
              onClick={() => handleSelectAnswer(option)}
              disabled={isAnswered}
              isCorrect={isAnswered && option === question.correctAnswer}
              isIncorrect={isAnswered && option !== question.correctAnswer}
            />
          ))}
        </div>
      ) : (
        <NumberPadInput 
          onSubmit={handleSelectAnswer}
          disabled={isAnswered}
          isCorrect={feedback === 'correct'}
          isIncorrect={feedback === 'incorrect'}
        />
      )}
      
    </div>
  );
};

export default GameScreen;