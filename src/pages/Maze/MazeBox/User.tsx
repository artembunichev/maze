import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import styled from 'styled-components'
import { ICellIndexes } from '../../../stores/MazeStore'

interface UserProps {
  position: ICellIndexes
  userSize: number
}

interface UserContainerProps {
  userSize: number
}

const UserContainer = styled.div<UserContainerProps>`
  width: ${(props) => props.userSize}px;
  height: ${(props) => props.userSize}px;
  position: absolute;
  background-color: #ff0000;
  transition: 0.16s;
`

export const User: FC<UserProps> = observer(({ position, userSize }): JSX.Element => {
  return (
    <UserContainer
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
      userSize={userSize}></UserContainer>
  )
})
