import { Ionicons } from "@expo/vector-icons";
import { Box, Heading, HStack, Icon, Pressable, useTheme } from "native-base";
import type { VFC } from "react";
import { SettingLayout } from "src/layout/SettingLayout";
import { storeTheme, themeState } from "src/valtio/theme";
import { useSnapshot } from "valtio";

const themeTypes: ("os" | "light" | "dark")[] = ["os", "light", "dark"];

export const SettingThemeScreen: VFC = () => {
  return (
    <SettingLayout title="テーマ" backIconName="chevron-back-outline">
      {themeTypes.map((type) => {
        return (
          <Box key={type}>
            <Row type={type} />
          </Box>
        );
      })}
    </SettingLayout>
  );
};

type RowProps = {
  type: "os" | "light" | "dark";
};
const Row: VFC<RowProps> = (props) => {
  const theme = useTheme();
  const snap = useSnapshot(themeState);

  return (
    <Pressable onPress={() => storeTheme(props.type)}>
      <HStack py={3.5} justifyContent="space-between">
        <Heading size="sm">
          {props.type === "os" ? "OSの設定に合わせる" : props.type === "light" ? "ライト" : "ダーク"}
        </Heading>
        {snap.theme === props.type ? (
          <Icon size={22} as={Ionicons} name="checkmark" color={theme.colors.primary[400]} />
        ) : null}
      </HStack>
    </Pressable>
  );
};
