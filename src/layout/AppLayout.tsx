import { Avatar, Box, Flex, HStack, ScrollView, Text, VStack } from "native-base";
import type { ReactNode, VFC } from "react";

type AppLayoutProps = {
  children: ReactNode;
};
export const AppLayout: VFC<AppLayoutProps> = (props) => {
  return (
    <Flex justifyContent="space-between" h="100%">
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
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
        </HStack>
      </VStack>
      <ScrollView w="100%" flexGrow={1}>
        {props.children}
      </ScrollView>
      <Box w="100%" h={50} bg="#6200ee"></Box>
    </Flex>
  );
};
