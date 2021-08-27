import React, { FC } from 'react'
import styled from 'styled-components'

const InputSectionContainer = styled.div``
const MazeSizeInputsContainer = styled.div``
const MazeSizeInput = styled.input``
const NumberOfMazesInput = styled.input``

export const InputsSection: FC = (): JSX.Element => {
  return (
    <InputSectionContainer>
      <MazeSizeInputsContainer>
        <MazeSizeInput />
        <MazeSizeInput />
      </MazeSizeInputsContainer>
      <NumberOfMazesInput />
    </InputSectionContainer>
  )
}
