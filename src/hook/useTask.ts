import { addDays, format, isBefore, startOfDay } from "date-fns";
import { customAlphabet } from "nanoid/non-secure";
import { theme } from "native-base";
import type { Reducer } from "react";
import { useMemo } from "react";
import { useReducer } from "react";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);
const DATE_FORMAT = "yyyy-MM-dd";

export type Task =
  | {
      id: string;
      type: "task";
      color: string;
      name: string;
      startDate?: string;
      isDone: boolean;
    }
  | {
      id: "today" | "tomorrow" | "future";
      type: "section";
      color: string;
      name: string;
    };

export type ReducerAction =
  | { type: "addTask"; payload: { taskName: string; sectionId: "today" | "tomorrow" | "future" } }
  | { type: "removeTask" | "toggleDone"; payload: { taskId: string } }
  | { type: "changeOrder"; payload: { tasks: Task[] } };

const init = (tasks: Task[]): Task[] => {
  const tomorrowIndex = tasks.findIndex((task) => task.id === "tomorrow");
  const futureIndex = tasks.findIndex((task) => task.id === "future");

  const tomorrowTasks = tasks.slice(tomorrowIndex + 1, futureIndex);
  const newTodayTasks = tomorrowTasks.filter(
    (task) => task.type === "task" && task.startDate && isBefore(new Date(task.startDate), startOfDay(new Date()))
  );
  const newTomorrowTasks = tomorrowTasks.filter((task) => newTodayTasks.some((todayTask) => todayTask.id !== task.id));

  return [
    ...tasks.slice(0, tomorrowIndex),
    ...newTodayTasks,
    tasks[tomorrowIndex],
    ...newTomorrowTasks,
    ...tasks.slice(futureIndex),
  ];
};

const reducer: Reducer<Task[], ReducerAction> = (state, action) => {
  switch (action.type) {
    case "toggleDone": {
      const targetTaskIndex = state.findIndex((task) => task.id === action.payload.taskId);
      if (targetTaskIndex === -1) return state;

      const targetTask = state[targetTaskIndex];
      if (targetTask.type !== "task") return state;

      return [
        ...state.slice(0, targetTaskIndex),
        { ...targetTask, isDone: !targetTask.isDone },
        ...state.slice(targetTaskIndex + 1),
      ];
    }
    case "removeTask": {
      return [...state.filter((task) => task.id !== action.payload.taskId)];
    }
    case "addTask": {
      const newTask: Task = {
        id: nanoid(),
        type: "task",
        color: theme.colors.rose[500],
        name: action.payload.taskName,
        isDone: false,
      };

      if (action.payload.sectionId === "today") {
        const tomorrowIndex = state.findIndex((task) => task.id === "tomorrow");

        return [...state.slice(0, tomorrowIndex), newTask, ...state.slice(tomorrowIndex)];
      }

      if (action.payload.sectionId === "tomorrow") {
        const futureIndex = state.findIndex((task) => task.id === "future");

        const task = {
          ...newTask,
          color: theme.colors.orange[400],
          startDate: format(addDays(new Date(), 1), DATE_FORMAT),
        };

        return [...state.slice(0, futureIndex), task, ...state.slice(futureIndex)];
      }

      if (action.payload.sectionId === "future") {
        const task = { ...newTask, color: theme.colors.amber[400], startDate: undefined };
        return [...state, task];
      }
      return state;
    }
    case "changeOrder": {
      const tomorrowIndex = action.payload.tasks.findIndex((task) => task.id === "tomorrow");
      const futureIndex = action.payload.tasks.findIndex((task) => task.id === "future");

      const todayTasks = action.payload.tasks.slice(0, tomorrowIndex).map((task) => {
        return { ...task, startDate: undefined };
      });

      const now = new Date();
      const tomorrowTasks = action.payload.tasks.slice(tomorrowIndex + 1, futureIndex).map((task) => {
        if (task.type === "section") return task;
        if (!task.startDate) {
          return { ...task, startDate: format(addDays(now, 1), DATE_FORMAT) };
        }
        return task;
      });

      const futureTasks = action.payload.tasks.slice(futureIndex + 1).map((task) => {
        return { ...task, startDate: undefined };
      });

      return [
        ...todayTasks,
        action.payload.tasks[tomorrowIndex],
        ...tomorrowTasks,
        action.payload.tasks[futureIndex],
        ...futureTasks,
      ];
    }
    default: {
      throw new Error();
    }
  }
};

export const useTask = () => {
  const [tasks, dispatch] = useReducer(
    reducer,
    [
      { id: "11", name: "タスク1", type: "task", color: theme.colors.rose[500], isDone: true },
      { id: "12", name: "タスク2", type: "task", color: theme.colors.rose[500], isDone: false },
      { id: "13", name: "タスク2", type: "task", color: theme.colors.rose[500], isDone: false },
      { id: "14", name: "タスク2", type: "task", color: theme.colors.rose[500], isDone: false },
      { id: "15", name: "タスク2", type: "task", color: theme.colors.rose[500], isDone: false },
      { id: "tomorrow", name: "明日する", type: "section", color: theme.colors.orange[400] },
      { id: "future", name: "今度する", type: "section", color: theme.colors.amber[400] },
    ],
    init
  );

  const showTodayAddButton = useMemo(() => {
    const tomorrowIndex = tasks.findIndex((task) => task.id === "tomorrow");
    return tasks.slice(0, tomorrowIndex).length === 0;
  }, [tasks]);

  const showTomorrowAddButton = useMemo(() => {
    const tomorrowIndex = tasks.findIndex((task) => task.id === "tomorrow");
    const futureIndex = tasks.findIndex((task) => task.id === "future");
    return tasks.slice(tomorrowIndex + 1, futureIndex).length === 0;
  }, [tasks]);

  const showFutureAddButton = useMemo(() => {
    const futureIndex = tasks.findIndex((task) => task.id === "future");
    return tasks.slice(futureIndex + 1).length === 0;
  }, [tasks]);

  return { tasks, dispatch, showTodayAddButton, showTomorrowAddButton, showFutureAddButton };
};
