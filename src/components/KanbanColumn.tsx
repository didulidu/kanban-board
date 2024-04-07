import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useAppDispatch } from '../store/store'
import KanbanItem from './KanbanItem'
import { Task } from '../types'
import { ColumnDetails } from '../constants/config'
import { addTask, selectFilteredTasksByType } from '../store/taskSlice'
import { Droppable } from 'react-beautiful-dnd'
import AddTaskInput from './AddTaskInput'

const Column = styled.div<{ $color?: string }>`
  background-color: ${(props) => props.$color};
  min-width: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  height: 100%;
  @media (max-width: 768px) {
    padding: 10px;
    width: 100px;
    min-width: 100px;
  }
`
const ColumnHeader = styled.div`
  background-color: ${(props) => props.color};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-left: 10px;
  height: 100vh;
  @media (max-width: 768px) {
    margin-left: 5px;
  }
`

const HeaderTop = styled.div`
  display: flex;
`

const AddTaskButton = styled.button`
  margin-left: 5px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
`

export interface KanbanColumnProps {
  type: Task['type']
  config: ColumnDetails
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ type, config }) => {
  const tasks = useSelector(selectFilteredTasksByType(type))

  const dispatch = useAppDispatch()
  const [showInput, setShowInput] = useState<boolean>(false)

  const handleAddTask = (text: string) => {
    dispatch(
      addTask({
        text,
        type: type,
      })
    )
    setShowInput(false)
  }

  return (
    <ColumnContainer>
      <ColumnHeader color={config.headerColor}>
        <HeaderTop>
          <h2>{config.name}</h2>
          <AddTaskButton onClick={() => setShowInput(true)}>+</AddTaskButton>
        </HeaderTop>
        <h2>({tasks.length})</h2>
      </ColumnHeader>
      <Droppable droppableId={type}>
        {(provided) => (
          <Column
            id={type}
            $color={config.columnColor}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {showInput && (
              <AddTaskInput
                onFocusOut={() => {
                  setShowInput(false)
                }}
                onSubmit={handleAddTask}
              />
            )}
            {tasks.map((task, index) => {
              return <KanbanItem key={task.id} task={task} index={index} />
            })}
            {provided.placeholder}
          </Column>
        )}
      </Droppable>
    </ColumnContainer>
  )
}

export default KanbanColumn
