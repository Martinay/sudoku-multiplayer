import React, { Component, ReactNode } from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box textAlign="center" p={8} maxW="500px" mx="auto" mt={20}>
          <VStack gap={4}>
            <Heading size="lg" color="red.500">
              Something went wrong
            </Heading>
            <Text color="gray.600">
              {this.state.error?.message || 'An unexpected error occurred'}
            </Text>
            <Button colorScheme="blue" onClick={this.handleRetry}>
              Try Again
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}