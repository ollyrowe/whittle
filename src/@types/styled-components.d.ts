import "styled-components";
import { Theme } from "../misc/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
