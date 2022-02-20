import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { auth } from "src/lib/supabase";
import { AppScreen } from "src/screen/AppScreen";
import { SettingScreen } from "src/screen/SettingScreen";
import { SignInScreen } from "src/screen/SignInScreen";
import { sessionState } from "src/valtio/session";
import { useSnapshot } from "valtio";

export type RootStackParamList = {
  signIn: undefined;
  app: undefined;
  setting: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  const snap = useSnapshot(sessionState);
  useEffect(() => {
    sessionState.session = auth.session();
    const { data: authListener } = auth.onAuthStateChange(async (_event, session) => {
      sessionState.session = session;
    });

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        </>
      ) : (
        <Stack.Screen name="signIn" component={SignInScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};
