import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "next-themes";

export const ToggleTheme = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <IconButton onClick={() => setTheme("dark") }>
      {resolvedTheme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};
