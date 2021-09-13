import React, { FC, createContext } from 'react'
import styled from 'styled-components'
import { IBorder, IMazeStore } from '../../../stores/MazeStore'
import { observer } from 'mobx-react-lite'
import { User } from './User'
import { useStore } from '../../../stores/RootStore/RootStoreContext'

interface MazeProps {
  userSize: number
  cellSize: number
  store: IMazeStore
  isMazePresentable: boolean
}

interface CellContainerProps {
  cellSize: number
  borderWidth: number
  border: IBorder
  isExit: boolean
  isStart: boolean
  isVisited?: boolean
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
  background-color: ${(props) =>
    props.isExit ? `#00ff6a` : props.isStart ? '#ff0000' : props.isVisited ? `#ffe20a` : 'transparent'};
  width: ${(props) => props.cellSize}px;
  height: ${(props) => props.cellSize}px;
  border-left: ${(props) => `${props.borderWidth}px inset ${props.border.left ? `#000000` : `transparent`}`};
  border-top: ${(props) => `${props.borderWidth}px inset ${props.border.top ? `#000000` : `transparent`}`};
  border-right: ${(props) => `${props.borderWidth}px inset ${props.border.right ? `#000000` : `transparent`}`};
  border-bottom: ${(props) =>
    `${props.borderWidth}px inset ${props.border.bottom ? `#000000` : `transparent`}`};
`

export const MazeStoreContext = createContext<IMazeStore | null>(null)

export const Maze: FC<MazeProps> = observer(({ store, cellSize, userSize, isMazePresentable }): JSX.Element => {
  const { AppStore } = useStore()

  const cells: Array<JSX.Element> = store.cellsArray.map((r) => {
    return (
      <CellRowContainer key={`${r[0].id + r[store.size - 1].id}`}>
        {r.map((c) => {
          return (
            <CellContainer
              isStart={isMazePresentable ? c.isStart : false}
              isExit={c.isExit}
              border={c.border}
              borderWidth={AppStore.borderWidth}
              cellSize={cellSize}
              isVisited={isMazePresentable ? c.isVisited : false}
              key={c.id}></CellContainer>
          )
        })}
      </CellRowContainer>
    )
  })

  return (
    <MazeStoreContext.Provider value={store}>
      <MazeWrapper>
        <MazeContainer mazeWidth={(cellSize + AppStore.borderWidth * 2) * store.size}>
          {!isMazePresentable && (
            <User userSize={userSize} position={isMazePresentable ? store.startPosition : store.userPosition} />
          )}
          {cells}
        </MazeContainer>
      </MazeWrapper>
    </MazeStoreContext.Provider>
  )
})
