import { Box, Button, Center, Text, useTheme, View } from "native-base";
import type { VFC } from "react";

type CustomFallbackProps = {
  error: Error;
  resetError: () => void;
};
export const CustomFallback: VFC<CustomFallbackProps> = (props) => {
  const theme = useTheme();

  return (
    <View>
      <Box safeAreaTop bgColor={theme.colors.white} />
      <Center h="100%">
        <Text>Something happened!</Text>
        <Text>{props.error.toString()}</Text>
        <Button onPress={props.resetError}>Try again</Button>
      </Center>
    </View>
  );
};
