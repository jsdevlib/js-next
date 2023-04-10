import { createContext } from "react";

export interface userSettingsProps {
  themeMode: string;
}

export const UserSettingsContext = createContext<userSettingsProps>({
  themeMode: "light",
});
