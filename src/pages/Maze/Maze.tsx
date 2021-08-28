import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/RootStore/RootStoreContext'

const MazeContainer = styled.div``
const CellContainer = styled.div``

export const Maze: FC = (): JSX.Element => {
  const { createMazeStore } = useStore()
  const bindCreateMazeStore = createMazeStore.bind(useStore())
  const [mazeStore] = useState(bindCreateMazeStore)

  const cells = mazeStore.cellsArray.map((c) => {
    return <CellContainer key={c.id}>{c.id}</CellContainer>
  })

  return <MazeContainer>{cells}</MazeContainer>
}
