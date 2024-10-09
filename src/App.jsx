import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Heading, Text, Button, HStack } from '@chakra-ui/react';
import Flashcard from './components/Flashcard';
import { flashcardData } from './components/flashcardData';

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcardData.length);
  };

  const previousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcardData.length) % flashcardData.length);
  };

  const handleCorrectAnswer = () => {
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <ChakraProvider>
      <Box minHeight="100vh" bg="gray.100" py={8} display="flex" justifyContent="center" alignItems="center">
        <VStack spacing={8} maxWidth="600px" width="100%" margin="auto" textAlign="center">
          <Heading>Programming Languages Trivia</Heading>
          <Text>Test your knowledge of programming languages!</Text>
          <Text>Total cards: {flashcardData.length}</Text>
          <Text>Score: {score}/{flashcardData.length}</Text>
          <Flashcard 
            card={flashcardData[currentCardIndex]} 
            onCorrectAnswer={handleCorrectAnswer} 
            key={currentCardIndex}  // Reset the flashcard's flip state when the index changes
          />
          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={previousCard}>
              Previous Card
            </Button>
            <Button colorScheme="blue" onClick={nextCard}>
              Next Card
            </Button>
          </HStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default App;