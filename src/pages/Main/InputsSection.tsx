import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import styled from 'styled-components'

interface InputSectionProps {
  mazeSize: number
  setMazeSize: React.Dispatch<React.SetStateAction<number>>
}

const InputSectionContainer = styled.div``
const MazeSizeInputsContainer = styled.div``
const MazeSizeInput = styled.input``

export const InputsSection: FC<InputSectionProps> = observer(({ mazeSize, setMazeSize }): JSX.Element => {
  const checkAndSetSize = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value)
    if (!isNaN(value)) {
      setMazeSize(value)
    }
  }

  return (
    <InputSectionContainer>
      <MazeSizeInputsContainer>
        <MazeSizeInput value={mazeSize} onChange={checkAndSetSize} />
      </MazeSizeInputsContainer>
    </InputSectionContainer>
  )
})
