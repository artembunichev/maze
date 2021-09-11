import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { IMazeStore } from '../../stores/MazeStore'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { datePeriodFormater } from '../../utils/datePeriodFormater'

interface IsWinProps {
  startDate: number
  endDate: number
  updateStore: React.Dispatch<React.SetStateAction<IMazeStore>>
}

interface IsWinPopupProps {
  isVisible: boolean
}
const IsWinContainer = styled.div<IsWinPopupProps>`
  position: fixed;
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
  width: 410px;
  height: 500px;
  padding: 11px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  transform: ${(props) => (props.isVisible ? 'scale(1)' : 'scale(0)')};
  transition: 0.26s transform ease-in;
`
const IsWinBoxContent = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const IsWinTitle = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 50px;
`
const RestartGameButton = styled.button`
  width: 210px;
  height: 45px;
  border-radius: 7px;
  font-size: 21px;
  font-weight: bold;
  background-color: #c5ecf1;
  &:hover {
    cursor: pointer;
  }
`
const RestartDescription = styled.div``
const RestartDescriptionItem = styled.div`
  text-align: center;
  margin-bottom: 25px;
  font-size: 30px;
`
const NewMazeSizeInput = styled.input`
  position: relative;
  top: -1px;
  width: 33px;
  height: 17px;
  font-size: 20px;
  border: 0;
  padding-top: 2px;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid #b4e6e6dc;
  transition: background-color 0.2s;
  &:hover {
    background-color: #c5ecf1;
  }
`

export const IsWin: FC<IsWinProps> = observer(({ startDate, endDate, updateStore }): JSX.Element => {
  const rootStore = useStore()
  const { AppStore } = rootStore
  const [newMazeSize, setNewMazeSize] = useState<number>(AppStore.mazeSize)

  const checkAndSetSize = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value)
    if (!isNaN(value)) {
      setNewMazeSize(value)
    }
  }

  const restartGame = (): void => {
    if (newMazeSize > 1 && newMazeSize <= 30) {
      AppStore.setMazeSize(newMazeSize)
      updateStore(() => rootStore.createMazeStore.bind(rootStore)())
      AppStore.setIsWin(false)
    }
  }

  return (
    <IsWinContainer isVisible={AppStore.isWin}>
      <IsWinBox isVisible={AppStore.isWin}>
        <IsWinTitle>You Win!</IsWinTitle>
        <IsWinBoxContent>
          <RestartDescription>
            <RestartDescriptionItem>
              You win for {datePeriodFormater(startDate, endDate)}
            </RestartDescriptionItem>
            <RestartDescriptionItem>
              Generate new maze with <NewMazeSizeInput value={newMazeSize} onChange={checkAndSetSize} /> cells
            </RestartDescriptionItem>
          </RestartDescription>
          <RestartGameButton onClick={restartGame}>Generate new Maze</RestartGameButton>
        </IsWinBoxContent>
      </IsWinBox>
    </IsWinContainer>
  )
})
