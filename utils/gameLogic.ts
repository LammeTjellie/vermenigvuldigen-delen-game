// Fix: The `import type` statement prevents enums like `Difficulty` and `GameType` from being used as values. Changed to a regular `import` to allow access to enum members at runtime.
import { Question, Difficulty, GameType, Operation } from '../types';

export const shuffleArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateQuestion = (difficulty: Difficulty, gameType: GameType): Question => {
  let num1: number;
  let num2: number;
  let correctAnswer: number;
  let operator: Operation;

  // Determine operator
  if (gameType === GameType.Multiplication) {
    operator = 'multiplication';
  } else if (gameType === GameType.Division) {
    operator = 'division';
  } else { // Mixed or Learning Mode
    operator = Math.random() > 0.5 ? 'multiplication' : 'division';
  }

  // Determine number ranges based on difficulty
  // For Easy and Medium, the numbers/results will stay within the 1-10 tables.
  if (operator === 'multiplication') {
    let range1 = 10, range2 = 10;
     if (difficulty === Difficulty.Easy) {
      range1 = 10;
      range2 = 5;
    } else if (difficulty === Difficulty.Medium) {
      range1 = 10;
      range2 = 10;
    } else if (difficulty === Difficulty.Hard) {
      range1 = 12;
      range2 = 12;
    }
    num1 = Math.floor(Math.random() * range1) + 1;
    num2 = Math.floor(Math.random() * range2) + 1;
    correctAnswer = num1 * num2;
  } else { // Division
    const divisorRange = difficulty === Difficulty.Easy ? 4 : (difficulty === Difficulty.Medium ? 9 : 11); // Max divisor: 5, 10, 12
    const quotientRange = difficulty === Difficulty.Easy ? 10 : (difficulty === Difficulty.Medium ? 10 : 12); // Max quotient: 10, 10, 12

    num2 = Math.floor(Math.random() * divisorRange) + 2; // Divisor, avoid 1
    correctAnswer = Math.floor(Math.random() * quotientRange) + 1; // Quotient
    num1 = num2 * correctAnswer; // Dividend
  }

  const options: Set<number> = new Set([correctAnswer]);

  while (options.size < 4) {
    const isNearby = Math.random() > 0.3;
    let incorrectAnswer: number;

    if (isNearby) {
      const offset = Math.floor(Math.random() * 5) + 1;
      incorrectAnswer = correctAnswer + (Math.random() > 0.5 ? offset : -offset);
    } else {
        if(operator === 'multiplication') {
            const wrongNum1 = num1 + (Math.random() > 0.5 ? 1 : -1);
            const wrongNum2 = num2 + (Math.random() > 0.5 ? 1 : -1);
            incorrectAnswer = (Math.random() > 0.5 ? wrongNum1 : num1) * (Math.random() > 0.5 ? wrongNum2 : num2);
        } else { // division
            const randomFactor = Math.random();
            if(randomFactor > 0.66) {
                incorrectAnswer = Math.round(num1 / (num2 + (Math.random() > 0.5 ? 1 : -1)));
            } else if (randomFactor > 0.33) {
                 incorrectAnswer = Math.round((num1 + (Math.random() > 0.5 ? num2 : -num2)) / num2);
            }
            else {
                 incorrectAnswer = correctAnswer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1);
            }
        }
    }

    if (incorrectAnswer > 0 && incorrectAnswer !== correctAnswer) {
      options.add(Math.round(incorrectAnswer));
    }
  }

  const shuffledOptions = shuffleArray(Array.from(options));

  return {
    num1,
    num2,
    operator,
    correctAnswer,
    options: shuffledOptions,
  };
};