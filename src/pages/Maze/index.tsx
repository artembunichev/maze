import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Maze } from './MazeBox/Maze'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { observer } from 'mobx-react-lite'
import { IsWin } from './IsWinPopup'

enum Directions {
  UP = 'KeyW',
  DOWN = 'KeyS',
  RIGHT = 'KeyD',
  LEFT = 'KeyA',
}

const MazePageContainer = styled.div``

export const MazePage: FC = observer((): JSX.Element => {
  const rootStore = useStore()
  const { AppStore, createMazeStore } = rootStore
  const [mazeStore, updateMazeStore] = useState(() => createMazeStore.bind(rootStore)())

  useEffect(() => {
    const startRecordingDate = () => {
      mazeStore.setStartDate(new Date().getTime())
      window.removeEventListener('keypress', startRecordingDate)
    }
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
    if (!AppStore.isWin) {
      window.addEventListener('keypress', handleKeyPress)
      window.addEventListener('keypress', startRecordingDate)
    }
    if (AppStore.isWin) {
      mazeStore.setEndDate(new Date().getTime())
    }

    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [AppStore.isWin])

  useEffect(() => {
    if (mazeStore.currentCell.isExit) {
      AppStore.setIsWin(true)
    }
    mazeStore.setIsCellVisited()
  }, [mazeStore.currentCell])

  return (
    <MazePageContainer>
      <Maze
        cellSize={AppStore.cellSize}
        borderWidth={AppStore.borderWidth}
        userSize={AppStore.userSize}
        store={mazeStore}
      />
      <IsWin updateStore={updateMazeStore} startDate={mazeStore.date.start} endDate={mazeStore.date.end} />
    </MazePageContainer>
  )
})
