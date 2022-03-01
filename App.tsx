import "react-native-url-polyfill/auto";

import { NavigationContainer } from "@react-navigation/native";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { NativeBaseProvider } from "native-base";
import type { VFC } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Platform, UIManager } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { CustomFallback } from "src/error-boundary/CustomFallback";
import { customTheme } from "src/lib/customTheme";
import { auth } from "src/lib/supabase";
import { MainNavigator } from "src/MainNavigator";
import { sessionState } from "src/valtio/session";
import { setTheme } from "src/valtio/theme";

const App: VFC = () => {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await preventAutoHideAsync();
        sessionState.session = auth.session();
        setTheme();
      } catch (e) {
        console.error(e);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NativeBaseProvider theme={customTheme}>
      <NavigationContainer onReady={onLayoutRootView}>
        <ErrorBoundary FallbackComponent={CustomFallback}>
          <MainNavigator />
        </ErrorBoundary>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
