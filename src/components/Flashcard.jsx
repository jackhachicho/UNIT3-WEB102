import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Input, Button } from '@chakra-ui/react';

const Flashcard = ({ card, onCorrectAnswer }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Reset flip state when the card changes
    setIsFlipped(false);
    setUserGuess('');
    setFeedback('');
  }, [card]);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSubmit = () => {
    const isCorrect = userGuess.toLowerCase() === card.answer.toLowerCase();
    if (isCorrect) {
      setFeedback('Correct!');
      onCorrectAnswer();
    } else {
      setFeedback('Incorrect. Try again!');
    }
    setIsFlipped(true); // Show the answer after submitting
  };

  const cardColor = card.color || 'gray.200';

  return (
    <Box width="100%">
      <Box
        width="100%"
        height="200px"
        bg={cardColor}
        borderRadius="md"
        boxShadow="md"
        cursor="pointer"
        onClick={flipCard}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        transition="transform 0.6s"
        transformStyle="preserve-3d"
      >
        {!isFlipped ? (
          <Box
            position="absolute"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="xl" fontWeight="bold">
              {card.question}
            </Text>
          </Box>
        ) : (
          <Box
            position="absolute"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="xl" fontWeight="bold">
              {card.answer}
            </Text>
          </Box>
        )}
      </Box>
      <VStack mt={4} spacing={2}>
        <Input
          placeholder="Enter your answer"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
        />
        <Button colorScheme="green" onClick={handleSubmit}>
          Submit Answer
        </Button>
        {feedback && (
          <Text color={feedback === 'Correct!' ? 'green.500' : 'red.500'}>
            {feedback}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default Flashcard;