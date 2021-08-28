import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { RootStoreProvider } from './stores/RootStore/RootStoreContext'

ReactDOM.render(
  <BrowserRouter>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
