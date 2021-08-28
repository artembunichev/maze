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

  const setMazeWidth = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value)
    if (!isNaN(value)) {
      AppStore.setMazeWidth(value)
    }
  }
  const setMazeHeight = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value)
    if (!isNaN(value)) {
      AppStore.setMazeHeight(value)
    }
  }
  const setNumberOfMazes = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value)
    if (!isNaN(value)) {
      AppStore.setNumberOfMazes(value)
    }
  }

  return (
    <InputSectionContainer>
      <MazeSizeInputsContainer>
        <MazeSizeInput value={AppStore.mazeWidth} onChange={setMazeWidth} />
        <MazeSizeInput value={AppStore.mazeHeight} onChange={setMazeHeight} />
      </MazeSizeInputsContainer>
      <NumberOfMazesInput value={AppStore.numberOfMazes} onChange={setNumberOfMazes} />
    </InputSectionContainer>
  )
})
