import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { IMazeStore } from '../../stores/MazeStore'
import { useStore } from '../../stores/RootStore/RootStoreContext'

interface IsWinProps {
  updateStore: React.Dispatch<React.SetStateAction<IMazeStore>>
}

interface IsWinPopupProps {
  isVisible: boolean
}
const IsWinContainer = styled.div<IsWinPopupProps>`
  position: absolute;
  z-index: 9999;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5a5a5a7d;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? 'all' : 'none')};
  transition: 0.26s opacity ease-in;
`
const IsWinBox = styled.div<IsWinPopupProps>`
  background-color: #fff;
  transform: ${(props) => (props.isVisible ? 'scale(1)' : 'scale(0)')};
  transition: 0.26s transform ease-in;
`
const IsWinTitle = styled.div``
const RestartGameButton = styled.button``
const RestartDescription = styled.div``
const NewMazeSizeInput = styled.input``

export const IsWin: FC<IsWinProps> = observer(({ updateStore }): JSX.Element => {
  const rootStore = useStore()
  const { AppStore } = rootStore
  const [newMazeSize, setNewMazeSize] = useState<number>(AppStore.mazeSize)

  const checkAndSetSize = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value)
    if (!isNaN(value)) {
      setNewMazeSize(value)
    }
  }

  const restartGame = () => {
    if (newMazeSize !== 1 && newMazeSize <= 30) {
      AppStore.setMazeSize(newMazeSize)
      updateStore(() => rootStore.createMazeStore.bind(rootStore)())
      AppStore.setIsWin(false)
    }
  }

  return (
    <IsWinContainer isVisible={AppStore.isWin}>
      <IsWinBox isVisible={AppStore.isWin}>
        <IsWinTitle>Win!</IsWinTitle>
        <RestartDescription>
          Generate new maze with
          <NewMazeSizeInput value={newMazeSize} onChange={checkAndSetSize} />
          cells
        </RestartDescription>
        <RestartGameButton onClick={restartGame}>Generate new Maze</RestartGameButton>
      </IsWinBox>
    </IsWinContainer>
  )
})
