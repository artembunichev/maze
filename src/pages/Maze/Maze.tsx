import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/RootStore/RootStoreContext'

interface CellContainerProps {
  cellSize: number
}

const MazeContainer = styled.div``
const CellContainer = styled.div<CellContainerProps>`
  width: ${(props) => props.cellSize}px;
  height: ${(props) => props.cellSize}px;
`

export const Maze: FC = (): JSX.Element => {
  const { createMazeStore } = useStore()
  const bindCreateMazeStore = createMazeStore.bind(useStore())
  const [mazeStore] = useState(bindCreateMazeStore)

  const cells = mazeStore.cellsArray.map((c) => {
    return (
      <CellContainer cellSize={mazeStore.cellSize} key={c.id}>
        {c.id[c.id.length - 1]}
      </CellContainer>
    )
  })

  return <MazeContainer>{cells}</MazeContainer>
}
