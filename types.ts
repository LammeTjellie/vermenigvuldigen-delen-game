export enum GameState {
  Start,
  Playing,
  Reviewing,
  End,
}

export enum Difficulty {
  Easy = 'makkelijk',
  Medium = 'gemiddeld',
  Hard = 'moeilijk',
}

export enum GameType {
  Multiplication = 'Vermenigvuldigen',
  Division = 'Delen door',
  Mixed = 'Vermenigvuldigen en delen door',
  Learning = 'Leer modus',
}

export type Operation = 'multiplication' | 'division';

export interface Question {
  num1: number;
  num2: number;
  operator: Operation;
  correctAnswer: number;
  options: number[];
}