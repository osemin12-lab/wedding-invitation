import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

export default function BgmPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // 사용자가 화면 아무 곳이나 처음 터치/클릭했을 때 자동 재생 시작 (모바일 브라우저 정책 대응)
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log('자동 재생 실패:', err));
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying]);

  const toggleBgm = (e) => {
    e.stopPropagation(); // 첫 터치 이벤트와 중복 실행 방지
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('재생 실패:', err));
    }
  };

  return (
    <>
      {/* 배경음악 오디오 태그 */}
      <audio ref={audioRef} src="/bgm.mp3" loop preload="auto" />

      {/* 우측 상단 고정 음소거/재생 버튼 */}
      <BgmButton onClick={toggleBgm} isPlaying={isPlaying} aria-label="배경음악 설정">
        {isPlaying ? '🎵 BGM ON' : '🔇 BGM OFF'}
      </BgmButton>
    </>
  );
}

// 버튼 스타일 정의
const BgmButton = styled.button`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 999;
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: ${({ isPlaying }) =>
    isPlaying ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.6)'};
  color: ${({ isPlaying }) => (isPlaying ? '#333' : '#fff')};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.95);
  }
`;