import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 } from 'uuid'
import { Task } from '../types'
import { moveElement } from '../utils'
import { RootState } from './store'
import { selectSearchTerm } from './searchSlice'

export interface Tasks {
  todo: Task[]
  progress: Task[]
  done: Task[]
}

const initialState: Tasks = {
  todo: [],
  progress: [],
  done: [],
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (
      tasks,
      action: PayloadAction<{
        text: string
        type: 'todo' | 'progress' | 'done'
      }>
    ) => {
      const id = v4()

      const { text, type } = action.payload
      const newTask = {
        id,
        text,
        type,
      }

      tasks[type].unshift(newTask)
    },
    removeTask: (
      tasks,
      action: PayloadAction<{ idToRemove: string; type: Task['type'] }>
    ) => {
      const { idToRemove, type } = action.payload
      const tasksByType = tasks[type]
      tasks[type] = tasksByType.filter((task) => task.id !== idToRemove)
    },
    moveTask: (
      tasks,
      action: PayloadAction<{
        type: Task['type']
        taskId: string
        destinationColumn: Task['type']
        sourceIndex: number
        destinationIndex: number
      }>
    ) => {
      const { type, destinationColumn, destinationIndex, sourceIndex, taskId } =
        action.payload

      if (destinationColumn === type) {
        tasks[type] = moveElement(tasks[type], sourceIndex, destinationIndex)
        return
      }
      const taskToMove = tasks[type][sourceIndex]
      tasks[type] = tasks[type].filter((task) => task.id !== taskId)
      tasks[destinationColumn] = [
        ...tasks[destinationColumn].slice(0, destinationIndex),
        taskToMove,
        ...tasks[destinationColumn].slice(destinationIndex),
      ]
      taskToMove.type = destinationColumn
    },
  },
})

export const selectFilteredTasksByType = (type: Task['type']) =>
  createSelector(
    [(state: RootState) => state.tasks[type], selectSearchTerm],
    (tasks, searchTerm) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      return tasks.filter((task: Task) =>
        task.text.toLowerCase().includes(lowerCaseSearchTerm)
      )
    }
  )

export const { addTask, removeTask, moveTask } = taskSlice.actions
export default taskSlice.reducer
