import { Box, useColorModeValue, useTheme, VStack } from "native-base";
import type { ReactElement, VFC } from "react";

type AllLayoutProps = {
  children: ReactElement;
};

export const AllLayout: VFC<AllLayoutProps> = (props) => {
  const theme = useTheme();

  return (
    <VStack w="100%" h="100%" bgColor={useColorModeValue(theme.colors.white, theme.colors.black)}>
      <Box safeAreaTop bgColor={useColorModeValue(theme.colors.white, theme.colors.black)} />
      {props.children}
    </VStack>
  );
};
