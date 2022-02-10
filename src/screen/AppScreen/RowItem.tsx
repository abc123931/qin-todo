import { Box, Center, Heading, HStack, Pressable, Text, theme, useTheme, View } from "native-base";
import type { Dispatch, VFC } from "react";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import SwipeableItem, { useSwipeableItemParams } from "react-native-swipeable-item";
import type { ReducerAction, Task } from "src/hook/useTask";
import { AddTaskButton } from "src/screen/AppScreen/AddTaskButton";

type RowItemProps = {
  item: Task;
  drag: () => void;
  dispatch: Dispatch<ReducerAction>;
  itemRefs: React.MutableRefObject<Map<any, any>>;
  isActive: boolean;
  showTodayAddButton: boolean;
  showTomorrowAddButton: boolean;
};

export const RowItem: VFC<RowItemProps> = (props) => {
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
            renderUnderlayLeft={() => (
              <UnderlayLeft
                onPress={() => props.dispatch({ type: "removeTask", payload: { taskId: props.item.id } })}
              />
            )}
            snapPointsLeft={[72]}
          >
            <View bgColor={props.isActive ? "transparent" : theme.colors.white}>
              <Pressable onLongPress={props.drag} delayLongPress={100} disabled={props.isActive}>
                <HStack alignItems="center" space={3} py={2}>
                  <CustomCheckbox
                    color={props.item.color}
                    isDone={props.item.isDone}
                    taskId={props.item.id}
                    dispatch={props.dispatch}
                  />
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

type CustomCheckboxProps = {
  color: string;
  isDone: boolean;
  taskId: string;
  dispatch: Dispatch<ReducerAction>;
};

const CustomCheckbox: VFC<CustomCheckboxProps> = (props) => {
  return (
    <Pressable onPress={() => props.dispatch({ type: "toggleDone", payload: { taskId: props.taskId } })}>
      <Center width={6} height={6} borderRadius={9999} borderColor={theme.colors.trueGray[300]} borderWidth={2}>
        {props.isDone ? <Box width={4} height={4} bgColor={props.color} borderRadius={9999} /> : null}
      </Center>
    </Pressable>
  );
};

type UnderlayLeftProps = {
  onPress: () => void;
};
const UnderlayLeft: VFC<UnderlayLeftProps> = (props) => {
  const theme = useTheme();
  const { percentOpen } = useSwipeableItemParams<Task>();
  const animStyle = useAnimatedStyle(() => ({ opacity: percentOpen.value }), [percentOpen]);

  return (
    <Animated.View style={animStyle}>
      <Pressable onPress={props.onPress}>
        <HStack
          w="100%"
          h="100%"
          justifyContent="flex-end"
          alignItems="center"
          px={5}
          bgColor={theme.colors.error[500]}
        >
          <Text fontSize="md" color={theme.colors.white}>
            削除
          </Text>
        </HStack>
      </Pressable>
    </Animated.View>
  );
};
