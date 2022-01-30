import { Box, NativeBaseProvider } from "native-base";
import type { VFC } from "react";

const App: VFC = () => {
  return (
    <NativeBaseProvider>
      <Box safeArea>Hello world</Box>
    </NativeBaseProvider>
  );
};

export default App;
