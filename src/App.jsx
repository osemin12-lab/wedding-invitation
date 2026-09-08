import React from 'react'
import './App.css'
import Header from './components/Header'
import Invitation from './components/Invitation'
import AccountInfo from './components/AccountInfo'
import Countdown from './components/Countdown'
import Gallery from './components/Gallery'
import Location from './components/Location'
import Bgmplayer from './Bgmplayer'

// 이미지 import (public 또는 assets 경로에 맞게 확장자 확인)
import brideImg from './public/image10.jpg' // 신부 사진
import groomImg from './public/image11.jpg' // 신랑 사진

function App() {
  // 인터뷰 데이터
  const interview = {
    question: "Q. 신랑 신부는 어떤 사람인가요?",
    groomAnswer: "제 신부는,\n배려심이 깊고 저를 늘 웃게 만드는 사람입니다.",
    brideAnswer: "제 신랑은,\n다정하고 제가 웃을 때 가장 행복해하는 사람입니다."
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

      {/* 4. 미니 인터뷰 (마음 전하실 곳 바로 아래) */}
      <div className="interview-section">
        <div className="interview-divider" />
        <p className="interview-question">{interview.question}</p>
           
        <div className="interview-content">
          {/* 신랑 세민 답변 카드 (상단 신부 사진 image10.jpg) */}
          <div className="interview-row">
            <div className="interview-img-box">
              <img src={brideImg} alt="신부 사진" className="interview-card-img" />
            </div>
            <div className="interview-text-box">
              <span className="interview-name groom-name">신랑 세민</span>
              <span className="interview-text">{interview.groomAnswer}</span>
            </div>
          </div>

          {/* 신부 지현 답변 카드 (상단 신랑 사진 image11.jpg) */}
          <div className="interview-row">
            <div className="interview-img-box">
              <img src={groomImg} alt="신랑 사진" className="interview-card-img" />
            </div>
            <div className="interview-text-box">
              <span className="interview-name bride-name">신부 지현</span>
              <span className="interview-text">{interview.brideAnswer}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. 결혼식 일시 & 달력 (D-Day) - 카운트다운 숨김 */}
      {/* <Countdown /> */}

      {/* 6. 갤러리 */}
      <Gallery />

      {/* 7. 오시는 길 (지도) */}
      <Location />
    </div>
  )
}

export default App