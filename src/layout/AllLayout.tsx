import { Box, useTheme, VStack } from "native-base";
import type { ReactElement, VFC } from "react";

type AllLayoutProps = {
  children: ReactElement;
};

export const AllLayout: VFC<AllLayoutProps> = (props) => {
  const theme = useTheme();

  return (
    <VStack w="100%" h="100%">
      <Box safeAreaTop bgColor={theme.colors.white} />
      {props.children}
    </VStack>
  );
};
