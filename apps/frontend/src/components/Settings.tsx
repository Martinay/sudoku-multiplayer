import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import { SettingsData } from "../utils/settings";

interface SettingsProps {
  settings: SettingsData;
  onSettingsChange: (settings: SettingsData) => void;
}

export const Settings = ({ settings, onSettingsChange }: SettingsProps) => {
  const handleToggle = (key: keyof SettingsData) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    onSettingsChange(newSettings);
  };

  return (
    <Box
      bg="rgba(255, 255, 255, 0.95)"
      borderRadius="xl"
      boxShadow="lg"
      p={4}
      w="220px"
      h="fit-content"
    >
      <VStack gap={4} align="stretch">
        <Text fontSize="lg" fontWeight="bold" color="gray.700" textAlign="center">
          Settings
        </Text>
        
        <VStack gap={3} align="stretch">
          <HStack justifyContent="space-between" align="center">
            <Text fontSize="sm" color="gray.600" flex="1">
              Check for mistakes
            </Text>
            <Box>
              <input
                type="checkbox"
                checked={settings.checkForMistakes}
                onChange={() => handleToggle('checkForMistakes')}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: '#38A169',
                  cursor: 'pointer'
                }}
              />
            </Box>
          </HStack>
          
          <HStack justifyContent="space-between" align="center">
            <Text fontSize="sm" color="gray.600" flex="1">
              Show matrix annotations
            </Text>
            <Box>
              <input
                type="checkbox"
                checked={settings.showMatrixAnnotations}
                onChange={() => handleToggle('showMatrixAnnotations')}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: '#38A169',
                  cursor: 'pointer'
                }}
              />
            </Box>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};
