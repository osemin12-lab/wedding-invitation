import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

// ==========================================
// 1. 오시는 길 데이터 (웨딩홀 & 주차장 좌표 포함)
// ==========================================
const locationData = {
  title: '창원 힐스카이 웨딩&컨벤션',
  address: '경상남도 창원시 마산회원구 봉암동 133, 힐스카이 웨딩&컨벤션 10층 힐그랜드',
  tel: '055-291-9500',
  // 메인 중심 좌표 (웨딩홀)
  lat: 35.2190478,
  lng: 128.6014549,
  // 핀 마커 2개 데이터 (웨딩홀 & 동방주차장)
  markers: [
    {
      title: '창원 힐스카이 웨딩&컨벤션',
      lat: 35.2190478,
      lng: 128.6014549,
    },
    {
      title: '동방마산지사 주차장',
      lat: 35.2186801, // 필요 시 정확한 동방주차장 위도로 수정 가능
      lng: 128.6004627, // 필요 시 정확한 동방주차장 경도로 수정 가능
    },
  ],
  naverMapUrl: 'https://map.naver.com/v5/search/%EC%B0%BD%EC%9B%90%20%ED%9E%90%EC%8A%A4%EC%B9%B4%EC%9D%B4%20%EC%9B%A8%EB%94%A9%26%EC%BD%98%EB%B2%A4%EC%85%98',
  kakaoMapUrl: 'https://map.kakao.com/link/search/%EC%B0%BD%EC%9B%90%20%ED%9E%90%EC%8A%A4%EC%B9%B4%EC%9D%B4%20%EC%9B%A8%EB%94%A9%26%EC%BD%98%EB%B2%A4%EC%85%98',
  wayInfo: [
    {
      title: '📍 대중교통',
      desc: `👉🏻 자유무역 3공구 정류장 하차
• 창원 버스: 107번, 112번, 116번, 530번, 704번
• 진해/마산 버스: 160번, 162번, 163번, 164번, 760번, 860번`,
    },
    {
      title: '📍 주차안내',
      desc: `👉🏻 건물 내 무료주차 
• 웨딩홀 도로 건너편 동방주차장 이용 가능'
(안내데스크에서 주차권 수령)`,
    },
  ],
};

// ==========================================
// 2. 카카오 지도 컴포넌트 (마커 2개 동시에 표시)
// ==========================================
const KakaoMap = ({ centerLat, centerLng, markers }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(centerLat, centerLng),
          level: 4, // 2개 장소가 한 번에 보이도록 확대 레벨 설정
        };
        const map = new window.kakao.maps.Map(container, options);

        // 마커 여러 개 생성
        markers.forEach((loc) => {
          const markerPosition = new window.kakao.maps.LatLng(loc.lat, loc.lng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);

          // 마커 위 장소 이름(인포윈도우) 표시
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:4px 8px;font-size:12px;color:#333;font-weight:bold;white-space:nowrap;">${loc.title}</div>`,
          });
          infowindow.open(map, marker);
        });
      });
    }
  }, [centerLat, centerLng, markers]);

  return <MapContainer ref={mapRef} />;
};

// ==========================================
// 3. 메인 Location 컴포넌트
// ==========================================
export default function Location() {
  return (
    <Container>
      <Title>오시는 길</Title>
      
      {/* 지도 영역 (마커 2개 전달) */}
      <KakaoMap 
        centerLat={locationData.lat} 
        centerLng={locationData.lng} 
        markers={locationData.markers} 
      />

      {/* 웨딩홀 정보 */}
      <InfoSection>
        <VenueTitle>{locationData.title}</VenueTitle>
        <AddressText>{locationData.address}</AddressText>
        <TelText>TEL. {locationData.tel}</TelText>
      </InfoSection>

      {/* 길찾기 버튼 그룹 */}
      <ButtonGroup>
        <MapButton href={locationData.naverMapUrl} target="_blank" rel="noreferrer">
          네이버 지도
        </MapButton>
        <MapButton href={locationData.kakaoMapUrl} target="_blank" rel="noreferrer">
          카카오 맵
        </MapButton>
      </ButtonGroup>

      {/* 안내 항목 (대중교통 / 주차) */}
      <WayList>
        {locationData.wayInfo.map((info, index) => (
          <WayItem key={index}>
            <WayTitle>{info.title}</WayTitle>
            <DescText>{info.desc}</DescText>
          </WayItem>
        ))}
      </WayList>
    </Container>
  );
}

// ==========================================
// 4. CSS 스타일 정의
// ==========================================
const Container = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #333;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 280px;
  border-radius: 8px;
  background-color: #f1f5f9;
`;

const InfoSection = styled.div`
  margin-top: 16px;
  text-align: center;
`;

const VenueTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
`;

const AddressText = styled.p`
  font-size: 0.9rem;
  color: #475569;
  margin-bottom: 4px;
`;

const TelText = styled.p`
  font-size: 0.85rem;
  color: #64748b;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
`;

const MapButton = styled.a`
  flex: 1;
  text-align: center;
  padding: 10px 0;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background-color: #fff;
  color: #334155;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;

  &:hover {
    background-color: #f8fafc;
  }
`;

const WayList = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const WayItem = styled.div`
  background-color: #f8fafc;
  padding: 14px;
  border-radius: 8px;
`;

const WayTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
`;

const DescText = styled.p`
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.6;
  white-space: pre-line;
`;