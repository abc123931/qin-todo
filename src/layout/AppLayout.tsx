import { Avatar, Box, Flex, HStack, Text, useTheme, View, VStack } from "native-base";
import type { ReactNode, VFC } from "react";
import { FooterKeyboard } from "src/layout/FooterKeyboard";
import { sessionState } from "src/valtio/session";
import { useSnapshot } from "valtio";

type AppLayoutProps = {
  children: ReactNode;
};
export const AppLayout: VFC<AppLayoutProps> = (props) => {
  const theme = useTheme();
  const sessionSnap = useSnapshot(sessionState);

  return (
    <Flex justifyContent="space-between" h="100%" bgColor={theme.colors.white}>
      <VStack>
        <Box safeAreaTop bg="#6200ee" />
        <HStack bg="#6200ee" w="100%" justifyContent="space-between" alignItems="center" px={6}>
          <Box w={36} h={36} />
          <Text fontSize={24} py={3} color="coolGray.100" fontWeight="bold">
            Qin Todo
          </Text>
          <Avatar
            w={36}
            h={36}
            my={2.5}
            source={{
              uri: sessionSnap.session?.user?.user_metadata?.avatar_url + "test",
            }}
          >
            <Avatar w={36} h={36} my={2.5} source={require("/assets/dummy_profile.png")} />
          </Avatar>
        </HStack>
      </VStack>
      {/* TODO: 修正必要 なぜかheightを指定しないといけない */}
      <View w="100%" height={100} px={6} flexGrow={1}>
        {props.children}
      </View>
      <FooterKeyboard />
    </Flex>
  );
};
