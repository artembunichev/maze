import React, { FC } from 'react'
import styled from 'styled-components'
import { InputsSection } from './InputsSection'

const MainContainer = styled.div``

const CreateMazesButton = styled.button``

export const Main: FC = (): JSX.Element => {
  return (
    <MainContainer>
      <InputsSection />
      <CreateMazesButton>Create Mazes</CreateMazesButton>
    </MainContainer>
  )
}
