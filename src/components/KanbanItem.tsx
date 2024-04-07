import React, { useState } from 'react'
import styled from 'styled-components'
import { Task } from '../types'
import COLUMN_CONFIG from '../constants/config'
import { Draggable } from 'react-beautiful-dnd'
import { useAppDispatch } from '../store/store'
import { removeTask } from '../store/taskSlice'

const Item = styled.div`
  padding: 20px;
  margin-bottom: 10px;
  width: 130px;
  min-height: 130px;
  background-color: ${(props) => props.color};
  text-align: center;
  font-size: 20px;
  overflow-y: scroll;
  word-break: break-word;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 60px;
  }
`

const RemoveButton = styled.div<{ showButton: boolean }>`
  visibility: ${(props) => (props.showButton ? 'visible' : 'hidden')};
  cursor: pointer;
`

export interface KanbanItemProps {
  task: Task
  index: number
}

const KanbanItem: React.FC<KanbanItemProps> = ({ task, index }) => {
  const [showRemoveButton, setShowRemoveButton] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handleRemove = () => {
    dispatch(removeTask({ idToRemove: task.id, type: task.type }))
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Item
          id={task.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          color={COLUMN_CONFIG[task.type].itemColor}
          style={{
            ...provided.draggableProps.style,
          }}
          onMouseEnter={() => {
            setShowRemoveButton(true)
          }}
          onMouseLeave={() => {
            setShowRemoveButton(false)
          }}
        >
          <RemoveButton
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
            }}
            showButton={showRemoveButton}
            onClick={handleRemove}
          >
            X
          </RemoveButton>
          <div>{task.text}</div>
        </Item>
      )}
    </Draggable>
  )
}

export default KanbanItem
