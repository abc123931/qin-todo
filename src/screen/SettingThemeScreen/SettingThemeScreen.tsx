import { Text } from "native-base";
import type { VFC } from "react";
import { SettingLayout } from "src/layout/SettingLayout";

export const SettingThemeScreen: VFC = () => {
  return (
    <SettingLayout title="テーマ設定" backIconName="chevron-back-outline">
      <Text>テーマ設定</Text>
    </SettingLayout>
  );
};
