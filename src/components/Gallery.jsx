import React, { useState } from 'react';
import '../styles/Gallery.css';

export default function Gallery() {
  const images = [
    "/image1.JPG",
    "/image2.JPG",
    "/image3.JPG",
    "/image4.JPG",
    "/image5.JPG",
    "/image6.JPG",
    "/image7.JPG",
    "/image8.JPG",
    "/image9.JPG"
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);
  
  // 모바일 터치 스와이프를 위한 드래그 좌표 관리
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // 최소 스와이프 거리 (px)
  const minSwipeDistance = 50;

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext(); // 왼쪽으로 밀면 다음 사진
    } else if (isRightSwipe) {
      handlePrev(); // 오른쪽으로 밀면 이전 사진
    }
  };

  return (
    <div className="gallery-wrapper">
      <h2 className="gallery-title">ALBUM</h2>

      {/* 이미지 그리드 */}
      <div className="gallery-grid">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`갤러리 사진 ${index + 1}`}
            className="gallery-thumb"
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {/* 모달 (팝업) */}
      {selectedIndex !== null && (
        <div className="modal-overlay" onClick={() => setSelectedIndex(null)}>
          <div 
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 우측 상단 X 닫기 버튼 */}
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedIndex(null)}
              aria-label="닫기"
            >
              ✕
            </button>

            {/* 이미지 안내 및 슬라이드 컨테이너 */}
            <div className="modal-content">
              <img
                src={images[selectedIndex]}
                alt={`확대 이미지 ${selectedIndex + 1}`}
                className="modal-image"
              />
              <span className="modal-counter">
                {selectedIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}