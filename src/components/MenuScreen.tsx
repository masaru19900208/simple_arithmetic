import { Box, Button, Heading, VStack, Text, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import type { Difficulty, GameMode } from '../types';
import { useGameStore } from '../store/gameStore';

export const MenuScreen = () => {
    const {
        currentMode,
        currentDifficulty,
        setMode,
        setDifficulty,
        startGame
    } = useGameStore();

    const bgCard = useColorModeValue('white', 'gray.700');

    const modes: { value: GameMode; label: string; ruby: string }[] = [
        { value: 'addition', label: 'たしざん', ruby: '' },
        { value: 'subtraction', label: 'ひきざん', ruby: '' },
        { value: 'multiplication', label: 'かけざん', ruby: '' },
        { value: 'division', label: 'わりざん', ruby: '' },
        { value: 'random', label: 'ランダム', ruby: '' },
    ];

    const difficulties: { value: Difficulty; label: string; ruby: string }[] = [
        { value: 'easy', label: 'かんたん', ruby: '' },
        { value: 'normal', label: 'ふつう', ruby: '' },
        { value: 'hard', label: 'むずかしい', ruby: '' },
    ];

    // Logic to filter difficulties based on mode
    const getAvailableDifficulties = (mode: GameMode): Difficulty[] => {
        switch (mode) {
            case 'addition':
            case 'subtraction':
                return ['easy', 'normal', 'hard'];
            case 'multiplication':
                return ['normal', 'hard'];
            case 'division':
                return ['normal'];
            default:
                return [];
        }
    };

    const availableDiffs = getAvailableDifficulties(currentMode);

    return (
        <VStack spacing={8} w="full" maxW="md" p={6}>
            <Box textAlign="center" py={4}>
                <Heading color="blue.600" size="2xl" mb={2}>
                    <ruby>算<rt>さん</rt></ruby>
                    <ruby>数<rt>すう</rt></ruby>
                    マスター
                </Heading>
                <Text fontSize="lg" color="gray.600">
                    <ruby>計<rt>けい</rt></ruby>
                    <ruby>算<rt>さん</rt></ruby>
                    <ruby>力<rt>りょく</rt></ruby>
                    を
                    <ruby>試<rt>ため</rt></ruby>
                    そう！
                </Text>
            </Box>

            {/* Mode Selection */}
            <Box w="full" bg={bgCard} p={4} borderRadius="2xl" shadow="md">
                <Text mb={3} fontWeight="bold" fontSize="lg">
                    <ruby>遊<rt>あそ</rt></ruby>
                    ぶモードを
                    <ruby>選<rt>えら</rt></ruby>
                    んでね
                </Text>
                <SimpleGrid columns={2} spacing={3}>
                    {modes.map((m) => (
                        <Button
                            key={m.value}
                            onClick={() => {
                                setMode(m.value);
                                // Auto-select a valid difficulty if current one is invalid
                                const newValidDiffs = getAvailableDifficulties(m.value);
                                if (newValidDiffs.length > 0 && !newValidDiffs.includes(currentDifficulty)) {
                                    setDifficulty(newValidDiffs[0]);
                                }
                            }}
                            colorScheme={currentMode === m.value ? 'blue' : 'gray'}
                            variant={currentMode === m.value ? 'solid' : 'outline'}
                            h="14"
                            gridColumn={m.value === 'random' ? 'span 2' : undefined}
                        >
                            <Text fontSize="xl">{m.label}</Text>
                        </Button>
                    ))}
                </SimpleGrid>
            </Box>

            {/* Difficulty Selection */}
            {currentMode !== 'random' && availableDiffs.length > 0 && (
                <Box w="full" bg={bgCard} p={4} borderRadius="2xl" shadow="md">
                    <Text mb={3} fontWeight="bold" fontSize="lg">
                        <ruby>難<rt>むず</rt></ruby>
                        しさ
                    </Text>
                    <SimpleGrid columns={availableDiffs.length} spacing={3}>
                        {difficulties
                            .filter(d => availableDiffs.includes(d.value))
                            .map((d) => (
                                <Button
                                    key={d.value}
                                    onClick={() => setDifficulty(d.value)}
                                    colorScheme={currentDifficulty === d.value ? 'orange' : 'gray'}
                                    variant={currentDifficulty === d.value ? 'solid' : 'outline'}
                                    h="12"
                                >
                                    <Text fontSize="lg">{d.label}</Text>
                                </Button>
                            ))}
                    </SimpleGrid>
                </Box>
            )}

            <Button
                w="full"
                h="16"
                colorScheme="teal"
                fontSize="2xl"
                shadow="lg"
                onClick={startGame}
                animation="pulse 2s infinite"
            >
                スタート！
            </Button>
        </VStack>
    );
};
