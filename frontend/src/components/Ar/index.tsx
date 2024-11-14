/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import ArMailBox from "../ArMailBox";
import { container } from "./Ar.style";
import Modal from "@/components/Modal";

const Ar = () => {
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  // const [modalContent, setModalContent] = useState<ReactNode>();

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

  const createMailBox = () => {
    // 주변에 우체통 존재 로직 판단을 백에서 하는 방법도 가능
    // axios 요청보내서 error뜨면 에러메세지 띄워주는식으로
    if (userLat == 0) {
      // 주변에 우체통 없을때
      // setModalContent();
      setIsOpen(true);
    } else {
      //주변에 우체통 존재할때
      // setModalContent();
      setIsOpen(true);
    }
  };
  // 일단 반복되는지 확인용 임시 array
  const gpsArr = [
    { lat: 1, lng: -3 },
    { lat: 5, lng: 2 },
    { lat: -2, lng: 5 },
  ];

  return (
    <>
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
          {gpsArr.map((a, index) => (
            <ArMailBox
              key={index}
              userLat={userLat}
              userLng={userLng}
              lng={a.lng}
              lat={a.lat}
              // 여기에 상세정보 적기
              // children={modalContent}
            />
          ))}

          {/* 카메라 관점 */}
          <a-camera
            gps-camera={`simulateLatitude: ${userLat}; simulateLongitude: ${userLng};`}
            // 이 아래 두 옵션은 나중에 모바일에서 써보고 지워도 되면 지우기
            rotation-reader
            wasd-controls="acceleration: 100"
          ></a-camera>
        </a-scene>

        <button className="nes-btn" onClick={() => createMailBox()}>
          +
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="우체통 생성"
      >
        <div>
          <p>현재 위치에 우체통을 생성하시겠습니까?</p>
          <button className="nes-btn" onClick={() => setIsOpen(false)}>
            예
          </button>
          <button className="nes-btn" onClick={() => setIsOpen(false)}>
            아니오
          </button>
        {/* </div>
        <div> */}
          <p>근처에 다른 우체통이 존재합니다! 다른 곳에서 시도해주세요</p>
          <button className="nes-btn" onClick={() => setIsOpen(false)}>
            확인
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Ar;
