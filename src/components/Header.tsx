import React, { FC } from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 52px;
  font-weight: bold;
  color: #ffffff;
`

export const Header: FC = (): JSX.Element => {
  return <HeaderContainer>Maze</HeaderContainer>
}
