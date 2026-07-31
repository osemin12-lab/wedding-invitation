import { useState } from 'react';
import '../styles/Gallery.css';

function Gallery() {
  const images = [
    "/image1.JPG",
    "/image2.JPG",
    "/image3.JPG",
    "/image4.JPG",
    "/image5.JPG", // 5번째 이미지 경로 수정됨
    "/image6.JPG",
    "/image7.JPG",
    "/image8.JPG",
    "/image9.JPG"
  ];

  // 현재 열려있는 이미지의 인덱스 (null이면 모달 닫힘)
  const [selectedIndex, setSelectedIndex] = useState(null);

  // 이전 사진 보기
  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // 다음 사진 보기
  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
            alt={`기념사진 ${index + 1}`}
            className="gallery-image"
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {/* 사진 클릭 시 크게 보이는 팝업(모달) */}
      {selectedIndex !== null && (
        <div className="modal-overlay" onClick={() => setSelectedIndex(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedIndex(null)}>✕</button>
            <button className="modal-arrow prev" onClick={handlePrev}>❮</button>
            <img 
              src={images[selectedIndex]} 
              alt="확대 사진" 
              className="modal-image" 
            />
            <button className="modal-arrow next" onClick={handleNext}>❯</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;