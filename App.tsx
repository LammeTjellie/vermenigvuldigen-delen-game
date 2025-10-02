import React, { useState, useCallback, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import { generateQuestion, shuffleArray } from './utils/gameLogic';
import type { Question, Difficulty, GameType } from './types';
import { GameState } from './types';

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [score, setScore] = useState<number>(0);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameSettings, setGameSettings] = useState<{difficulty: Difficulty, gameType: GameType} | null>(null);
  const [reviewQuestions, setReviewQuestions] = useState<Question[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [duration, setDuration] = useState<number>(0);
  
  const startGame = useCallback((difficulty: Difficulty, gameType: GameType) => {
    setGameSettings({ difficulty, gameType });
    setScore(0);
    setQuestionsAnswered(0);
    setReviewQuestions([]);
    setCurrentQuestion(generateQuestion(difficulty, gameType));
    setGameState(GameState.Playing);
    setStartTime(performance.now());
  }, []);

  const playAgain = useCallback(() => {
    setGameState(GameState.Start);
    setGameSettings(null);
  }, []);

  const endTheGame = useCallback(() => {
    if (startTime) {
      const endTime = performance.now();
      setDuration(Math.round((endTime - startTime) / 1000));
    }
    setGameState(GameState.End);
  }, [startTime]);
  
  const handleAnswer = useCallback((selectedAnswer: number) => {
    if (!currentQuestion || !gameSettings) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 10);
    } else {
      if (gameSettings.gameType === 'Leer modus') {
        setReviewQuestions(prev => [...prev, currentQuestion]);
      }
    }

    if (gameState === GameState.Playing) {
      const nextQuestionNumber = questionsAnswered + 1;
      setQuestionsAnswered(nextQuestionNumber);

      if (nextQuestionNumber >= TOTAL_QUESTIONS) {
        if (gameSettings.gameType === 'Leer modus' && reviewQuestions.length > 0) {
           const shuffledReview = shuffleArray([...reviewQuestions, ...(isCorrect ? [] : [currentQuestion])]);
           setReviewQuestions(shuffledReview);
           setCurrentQuestion(shuffledReview[0]);
           setGameState(GameState.Reviewing);
        } else {
           endTheGame();
        }
      } else {
        setCurrentQuestion(generateQuestion(gameSettings.difficulty, gameSettings.gameType));
      }
    } else if (gameState === GameState.Reviewing) {
        let updatedReviewQuestions = [...reviewQuestions];
        if (isCorrect) {
          updatedReviewQuestions.shift(); // Remove correct answer from list
        } else {
          // Move incorrect answer to the end of the list to ask again
          const failedQuestion = updatedReviewQuestions.shift();
          if(failedQuestion) updatedReviewQuestions.push(failedQuestion);
        }

        if (updatedReviewQuestions.length === 0) {
          endTheGame();
        } else {
          setReviewQuestions(updatedReviewQuestions);
          setCurrentQuestion(updatedReviewQuestions[0]);
        }
    }

  }, [currentQuestion, questionsAnswered, gameSettings, gameState, reviewQuestions, endTheGame]);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
      case GameState.Reviewing:
        return currentQuestion && gameSettings && (
          <GameScreen
            question={currentQuestion}
            onAnswer={handleAnswer}
            score={score}
            questionNumber={questionsAnswered + 1}
            totalQuestions={TOTAL_QUESTIONS}
            isReviewing={gameState === GameState.Reviewing}
            reviewCount={reviewQuestions.length}
            difficulty={gameSettings.difficulty}
          />
        );
      case GameState.End:
        return (
          <EndScreen
            score={score}
            totalQuestions={TOTAL_QUESTIONS}
            onPlayAgain={playAgain}
            duration={duration}
          />
        );
      case GameState.Start:
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <main className="bg-gradient-to-br from-sky-400 to-indigo-600 h-screen w-full flex flex-col items-center justify-center p-2 text-white overflow-hidden" style={{ perspective: '1200px' }}>
      {renderContent()}
    </main>
  );
};

export default App;