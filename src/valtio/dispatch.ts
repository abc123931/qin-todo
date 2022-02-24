import type { Dispatch } from "react";
import type { ReducerAction } from "src/hook/useTask";
import { proxy } from "valtio";

export const dispatchState = proxy<{ dispatch: Dispatch<ReducerAction> | undefined }>({ dispatch: undefined });
