import { PaletteOptions } from "@mui/material/styles";

import createEmotionCache from "./createEmotionCache";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";
import globalStyles from "./globalStyles";
import MuiThemeProvider from "./muiThemeProvider";

export type AllowedTheme = NonNullable<PaletteOptions["mode"]>;
export const DEFAULT_THEME: AllowedTheme = "dark";

export { createEmotionCache, lightTheme, darkTheme, globalStyles, MuiThemeProvider };
