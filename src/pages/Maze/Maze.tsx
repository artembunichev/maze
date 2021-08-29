import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { IBorder } from '../../stores/MazeStore'

interface CellContainerProps {
  cellSize: number
  borderWidth: number
  border: IBorder
}
interface MazeContainerProps {
  mazeWidth: number
}

const MazeWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 25px;
`
const MazeContainer = styled.div<MazeContainerProps>`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.mazeWidth}px;
`
const CellContainer = styled.div<CellContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.cellSize}px;
  height: ${(props) => props.cellSize}px;
  border-left: ${(props) => `${props.borderWidth}px solid ${props.border.left ? `#000000` : `#c5ecf1`}`};
  border-top: ${(props) => `${props.borderWidth}px solid ${props.border.top ? `#000000` : `#c5ecf1`}`};
  border-right: ${(props) => `${props.borderWidth}px solid ${props.border.right ? `#000000` : `#c5ecf1`}`};
  border-bottom: ${(props) => `${props.borderWidth}px solid ${props.border.bottom ? `#000000` : `#c5ecf1`}`};
`

export const Maze: FC = (): JSX.Element => {
  const { AppStore, createMazeStore } = useStore()
  const bindCreateMazeStore = createMazeStore.bind(useStore())
  const [mazeStore] = useState(bindCreateMazeStore)

  const cells = mazeStore.cellsArray.map((c, index) => {
    return (
      <CellContainer
        cellSize={mazeStore.cellSize}
        border={c.border}
        key={c.id}
        borderWidth={AppStore.borderWidth}>
        {index}
      </CellContainer>
    )
  })

  return (
    <MazeWrapper>
      <MazeContainer mazeWidth={(mazeStore.cellSize + AppStore.borderWidth * 2) * mazeStore.width}>
        {cells}
      </MazeContainer>
    </MazeWrapper>
  )
}
