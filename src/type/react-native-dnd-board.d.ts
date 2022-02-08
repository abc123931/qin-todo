declare module "react-native-dnd-board" {
  class BaseRepository<T> {
    constructor(mockData?: T): Repository<T>;
    rows: T["rows"];
  }

  type BoardProps<T> = {
    horizontal: boolean;
    repository: BaseRepository<T>;
    renderRow: (row: RenderRowArguments) => void;
    renderColumnWrapper: (args: RenderColumnWrapperArguments<T>) => void;
    onRowPress: (row: { columnId: string; data: T[number]["rows"][number]; id: string; index: number }) => void;
    onDragEnd: (
      fromColumnId: string,
      toColumnId: string,
      row: { columnId: string; data: T[number]["rows"][number]; id: string; index: number }
    ) => void;
  };

  export default function Board<T>(props: BoardProps<T>): JSX.Element;
  export class Repository<T> extends BaseRepository<T> {}

  export type RenderColumnWrapperArguments<T> = {
    item: T[number];
    columnComponent: JSX.Element;
    layoutProps: any;
  };
  export type RenderRowArguments<T> = {
    item: T[number]["rows"][number];
    index: number;
  };
}
