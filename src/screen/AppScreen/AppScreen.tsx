import type { VFC } from "react";
import { AddTaskInputRefProvider } from "src/context/AddTaskInputRefContext";
import { AllLayout } from "src/layout/AllLayout";
import { AppLayout } from "src/layout/AppLayout";
import { InitialTaskFetcher } from "src/layout/InitialTaskFetcher";
import { TaskSectionList } from "src/screen/AppScreen/TaskSectionList";

export const AppScreen: VFC = () => {
  return (
    <AddTaskInputRefProvider>
      <AllLayout>
        <AppLayout>
          <InitialTaskFetcher>
            {(tasks) => {
              return <TaskSectionList initialTasks={tasks} />;
            }}
          </InitialTaskFetcher>
        </AppLayout>
      </AllLayout>
    </AddTaskInputRefProvider>
  );
};
