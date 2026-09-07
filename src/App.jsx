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
  // 인터뷰 데이터
  const interview = {
    question: "Q. 신랑 신부는 어떤 사람인가요?",
    groomAnswer: "배려심이 깊고 저를 늘 웃게 만드는 사람입니다.",
    brideAnswer: "다정하고 제가 웃을 때 가장 행복해하는 사람입니다."
  }

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

      {/* 6. 미니 인터뷰 (갤러리와 오시는 길 사이) */}
      <div className="interview-section">
        <h3 className="interview-title">인터뷰</h3>
        <div className="interview-divider" />
        <p className="interview-question">{interview.question}</p>
           
        <div className="interview-content">
          <div className="interview-row">
            <span className="interview-name groom-name">신랑 세민</span>
            <span className="interview-text">{interview.groomAnswer}</span>
          </div>
          <div className="interview-row">
            <span className="interview-name bride-name">신부 지현</span>
            <span className="interview-text">{interview.brideAnswer}</span>
          </div>
        </div>
      </div>

      {/* 7. 오시는 길 (지도) */}
      <Location />
    </div>
  )
}

export default App