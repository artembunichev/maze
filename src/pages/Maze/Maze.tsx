import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { IBorder } from '../../stores/MazeStore'

interface CellContainerProps {
  cellSize: number
  border: IBorder
}
interface MazeContainerProps {
  mazeWidth: number
}

const MazeContainer = styled.div<MazeContainerProps>`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.mazeWidth}px;
`
const CellContainer = styled.div<CellContainerProps>`
  width: ${(props) => props.cellSize}px;
  height: ${(props) => props.cellSize}px;
  border-left: ${(props) => `1px solid ${props.border.left ? `#000000` : `#c5ecf1`}`};
  border-top: ${(props) => `1px solid ${props.border.top ? `#000000` : `#c5ecf1`}`};
  border-right: ${(props) => `1px solid ${props.border.right ? `#000000` : `#c5ecf1`}`};
  border-bottom: ${(props) => `1px solid ${props.border.bottom ? `#000000` : `#c5ecf1`}`};
`

export const Maze: FC = (): JSX.Element => {
  const { createMazeStore } = useStore()
  const bindCreateMazeStore = createMazeStore.bind(useStore())
  const [mazeStore] = useState(bindCreateMazeStore)

  const cells = mazeStore.cellsArray.map((c) => {
    return <CellContainer cellSize={mazeStore.cellSize} border={c.border} key={c.id}></CellContainer>
  })

  return <MazeContainer mazeWidth={(mazeStore.cellSize + 2) * mazeStore.width}>{cells}</MazeContainer>
}
