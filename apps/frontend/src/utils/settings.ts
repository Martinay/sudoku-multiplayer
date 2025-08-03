export type SettingsData = {
  checkForMistakes: boolean;
  showMatrixAnnotations: boolean;
};

const SETTINGS_STORAGE_KEY = "sudoku-settings";

export const loadSettingsFromStorage = (): SettingsData => {
  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn("Failed to load settings from storage:", error);
  }
  
  // Default settings
  return {
    checkForMistakes: true,
    showMatrixAnnotations: true,
  };
};

export const saveSettingsToStorage = (settings: SettingsData): void => {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn("Failed to save settings to storage:", error);
  }
};
