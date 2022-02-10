import { proxy } from "valtio";

export const todosIdState = proxy<{ todosId: string | undefined }>({ todosId: undefined });
