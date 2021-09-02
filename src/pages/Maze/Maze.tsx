import React, { FC, useState, createContext, useEffect } from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { IBorder, IMazeStore } from '../../stores/MazeStore'
import { observer } from 'mobx-react-lite'
import { User } from './User'

enum Directions {
  UP = 'KeyW',
  DOWN = 'KeyS',
  RIGHT = 'KeyD',
  LEFT = 'KeyA',
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

export const MazeStoreContext = createContext<IMazeStore | null>(null)

export const Maze: FC = observer((): JSX.Element => {
  const rootStore = useStore()
  const { AppStore, createMazeStore } = rootStore
  const [mazeStore] = useState(() => createMazeStore.bind(rootStore)())

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === Directions.UP) {
        mazeStore.updateYPosition(-AppStore.cellSize - AppStore.borderWidth * 2)
      }
      if (e.code === Directions.DOWN) {
        mazeStore.updateYPosition(AppStore.cellSize + AppStore.borderWidth * 2)
      }
      if (e.code === Directions.LEFT) {
        mazeStore.updateXPosition(-AppStore.cellSize - AppStore.borderWidth * 2)
      }
      if (e.code == Directions.RIGHT) {
        mazeStore.updateXPosition(AppStore.cellSize + AppStore.borderWidth * 2)
      }
    }

    window.addEventListener('keypress', handleKeyPress)

    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  const cells = mazeStore.cellsArray.map((r) => {
    return (
      <CellRowContainer key={`${r[0].id + r[mazeStore.size - 1].id}`}>
        {r.map((c) => {
          return (
            <CellContainer
              isExit={c.isExit}
              border={c.border}
              borderWidth={AppStore.borderWidth}
              cellSize={AppStore.cellSize}
              key={c.id}>
              {c.id}
            </CellContainer>
          )
        })}
      </CellRowContainer>
    )
  })

  return (
    <MazeStoreContext.Provider value={mazeStore}>
      <MazeWrapper>
        <MazeContainer mazeWidth={(AppStore.cellSize + AppStore.borderWidth * 2) * mazeStore.size}>
          <User userSize={mazeStore.userSize} position={mazeStore.userPosition} />
          {cells}
        </MazeContainer>
      </MazeWrapper>
    </MazeStoreContext.Provider>
  )
})
