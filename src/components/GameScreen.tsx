import { useEffect, useState } from 'react';
import { Box, Flex, Text, VStack, Progress } from '@chakra-ui/react';
import { useGameStore } from '../store/gameStore';
import { NumericKeypad } from './NumericKeypad';

export const GameScreen = () => {
    const {
        questions,
        currentQuestionIndex,
        submitAnswer
    } = useGameStore();

    const [inputBuffer, setInputBuffer] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);

    const currentQ = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleInput = (char: string) => {
        if (inputBuffer.length > 5) return; // limit length
        if (inputBuffer === '0' && char !== '0') {
            setInputBuffer(char);
        } else {
            setInputBuffer(prev => prev + char);
        }
    };

    const handleBackspace = () => {
        setInputBuffer(prev => prev.slice(0, -1));
    };

    const handleClear = () => {
        setInputBuffer('');
    };

    const handleSubmit = () => {
        if (inputBuffer === '') return;
        submitAnswer(inputBuffer);
        setInputBuffer('');
    };

    // Format MM:SS
    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    if (!currentQ) return null;

    return (
        <VStack spacing={4} w="full" maxW="md" h="full" justify="space-between" py={4}>
            <Box w="full" px={4}>
                <Flex justify="space-between" mb={2}>
                    <Text fontWeight="bold" color="blue.600">
                        <ruby>問<rt>もん</rt></ruby> {currentQuestionIndex + 1} / {questions.length}
                    </Text>
                    <Text fontWeight="bold" color="orange.500">
                        <ruby>時<rt>じ</rt></ruby>
                        <ruby>間<rt>かん</rt></ruby>: {formatTime(elapsedTime)}
                    </Text>
                </Flex>
                <Progress value={progress} size="sm" colorScheme="blue" borderRadius="full" />
            </Box>

            {/* Question Display */}
            <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" w="full">
                <Text fontSize="6xl" fontWeight="bold" whiteSpace="nowrap">
                    {currentQ.num1} {currentQ.operator} {currentQ.num2}
                </Text>
                <Text fontSize="6xl" fontWeight="bold" color="blue.500" mt={4} minH="1.5em">
                    {inputBuffer || '?'}
                </Text>
            </Box>

            {/* Input */}
            <Box w="full" bg="white" borderRadius="t-3xl" shadow="inner" pb={4}>
                <NumericKeypad
                    onInput={handleInput}
                    onBackspace={handleBackspace}
                    onClear={handleClear}
                    onEnter={handleSubmit}
                />
            </Box>
        </VStack>
    );
};
