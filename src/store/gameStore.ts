import { create } from 'zustand';
import type { Difficulty, GameMode, GameState, RankingEntry } from '../types';
import { generateQuestions } from '../utils/mathLogic';

interface GameStore extends GameState {
    // Actions
    setMode: (mode: GameMode) => void;
    setDifficulty: (difficulty: Difficulty) => void;
    startGame: () => void;
    submitAnswer: (userAnswerStr: string) => void;
    resetGame: () => void;
    saveScoreToRanking: () => void; // Save current score to local storage
}

const STORAGE_KEY = 'math-master-ranking';

export const useGameStore = create<GameStore>((set, get) => ({
    // Initial State
    currentMode: 'addition',
    currentDifficulty: 'normal',
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    isGameActive: false,
    isGameFinished: false,
    score: { correct: 0, incorrect: 0 },
    startTime: null,
    endTime: null,

    setMode: (mode) => set({ currentMode: mode }),
    setDifficulty: (difficulty) => set({ currentDifficulty: difficulty }),

    startGame: () => {
        const { currentMode, currentDifficulty } = get();
        const questions = generateQuestions(10, currentMode, currentDifficulty);
        set({
            questions,
            currentQuestionIndex: 0,
            userAnswers: [], // Initialize empty
            isGameActive: true,
            isGameFinished: false,
            score: { correct: 0, incorrect: 0 },
            startTime: Date.now(),
            endTime: null,
        });
    },

    submitAnswer: (userAnswerStr) => {
        const {
            questions,
            currentQuestionIndex,
            userAnswers,
            score
        } = get();

        if (currentQuestionIndex >= questions.length) return;

        const currentQ = questions[currentQuestionIndex];
        const isCorrect = parseInt(userAnswerStr, 10) === currentQ.answer;

        const newScore = {
            correct: score.correct + (isCorrect ? 1 : 0),
            incorrect: score.incorrect + (isCorrect ? 0 : 1),
        };

        const newAnwers = [...userAnswers, userAnswerStr];

        // Check if last question
        if (currentQuestionIndex >= questions.length - 1) {
            // Game Over
            set({
                userAnswers: newAnwers,
                score: newScore,
                currentQuestionIndex: currentQuestionIndex + 1,
                isGameActive: false,
                isGameFinished: true,
                endTime: Date.now(),
            });
            get().saveScoreToRanking();
        } else {
            // Next Question
            set({
                userAnswers: newAnwers,
                score: newScore,
                currentQuestionIndex: currentQuestionIndex + 1,
            });
        }
    },

    resetGame: () => {
        set({
            isGameActive: false,
            isGameFinished: false,
            questions: [],
            currentQuestionIndex: 0,
            userAnswers: [],
            score: { correct: 0, incorrect: 0 },
            startTime: null,
            endTime: null,
        });
    },

    saveScoreToRanking: () => {
        const {
            currentMode,
            currentDifficulty,
            score,
            startTime,
            endTime
        } = get();

        if (!startTime || !endTime) return;

        const timeMs = endTime - startTime;
        const entry: RankingEntry = {
            date: new Date().toLocaleDateString('ja-JP'),
            mode: currentMode,
            difficulty: currentDifficulty,
            timeMs,
            correctCount: score.correct,
            timestamp: Date.now(),
        };

        // Load existing
        const existingStr = localStorage.getItem(STORAGE_KEY);
        const existing: RankingEntry[] = existingStr ? JSON.parse(existingStr) : [];

        // Add new
        const updated = [...existing, entry];

        // Sort: 
        // 1. Correct Count (Desc)
        // 2. Time (Asc)
        // 3. Date (Desc)
        updated.sort((a, b) => {
            if (b.correctCount !== a.correctCount) return b.correctCount - a.correctCount;
            if (a.timeMs !== b.timeMs) return a.timeMs - b.timeMs;
            return b.timestamp - a.timestamp;
        });

        // Keep top 50 maybe?
        const kept = updated.slice(0, 50);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(kept));
    },
}));
