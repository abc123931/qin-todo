import "react-native-url-polyfill/auto";

import { NativeBaseProvider } from "native-base";
import type { VFC } from "react";
import { Platform, UIManager } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { CustomFallback } from "src/error-boundary/CustomFallback";
import { AppScreen } from "src/screen/AppScreen";

const App: VFC = () => {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  return (
    <NativeBaseProvider>
      <ErrorBoundary FallbackComponent={CustomFallback}>
        <AppScreen />
      </ErrorBoundary>
    </NativeBaseProvider>
  );
};

export default App;
