import React, { FC } from 'react'
import styled from 'styled-components'
import { InputsSection } from './InputsSection'
import { useStore } from '../../stores/RootStore/RootStoreContext'

const MainContainer = styled.div``

const CreateMazesButton = styled.button``

export const Main: FC = (): JSX.Element => {
  const { AppStore } = useStore()

  const goToMazePage = () => {
    AppStore.setIsGame(true)
  }

  return (
    <MainContainer>
      <InputsSection />
      <CreateMazesButton onClick={goToMazePage}>Create Mazes</CreateMazesButton>
    </MainContainer>
  )
}
