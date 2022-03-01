import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorMode } from "native-base";
import { useEffect } from "react";
import { Appearance } from "react-native";
import { auth } from "src/lib/supabase";
import { AppScreen } from "src/screen/AppScreen";
import { SettingScreen } from "src/screen/SettingScreen";
import { SettingThemeScreen } from "src/screen/SettingThemeScreen";
import { SignInScreen } from "src/screen/SignInScreen";
import { sessionState } from "src/valtio/session";
import { themeState } from "src/valtio/theme";
import { useSnapshot } from "valtio";

export type RootStackParamList = {
  signIn: undefined;
  app: undefined;
  setting: undefined;
  settingTheme: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  const { setColorMode } = useColorMode();
  const snap = useSnapshot(sessionState);
  const themeSnap = useSnapshot(themeState);

  useEffect(() => {
    const { data: authListener } = auth.onAuthStateChange(async (_event, session) => {
      sessionState.session = session;
    });

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (themeSnap.theme === "os") {
      setColorMode(Appearance.getColorScheme() ?? "light");
    }
    setColorMode(themeState.theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeSnap.theme]);

  return (
    <Stack.Navigator>
      {snap.session ? (
        <>
          <Stack.Screen name="app" component={AppScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="setting"
            component={SettingScreen}
            options={{ headerShown: false, animation: "slide_from_bottom" }}
          />
          <Stack.Screen name="settingTheme" component={SettingThemeScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <Stack.Screen name="signIn" component={SignInScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};
