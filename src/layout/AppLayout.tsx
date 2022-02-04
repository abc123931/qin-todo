import { AntDesign } from "@expo/vector-icons";
import { Avatar, Box, Button, Flex, HStack, Icon, Input, ScrollView, Text, useTheme, VStack } from "native-base";
import type { ColorType } from "native-base/lib/typescript/components/types";
import type { ReactNode, VFC } from "react";
import { InputAccessoryView } from "react-native";

type AppLayoutProps = {
  children: ReactNode;
};
export const AppLayout: VFC<AppLayoutProps> = (props) => {
  const theme = useTheme();

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
      <InputAccessoryView>
        <Box w="100%" bg="#6200ee">
          <VStack px={6} py={3} space={2.5}>
            <Input
              variant="rounded"
              placeholder="タスクを入力する"
              height={36}
              py={2.5}
              px={4}
              color={theme.colors.trueGray[100]}
            />
            <HStack alignItems="center" justifyContent="space-between">
              <StatusButton text="今日する" color={theme.colors.rose[500]} />
              <StatusButton text="明日する" color={theme.colors.orange[400]} />
              <StatusButton text="今度する" color={theme.colors.amber[400]} />
            </HStack>
          </VStack>
        </Box>
      </InputAccessoryView>
    </Flex>
  );
};

type StatusButtonProps = {
  text: string;
  color: ColorType;
};

const StatusButton: VFC<StatusButtonProps> = (props) => {
  const theme = useTheme();
  return (
    <Button
      borderRadius={9999}
      px={4}
      bg={props.color}
      leftIcon={<Icon as={AntDesign} name="plus" size="10.25" color={theme.colors.white} />}
    >
      <Text fontSize="xs" color={theme.colors.white} fontWeight="bold">
        {props.text}
      </Text>
    </Button>
  );
};

// const useKeyboard = () => {
//   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
//   const _keyboardDidShow = () => setIsShowKeyboard(true);
//   const _keyboardDidHide = () => setIsShowKeyboard(false);

//   useEffect(() => {
//     Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
//     Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

//     // cleanup function
//     return () => {
//       Keyboard.removeAllListeners("keyboardDidShow");
//       Keyboard.removeAllListeners("keyboardDidHide");
//     };
//   }, []);

//   return { isShowKeyboard };
// };
