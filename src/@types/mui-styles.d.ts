import "styled-components";
import {
  Theme as MuiTheme,
  ThemeOptions as MuiThemeOptions,
  Palette as MuiPalette,
  PaletteOptions as MuiPaletteOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  export interface Theme extends MuiTheme {}

  interface ThemeOptions extends MuiThemeOptions {}

  interface Palette extends MuiPalette {
    tile: {
      default: string;
      green: string;
      amber: string;
    };
    border: string;
  }

  interface PaletteOptions extends MuiPaletteOptions {
    tile: {
      default: string;
      green: string;
      amber: string;
    };
    border: string;
  }

  export function createTheme(options?: ThemeOptions): Theme;
}
