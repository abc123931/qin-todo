import "react-native-url-polyfill/auto";

import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import type { VFC } from "react";
import { Platform, UIManager } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { CustomFallback } from "src/error-boundary/CustomFallback";
import { MainNavigator } from "src/MainNavigator";

const App: VFC = () => {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <ErrorBoundary FallbackComponent={CustomFallback}>
          <MainNavigator />
        </ErrorBoundary>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
