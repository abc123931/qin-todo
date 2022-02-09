import { Ionicons } from "@expo/vector-icons";
import { Box, Center, Heading, HStack, Icon, Pressable, Text, theme } from "native-base";
import type { VFC } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import type { RenderItemParams } from "react-native-draggable-flatlist";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";

type Item = {
  id: string;
  type: "section" | "item";
  color: string;
  name: string;
  isDone: boolean;
};

const initialData: Item[] = [
  { id: "11", name: "タスク1", type: "item", color: theme.colors.rose[500], isDone: true },
  { id: "tomorrow", name: "明日する", type: "section", color: theme.colors.orange[400], isDone: false },
  { id: "future", name: "今度する", type: "section", color: theme.colors.amber[400], isDone: false },
];

const CustomCheckbox: VFC<{ color: string; isDone: boolean }> = (props) => {
  return (
    <Pressable>
      <Center width={6} height={6} borderRadius={9999} borderColor={theme.colors.trueGray[300]} borderWidth={2}>
        {props.isDone ? <Box width={4} height={4} bgColor={props.color} borderRadius={9999} /> : null}
      </Center>
    </Pressable>
  );
};

export const TaskSectionList: VFC = () => {
  const [data, setData] = useState(initialData);

  const showTodayAddButton = useMemo(() => {
    const todayIndex = data.findIndex((d) => d.id === "today");
    const tomorrowIndex = data.findIndex((d) => d.id === "tomorrow");
    return data.slice(todayIndex + 1, tomorrowIndex).length === 0;
  }, [data]);

  const showTomorrowAddButton = useMemo(() => {
    const tomorrowIndex = data.findIndex((d) => d.id === "tomorrow");
    const futureIndex = data.findIndex((d) => d.id === "future");
    return data.slice(tomorrowIndex + 1, futureIndex).length === 0;
  }, [data]);

  const showFutureAddButton = useMemo(() => {
    const futureIndex = data.findIndex((d) => d.id === "future");
    return data.slice(futureIndex + 1).length === 0;
  }, [data]);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <>
        {item.type === "section" ? (
          <>
            {(item.id === "tomorrow" && showTodayAddButton) || (item.id === "future" && showTomorrowAddButton) ? (
              <AddTaskButton />
            ) : null}
            <Heading size="md" pt={8} pb={4} color={item.color}>
              {item.name}
            </Heading>
          </>
        ) : (
          <ScaleDecorator>
            <TouchableOpacity onLongPress={drag} delayLongPress={100} disabled={isActive}>
              <HStack alignItems="center" space={3} py={2}>
                <CustomCheckbox color={item.color} isDone={item.isDone} />
                <Heading
                  size="sm"
                  strikeThrough={item.isDone}
                  color={item.isDone ? theme.colors.trueGray[300] : undefined}
                >
                  {item.name}
                </Heading>
              </HStack>
            </TouchableOpacity>
          </ScaleDecorator>
        )}
      </>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      ListHeaderComponent={
        <Heading size="md" pb={4} color={theme.colors.rose[500]}>
          今日する
        </Heading>
      }
      ListFooterComponent={showFutureAddButton ? <AddTaskButton /> : null}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ height: "100%", paddingTop: 24, paddingBottom: 24 }}
    />
  );
};

const AddTaskButton: VFC = () => {
  return (
    <Pressable onPress={() => console.info("pressed")}>
      <HStack w="100%" alignItems="center" space={3}>
        <Icon as={Ionicons} name="add-circle" size={6} color={theme.colors.trueGray[400]} />
        <Text fontSize="lg" color={theme.colors.trueGray[400]}>
          タスクを追加する
        </Text>
      </HStack>
    </Pressable>
  );
};
