import type { Difficulty, GameMode, Question } from '../types';

// Helper to generate a random integer between min and max (inclusive)
const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a unique ID
const generateId = (): string => Math.random().toString(36).substr(2, 9);

export const generateQuestion = (mode: GameMode, difficulty: Difficulty): Question => {
    // Handle Random Mode recursively
    if (mode === 'random') {
        const modes: GameMode[] = ['addition', 'subtraction', 'multiplication', 'division'];
        const randomMode = modes[randomInt(0, modes.length - 1)];

        // For random mode, we also randomize difficulty based on what's available for that mode
        // Addition: easy, normal, hard
        // Subtraction: easy, normal, hard
        // Multiplication: normal, hard (User req: "easy" not explicitly defined for mult, but let's map normal/hard)
        // Division: normal only

        let validDifficulties: Difficulty[] = ['normal'];
        if (randomMode === 'addition' || randomMode === 'subtraction') {
            validDifficulties = ['easy', 'normal', 'hard'];
        } else if (randomMode === 'multiplication') {
            validDifficulties = ['normal', 'hard'];
        } else {
            // Division
            validDifficulties = ['normal'];
        }

        const randomDiff = validDifficulties[randomInt(0, validDifficulties.length - 1)];
        return generateQuestion(randomMode, randomDiff);
    }

    let num1 = 0;
    let num2 = 0;
    let operator = '';
    let answer = 0;

    switch (mode) {
        case 'addition':
            operator = '+';
            if (difficulty === 'hard') {
                // 3-digit + 3-digit, Max Sum 999
                // Min 3-digit is 100.
                // 100 + 100 = 200 (Min possible sum)
                // If sum <= 999, then num1 + num2 <= 999
                // num1 >= 100, num2 >= 100
                // Max num1 = 999 - 100 = 899.
                num1 = randomInt(100, 899);
                const maxNum2 = 999 - num1;
                num2 = randomInt(100, maxNum2);
            } else if (difficulty === 'normal') {
                // 2-digit + 2-digit = 2-digit (Sum <= 99)
                // num1: 10~89, num2: 10 ~ (99 - num1)
                num1 = randomInt(10, 89);
                num2 = randomInt(10, 99 - num1);
            } else {
                // Easy: 1-digit + 1-digit
                num1 = randomInt(1, 9);
                num2 = randomInt(1, 9);
            }
            answer = num1 + num2;
            break;

        case 'subtraction':
            operator = '-';
            if (difficulty === 'hard') {
                // 2-digit - 2-digit with borrowing allowed, result >= 0
                // To ensure "borrowing", strictly speaking we should just pick random 2-digit numbers
                // and swap if needed. Borrowing happens naturally about ~45% of time if unconstrained.
                // User definition: "2桁同士の引き算で繰り下がりあり" (Hard)
                // Let's force borrowing for "Hard"? Or just allow it.
                // "あり" usually means "exists" or "allowed". Let's maximize chance or allow it.
                // Let's just pick two numbers and ensure result >= 0.
                num1 = randomInt(10, 99);
                num2 = randomInt(10, 99);
                if (num1 < num2) [num1, num2] = [num2, num1];
                answer = num1 - num2;
            } else if (difficulty === 'normal') {
                // 2-digit - 2-digit, NO borrowing (繰り下がりなし)
                // Ones digit of num1 must depend on ones digit of num2
                const tens1 = randomInt(1, 9);
                const tens2 = randomInt(1, tens1); // tens1 >= tens2

                const ones1 = randomInt(0, 9);
                const ones2 = randomInt(0, ones1); // ones1 >= ones2

                num1 = tens1 * 10 + ones1;
                num2 = tens2 * 10 + ones2;

                // Ensure they are actually 2 digits (User said 2-digit). 
                // 10-10=0 is valid loop edge case.
                answer = num1 - num2;
            } else {
                // Easy: 1-digit - 1-digit
                num1 = randomInt(1, 9);
                num2 = randomInt(1, num1); // Ensure result >= 0
                answer = num1 - num2;
            }
            break;

        case 'multiplication':
            operator = '×';
            if (difficulty === 'hard') {
                // Max 12x12. "Includes 2-digit x 2-digit".
                // Let's pick range 2 to 12.
                num1 = randomInt(2, 12);
                num2 = randomInt(2, 12);
                // Maybe ensure at least one is 2-digit to satisfy "Includes 2-digit"?
                // Random chance is high enough, or we can force it occasionally.
                // For simplicity, just random 2-12.
            } else {
                // Normal: Max 10x10. (1-10 x 1-10)
                num1 = randomInt(1, 10);
                num2 = randomInt(1, 10);
            }
            answer = num1 * num2;
            break;

        case 'division':
            operator = '÷';
            // Normal: Quotient is 1-digit integer, no remainder.
            // Generate Quotient (1-9) and Divisor (1-9).
            // Dividend = Quotient * Divisor.
            // User said "Ordinary: quotient is 1 digit integer".
            {
                const quotient = randomInt(1, 9);
                const divisor = randomInt(1, 9);
                num1 = quotient * divisor; // Dividend
                num2 = divisor;
                answer = quotient;
            }
            break;

        default:
            // Fallback
            num1 = 1;
            num2 = 1;
            operator = '+';
            answer = 2;
    }

    return {
        id: generateId(),
        mode,
        difficulty,
        num1,
        num2,
        operator,
        answer,
    };
};

export const generateQuestions = (count: number, mode: GameMode, difficulty: Difficulty): Question[] => {
    const questions: Question[] = [];
    for (let i = 0; i < count; i++) {
        questions.push(generateQuestion(mode, difficulty));
    }
    return questions;
};
