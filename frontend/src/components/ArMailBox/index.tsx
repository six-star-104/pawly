/** @jsxImportSource @emotion/react */
import { MailBoxProps } from "./ArMailBox.types";

const ArMailBox: React.FC<MailBoxProps> = ({ lat, lng }) => {
  const openEvent = () => {
    window.alert("상자 클릭 완료!");
  };

  return (
    <>
      {/* 우체통 글자 */}
      <a-text
        value="우체통"
        font="./assets/neodgm-msdf.json"
        font-image="./assets/neodgm.png"
        scale="3 3 1"
        gps-entity-place={`latitude: ${lat + 0.00005}; longitude: ${
          lng + 0.00001
        };`}
        position="-0.5 0 0"
        // negate="false"
        // animation="property: rotation; to: 0 180 0; loop: true; dur: 3000"
      ></a-text>
      {/* 우체통 모델 */}
      <a-entity
        // animation-mixer="loop: repeat"
        gltf-model="./assets/mailbox.glb"
        // obj-model={arModel}
        rotation="0 0 0"
        position="0 -3 0"
        // animation="property: rotation; to: 90 450 90; loop: true;  dur: 6000"
        scale="1 1 1"
        // 0.00001이 대략 1m 정도
        gps-entity-place={`latitude: ${lat + 0.00005}; longitude: ${
          lng + 0.00001
        };`}
        // look-at="[gps-camera]"
        onClick={() => openEvent()}
      ></a-entity>
    </>
  );
};

export default ArMailBox;
