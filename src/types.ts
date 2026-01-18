export type GameMode = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'random';

export type Difficulty = 'easy' | 'normal' | 'hard';

export interface Question {
    id: string; // Unique ID for key props
    mode: GameMode;
    difficulty: Difficulty;
    num1: number;
    num2: number;
    operator: string; // '+', '-', '×', '÷'
    answer: number;
}

export interface GameState {
    currentMode: GameMode;
    currentDifficulty: Difficulty;
    questions: Question[];
    currentQuestionIndex: number;
    userAnswers: (string | null)[]; // User's input so far
    isGameActive: boolean;
    isGameFinished: boolean;
    score: {
        correct: number;
        incorrect: number;
    };
    startTime: number | null;
    endTime: number | null;
}

export interface RankingEntry {
    date: string;
    mode: GameMode;
    difficulty: Difficulty;
    timeMs: number;
    correctCount: number;
    timestamp: number; // for sorting
}
