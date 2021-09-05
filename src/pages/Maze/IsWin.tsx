import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { IMazeStore } from '../../stores/MazeStore'
import { useStore } from '../../stores/RootStore/RootStoreContext'

interface IsWinProps {
  store: IMazeStore
  updateStore: React.Dispatch<React.SetStateAction<IMazeStore>>
}

const IsWinContainer = styled.div`
  position: absolute;
  z-index: 9999;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: #2e2e2e;
`
const IsWinTitle = styled.div``
const RestartGameButton = styled.button``
const RestartDescription = styled.div``
const NewMazeSizeInput = styled.input``

export const IsWin: FC<IsWinProps> = ({ store, updateStore }): JSX.Element => {
  const rootStore = useStore()
  const { AppStore } = rootStore
  const [newMazeSize, setNewMazeSize] = useState<number>(AppStore.mazeSize)

  const checkAndSetSize = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value)
    if (!isNaN(value) && value !== 1) {
      setNewMazeSize(value)
    }
  }

  const restartGame = () => {
    AppStore.setMazeSize(newMazeSize)
    updateStore(() => rootStore.createMazeStore.bind(rootStore)())
    store.setIsWin(false)
  }

  return (
    <IsWinContainer>
      <IsWinTitle>Win!</IsWinTitle>
      <RestartDescription>
        Generate new maze width
        <NewMazeSizeInput value={newMazeSize} onChange={checkAndSetSize} />
        cells
      </RestartDescription>
      <RestartGameButton onClick={restartGame}>Generate new Maze</RestartGameButton>
    </IsWinContainer>
  )
}
