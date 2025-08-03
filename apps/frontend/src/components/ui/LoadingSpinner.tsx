import { Box, Spinner } from "@chakra-ui/react";

interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
}

export const LoadingSpinner = ({ size = "lg", color = "blue.500" }: LoadingSpinnerProps) => (
  <Box textAlign="center" mt={20}>
    <Spinner size={size} color={color} />
  </Box>
);