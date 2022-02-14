import { APP_SCHEME, SUPABASE_API_URL } from "@env";
import { openAuthSessionAsync } from "expo-web-browser";
import { Button, useTheme, VStack } from "native-base";
import type { VFC } from "react";
import { useCallback } from "react";
import { Logo } from "src/components/Logo";
import { auth } from "src/lib/supabase";

export const SignInScreen: VFC = () => {
  return (
    <VStack w="100%" h="100%" justifyContent="center" alignItems="center" space={16}>
      <Logo width="60%" height={30} />
      <SignInButton />
    </VStack>
  );
};

const SignInButton: VFC = () => {
  const theme = useTheme();
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

  return (
    <VStack space={4} width="80%">
      <Button
        onPress={handleLogin}
        borderRadius={9999}
        bgColor={theme.colors.white}
        _text={{ color: theme.colors.black }}
      >
        Googleでログイン
      </Button>
      <Button disabled onPress={handleLogin} borderRadius={9999} bgColor={theme.colors.black}>
        Appleでログイン
      </Button>
    </VStack>
  );
};
