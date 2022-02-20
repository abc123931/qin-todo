import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, HStack, Icon, Pressable, Text, VStack } from "native-base";
import type { VFC } from "react";
import { AllLayout } from "src/layout/AllLayout";
import type { RootStackParamList } from "src/MainNavigator";

export const SettingScreen: VFC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "setting">>();

  return (
    <AllLayout>
      <VStack w="100%" h="100%">
        <HStack justifyContent="space-between" alignItems="center" px={6} py={3}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon size={22} as={Ionicons} name={"close-outline"} />
          </Pressable>
          <Text fontSize="lg" fontWeight="bold">
            設定
          </Text>
          <Box w={22} h={22} />
        </HStack>
      </VStack>
    </AllLayout>
  );
};
