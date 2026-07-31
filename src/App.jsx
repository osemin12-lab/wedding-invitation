import React from 'react'
import './App.css'
import Header from './components/Header'
import Invitation from './components/Invitation'
import AccountInfo from './components/AccountInfo'
import Countdown from './components/Countdown'
import Gallery from './components/Gallery'
import Location from './components/Location'
import Bgmplayer from './Bgmplayer'

function App() {
  return (
    <div>
      {/* 배경음악 플레이어 */}
      <Bgmplayer />

      {/* 1. 메인 화면 (커버) */}
      <Header />

      {/* 2. 초대글 */}
      <Invitation />

      {/* 3. 신랑·신부 계좌번호 (마음 전하실 곳) */}
      <AccountInfo />

      {/* 4. 결혼식 일시 & 달력 (D-Day) */}
      <Countdown />

      {/* 5. 갤러리 */}
      <Gallery />

      {/* 6. 오시는 길 (지도) */}
      <Location />
    </div>
  )
}

export default App