import { AntDesign } from "@expo/vector-icons";
import { Box, Button, HStack, Icon, Input, KeyboardAvoidingView, Text, useTheme, VStack } from "native-base";
import type { ColorType } from "native-base/lib/typescript/components/types";
import type { VFC } from "react";
import { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { Keyboard, Platform } from "react-native";
import { useAddTaskInputRef } from "src/context/AddTaskInputRefContext";
import { dispatchState } from "src/valtio/dispatch";
import { useSnapshot } from "valtio";

type Form = { name: string };

export const FooterKeyboard: VFC = () => {
  const theme = useTheme();
  const { isShowKeyboard } = useKeyboard();
  const snap = useSnapshot(dispatchState);
  const { control, handleSubmit, reset } = useForm<Form>({ defaultValues: { name: "" } });
  const {
    field: { value, onChange },
  } = useController({ control, name: "name" });
  const ref = useAddTaskInputRef();

  const handleClick = (sectionId: "today" | "tomorrow" | "future") =>
    handleSubmit(async (data) => {
      snap.dispatch?.({ type: "addTask", payload: { taskName: data.name, sectionId } });
      reset();
    });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Box w="100%" borderTopWidth={2} borderColor={theme.colors.trueGray[200]}>
        <VStack px={6} py={3} pb={isShowKeyboard ? undefined : 10} space={2.5}>
          <Input
            variant="rounded"
            placeholder="タスクを入力する"
            size="sm"
            py={2.5}
            px={4}
            value={value}
            onChangeText={onChange}
            fontSize={12}
            lineHeight={16}
            bgColor={theme.colors.blueGray[100]}
            borderWidth={0}
            ref={ref}
            alignItems="center"
            selectionColor={theme.colors.rose[500]}
          />
          {isShowKeyboard ? (
            <HStack alignItems="center" justifyContent="space-between">
              <StatusButton text="今日する" color={theme.colors.rose[500]} onPress={handleClick("today")} />
              <StatusButton text="明日する" color={theme.colors.orange[400]} onPress={handleClick("tomorrow")} />
              <StatusButton text="今度する" color={theme.colors.amber[400]} onPress={handleClick("future")} />
            </HStack>
          ) : null}
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  );
};

type StatusButtonProps = {
  onPress: () => void;
  text: string;
  color: ColorType;
};

const StatusButton: VFC<StatusButtonProps> = (props) => {
  const theme = useTheme();
  return (
    <Button
      borderRadius={9999}
      px={4}
      bg={props.color}
      leftIcon={<Icon as={AntDesign} name="plus" size="10.25" color={theme.colors.white} />}
      onPress={props.onPress}
    >
      <Text fontSize="xs" color={theme.colors.white} fontWeight="bold">
        {props.text}
      </Text>
    </Button>
  );
};

const useKeyboard = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const _keyboardDidShow = () => setIsShowKeyboard(true);
  const _keyboardDidHide = () => setIsShowKeyboard(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  return { isShowKeyboard };
};
