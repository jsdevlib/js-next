import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "next-themes";

export interface IToggleThemeProps {
  toggleThemeMode: () => void;
}

export const ToggleTheme = (props: IToggleThemeProps) => {
  const { toggleThemeMode } = props;

  const { resolvedTheme } = useTheme();

  return (
    <IconButton onClick={toggleThemeMode}>
      {resolvedTheme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};
