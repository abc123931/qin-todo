import { APP_SCHEME, SUPABASE_API_URL } from "@env";
import { openAuthSessionAsync } from "expo-web-browser";
import { Button, Center, Text } from "native-base";
import type { VFC } from "react";
import { useCallback } from "react";
import { auth } from "src/lib/supabase";

export const SignInScreen: VFC = () => {
  return (
    <Center h="100%">
      <Text>ログイン画面</Text>
      <SignInButton />
    </Center>
  );
};

const SignInButton: VFC = () => {
  const handleLogin = useCallback(async () => {
    const res = await openAuthSessionAsync(
      `${SUPABASE_API_URL}/auth/v1/authorize?provider=google&redirect_to=${APP_SCHEME}`,
      APP_SCHEME
    );
    if (res.type !== "success") return;
    const params = new URLSearchParams(res.url);
    const refreshToken = params.get("refresh_token");
    if (!refreshToken) return;
    await auth.signIn({ refreshToken });
  }, []);
  return <Button onPress={handleLogin}>ログインする</Button>;
};
