import AsyncStorage from "@react-native-async-storage/async-storage";
import { proxy } from "valtio";

export type ThemeValue = "os" | "light" | "dark";
export const themeState = proxy<{ theme: ThemeValue }>({ theme: "os" });

const THEME_KEY = "theme_key";
export const setTheme = async (): Promise<void> => {
  try {
    const value = (await AsyncStorage.getItem(THEME_KEY)) as ThemeValue | null;
    if (value !== null) {
      themeState.theme = value;
    }
  } catch (error) {
    console.error(error);
  }
};

export const storeTheme = async (value: ThemeValue): Promise<void> => {
  try {
    await AsyncStorage.setItem(THEME_KEY, value);
    themeState.theme = value;
  } catch (error) {
    console.error(error);
  }
};
