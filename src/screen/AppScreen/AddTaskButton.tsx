import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, Pressable, Text, theme } from "native-base";
import type { VFC } from "react";
import { useAddTaskInputRef } from "src/context/AddTaskInputRefContext";

export const AddTaskButton: VFC = () => {
  const ref = useAddTaskInputRef();

  return (
    <Pressable onPress={() => ref?.current?.focus()}>
      <HStack w="100%" alignItems="center" space={3}>
        <Icon as={Ionicons} name="add-circle" size={6} color={theme.colors.trueGray[400]} />
        <Text fontSize="lg" color={theme.colors.trueGray[400]}>
          タスクを追加する
        </Text>
      </HStack>
    </Pressable>
  );
};
