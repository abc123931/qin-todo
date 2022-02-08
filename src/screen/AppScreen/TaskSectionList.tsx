import { Ionicons } from "@expo/vector-icons";
import { Box, Center, Heading, HStack, Icon, Pressable, Text, theme, VStack } from "native-base";
import type { VFC } from "react";
import React, { useState } from "react";
import type { RenderColumnWrapperArguments, RenderRowArguments } from "react-native-dnd-board";
import Board, { Repository } from "react-native-dnd-board";

type BoardData = {
  id: string;
  name: string;
  color: string;
  rows: { id: string; color: string; name: string; isDone: boolean }[];
}[];

const mockData = [
  {
    id: "1",
    name: "今日する",
    color: theme.colors.rose[500],
    rows: [
      { id: "11", color: theme.colors.rose[500], name: "タスク1", isDone: true },
      { id: "12", color: theme.colors.rose[500], name: "タスク2", isDone: false },
    ],
  },
  {
    id: "2",
    name: "明日する",
    color: theme.colors.orange[400],
    rows: [{ id: "21", color: theme.colors.orange[400], name: "タスク3", isDone: false }],
  },
  {
    id: "3",
    name: "今度する",
    color: theme.colors.amber[400],
    rows: [],
  },
];

const renderColumnWrapper = ({ item, columnComponent, layoutProps }: RenderColumnWrapperArguments<BoardData>) => {
  return (
    <VStack w="100%" px={6} pt={6} pb={8} space={4} {...layoutProps}>
      <Heading size="md" color={item.color}>
        {item.name}
      </Heading>
      {/* TODO: からの時でも高さがある */}
      {columnComponent}
      {item.rows.length === 0 ? (
        <Pressable onPress={() => console.info("pressed")}>
          <HStack w="100%" alignItems="center" space={3}>
            <Icon as={Ionicons} name="add-circle" size={6} color={theme.colors.trueGray[400]} />
            <Text fontSize="lg" color={theme.colors.trueGray[400]}>
              タスクを追加する
            </Text>
          </HStack>
        </Pressable>
      ) : null}
    </VStack>
  );
};

const renderRow = ({ item }: RenderRowArguments<BoardData>) => {
  return (
    <HStack alignItems="center" space={3} py={2}>
      <CustomCheckbox color={item.color} isDone={item.isDone} />
      <Heading size="sm" strikeThrough={item.isDone} color={item.isDone ? theme.colors.trueGray[300] : undefined}>
        {item.name}
      </Heading>
    </HStack>
  );
};

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
  const [repository, _setRepository] = useState(new Repository(mockData));

  return (
    <Board<BoardData>
      horizontal={false}
      repository={repository}
      renderRow={renderRow}
      renderColumnWrapper={renderColumnWrapper}
      onRowPress={(row) => console.info(row.columnId)}
      onDragEnd={(fromColumnId, toColumnId, _row) => {
        console.info(fromColumnId);
        console.info(toColumnId);
      }}
    />
  );
};
