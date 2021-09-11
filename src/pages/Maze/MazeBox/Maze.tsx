import React, { FC, createContext, useEffect } from 'react'
import styled from 'styled-components'
import { useStore } from '../../../stores/RootStore/RootStoreContext'
import { IBorder, IMazeStore } from '../../../stores/MazeStore'
import { observer } from 'mobx-react-lite'
import { User } from './User'

interface MazeProps {
  store: IMazeStore
}
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

export const Maze: FC<MazeProps> = observer(({ store }): JSX.Element => {
  const { AppStore } = useStore()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === Directions.UP) {
        store.updateYPosition(-AppStore.cellSize - AppStore.borderWidth * 2)
      }
      if (e.code === Directions.DOWN) {
        store.updateYPosition(AppStore.cellSize + AppStore.borderWidth * 2)
      }
      if (e.code === Directions.LEFT) {
        store.updateXPosition(-AppStore.cellSize - AppStore.borderWidth * 2)
      }
      if (e.code == Directions.RIGHT) {
        store.updateXPosition(AppStore.cellSize + AppStore.borderWidth * 2)
      }
    }
    if (!AppStore.isWin) {
      window.addEventListener('keypress', handleKeyPress)
    }

    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [AppStore.isWin])

  useEffect(() => {
    if (store.currentCell.isExit) {
      AppStore.setIsWin(true)
    }
  }, [store.currentCell])

  const cells = store.cellsArray.map((r) => {
    return (
      <CellRowContainer key={`${r[0].id + r[store.size - 1].id}`}>
        {r.map((c) => {
          return (
            <CellContainer
              isExit={c.isExit}
              border={c.border}
              borderWidth={AppStore.borderWidth}
              cellSize={AppStore.cellSize}
              key={c.id}></CellContainer>
          )
        })}
      </CellRowContainer>
    )
  })

  return (
    <MazeStoreContext.Provider value={store}>
      <MazeWrapper>
        <MazeContainer mazeWidth={(AppStore.cellSize + AppStore.borderWidth * 2) * store.size}>
          <User userSize={store.userSize} position={store.userPosition} />
          {cells}
        </MazeContainer>
      </MazeWrapper>
    </MazeStoreContext.Provider>
  )
})
