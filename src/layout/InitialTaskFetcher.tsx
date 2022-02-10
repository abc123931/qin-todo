import type { PostgrestResponse } from "@supabase/supabase-js";
import { isBefore } from "date-fns";
import { Center, Spinner, theme } from "native-base";
import type { ReactElement, VFC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import type { Task } from "src/hook/useTask";
import { supabase } from "src/lib/supabase";
import { todosIdState } from "src/valtio/todosId";

type InitialTaskFetcherProps = {
  children: (tasks: Task[]) => ReactElement;
};
export const InitialTaskFetcher: VFC<InitialTaskFetcherProps> = (props) => {
  const { loading, initialTasks } = useInit();

  if (loading) {
    return (
      <Center w="100%" h="100%">
        <Spinner size="lg" />
      </Center>
    );
  }

  return props.children(initialTasks);
};

const useInit = () => {
  const [loading, setLoading] = useState(true);
  const [initialTasks, setInitialTasks] = useState<Task[]>([]);

  const init = async () => {
    try {
      const { data, error } = await supabase.from<{ id: string; tasks: Task[] }>("todos").select("*").maybeSingle();
      if (error) {
        throw new Error(error?.message ?? "データ取得に失敗しました");
      }
      if (!data) {
        const res: PostgrestResponse<{ id: string }> = await supabase.from("todos").insert([
          {
            tasks: [
              {
                id: "tomorrow",
                type: "section",
                name: "明日する",
                color: theme.colors.orange[400],
              },
              {
                id: "future",
                type: "section",
                name: "今度する",
                color: theme.colors.amber[400],
              },
            ],
          },
        ]);

        todosIdState.todosId = res.data?.[0]?.id;

        return setInitialTasks([
          {
            id: "tomorrow",
            type: "section",
            name: "明日する",
            color: theme.colors.orange[400],
          },
          {
            id: "future",
            type: "section",
            name: "今度する",
            color: theme.colors.amber[400],
          },
        ]);
      }

      todosIdState.todosId = data.id;
      const tomorrowIndex = data.tasks.findIndex((task) => task.id === "tomorrow");
      const futureIndex = data.tasks.findIndex((task) => task.id === "future");

      const tomorrowTasks = data.tasks.slice(tomorrowIndex + 1, futureIndex);
      const newTodayTasks = tomorrowTasks
        .filter((task) => task.type === "task" && task.startDate && isBefore(new Date(task.startDate), new Date()))
        .map((task) => {
          return { ...task, startDate: undefined };
        });
      const newTomorrowTasks = newTodayTasks.length
        ? tomorrowTasks.filter((task) => {
            return newTodayTasks.some((todayTask) => todayTask.id !== task.id);
          })
        : tomorrowTasks;

      return setInitialTasks([
        ...data.tasks.slice(0, tomorrowIndex),
        ...newTodayTasks,
        data.tasks[tomorrowIndex],
        ...newTomorrowTasks,
        ...data.tasks.slice(futureIndex),
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return { loading, initialTasks };
};
