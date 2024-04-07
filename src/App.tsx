import React from 'react'
import './App.css'
import KanbanBoard from './components/KanbanBoard'
import COLUMN_CONFIG, { ColumnType } from './constants/config'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { moveTask } from './store/taskSlice'
import { useAppDispatch } from './store/store'
import { Task } from './types'
import SearchTasks from './components/SearchTasks'
import styled from 'styled-components'
import { setSearch } from './store/searchSlice'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function App() {
  const columnTypes = Object.keys(COLUMN_CONFIG) as ColumnType[]
  const dispatch = useAppDispatch()

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    const taskId = result.draggableId
    const toColumn = result?.destination?.droppableId
    if (toColumn && taskId) {
      dispatch(
        moveTask({
          type: source.droppableId as Task['type'],
          taskId,
          destinationColumn: toColumn as Task['type'],
          destinationIndex: destination.index,
          sourceIndex: source.index,
        })
      )
    }
  }

  const handleSearch = (searchValue: string) => {
    dispatch(setSearch(searchValue))
  }

  return (
    <Container>
      <SearchTasks onSearch={handleSearch} />
      <DragDropContext onDragEnd={onDragEnd}>
        <KanbanBoard>
          {columnTypes.map((type) => {
            return (
              <KanbanBoard.Column
                key={type}
                type={type}
                config={COLUMN_CONFIG[type]}
              />
            )
          })}
        </KanbanBoard>
      </DragDropContext>
    </Container>
  )
}

export default App
