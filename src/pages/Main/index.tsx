import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { InputsSection } from './InputsSection'

const MainContainer = styled.div``

const CreateMazesButton = styled.button``

export const Main: FC = (): JSX.Element => {
  const history = useHistory()

  const goToMazePage = () => {
    history.push('/maze')
  }

  return (
    <MainContainer>
      <InputsSection />
      <CreateMazesButton onClick={goToMazePage}>Create Mazes</CreateMazesButton>
    </MainContainer>
  )
}
