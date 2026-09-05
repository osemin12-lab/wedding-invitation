import React, { useState } from 'react';
import '../styles/Gallery.css';

// 샘플 이미지 배열 (기존 코드에 선언해 두신 images 변수를 사용하시면 됩니다)
const images = [
  // '/assets/photo1.jpg',
  // '/assets/photo2.jpg',
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // 모바일 터치 드래그 상태 관리
  const [touchStart, setTouchStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0); // 손가락 이동 거리(px)
  const [isDragging, setIsDragging] = useState(false); // 터치 중 여부

  const minSwipeDistance = 50; // 이 이상 스와이프해야 다음 사진으로 이동

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // 1. 터치 시작
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setTouchStart(e.targetTouches[0].clientX);
  };

  // 2. 터치 이동 중 (손가락 위치 실시간 갱신)
  const handleTouchMove = (e) => {
    if (!touchStart || !isDragging) return;
    const currentX = e.targetTouches[0].clientX;
    setDragOffset(currentX - touchStart);
  };

  // 3. 터치 종료 (손가락을 뗐을 때)
  const handleTouchEnd = () => {
    if (!touchStart) return;
    setIsDragging(false);

    // 일정 거리 이상 밀었을 때 이전/다음 사진으로 넘어감
    if (dragOffset < -minSwipeDistance) {
      handleNext();
    } else if (dragOffset > minSwipeDistance) {
      handlePrev();
    }

    // 드래그 거리 초기화
    setDragOffset(0);
    setTouchStart(null);
  };

  return (
    <div className="Gallery-container">
      {/* 썸네일 리스트 예시 */}
      <div className="thumbnail-list">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`thumb-${idx}`}
            onClick={() => setSelectedIndex(idx)}
          />
        ))}
      </div>

      {/* 모달 팝업 영역 (사진 클릭 시 열림) */}
      {selectedIndex !== null && (
        <div className="modal-overlay" onClick={() => setSelectedIndex(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 전체 슬라이드 트랙 */}
            <div
              className="modal-track"
              style={{
                // 현재 인덱스 위치 + 손가락 드래그 거리만큼 실시간 이동
                transform: `translateX(calc(-${selectedIndex * 100}% + ${dragOffset}px))`,
                // 드래그 중엔 즉각 반응하도록 transition을 끄고, 손을 뗐을 때 부드럽게 0.3초간 이동
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