import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import configureMockStore from 'redux-mock-store'
import KanbanColumn from './KanbanColumn'

const mockStore = configureMockStore()
jest.mock('react-beautiful-dnd', () => ({
  //@ts-ignore
  Droppable: ({ children, droppableId }) =>
    children(
      {
        droppableProps: {
          'data-testid': droppableId,
        },
        innerRef: jest.fn(),
      },
      {}
    ),
  //@ts-ignore
  Draggable: ({ children, draggableId, index }) =>
    children(
      {
        draggableProps: {
          'data-testid': draggableId,
          style: {},
        },
        dragHandleProps: {},
        innerRef: jest.fn(),
      },
      {
        isDragging: false,
      }
    ),
  //@ts-ignore
  DragDropContext: ({ children }) => children,
}))

const initialState = {
  tasks: {
    todo: [{ id: '1', text: 'Test Task 1', type: 'todo' }],
    progress: [{ id: '2', text: 'Test Task 2', type: 'progress' }],
    done: [{ id: '3', text: 'Test Task 3', type: 'done' }],
  },
  search: { searchTerm: '' },
}

const store = mockStore(initialState)

describe('KanbanColumn Component', () => {
  it('renders the column with header and correct task count', () => {
    render(
      <Provider store={store}>
        <KanbanColumn
          type="todo"
          config={{
            name: 'Todo',
            columnColor: '#bee3f6',
            itemColor: '#57b1e5',
            headerColor: '#1a92db',
          }}
        />
      </Provider>
    )

    expect(screen.getByText('Todo')).toBeInTheDocument()
    expect(screen.getByText('(1)')).toBeInTheDocument()
  })

  it('renders tasks based on Redux store state', () => {
    render(
      <Provider store={store}>
        <KanbanColumn
          type="progress"
          config={{
            name: 'In Progress',
            columnColor: '#bee3f6',
            itemColor: '#57b1e5',
            headerColor: '#1a92db',
          }}
        />
      </Provider>
    )

    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Test Task 2')).toBeInTheDocument()
  })

  it('toggles AddTaskInput visibility on add button click', async () => {
    render(
      <Provider store={store}>
        <KanbanColumn
          type="todo"
          config={{
            name: 'Todo',
            columnColor: '#bee3f6',
            itemColor: '#57b1e5',
            headerColor: '#1a92db',
          }}
        />
      </Provider>
    )

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()

    const addButton = screen.getByRole('button', { name: '+' })
    userEvent.click(addButton)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('dispatches addTask action on new task submission', async () => {
    render(
      <Provider store={store}>
        <KanbanColumn
          type="done"
          config={{
            name: 'Done',
            columnColor: '#bee3f6',
            itemColor: '#57b1e5',
            headerColor: '#1a92db',
          }}
        />
      </Provider>
    )

    const addButton = screen.getByRole('button', { name: '+' })
    await userEvent.click(addButton)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'New Task{enter}')

    const actions = store.getActions()
    expect(actions[0].type).toBe('tasks/addTask')
    expect(actions[0].payload).toEqual({ text: 'New Task', type: 'done' })
  })
})
