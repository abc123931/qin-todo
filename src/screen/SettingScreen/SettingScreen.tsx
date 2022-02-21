import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Heading, HStack, Icon, Pressable, useTheme, VStack } from "native-base";
import type { VFC } from "react";
import { SettingLayout } from "src/layout/SettingLayout";
import type { RootStackParamList } from "src/MainNavigator";

export const SettingScreen: VFC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "setting">>();
  const theme = useTheme();

  return (
    <SettingLayout title="設定" backIconName="close-outline">
      <VStack>
        <Heading size="xs" color={theme.colors.trueGray[400]}>
          設定
        </Heading>
        <Pressable>
          <HStack justifyContent="space-between" py={3.5}>
            <Heading size="sm">プロフィール設定</Heading>
            <Icon size={22} as={Ionicons} name="chevron-forward-outline" color={theme.colors.trueGray[400]} />
          </HStack>
        </Pressable>
        <Pressable>
          <HStack justifyContent="space-between" py={3.5}>
            <Heading size="sm">アカウント設定</Heading>
            <Icon size={22} as={Ionicons} name="chevron-forward-outline" color={theme.colors.trueGray[400]} />
          </HStack>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("settingTheme")}>
          <HStack justifyContent="space-between" py={3.5}>
            <Heading size="sm">テーマ</Heading>
            <HStack space={4}>
              <Heading size="sm">OSの設定に合わせる</Heading>
              <Icon size={22} as={Ionicons} name="chevron-forward-outline" color={theme.colors.trueGray[400]} />
            </HStack>
          </HStack>
        </Pressable>
      </VStack>
    </SettingLayout>
  );
};
