import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

// ==========================================
// 1. 오시는 길 데이터 (본인 정보에 맞게 수정하세요)
// ==========================================
const locationData = {
  title: '창원 힐스카이 웨딩&컨벤션',
  address: '경상남도 창원시 마산회원구 봉암동 133, 힐스카이 웨딩&컨벤션 10층 힐그랜드',
  tel: '055-291-9500',
  // Kakao 지도에 표시할 위도, 경도 좌표
  lat: 35.2190478, 
  lng: 128.6014549,
  // 길찾기 버튼에 들어갈 각 지도 서비스 앱/웹 URL
  naverMapUrl: 'https://map.naver.com/', 
  kakaoMapUrl: 'https://map.kakao.com/',
  // 지하철, 주차 등 안내 항목
 wayInfo: [
    {
      title: '📍 대중교통',
      desc: `👉🏻 자유무역 3공구 정류장 하차
• 창원 버스: 107번, 112번, 116번, 530번, 704번
• 진해/마산 버스: 160번, 162번, 163번, 164번, 760번, 860번`,
    },
    {
      title: '📍 주차안내',
      desc: `👉🏻 건물 내 무료주차 (안내데스크에서 주차권 수령)
• 웨딩홀 도로 건너편 동방주차장 이용 가능`,
    },
  ],
};

// ==========================================
// 2. 카카오 지도 컴포넌트 (기존 KakaoMap.tsx)
// ==========================================
const KakaoMap = ({ lat, lng }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // window.kakao 지도 SDK가 로드되어 있는지 확인
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 마커 표시
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    }
  }, [lat, lng]);

  return <MapContainer ref={mapRef} />;
};

// ==========================================
// 3. 지도 길찾기 버튼 컴포넌트 (기존 MapButtons.tsx)
// ==========================================
const MapButtons = ({ naverMapUrl, kakaoMapUrl }) => {
  return (
    <ButtonWrapper>
      <MapButton href={naverMapUrl} target="_blank" rel="noreferrer">
        네이버 지도
      </MapButton>
      <MapButton href={kakaoMapUrl} target="_blank" rel="noreferrer">
        카카오맵
      </MapButton>
    </ButtonWrapper>
  );
};

// ==========================================
// 4. 상세 안내 텍스트 컴포넌트 (기존 Address.tsx)
// ==========================================
const AddressInfo = ({ wayInfo }) => {
  return (
    <WayWrapper>
      {wayInfo?.map((item) => (
        <Way key={item.title}>
          <PointTitle>{item.title}</PointTitle>
          <Caption>{item.desc}</Caption>
        </Way>
      ))}
    </WayWrapper>
  );
};

// ==========================================
// 5. 메인 Location 컴포넌트 (통합 메인)
// ==========================================
export default function Location() {
  return (
    <SectionWrapper>
      <SectionTitle>오시는 길</SectionTitle>
      
      {/* 장소 이름 및 주소 */}
      <VenueName>{locationData.title}</VenueName>
      <VenueAddress>{locationData.address}</VenueAddress>
      <VenueTel>{locationData.tel}</VenueTel>

      {/* 카카오 지도 */}
      <KakaoMap lat={locationData.lat} lng={locationData.lng} />

      {/* 길찾기 버튼 */}
      <MapButtons
        naverMapUrl={locationData.naverMapUrl}
        kakaoMapUrl={locationData.kakaoMapUrl}
      />

      {/* 교통편/주차 안내 */}
      <AddressInfo wayInfo={locationData.wayInfo} />
    </SectionWrapper>
  );
}

// ==========================================
// 6. CSS 스타일 (font-family 배제)
// ==========================================
const SectionWrapper = styled.section`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding: 30px 20px;
  box-sizing: border-box;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const VenueName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 6px;
`;

const VenueAddress = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin: 0 0 4px 0;
  line-height: 1.4;
`;

const VenueTel = styled.p`
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 20px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: #f0f0f0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 30px;
`;

const MapButton = styled.a`
  flex: 1;
  padding: 10px 0;
  font-size: 0.85rem;
  color: #333;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;

  &:hover {
    background-color: #f1f5f9;
  }
`;

const WayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  text-align: left;
`;

const Way = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PointTitle = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: #333;
`;

const Caption = styled.span`
  font-size: 0.85rem;
  color: #666;
  white-space: pre-line;
  line-height: 1.5;
`;