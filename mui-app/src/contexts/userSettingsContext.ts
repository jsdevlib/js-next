import { createContext } from "react";

export interface IUserSettings {
  themeMode: "light" | "dark";
}

export const UserSettingsContext = createContext<IUserSettings>({
  themeMode: "light",
});
