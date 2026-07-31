import React from 'react'
import './App.css'
import Header from './components/Header'
import Countdown from './components/Countdown'
import Invitation from './components/Invitation'
import Gallery from './components/Gallery'
import AccountInfo from './components/AccountInfo'

function App() {
  return (
    <div>
      <Header />
      <Invitation />
      <Countdown />
      <Gallery />
      <AccountInfo />
    </div>
  )
}

export default App
