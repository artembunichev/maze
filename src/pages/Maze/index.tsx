import React, { FC } from 'react'
import styled from 'styled-components'
import { Maze } from './Maze'

const MazePageContainer = styled.div``

export const MazePage: FC = (): JSX.Element => {
  return (
    <MazePageContainer>
      <Maze />
    </MazePageContainer>
  )
}
