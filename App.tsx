import { NativeBaseProvider } from "native-base";
import type { VFC } from "react";
import { AppLayout } from "src/layout/AppLayout";
import { AppScreen } from "src/screen/AppScreen";

const App: VFC = () => {
  return (
    <NativeBaseProvider>
      <AppLayout>
        <AppScreen />
      </AppLayout>
    </NativeBaseProvider>
  );
};

export default App;
