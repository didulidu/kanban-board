import { configureStore } from '@reduxjs/toolkit'
import taskReducer, {
  addTask,
  moveTask,
  removeTask,
  selectFilteredTasksByType,
  Tasks,
} from './taskSlice'
import { Task } from '../types'
import { RootState } from './store'

describe('taskSlice reducers', () => {
  let store: ReturnType<typeof configureStore>

  beforeEach(() => {
    store = configureStore({ reducer: { tasks: taskReducer } })
  })

  it('should handle addTask', () => {
    const taskText = 'New Task'
    const taskType: Task['type'] = 'todo'

    store.dispatch(addTask({ text: taskText, type: taskType }))
    const state = store.getState() as RootState

    expect(state.tasks.todo).toHaveLength(1)
    expect(state.tasks.todo[0].text).toEqual(taskText)
    expect(state.tasks.todo[0]).toHaveProperty('id')
  })

  it('should remove a task from the todo list', () => {
    store.dispatch(addTask({ text: 'Task to be removed', type: 'todo' }))

    const initialState = store.getState() as RootState
    expect(initialState.tasks.todo).toHaveLength(1)

    const taskIdToRemove = initialState.tasks.todo[0].id

    store.dispatch(removeTask({ idToRemove: taskIdToRemove, type: 'todo' }))
    const updatedState = store.getState() as RootState

    expect(updatedState.tasks.todo).toHaveLength(0)
  })

  describe('taskSlice reducers - moveTask', () => {
    let store: ReturnType<typeof configureStore>

    beforeEach(() => {
      store = configureStore({ reducer: { tasks: taskReducer } })
    })

    it('should move a task from todo to done', () => {
      const taskText = 'Task to be moved'
      store.dispatch(addTask({ text: taskText, type: 'todo' }))

      const initialState = store.getState() as RootState
      const taskIdToMove = initialState.tasks.todo[0].id

      store.dispatch(
        moveTask({
          type: 'todo',
          taskId: taskIdToMove,
          destinationColumn: 'done',
          sourceIndex: 0,
          destinationIndex: 0,
        })
      )

      const updatedState = store.getState() as RootState

      expect(updatedState.tasks.todo).toHaveLength(0)

      expect(updatedState.tasks.done).toHaveLength(1)
      expect(updatedState.tasks.done[0].id).toEqual(taskIdToMove)
      expect(updatedState.tasks.done[0].text).toEqual(taskText)
      expect(updatedState.tasks.done[0].type).toEqual('done')
    })
  })

  describe('taskSlice selectors', () => {
    const initialState = {
      tasks: {
        todo: [{ id: '1', text: 'I love Bananas', type: 'todo' }],
        progress: [],
        done: [],
      },
      search: { searchTerm: 'bananas' },
    } as unknown as RootState

    it('should select filtered tasks by type', () => {
      const selectedTasks = selectFilteredTasksByType('todo')(initialState)

      expect(selectedTasks).toEqual(initialState.tasks.todo)
    })
  })
})
