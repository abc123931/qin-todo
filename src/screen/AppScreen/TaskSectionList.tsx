import { Ionicons } from "@expo/vector-icons";
import { Heading, HStack, Icon, Text, theme, useTheme, VStack } from "native-base";
import type { VFC } from "react";
import { Pressable } from "react-native";

const sections = [
  {
    title: "今日する",
    color: theme.colors.danger[500],
  },
  {
    title: "明日する",
    color: theme.colors.danger[500],
  },
  {
    title: "今度する",
    color: theme.colors.danger[500],
  },
];

export const TaskSectionList: VFC = () => {
  return (
    <VStack w="100%">
      {sections.map((section) => (
        <TaskSectionItem key={section.title} {...section} />
      ))}
    </VStack>
  );
};

type TaskSectionItemProps = {
  title: string;
  color: string;
};
const TaskSectionItem: VFC<TaskSectionItemProps> = (props) => {
  const theme = useTheme();

  return (
    <VStack w="100%" px={6} pt={6} pb={8} space={6}>
      <Heading size="md" color={props.color}>
        {props.title}
      </Heading>
      <Pressable onPress={() => console.info("pressed")}>
        <HStack w="100%" alignItems="center" space={3}>
          <Icon as={Ionicons} name="add-circle" size={6} color={theme.colors.trueGray[400]} />
          <Text fontSize="lg" color={theme.colors.trueGray[400]}>
            タスクを追加する
          </Text>
        </HStack>
      </Pressable>
    </VStack>
  );
};
