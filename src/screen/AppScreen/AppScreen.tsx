import type { VFC } from "react";
import { InitialTaskFetcher } from "src/layout/InitialTaskFetcher";
import { TaskSectionList } from "src/screen/AppScreen/TaskSectionList";

export const AppScreen: VFC = () => {
  return (
    <InitialTaskFetcher>
      {(tasks) => {
        return <TaskSectionList initialTasks={tasks} />;
      }}
    </InitialTaskFetcher>
  );
};
