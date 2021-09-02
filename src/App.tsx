import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from './components/Header'
import { Main } from './pages/Main'
import { MazePage } from './pages/Maze'
import { useStore } from './stores/RootStore/RootStoreContext'

const GlobalStyles = createGlobalStyle`
  body {
    margin:0;
    padding:0;
    background-color:#c5ecf1;
  }
`
const AppContainer = styled.div``

export const App: FC = observer((): JSX.Element => {
  const { AppStore } = useStore()

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        {AppStore.isGame ? <MazePage /> : <Main />}
      </AppContainer>
    </>
  )
})
