import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, HStack, Modal, Pressable, Text, VStack } from "native-base";
import type { VFC } from "react";
import { useState } from "react";
import { Logo } from "src/components/Logo";
import { ProfileAvatar } from "src/components/ProfileAvatar";
import { auth } from "src/lib/supabase";
import type { RootStackParamList } from "src/MainNavigator";

export const Header: VFC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "setting">>();

  return (
    <>
      <HStack w="100%" justifyContent="space-between" alignItems="center" px={6}>
        <Box w={36} h={36} />
        <Pressable>
          <Logo />
        </Pressable>
        <ProfileAvatar w={36} h={36} my={2.5} onPress={() => setIsOpen(true)} />
      </HStack>
      <Modal isOpen={isOpen} size="lg" onClose={() => setIsOpen(false)}>
        <Modal.Content mb="auto" mt={70}>
          <Modal.Body>
            <VStack mx={3} my={3} space={4}>
              <ProfileAvatar w={8} h={8} />
              <Pressable
                onPress={() => {
                  setIsOpen(false);
                  navigation.navigate("setting");
                }}
              >
                <HStack>
                  <Text>設定</Text>
                </HStack>
              </Pressable>
              <Pressable
                onPress={() => {
                  setIsOpen(false);
                  auth.signOut();
                }}
              >
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
