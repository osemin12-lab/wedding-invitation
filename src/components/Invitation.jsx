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
        <strong>2022년 4월,</strong><br/>
        따스한 봄날에 만나<br/>
        서로의 가장 소중한 사람이 되었습니다.<br/><br/>

        <strong>2026년 10월 24일,</strong><br/>
        함께한 시간을 마음에 담아<br/>
        이제 서로의 평생을 약속하려 합니다.<br/><br/>

        저희가 함께 내딛는 첫 걸음을<br/>
        따뜻하게 축복해 주세요.
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
    </div>
  )
}

export default Invitation