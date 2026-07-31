import React from 'react'
import './App.css'
import Header from './components/Header'
import Countdown from './components/Countdown'
import Invitation from './components/Invitation'
import Gallery from './components/Gallery'
import AccountInfo from './components/AccountInfo'
import Location from './components/Location' // 1. 불러오기 확인

function App() {
  return (
    <div>
      <Header />
      <Invitation />
      <Countdown />
      <Location /> {/* 2. 배치가 되어있는지 확인 */}
      <Gallery />
      <AccountInfo />
    </div>
  )
}

export default App
