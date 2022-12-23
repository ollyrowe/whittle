import { Theme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { getTheme, ThemeMode } from "../misc/theme";

/**
 * Hook which handles persistence of user game preferences to local storage.
 *
 * @returns the user's settings.
 */
const useSettings = (): SettingsOptions => {
  // User settings fetched from local storage
  const [settings, setSettings] = useState(getSettings());

  // Fetch the current theme based on the user's preferences
  const theme = useMemo(
    () => getTheme(settings.themeMode, settings.enableHighContrastMode),
    [settings.themeMode, settings.enableHighContrastMode]
  );

  const toggleHardMode = () => {
    setSettings({ ...settings, enableHardMode: !settings.enableHardMode });
  };

  const toggleTheme = () => {
    setSettings({
      ...settings,
      themeMode: theme.palette.mode === "dark" ? "light" : "dark",
    });
  };

  const toggleHighContrastMode = () => {
    setSettings({
      ...settings,
      enableHighContrastMode: !settings.enableHighContrastMode,
    });
  };

  const toggleSoundFx = () => {
    setSettings({ ...settings, enableSoundFx: !settings.enableSoundFx });
  };

  const toggleHints = () => {
    setSettings({ ...settings, enableHints: !settings.enableHints });
  };

  /**
   * Effect which updates the user's settings within their local storage
   * upon any changes made to the settings state.
   */
  useEffect(() => {
    updateSettings(settings);
  }, [settings]);

  return {
    ...settings,
    theme,
    toggleHardMode,
    toggleTheme,
    toggleHighContrastMode,
    toggleSoundFx,
    toggleHints,
  };
};

export default useSettings;

/**
 * Fetches the user's settings from their local storage.
 *
 * @returns the user's settings.
 */
const getSettings = (): Settings => {
  const item = localStorage.getItem(SETTINGS_LS_KEY);

  if (item) {
    return { ...defaultSettings, ...JSON.parse(item) };
  } else {
    return defaultSettings;
  }
};

/**
 * Updates the user's settings within their local storage.
 *
 * @param settings - the updated user settings.
 */
const updateSettings = (settings: Settings) => {
  localStorage.setItem(SETTINGS_LS_KEY, JSON.stringify(settings));
};

export const defaultSettings: Settings = {
  themeMode: "system",
  enableHardMode: false,
  enableHighContrastMode: false,
  enableSoundFx: true,
  enableHints: true,
};

/** Key used to persist user settings to local storage */
const SETTINGS_LS_KEY = "settings";

interface Settings {
  themeMode: ThemeMode;
  enableHardMode: boolean;
  enableHighContrastMode: boolean;
  enableSoundFx: boolean;
  enableHints: boolean;
}

export interface SettingsOptions extends Settings {
  theme: Theme;
  toggleHardMode: () => void;
  toggleTheme: () => void;
  toggleHighContrastMode: () => void;
  toggleSoundFx: () => void;
  toggleHints: () => void;
}
