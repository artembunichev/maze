import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Maze } from './MazeBox/Maze'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { observer } from 'mobx-react-lite'
import { IsWin } from './IsWin'

const MazePageContainer = styled.div``

export const MazePage: FC = observer((): JSX.Element => {
  const rootStore = useStore()
  const { createMazeStore } = rootStore
  const [mazeStore, updateMazeStore] = useState(() => createMazeStore.bind(rootStore)())

  return (
    <MazePageContainer>
      <Maze store={mazeStore} />
      {mazeStore.isWin && <IsWin store={mazeStore} updateStore={updateMazeStore} />}
    </MazePageContainer>
  )
})
