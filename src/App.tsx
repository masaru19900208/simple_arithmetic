import { Center, Box } from '@chakra-ui/react';
import { useGameStore } from './store/gameStore';
import { MenuScreen } from './components/MenuScreen';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';

function App() {
  const { isGameActive, isGameFinished } = useGameStore();

  let content;
  if (isGameFinished) {
    content = <ResultScreen />;
  } else if (isGameActive) {
    content = <GameScreen />;
  } else {
    content = <MenuScreen />;
  }

  return (
    <Center minH="100vh" bg="blue.50" p={2}>
      <Box
        w="full"
        maxW="md"
        bg="whiteAlpha.50"
      // We can add a subtle card effect or just let components handle their own containers
      // Let's keep it simple container.
      >
        {content}
      </Box>
    </Center>
  );
}

export default App;
