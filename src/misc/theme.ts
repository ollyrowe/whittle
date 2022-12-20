import { createTheme, ThemeOptions } from "@mui/material";
import { colours, highContrastColours } from "./colours";

/**
 * Gets the theme based on the desired mode and high-contrast preference.
 *
 * @param mode - the theme mode.
 * @param enableHighContrast - whether high-contrast colours should be used.
 * @returns the desired theme.
 */
export const getTheme = (mode: ThemeMode, enableHighContrast: boolean) => {
  switch (mode) {
    case "light":
      return createLightTheme(enableHighContrast);
    case "dark":
      return createDarkTheme(enableHighContrast);
    case "system":
      return prefersDarkTheme
        ? createDarkTheme(enableHighContrast)
        : createLightTheme(enableHighContrast);
  }
};

export const createLightTheme = (enableHighContrast: boolean) => {
  return createTheme({
    ...baseThemeOptions,
    palette: {
      mode: "light",
      primary: {
        main: colours.green,
      },
      background: {
        default: colours.white,
      },
      text: {
        primary: colours.grey,
      },
      tile: {
        default: colours.lighterGrey,
        green: enableHighContrast ? highContrastColours.green : colours.green,
        amber: enableHighContrast ? highContrastColours.amber : colours.amber,
        blue: enableHighContrast ? highContrastColours.blue : colours.blue,
      },
      orange: {
        default: colours.orange,
        light: colours.orange,
        dark: colours.darkOrange,
      },
      border: colours.lighterGrey,
    },
  });
};

export const createDarkTheme = (enableHighContrast: boolean) => {
  return createTheme({
    ...baseThemeOptions,
    palette: {
      mode: "dark",
      primary: {
        main: colours.darkGreen,
      },
      background: {
        default: colours.darkGrey,
        paper: colours.darkGrey,
      },
      text: {
        primary: colours.white,
      },
      tile: {
        default: colours.lightGrey,
        green: enableHighContrast
          ? highContrastColours.green
          : colours.darkGreen,
        amber: enableHighContrast
          ? highContrastColours.amber
          : colours.darkAmber,
        blue: enableHighContrast ? highContrastColours.blue : colours.darkBlue,
      },
      orange: {
        default: colours.darkOrange,
        light: colours.orange,
        dark: colours.darkOrange,
      },
      border: colours.grey,
    },
  });
};

const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: "Quicksand",
  },
};

const prefersDarkTheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

export type ThemeMode = "light" | "dark" | "system";
