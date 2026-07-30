import '../styles/Header.css';

function Header() {
  return (
    <header className="header-wrapper">
      <div className="header-content">
        <p className="date-line">26 | 10 | 24</p>
        <p className="day">SATURDAY</p>
        <p className="datetime">2026.10.24 SAT 17:00 PM</p>
      </div>

      <div className="header-image">
  <video src="/main.mp4" autoPlay loop muted playsInline />
</div>

      <div className="header-footer">
        <p className="name"><strong>오세민</strong> &nbsp; | &nbsp; <strong>이지현</strong></p>
        <p className="holl">창원 힐스카이웨딩홀 10층 그랜드볼룸</p>
      </div>
    </header>
  );
}

export default Header;
