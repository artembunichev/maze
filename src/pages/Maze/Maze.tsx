import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { IBorder } from '../../stores/MazeStore'
import { observer } from 'mobx-react-lite'
import { useKeyboard } from '../../hooks/useKeyboard'
import { useEffect } from 'react'
import { User } from './User'

enum Directions {
  UP = 'w',
  DOWN = 's',
  RIGHT = 'd',
  LEFT = 'a',
}

interface CellContainerProps {
  cellSize: number
  borderWidth: number
  border: IBorder
  isExit: boolean
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
  position: relative;
`
const CellRowContainer = styled.div`
  display: flex;
`
const CellContainer = styled.div<CellContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.isExit && `#00ff6a`};
  width: ${(props) => props.cellSize}px;
  height: ${(props) => props.cellSize}px;
  border-left: ${(props) => `${props.borderWidth}px solid ${props.border.left ? `#000000` : `#c5ecf1`}`};
  border-top: ${(props) => `${props.borderWidth}px solid ${props.border.top ? `#000000` : `#c5ecf1`}`};
  border-right: ${(props) => `${props.borderWidth}px solid ${props.border.right ? `#000000` : `#c5ecf1`}`};
  border-bottom: ${(props) => `${props.borderWidth}px solid ${props.border.bottom ? `#000000` : `#c5ecf1`}`};
`

export const Maze: FC = observer((): JSX.Element => {
  const { AppStore, createMazeStore, createUserStore } = useStore()
  const bindCreateMazeStore = createMazeStore.bind(useStore())
  const [mazeStore] = useState(bindCreateMazeStore)
  const [userStore] = useState(createUserStore)
  const [key, isKeyPressed] = useKeyboard()
  useEffect(() => {
    if (isKeyPressed) {
      if (key === Directions.UP) {
        userStore.updateYPosition(-AppStore.cellSize)
      }
      if (key === Directions.DOWN) {
        userStore.updateYPosition(AppStore.cellSize)
      }
      if (key === Directions.LEFT) {
        userStore.updateXPosition(-AppStore.cellSize)
      }
      if (key == Directions.RIGHT) {
        userStore.updateXPosition(AppStore.cellSize)
      }
    }
  }, [isKeyPressed])

  const cells = mazeStore.cellsArray.map((r) => {
    return (
      <CellRowContainer key={`${r[0].id + r[mazeStore.width - 1].id}`}>
        {r.map((c, index) => {
          return (
            <CellContainer
              isExit={c.isExit}
              border={c.border}
              borderWidth={AppStore.borderWidth}
              cellSize={AppStore.cellSize}
              key={c.id}>
              {index}
            </CellContainer>
          )
        })}
      </CellRowContainer>
    )
  })

  return (
    <MazeWrapper>
      <MazeContainer mazeWidth={(AppStore.cellSize + AppStore.borderWidth * 2) * mazeStore.width}>
        <User userSize={userStore.userSize} position={userStore.userPosition} />
        {cells}
      </MazeContainer>
    </MazeWrapper>
  )
})
