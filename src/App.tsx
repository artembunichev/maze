import React, { FC, useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from './components/Header'
import { Main } from './pages/Main'
import { MazePage } from './pages/Maze'

const GlobalStyles = createGlobalStyle`
  body {
    margin:0;
    padding:0;
    background-color:#c5ecf1;
  }
`
const AppContainer = styled.div``

export const App: FC = (): JSX.Element => {
  const history = useHistory()
  useEffect(() => {
    history.push('/')
  }, [])

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Route exact path={'/'} component={Main} />
        <Route exact path={'/maze'} component={MazePage} />
      </AppContainer>
    </>
  )
}
