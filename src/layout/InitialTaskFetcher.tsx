import { isBefore } from "date-fns";
import { Center, Spinner, theme } from "native-base";
import type { ReactElement, VFC } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import type { AppStateStatus } from "react-native";
import { AppState } from "react-native";
import type { Task } from "src/hook/useTask";
import { supabase } from "src/lib/supabase";
import { sessionState } from "src/valtio/session";
import { useSnapshot } from "valtio";

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
  const appState = useRef(AppState.currentState);
  const [loading, setLoading] = useState(true);
  const [initialTasks, setInitialTasks] = useState<Task[]>([]);
  const snap = useSnapshot(sessionState);

  const init = async () => {
    try {
      if (!snap.session?.user?.id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from<{ id: string; user_id: string; tasks: Task[] }>("todos")
        .select("*")
        .eq("user_id", snap.session.user.id)
        .maybeSingle();
      if (error) {
        throw new Error(error?.message ?? "データ取得に失敗しました");
      }
      if (!data) {
        await supabase.from("todos").insert([
          {
            user_id: snap.session.user.id,
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

      const tomorrowIndex = data.tasks.findIndex((task) => task.id === "tomorrow");
      const futureIndex = data.tasks.findIndex((task) => task.id === "future");

      const tomorrowTasks = data.tasks.slice(tomorrowIndex + 1, futureIndex);
      const newTodayTasks = tomorrowTasks
        .filter((task) => task.type === "task" && task.startDate && isBefore(new Date(task.startDate), new Date()))
        .map((task) => {
          return { ...task, startDate: undefined };
        });
      const newTomorrowTasks = newTodayTasks.length ? [] : tomorrowTasks;

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

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === "active") {
      await init();
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    init();

    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, initialTasks };
};
