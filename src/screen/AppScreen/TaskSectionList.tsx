import { Heading, theme } from "native-base";
import type { VFC } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import type { RenderItemParams } from "react-native-draggable-flatlist";
import DraggableFlatList from "react-native-draggable-flatlist";
import type { Task } from "src/hook/useTask";
import { useTask } from "src/hook/useTask";
import { AddTaskButton } from "src/screen/AppScreen/AddTaskButton";
import { RowItem } from "src/screen/AppScreen/RowItem";

export const TaskSectionList: VFC = () => {
  const { tasks, dispatch, showTodayAddButton, showTomorrowAddButton, showFutureAddButton } = useTask();
  const itemRefs = useRef(new Map());

  const renderItem = useCallback(
    (params: RenderItemParams<Task>) => {
      return (
        <RowItem
          {...params}
          itemRefs={itemRefs}
          showTodayAddButton={showTodayAddButton}
          showTomorrowAddButton={showTomorrowAddButton}
          dispatch={dispatch}
        />
      );
    },
    [dispatch, showTodayAddButton, showTomorrowAddButton]
  );

  return (
    <DraggableFlatList
      data={tasks}
      onDragEnd={({ data }) => dispatch({ type: "changeOrder", payload: { tasks: data } })}
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
  );
};
