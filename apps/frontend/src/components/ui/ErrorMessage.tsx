import { Box, Text, Button, VStack } from "@chakra-ui/react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <Box textAlign="center" p={8} maxW="400px" mx="auto" mt={20}>
    <VStack gap={4}>
      <Text color="red.500" fontSize="lg" fontWeight="semibold">
        Error
      </Text>
      <Text color="gray.600">
        {message}
      </Text>
      {onRetry && (
        <Button colorScheme="blue" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </VStack>
  </Box>
);