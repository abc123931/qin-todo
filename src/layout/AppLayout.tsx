import { View, VStack } from "native-base";
import type { ReactNode, VFC } from "react";
import { FooterKeyboard } from "src/layout/FooterKeyboard";
import { Header } from "src/layout/Header";

type AppLayoutProps = {
  children: ReactNode;
};
export const AppLayout: VFC<AppLayoutProps> = (props) => {
  return (
    <VStack justifyContent="space-between" h="100%">
      <Header />
      {/* TODO: 修正必要 なぜかheightを指定しないといけない */}
      <View w="100%" px={6} h={100} flexGrow={1}>
        {props.children}
      </View>
      <FooterKeyboard />
    </VStack>
  );
};
