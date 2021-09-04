import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Maze } from './Maze'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { observer } from 'mobx-react-lite'

const MazePageContainer = styled.div``

export const MazePage: FC = observer((): JSX.Element => {
  const rootStore = useStore()
  const { createMazeStore } = rootStore
  const [mazeStore] = useState(() => createMazeStore.bind(rootStore)())
  return (
    <MazePageContainer>
      <Maze store={mazeStore} />
    </MazePageContainer>
  )
})
