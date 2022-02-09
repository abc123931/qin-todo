import { NativeBaseProvider } from "native-base";
import type { VFC } from "react";
import { Platform, UIManager } from "react-native";
import { AppLayout } from "src/layout/AppLayout";
import { AppScreen } from "src/screen/AppScreen";

const App: VFC = () => {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  return (
    <NativeBaseProvider>
      <AppLayout>
        <AppScreen />
      </AppLayout>
    </NativeBaseProvider>
  );
};

export default App;
