import { useState, useEffect } from "react";
import { CellPosition, ValueInputMode } from "../types/game";
import { SettingsData, loadSettingsFromStorage, saveSettingsToStorage } from "../utils/settings";

export const useGameState = () => {
  const [selected, setSelected] = useState<CellPosition | null>(null);
  const [mode, setMode] = useState<ValueInputMode>('value');
  const [settings, setSettings] = useState<SettingsData>(() => loadSettingsFromStorage());

  useEffect(() => {
    saveSettingsToStorage(settings);
  }, [settings]);

  return {
    selected,
    setSelected,
    mode,
    setMode,
    settings,
    setSettings,
  };
};