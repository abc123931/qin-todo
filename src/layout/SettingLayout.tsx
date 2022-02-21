import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Icon, Pressable, Text, VStack } from "native-base";
import type { ReactElement, VFC } from "react";
import { AllLayout } from "src/layout/AllLayout";

type SettingLayoutProps = {
  title: string;
  backIconName: "close-outline" | "chevron-back-outline";
  children: ReactElement;
};

export const SettingLayout: VFC<SettingLayoutProps> = (props) => {
  const navigation = useNavigation();

  return (
    <AllLayout>
      <VStack w="100%" h="100%">
        <HStack justifyContent="space-between" alignItems="center" px={6} py={3}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon size={22} as={Ionicons} name={props.backIconName} />
          </Pressable>
          <Text fontSize="lg" fontWeight="bold">
            {props.title}
          </Text>
          <Box w={22} h={22} />
        </HStack>
        <VStack p={6}>{props.children}</VStack>
      </VStack>
    </AllLayout>
  );
};
