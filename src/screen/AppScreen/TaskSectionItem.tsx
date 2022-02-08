import { Ionicons } from "@expo/vector-icons";
import { Heading, HStack, Icon, Text, useTheme, VStack } from "native-base";
import type { VFC } from "react";
import { Pressable } from "react-native";

type TaskData = {
  id: string;
  title: string;
  isDone: boolean;
  finishedDate?: Date;
  prevTaskId?: string;
};

const now = new Date();
const taskData: TaskData[] = [
  {
    id: "task1",
    title: "タスク1",
    isDone: false,
    finishedDate: now,
  },
  {
    id: "task2",
    title: "タスク2",
    isDone: false,
    finishedDate: now,
    prevTaskId: "task1",
  },
  {
    id: "task3",
    title: "タスク3",
    isDone: false,
  },
];

type TaskSectionItemProps = {
  title: string;
  color: string;
};

export const TaskSectionItem: VFC<TaskSectionItemProps> = (props) => {
  const theme = useTheme();

  return (
    <VStack w="100%" px={6} pt={6} pb={8} space={6}>
      <Heading size="md" color={props.color}>
        {props.title}
      </Heading>
      {taskData.length ? (
        taskData.map((task) => {
          return <Text key={task.id}>{task.title}</Text>;
        })
      ) : (
        <Pressable onPress={() => console.info("pressed")}>
          <HStack w="100%" alignItems="center" space={3}>
            <Icon as={Ionicons} name="add-circle" size={6} color={theme.colors.trueGray[400]} />
            <Text fontSize="lg" color={theme.colors.trueGray[400]}>
              タスクを追加する
            </Text>
          </HStack>
        </Pressable>
      )}
    </VStack>
  );
};
