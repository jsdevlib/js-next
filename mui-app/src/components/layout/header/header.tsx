import * as React from "react";
import { AppBar, IconButton, Box, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ToggleTheme } from "@/components/ui/toggleTheme";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleThemeMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NEXTJS Research
          </Typography>
          <ToggleTheme toggleThemeMode={toggleThemeMode} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
