import { Ionicons } from "@expo/vector-icons";
import { Heading, HStack, Icon, Pressable, useTheme } from "native-base";
import type { VFC } from "react";
import { SettingLayout } from "src/layout/SettingLayout";
import { storeTheme } from "src/valtio/theme";

export const SettingThemeScreen: VFC = () => {
  const theme = useTheme();

  return (
    <SettingLayout title="テーマ" backIconName="chevron-back-outline">
      <Pressable onPress={() => storeTheme("os")}>
        <HStack py={3.5} justifyContent="space-between">
          <Heading size="sm">OSの設定に合わせる</Heading>
          <Icon size={22} as={Ionicons} name="checkmark" color={theme.colors.primary[400]} />
        </HStack>
      </Pressable>
      <Pressable onPress={() => storeTheme("light")}>
        <HStack py={3.5} justifyContent="space-between">
          <Heading size="sm">ライト</Heading>
          <Icon size={22} as={Ionicons} name="checkmark" color={theme.colors.primary[400]} />
        </HStack>
      </Pressable>
      <Pressable onPress={() => storeTheme("dark")}>
        <HStack py={3.5} justifyContent="space-between">
          <Heading size="sm">ダーク</Heading>
          <Icon size={22} as={Ionicons} name="checkmark" color={theme.colors.primary[400]} />
        </HStack>
      </Pressable>
    </SettingLayout>
  );
};
