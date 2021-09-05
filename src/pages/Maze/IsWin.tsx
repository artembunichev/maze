import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { IMazeStore } from '../../stores/MazeStore'
import { useStore } from '../../stores/RootStore/RootStoreContext'

interface IsWinProps {
  store: IMazeStore
  updateStore: React.Dispatch<React.SetStateAction<IMazeStore>>
}

const IsWinContainer = styled.div``
const IsWinTitle = styled.div``
const RestartGameButton = styled.button``
const RestartDescription = styled.div``
const NewMazeSizeInput = styled.input``

export const IsWin: FC<IsWinProps> = ({ store, updateStore }): JSX.Element => {
  const rootStore = useStore()
  const { AppStore } = rootStore
  const [newMazeSize, setNewMazeSize] = useState<number>(AppStore.mazeSize)

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
        <NewMazeSizeInput value={newMazeSize} onChange={(e) => setNewMazeSize(Number(e.target.value))} />
        cells
      </RestartDescription>
      <RestartGameButton onClick={restartGame}>Generate new Maze</RestartGameButton>
    </IsWinContainer>
  )
}
