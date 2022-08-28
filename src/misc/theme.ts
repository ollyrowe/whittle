export enum ThemeMode {
  Light = "Light",
  Dark = "Dark",
}

export interface Theme {
  mode: ThemeMode;
  background: string;
  paper: string;
  text: string;
  border: string;
  active: string;
  grey: string;
  green: string;
  amber: string;
}

export const lightTheme: Theme = {
  mode: ThemeMode.Light,
  background: "#ffffff",
  paper: "#8e9193",
  text: "#3a3a3c",
  border: "#d3d6da",
  active: "#a2a3a4",
  grey: "#d3d6da",
  green: "#6aaa64",
  amber: "#c9b458",
};

export const darkTheme: Theme = {
  mode: ThemeMode.Dark,
  background: "#121213",
  paper: "#3a3a3c",
  text: "#ffffff",
  border: "#3a3a3c",
  active: "#656667",
  grey: "#818384",
  green: "#538d4e",
  amber: "#b59f3b",
};
