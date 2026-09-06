import React, { useState } from 'react';
import '../styles/Gallery.css';

export default function Gallery() {
  const images = [
    '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg',
    '/image4.jpg',
    '/image5.jpg',
    '/image6.jpg',
    '/image7.jpg',
    '/image8.jpg',
    '/image9.jpg',
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 💡 모바일 에러 방지용 안전한 진동 함수
  const triggerHaptic = () => {
    try {
      if (typeof window !== 'undefined' && navigator && navigator.vibrate) {
        navigator.vibrate(12);
      }
    } catch (e) {
      // 진동을 지원하지 않는 기기/브라우저 오류 무시
    }
  };

  // 모달 열기
  const handleOpenModal = (idx) => {
    triggerHaptic();
    setSelectedIndex(idx);
    setDragOffset(0);
  };

  // 이전/다음 버튼
  const handlePrev = (e) => {
    e.stopPropagation();
    triggerHaptic();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setDragOffset(0);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    triggerHaptic();
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
      triggerHaptic();
      setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
    } else if (dragOffset > 50) {
      triggerHaptic();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
    setDragOffset(0);
  };

  return (
    <div className="gallery-wrapper">
      <h2 className="gallery-title">GALLERY</h2>

      {/* 3x3 우물정자 그리드 */}
      <div className="gallery-grid">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`gallery-${idx + 1}`}
            className="gallery-thumb"
            onClick={() => handleOpenModal(idx)}
          />
        ))}
      </div>

      {/* 클릭 시 슬라이드 모달 */}
      {selectedIndex !== null && (
        <div
          className="modal-overlay"
          onClick={() => {
            triggerHaptic();
            setSelectedIndex(null);
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
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

            {/* 좌우 탐색 버튼 */}
            <button className="nav-btn prev" onClick={handlePrev}>
              &#10094;
            </button>
            <button className="nav-btn next" onClick={handleNext}>
              &#10095;
            </button>

            {/* 닫기 버튼 */}
            <button
              className="close-btn"
              onClick={() => {
                triggerHaptic();
                setSelectedIndex(null);
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}