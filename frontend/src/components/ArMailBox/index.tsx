/** @jsxImportSource @emotion/react */
import { MailBoxProps } from "./ArMailBox.types";
import { useState } from "react";
import Modal from "../Modal";

const ArMailBox: React.FC<MailBoxProps> = ({ lat, lng, userLng, userLat,children }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const mailBoxContent = (
    <div>
      {" "}
      <p>{children}</p>
    </div>
  );

  return (
    <>
      {/* 우체통 글자 */}
      <a-text
        value="우체통"
        font="./assets/neodgm-msdf.json"
        font-image="./assets/neodgm.png"
        scale="3 3 1"
        gps-entity-place={`latitude: ${userLat + 0.00001 * lat}; longitude: ${
          userLng + 0.00001 * lng
        };`}
        position="-0.5 0 0"
        // negate="false"
        // animation="property: rotation; to: 0 180 0; loop: true; dur: 3000"
        onClick={() => setModalOpen(true)}
      ></a-text>
      {/* 우체통 모델 */}
      <a-entity
        // animation-mixer="loop: repeat"
        gltf-model="./assets/mailbox.glb"
        // obj-model={arModel}
        position="0 -3 0"
        // animation="property: rotation; to: 90 450 90; loop: true;  dur: 6000"
        // 0.00001이 대략 1m 정도
        gps-entity-place={`latitude: ${userLat + 0.00001 * lat}; longitude: ${
          userLng + 0.00001 * lng
        };`}
        // look-at="[gps-camera]"
        onClick={() => setModalOpen(true)}
      ></a-entity>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="우체통 정보"
        children={mailBoxContent}
      />
    </>
  );
};

export default ArMailBox;
