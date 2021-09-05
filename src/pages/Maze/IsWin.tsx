import React, { FC } from 'react'
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

export const IsWin: FC<IsWinProps> = ({ store, updateStore }): JSX.Element => {
  const rootStore = useStore()

  const restartGame = () => {
    updateStore(() => rootStore.createMazeStore.bind(rootStore)())
    store.setIsWin(false)
  }
  
  return (
    <IsWinContainer>
      <IsWinTitle>Win!</IsWinTitle>
      <RestartGameButton onClick={restartGame}>Generate new Maze</RestartGameButton>
    </IsWinContainer>
  )
}
