import React, { useState } from 'react';
import '../styles/Gallery.css';

export default function Gallery() {
  const images = [
    '/image1.JPG',
    '/image2.JPG',
    '/image3.JPG',
    '/image4.JPG',
    '/image5.JPG',
    '/image6.JPG',
    '/image7.JPG',
    '/image8.JPG',
    '/image9.JPG',
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 이전/다음 버튼
  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setDragOffset(0);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setDragOffset(0);
  };

  // 터치 스와이프 Event Handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset < -50) {
      setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
    } else if (dragOffset > 50) {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
    setDragOffset(0);
  };

  return (
    <div className="gallery-wrapper">
      <h2 className="gallery-title">GALLERY</h2>

      {/* 💡 기존 요소를 없애지 않고 3x3 그리드로만 연결되도록 수정한 부분 */}
      <div className="gallery-grid">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`gallery-${idx + 1}`}
            className="gallery-thumb"
            onClick={() => {
              setSelectedIndex(idx);
              setDragOffset(0);
            }}
          />
        ))}
      </div>

      {/* 기존에 만드신 팝업 및 슬라이더 모달 (동일 유지) */}
      {selectedIndex !== null && (
        <div className="modal-overlay" onClick={() => setSelectedIndex(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 전체 슬라이드 트랙 */}
            <div
              className="modal-track"
              style={{
                transform: `translateX(calc(-${selectedIndex * 100}% + ${dragOffset}px))`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out',
              }}
            >
              {images.map((img, idx) => (
                <div className="modal-slide" key={idx}>
                  <img src={img} alt={`full-${idx}`} />
                </div>
              ))}
            </div>

            {/* 좌우 버튼 */}
            <button className="nav-btn prev" onClick={handlePrev}>
              &#10094;
            </button>
            <button className="nav-btn next" onClick={handleNext}>
              &#10095;
            </button>

            {/* 닫기 버튼 */}
            <button className="close-btn" onClick={() => setSelectedIndex(null)}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}