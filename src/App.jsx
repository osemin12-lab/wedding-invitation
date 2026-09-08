import React from 'react'
import './App.css'
import Header from './components/Header'
import Invitation from './components/Invitation'
import AccountInfo from './components/AccountInfo'
import Countdown from './components/Countdown'
import Gallery from './components/Gallery'
import Location from './components/Location'
import Bgmplayer from './Bgmplayer'

// src/assets 경로 기준 (파일명 확장자 대소문자 주의)
import brideImg from './assets/image10.JPG' 
import groomImg from './assets/image11.JPG' 

function App() {
  const interview = {
    question: "Q. 신랑 신부는 어떤 사람인가요?",
    groomAnswer: "제 신부는,\n배려심이 깊고 저를 늘 웃게 만드는 사람입니다.",
    brideAnswer: "제 신랑은,\n다정하고 제가 웃을 때 가장 행복해하는 사람입니다."
  }

  return (
    <div>
      <Bgmplayer />
      <Header />
      <Invitation />
      <AccountInfo />

      {/* 미니 인터뷰 */}
      <div className="interview-section">
        <div className="interview-divider" />
        <p className="interview-question">{interview.question}</p>
           
        <div className="interview-content">
          {/* 신랑 세민 (상단 신부 사진) */}
          <div className="interview-row">
            <div className="interview-img-box">
              <img src={brideImg} alt="신부 사진" className="interview-card-img" />
            </div>
            <div className="interview-text-box">
              <span className="interview-name groom-name">신랑 세민</span>
              <span className="interview-text">{interview.groomAnswer}</span>
            </div>
          </div>

          {/* 신부 지현 (상단 신랑 사진) */}
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

      <Gallery />
      <Location />
    </div>
  )
}

export default App