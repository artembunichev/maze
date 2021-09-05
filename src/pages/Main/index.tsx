import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { InputsSection } from './InputsSection'
import { useStore } from '../../stores/RootStore/RootStoreContext'

const MainContainer = styled.div``

const CreateMazesButton = styled.button``

export const Main: FC = (): JSX.Element => {
  const { AppStore } = useStore()
  const [mazeSize, setMazeSize] = useState<number>(AppStore.mazeSize)
  const goToMazePage = () => {
    AppStore.setMazeSize(mazeSize)
    AppStore.setIsGame(true)
  }

  return (
    <MainContainer>
      <InputsSection mazeSize={mazeSize} setMazeSize={setMazeSize} />
      <CreateMazesButton onClick={goToMazePage}>Create Mazes</CreateMazesButton>
    </MainContainer>
  )
}
