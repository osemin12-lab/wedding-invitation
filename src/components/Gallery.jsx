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

  // 💡 터치/클릭 시 햅틱(진동) 피드백을 발생시키는 함수
  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(12); // 12ms(0.012초) 동안 아주 짧고 기분 좋게 툭 쳐주는 진동
    }
  };

  // 모달 열기
  const handleOpenModal = (idx) => {
    triggerHaptic(); // 사진 누를 때 진동 발생
    setSelectedIndex(idx);
    setDragOffset(0);
  };

  // 이전/다음 버튼
  const handlePrev = (e) => {
    e.stopPropagation();
    triggerHaptic(); // 버튼 누를 때 진동
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setDragOffset(0);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    triggerHaptic(); // 버튼 누를 때 진동
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
      triggerHaptic(); // 슬라이드 넘어갈 때 진동
      setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
    } else if (dragOffset > 50) {
      triggerHaptic(); // 슬라이드 넘어갈 때 진동
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