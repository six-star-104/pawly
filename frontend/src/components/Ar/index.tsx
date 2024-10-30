/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import ArMailBox from "../ArMailBox";
import { container } from "./Ar.style";

const Ar = () => {
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);

  // 우체통 클릭시 해당 주인을 보여주고 쓸지말지 결정하면 그 페이지로 이동 시켜주는걸로..?
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        setUserLat(lat);
        setUserLng(lon);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      return;
    }
  });

  return (
    <div css={container}>
      {/* AR위한 배경 */}
      <a-scene
        cursor="rayOrigin: mouse; fuse: true; fuseTimeout: 0;"
        raycaster="objects: [gps-entity-place];"
        vr-mode-ui="enabled: false"
        autoplay="false"
        arjs="sourceType: webcam;  debugUIEnabled: false;"
      >
        {/* gps 찍힌 위치마다 우체통 반복 생성 해줄 예정 */}
        <ArMailBox lat={userLat} lng={userLng} />

        {/* 카메라 관점 */}
        <a-camera
          gps-camera={`simulateLatitude: ${userLat}; simulateLongitude: ${userLng};`}
          // 이 아래 두 옵션은 나중에 모바일에서 써보고 지워도 되면 지우기
          rotation-reader
          wasd-controls="acceleration: 100"
        ></a-camera>
      </a-scene>

      <button className="nes-btn">+</button>
    </div>
  );
};

export default Ar;
