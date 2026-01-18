import { Button, Grid, GridItem } from '@chakra-ui/react';

interface NumericKeypadProps {
    onInput: (digit: string) => void;
    onClear: () => void;
    onBackspace: () => void;
    onEnter: () => void; // Usually auto-submit or explicit enter? Logic said "submitAnswer".
    // Let's decide if we auto-submit or have an Enter button.
    // Many math apps have an "Enter" or "OK" button.
    // The keypad usually has 0-9.
    // User req: "解答の入力を行うテンキーを持つ。クリア機能とバックスペース機能を持つ" (Has C and BS)
    // Doesn't strictly say Enter. But usually needed. Or maybe check automatically?
    // Automatic check is risky if answer is "12" and user types "1", checking "1" -> wrong immediately? No.
    // We need an Enter button.
}

export const NumericKeypad = ({ onInput, onClear, onBackspace, onEnter }: NumericKeypadProps) => {
    const btnStyle = {
        h: '16',
        fontSize: '2xl',
        borderRadius: 'xl',
        shadow: 'md',
    };

    return (
        <Grid templateColumns="repeat(3, 1fr)" gap={3} p={2} w="full" maxW="sm">
            {/* 7, 8, 9 */}
            <GridItem>
                <Button w="full" {...btnStyle} onClick={() => onInput('7')} colorScheme="whiteAlpha" bg="white" color="blue.600">
                    7
                </Button>
            </GridItem>
            <GridItem>
                <Button w="full" {...btnStyle} onClick={() => onInput('8')} colorScheme="whiteAlpha" bg="white" color="blue.600">
                    8
                </Button>
            </GridItem>
            <GridItem>
                <Button w="full" {...btnStyle} onClick={() => onInput('9')} colorScheme="whiteAlpha" bg="white" color="blue.600">
                    9
                </Button>
            </GridItem>

            {/* 4, 5, 6 */}
            <GridItem>
                <Button w="full" {...btnStyle} onClick={() => onInput('4')} colorScheme="whiteAlpha" bg="white" color="blue.600">
                    4
                </Button>
            </GridItem>
            <GridItem>
                <Button w="full" {...btnStyle} onClick={() => onInput('5')} colorScheme="whiteAlpha" bg="white" color="blue.600">
                    5
                </Button>
            </GridItem>
            <GridItem>
                <Button w="full" {...btnStyle} onClick={() => onInput('6')} colorScheme="whiteAlpha" bg="white" color="blue.600">
                    6
                </Button>
            </GridItem>

            {/* 1, 2, 3 */}
            <GridItem>
                <Button w="full" {...btnStyle} onClick={() => onInput('1')} colorScheme="whiteAlpha" bg="white" color="blue.600">
                    1
                </Button>
            </GridItem>
            <GridItem>
                <Button w="full" {...btnStyle} onClick={() => onInput('2')} colorScheme="whiteAlpha" bg="white" color="blue.600">
                    2
                </Button>
            </GridItem>
            <GridItem>
                <Button w="full" {...btnStyle} onClick={() => onInput('3')} colorScheme="whiteAlpha" bg="white" color="blue.600">
                    3
                </Button>
            </GridItem>

            {/* C, 0, BS */}
            <GridItem>
                <Button w="full" {...btnStyle} onClick={onClear} colorScheme="red" variant="outline" borderWidth={2}>
                    C
                </Button>
            </GridItem>
            <GridItem>
                <Button w="full" {...btnStyle} onClick={() => onInput('0')} colorScheme="whiteAlpha" bg="white" color="blue.600">
                    0
                </Button>
            </GridItem>
            <GridItem>
                <Button w="full" {...btnStyle} onClick={onBackspace} colorScheme="orange" variant="outline" borderWidth={2}>
                    ←
                </Button>
            </GridItem>

            {/* Submit Button - dedicated row or integrate? 
          For better UX, maybe a big button at bottom or merged?
          Let's put a big OK button below.
      */}
            <GridItem colSpan={3}>
                <Button w="full" h="16" fontSize="2xl" colorScheme="blue" borderRadius="xl" shadow="lg" onClick={onEnter}>
                    <ruby>決<rt>けっ</rt></ruby>
                    <ruby>定<rt>てい</rt></ruby>
                </Button>
            </GridItem>
        </Grid>
    );
};
