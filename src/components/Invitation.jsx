import '../styles/Invitation.css'
import { FaPhone } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'

function Invitation() {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // 달력 날짜 데이터 (return 문 바깥에 선언)
  const days = [
    '', '', '', '','1','2','3','4','5','6','7',
    '8','9','10','11','12','13','14',
    '15','16','17','18','19','20','21',
    '22','23','24','25','26','27','28',
    '29','30','31'
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target) // 한 번만 실행
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current)
    }
  }, [])

  const groom = {
    name: '오세민',
    phone: '010-8633-5283'
  }

  const bride = {
    name: '이지현',
    phone: '010-6541-6152'
  }

  // 인터뷰 데이터
  const interview = {
    question: "Q. 배우자는 어떤 사람인가요?",
    groomAnswer: "제 신부는,\n배려심이 깊고\n저의 세상을 환하게 만들어주는\n소중한 사람입니다.",
    brideAnswer: "제 신랑은,\n묵묵히 제 곁을 지켜주며\n어디서나 든든한 힘이 되어주는\n고마운 사람입니다."
  }

  return (
    <div
      className={`invitation-card fade-up ${isVisible ? 'show' : ''}`}
      ref={cardRef}
    >
      <div className="invitation-icon">
        <img src="/flower.png" alt="flower" />
      </div>
    
      <h2>INVITATION</h2>
      <p className="invitation-text">
        벚꽃이 피고 새로운 계절을 준비하는<br/><br/>
        <strong>2022년 4월,</strong><br/>
        우리의 첫 만남이 따스한 인연이 되어<br/><br/>
        4년이 지난 오늘, <strong>2026년 10월 24일</strong><br/>
        그 인연을 영원한 사랑으로 맺으려 합니다.<br/><br/>
        소중한 여러분을 모시고<br/>
        우리의 사랑과 약속을 나누고자 합니다.<br/><br/>
        함께해 주셔서 따뜻한 축복과 격려로<br/>
        이 순간을 더욱 빛내 주시면 감사하겠습니다.
      </p>

      <div className="contact-row">
        <div className="contact">
          <p>오상환 · 김계현 <span>장남</span> {groom.name}</p>
          <a href={`tel:${groom.phone}`}><FaPhone /></a>
        </div>
        <div className="contact">
          <p>이동술 · 이귀자 <span>차녀</span> {bride.name}</p>
          <a href={`tel:${bride.phone}`}><FaPhone /></a>
        </div>
      </div>

      <div className="calendar">
        <div className="calendar-header">10월</div>
        <div className="calendar-grid">
          {days.map((day, i) => (
            <div 
              key={i} 
              className={day === '24' ? "calendar-day highlight" : "calendar-day"}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* 미니 인터뷰 섹션 */}
      <div className="interview-section">
        <h3 className="interview-title">인터뷰</h3>
        
        {/* 상단 점선 구분선 */}
        <div className="interview-divider" />

        <p className="interview-question">{interview.question}</p>

        {/* 인터뷰 커플 이미지 (이미지가 있을 경우 추가) */}
        <div className="interview-image-wrapper">
          <img src="/gallery-1.jpg" alt="커플 사진" className="interview-image" />
        </div>
        
        <div className="interview-content">
          <div className="interview-item">
            <p className="interview-answer">
              <span className="interview-name groom-name">세민</span> : {interview.groomAnswer}
            </p>
          </div>
          
          <div className="interview-item">
            <p className="interview-answer">
              <span className="interview-name bride-name">지현</span> : {interview.brideAnswer}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invitation