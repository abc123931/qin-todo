import { Flex, useTheme, View } from "native-base";
import type { ReactNode, VFC } from "react";
import { FooterKeyboard } from "src/layout/FooterKeyboard";
import { Header } from "src/layout/Header";

type AppLayoutProps = {
  children: ReactNode;
};
export const AppLayout: VFC<AppLayoutProps> = (props) => {
  const theme = useTheme();

  return (
    <Flex justifyContent="space-between" h="100%" bgColor={theme.colors.white}>
      <Header />
      {/* TODO: 修正必要 なぜかheightを指定しないといけない */}
      <View w="100%" height={100} px={6} flexGrow={1}>
        {props.children}
      </View>
      <FooterKeyboard />
    </Flex>
  );
};
