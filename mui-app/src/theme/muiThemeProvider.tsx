import { FC, useEffect, useState } from "react";
import { CssBaseline, ThemeProvider, GlobalStyles } from "@mui/material";
import { useTheme } from "next-themes";

import { darkTheme, globalStyles, lightTheme } from "../theme";

const MuiThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  useEffect(() => {
    resolvedTheme === "light"
      ? setCurrentTheme(lightTheme)
      : setCurrentTheme(darkTheme);
  }, [resolvedTheme]);

  return (
    <ThemeProvider theme={currentTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon.
          remove the margins of all browsers and apply the material design background color */}
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />   
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
