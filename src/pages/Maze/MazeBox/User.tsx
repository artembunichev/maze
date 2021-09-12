import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import styled from 'styled-components'
import { IPosition } from '../../../stores/MazeStore'

interface UserProps {
  position: IPosition
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

export const User: FC<UserProps> = observer((props): JSX.Element => {
  return (
    <UserContainer
      style={{
        top: `${props.position.y}px`,
        left: `${props.position.x}px`,
      }}
      userSize={props.userSize}></UserContainer>
  )
})
