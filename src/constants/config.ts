export enum ColumnType {
  Todo = 'todo',
  InProgress = 'progress',
  Done = 'done',
}

export interface ColumnDetails {
  name: string
  columnColor: string
  itemColor: string
  headerColor: string
}

export type ColumnConfig = Record<ColumnType, ColumnDetails>

const COLUMN_CONFIG: ColumnConfig = {
  [ColumnType.Todo]: {
    name: 'Todo',
    columnColor: '#bee3f6',
    itemColor: '#57b1e5',
    headerColor: '#1a92db',
  },
  [ColumnType.InProgress]: {
    name: 'In Progress',
    columnColor: '#f5c2c3',
    itemColor: '#e86b79',
    headerColor: '#e22959',
  },
  [ColumnType.Done]: {
    name: 'Done',
    columnColor: '#bac3cb',
    itemColor: '#4c5f74',
    headerColor: '#102640',
  },
}
export default COLUMN_CONFIG
