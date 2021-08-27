import React, { FC } from 'react'
import { Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from './components/Header'
import { Main } from './pages/Main'

const GlobalStyles = createGlobalStyle`
  body {
    margin:0;
    padding:0;
    background-color:#c5ecf1;
  }
`
const AppContainer = styled.div``

export const App: FC = (): JSX.Element => {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Route path={'/'} component={Main} />
      </AppContainer>
    </>
  )
}
