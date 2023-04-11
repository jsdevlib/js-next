import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export interface IToggleThemeProps {
  toggleThemeMode: () => void;
}

export const ToggleTheme = (props: IToggleThemeProps) => {
  const { toggleThemeMode } = props;
  const [UseIcon, setUseIcon] = useState<any>(null);

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    resolvedTheme === "light"
      ? setUseIcon(<DarkModeIcon />)
      : setUseIcon(<LightModeIcon />);
  }, [resolvedTheme]);

  return <IconButton onClick={toggleThemeMode}>{UseIcon}</IconButton>;
};
