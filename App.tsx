import { Box, NativeBaseProvider } from "native-base";
import type { VFC } from "react";
import { AppLayout } from "src/layout/AppLayout";

const App: VFC = () => {
  return (
    <NativeBaseProvider>
      <AppLayout>
        <Box>Hello world</Box>
      </AppLayout>
    </NativeBaseProvider>
  );
};

export default App;
