import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/RootStore/RootStoreContext'

const InputSectionContainer = styled.div``
const MazeSizeInputsContainer = styled.div``
const MazeSizeInput = styled.input``
const NumberOfMazesInput = styled.input``

export const InputsSection: FC = observer((): JSX.Element => {
  const { AppStore } = useStore()

  const setValueFromInput = (e: React.ChangeEvent<HTMLInputElement>, func: (number: number) => void): void => {
    const value = Number(e.target.value)
    if (!isNaN(value)) {
      func.bind(AppStore)(value)
    }
  }

  return (
    <InputSectionContainer>
      <MazeSizeInputsContainer>
        <MazeSizeInput
          value={AppStore.mazeWidth}
          onChange={(e) => setValueFromInput(e, AppStore.setMazeWidth)}
        />
        <MazeSizeInput
          value={AppStore.mazeHeight}
          onChange={(e) => setValueFromInput(e, AppStore.setMazeHeight)}
        />
      </MazeSizeInputsContainer>
      <NumberOfMazesInput
        value={AppStore.numberOfMazes}
        onChange={(e) => setValueFromInput(e, AppStore.setNumberOfMazes)}
      />
    </InputSectionContainer>
  )
})
