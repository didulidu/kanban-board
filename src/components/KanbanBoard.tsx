import React, { ReactNode, FC } from 'react'
import styled from 'styled-components'
import KanbanColumn, { KanbanColumnProps } from './KanbanColumn'
import KanbanItem, { KanbanItemProps } from './KanbanItem'

const Board = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  min-width: 320px;
  margin: 0 auto;
  padding: 10px;
`

interface KanbanBoardProps {
  children: React.ReactNode
}

interface KanbanBoardType extends React.FC<KanbanBoardProps> {
  Column: FC<KanbanColumnProps>
  Item: FC<KanbanItemProps>
}

const KanbanBoard: KanbanBoardType = ({ children }) => {
  return <Board>{children}</Board>
}

KanbanBoard.Column = KanbanColumn
KanbanBoard.Item = KanbanItem

export default KanbanBoard
