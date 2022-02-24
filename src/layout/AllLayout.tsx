import { Box, useColorModeValue, useTheme } from "native-base";
import type { ReactElement, VFC } from "react";

type AllLayoutProps = {
  children: ReactElement;
};

export const AllLayout: VFC<AllLayoutProps> = (props) => {
  const theme = useTheme();

  return (
    <Box safeArea w="100%" h="100%" bgColor={useColorModeValue(theme.colors.white, theme.colors.dark[100])}>
      {props.children}
    </Box>
  );
};
