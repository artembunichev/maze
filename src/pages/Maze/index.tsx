import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Maze } from './MazeBox/Maze'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { observer } from 'mobx-react-lite'
import { IsWin } from './IsWin'

const MazePageContainer = styled.div``

export const MazePage: FC = observer((): JSX.Element => {
  const rootStore = useStore()
  const { AppStore, createMazeStore } = rootStore
  const [mazeStore, updateMazeStore] = useState(() => createMazeStore.bind(rootStore)())

  return (
    <MazePageContainer>
      <Maze store={mazeStore} />
      <IsWin isVisible={AppStore.isWin} updateStore={updateMazeStore} />
    </MazePageContainer>
  )
})
