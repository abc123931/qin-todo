import type { ReactElement, RefObject, VFC } from "react";
import { useRef } from "react";
import { createContext, useContext } from "react";
import type { TextInput } from "react-native";

const AddTaskInputRefContext = createContext<RefObject<TextInput> | undefined>(undefined);

type Props = { children: ReactElement };
export const AddTaskInputRefProvider: VFC<Props> = (props) => {
  const ref = useRef<TextInput>(null);

  return <AddTaskInputRefContext.Provider value={ref}>{props.children}</AddTaskInputRefContext.Provider>;
};

export const useAddTaskInputRef = () => {
  const context = useContext(AddTaskInputRefContext);
  return context;
};
