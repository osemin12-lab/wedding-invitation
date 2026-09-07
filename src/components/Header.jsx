import '../styles/Header.css';

function Header() {
  return (
    <header className="header-wrapper">
      <div className="header-content">
        <p className="date-line">26 | 10 | 24 |</p>
        <p className="day">오세민 🖤 이지현</p>
        <p className="datetime">창원 힐스카이웨딩&컨벤션 10층 힐그랜드 17:00</p>
      </div>

      <div className="header-image">
        <video src="/main.MP4" autoPlay loop muted playsInline />
      </div>
    </header>
  );
}

export default Header;