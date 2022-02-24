import { addDays, format } from "date-fns";
import { theme } from "native-base";
import type { Reducer } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useReducer } from "react";
import { nanoid } from "src/lib/nanoid";
import { supabase } from "src/lib/supabase";
import { dispatchState } from "src/valtio/dispatch";
import { sessionState } from "src/valtio/session";
import { useSnapshot } from "valtio";

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
        return { ...task, startDate: format(addDays(now, 1), DATE_FORMAT) };
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

export const useTask = (initialTasks: Task[]) => {
  const snap = useSnapshot(sessionState);
  const [tasks, dispatch] = useReducer(reducer, initialTasks);

  useEffect(() => {
    dispatchState.dispatch = dispatch;
  }, []);

  useEffect(() => {
    const updateTasks = async () => {
      try {
        if (snap.session?.user?.id) {
          await supabase.from("todos").update({ tasks }).eq("user_id", snap.session?.user?.id);
        }
      } catch (error) {
        console.error(error);
      }
    };
    updateTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

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
