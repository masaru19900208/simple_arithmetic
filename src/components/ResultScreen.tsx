import { useEffect, useState } from 'react';
import { Box, Button, Heading, Text, VStack, HStack, List, ListItem, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import type { RankingEntry } from '../types';

const MotionBox = motion(Box);

export const ResultScreen = () => {
    const {
        score,
        startTime,
        endTime,
        resetGame,
        questions,
        userAnswers,
        currentMode,
        currentDifficulty
    } = useGameStore();

    const [ranking, setRanking] = useState<RankingEntry[]>([]);

    // Confetti / Celebration logic
    const isPerfect = score.correct === questions.length;
    const timeMs = (endTime || 0) - (startTime || 0);
    const timeSec = Math.floor(timeMs / 1000);

    const STORAGE_KEY = 'math-master-ranking';

    useEffect(() => {
        // Load Ranking
        const existingStr = localStorage.getItem(STORAGE_KEY);
        if (existingStr) {
            const all: RankingEntry[] = JSON.parse(existingStr);
            // Filter ranking for CURRENT Mode & Difficulty ?
            // User requested "Local Result Ranking". Usually per mode/level.
            // "Calculatation mode 5 types... Local result ranking".
            // It makes sense to only show relevant ranking.
            const relevant = all.filter(r => r.mode === currentMode && r.difficulty === currentDifficulty);
            // Sort again just in case
            relevant.sort((a, b) => {
                if (b.correctCount !== a.correctCount) return b.correctCount - a.correctCount;
                return a.timeMs - b.timeMs;
            });
            setRanking(relevant.slice(0, 5));
        }
    }, [currentMode, currentDifficulty]);

    return (
        <VStack spacing={6} w="full" maxW="md" p={6} pt={10}>
            {isPerfect && (
                <MotionBox
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                    <Text fontSize="6xl">🎉🎊💮</Text>
                </MotionBox>
            )}

            <Heading size="xl" color={isPerfect ? "pink.500" : "blue.600"}>
                {isPerfect ? "ぜんもんせいかい！" : "おつかれさま！"}
            </Heading>

            <Box bg="white" p={6} borderRadius="xl" shadow="md" w="full" textAlign="center">
                <VStack spacing={2}>
                    <Text fontSize="lg" color="gray.500">今回のきろく</Text>
                    <HStack justify="space-around" w="full">
                        <Box>
                            <Text fontSize="sm" color="gray.400">せいかい</Text>
                            <Text fontSize="3xl" fontWeight="bold" color="green.500">
                                {score.correct} <span style={{ fontSize: '1rem' }}>もん</span>
                            </Text>
                        </Box>
                        <Box>
                            <Text fontSize="sm" color="gray.400">タイム</Text>
                            <Text fontSize="3xl" fontWeight="bold" color="orange.500">
                                {timeSec} <span style={{ fontSize: '1rem' }}>びょう</span>
                            </Text>
                        </Box>
                    </HStack>
                    {score.incorrect > 0 && (
                        <Text fontSize="sm" color="red.400">
                            （まちがい: {score.incorrect} もん）
                        </Text>
                    )}
                </VStack>
            </Box>

            <Box w="full" bg="white" p={4} borderRadius="xl" shadow="md">
                <Text fontWeight="bold" mb={2}>
                    <ruby>振<rt>ふ</rt></ruby>り
                    <ruby>返<rt>かえ</rt></ruby>り
                </Text>
                <List spacing={2}>
                    {questions.map((q, i) => {
                        const userAns = userAnswers[i];
                        const isCorrect = parseInt(userAns || '', 10) === q.answer;
                        return (
                            <ListItem key={q.id}>
                                <HStack justify="space-between" bg={isCorrect ? 'green.50' : 'red.50'} p={2} borderRadius="md">
                                    <Text fontWeight="bold">{i + 1}. {q.num1} {q.operator} {q.num2} = ?</Text>
                                    <VStack align="end" spacing={0}>
                                        <Text color={isCorrect ? 'green.600' : 'red.600'} fontWeight="bold">
                                            {isCorrect ? 'せいかい' : 'まちがい'}
                                        </Text>
                                        <Text fontSize="sm">
                                            きみのこたえ: {userAns || '-'}
                                        </Text>
                                        {!isCorrect && (
                                            <Text fontSize="sm" color="blue.500">
                                                せいかい: {q.answer}
                                            </Text>
                                        )}
                                    </VStack>
                                </HStack>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

            <Box w="full">
                <Text fontWeight="bold" mb={2} textAlign="center">
                    <ruby>今<rt>いま</rt></ruby>
                    までのランキング
                </Text>
                <List spacing={2}>
                    {ranking.map((r, i) => (
                        <ListItem key={i} bg="white" p={2} borderRadius="md" shadow="sm">
                            <HStack justify="space-between">
                                <HStack>
                                    <Badge colorScheme={i === 0 ? 'yellow' : 'gray'}>{i + 1}い</Badge>
                                    <Text fontSize="sm">{r.date}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontWeight="bold">{r.correctCount}もん</Text>
                                    <Text>{Math.floor(r.timeMs / 1000)}秒</Text>
                                </HStack>
                            </HStack>
                        </ListItem>
                    ))}
                    {ranking.length === 0 && (
                        <Text textAlign="center" color="gray.400" fontSize="sm">
                            まだきろくがないよ
                        </Text>
                    )}
                </List>
            </Box>

            <Button
                size="lg"
                colorScheme="blue"
                onClick={resetGame}
                w="full"
                mt={4}
            >
                タイトルにもどる
            </Button>
        </VStack>
    );
};
