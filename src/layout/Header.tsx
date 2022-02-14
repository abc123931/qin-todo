import { Avatar, Box, HStack, Modal, Pressable, Text, VStack } from "native-base";
import type { VFC } from "react";
import { Logo } from "src/components/Logo";
import { auth } from "src/lib/supabase";
import { sessionState } from "src/valtio/session";
import { useSnapshot } from "valtio";

export const Header: VFC = () => {
  const sessionSnap = useSnapshot(sessionState);

  return (
    <>
      <VStack>
        <Box safeAreaTop />
        <HStack w="100%" justifyContent="space-between" alignItems="center" px={6}>
          <Box w={36} h={36} />
          <Pressable>
            <Logo />
          </Pressable>
          <Avatar
            w={36}
            h={36}
            my={2.5}
            source={{
              uri: sessionSnap.session?.user?.user_metadata?.avatar_url,
            }}
          >
            <Avatar w={36} h={36} my={2.5} source={require("/assets/dummy_profile.png")} />
          </Avatar>
        </HStack>
      </VStack>
      <Modal isOpen size="lg">
        <Modal.Content mb="auto" mt={70}>
          <Modal.Body>
            <VStack>
              <Text>hello</Text>
              <Pressable onPress={() => auth.signOut()}>
                <HStack>
                  <Text>ログアウト</Text>
                </HStack>
              </Pressable>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
