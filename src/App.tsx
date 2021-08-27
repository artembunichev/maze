import React, { FC } from 'react'
import styled from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    margin:0;
    padding:0
  }
`
const AppContainer = styled.div``

export const App: FC = (): JSX.Element => {
  return <AppContainer>Zema</AppContainer>
}
