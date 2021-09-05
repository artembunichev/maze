import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { setValueFromInput } from '../../utils/setValueFromInput'

const InputSectionContainer = styled.div``
const MazeSizeInputsContainer = styled.div``
const MazeSizeInput = styled.input``

export const InputsSection: FC = observer((): JSX.Element => {
  const { AppStore } = useStore()

  return (
    <InputSectionContainer>
      <MazeSizeInputsContainer>
        <MazeSizeInput
          value={AppStore.mazeSize}
          onChange={(e) => setValueFromInput(e, AppStore.setMazeSize, AppStore)}
        />
      </MazeSizeInputsContainer>
    </InputSectionContainer>
  )
})
