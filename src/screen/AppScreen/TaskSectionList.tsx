import { Ionicons } from "@expo/vector-icons";
import { Box, Center, Heading, HStack, Icon, Pressable, Text, theme, useTheme, View } from "native-base";
import type { VFC } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import type { RenderItemParams } from "react-native-draggable-flatlist";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import SwipeableItem, { useSwipeableItemParams } from "react-native-swipeable-item";

type Item = {
  id: string;
  type: "section" | "item";
  color: string;
  name: string;
  isDone: boolean;
};

const initialData: Item[] = [
  { id: "11", name: "タスク1", type: "item", color: theme.colors.rose[500], isDone: true },
  { id: "12", name: "タスク2", type: "item", color: theme.colors.rose[500], isDone: false },
  { id: "13", name: "タスク2", type: "item", color: theme.colors.rose[500], isDone: false },
  { id: "14", name: "タスク2", type: "item", color: theme.colors.rose[500], isDone: false },
  { id: "15", name: "タスク2", type: "item", color: theme.colors.rose[500], isDone: false },
  { id: "16", name: "タスク2", type: "item", color: theme.colors.rose[500], isDone: false },
  { id: "17", name: "タスク2", type: "item", color: theme.colors.rose[500], isDone: false },
  { id: "18", name: "タスク2", type: "item", color: theme.colors.rose[500], isDone: false },
  { id: "19", name: "タスク2", type: "item", color: theme.colors.rose[500], isDone: false },
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
  const itemRefs = useRef(new Map());

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

  const renderItem = useCallback(
    (params: RenderItemParams<Item>) => {
      return (
        <RowItem
          {...params}
          itemRefs={itemRefs}
          showTodayAddButton={showTodayAddButton}
          showTomorrowAddButton={showTomorrowAddButton}
        />
      );
    },
    [showTodayAddButton, showTomorrowAddButton]
  );

  return (
    <View style={styles.container}>
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
        activationDistance={20}
        contentContainerStyle={{ paddingTop: 24, paddingBottom: 40 }}
      />
    </View>
  );
};

type RowItemProps = {
  item: Item;
  drag: () => void;
  itemRefs: React.MutableRefObject<Map<any, any>>;
  isActive: boolean;
  showTodayAddButton: boolean;
  showTomorrowAddButton: boolean;
};
const RowItem: VFC<RowItemProps> = (props) => {
  return (
    <>
      {props.item.type === "section" ? (
        <>
          {(props.item.id === "tomorrow" && props.showTodayAddButton) ||
          (props.item.id === "future" && props.showTomorrowAddButton) ? (
            <AddTaskButton />
          ) : null}
          <Heading size="md" pt={8} pb={4} color={props.item.color}>
            {props.item.name}
          </Heading>
        </>
      ) : (
        <ScaleDecorator>
          <SwipeableItem
            key={props.item.id}
            item={props.item}
            ref={(ref) => {
              if (ref && !props.itemRefs.current.get(props.item.id)) {
                props.itemRefs.current.set(props.item.id, ref);
              }
            }}
            onChange={({ open }) => {
              if (open) {
                [...props.itemRefs.current.entries()].forEach(([key, ref]) => {
                  if (key !== props.item.id && ref) ref.close();
                });
              }
            }}
            overSwipe={20}
            renderUnderlayLeft={() => <UnderlayLeft />}
            snapPointsLeft={[72]}
          >
            <View bgColor={theme.colors.white}>
              <Pressable onLongPress={props.drag} delayLongPress={100} disabled={props.isActive}>
                <HStack alignItems="center" space={3} py={2}>
                  <CustomCheckbox color={props.item.color} isDone={props.item.isDone} />
                  <Heading
                    size="sm"
                    strikeThrough={props.item.isDone}
                    color={props.item.isDone ? theme.colors.trueGray[300] : undefined}
                  >
                    {props.item.name}
                  </Heading>
                </HStack>
              </Pressable>
            </View>
          </SwipeableItem>
        </ScaleDecorator>
      )}
    </>
  );
};

const UnderlayLeft: VFC = () => {
  const theme = useTheme();
  const { percentOpen } = useSwipeableItemParams<Item>();
  const animStyle = useAnimatedStyle(() => ({ opacity: percentOpen.value }), [percentOpen]);

  return (
    <Animated.View style={animStyle}>
      <HStack w="100%" h="100%" justifyContent="flex-end" alignItems="center" px={5} bgColor={theme.colors.error[500]}>
        <Text fontSize="md" color={theme.colors.white}>
          削除
        </Text>
      </HStack>
    </Animated.View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 32,
  },
  underlayRight: {
    flex: 1,
    backgroundColor: "teal",
    justifyContent: "flex-start",
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "flex-end",
  },
});
