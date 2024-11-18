/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import ArMailBox from "../ArMailBox";
import { container, confirmBtn, singleBtn ,confirmModal} from "./Ar.style";
import Modal from "@/components/Modal";
import { useFetchMailBoxes } from "@/hooks/useFetchMailboxes";
// import { useCreateRollingpaper } from "@/hooks/useCreateRollingpaper";
import useFetchUserRollingpaper from "@/hooks/useFetchUserRollingpaper";
const Ar = () => {
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const { mailBoxes, fetchMailBoxes } = useFetchMailBoxes("ar");
  const [newTitle, setNewTitle] = useState("");

  const [confirmContent, setConfirmContent] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("에러 발생");

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  // const [mailBoxes, setMailBoxes] = useState<IMailBox[]>([]);
  const { createRollingpaper } = useFetchUserRollingpaper();

  // const getMailBox = () => {
  //   fetchMailBoxes(userLat, userLng);
  // };

  useEffect(() => {
    console.log("effect 터짐");
    const updatePosition = () => {
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도
          setUserLat(lat);
          setUserLng(lng);
          console.log("위치 조회 성공", lat, lng);
          fetchMailBoxes(lat, lng);
        });
      }
    };
    updatePosition();

    const intervalId = setInterval(updatePosition, 5000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);

  }, []);


  const createMailBox = async () => {
    try {
      const res = await createRollingpaper(newTitle, userLat, userLng);
      setNewTitle("");

      await fetchMailBoxes(userLat, userLng);

      if (res === "sucess") {
        setConfirmContent("success");
        setIsOpen(false);
        return;
      }
      // 여기서 부터 에러단
      if (res === "B002") {
        setIsConfirmModalOpen(true);
        setConfirmContent("error");
        setErrorMessage("최대 3개까지 롤링페이퍼를 가질 수 있습니다");
      } else if (res === "B003") {
        setIsConfirmModalOpen(true);
        setConfirmContent("error");
        setErrorMessage("너무 가까이에 우체통이 존재합니다");
      }
    } catch (error) {
      // 에러상황 발생
    }
    setIsOpen(false);
  };

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
          {mailBoxes.map((mailBox, index) => (
            <ArMailBox
              key={index}
              postboxId={mailBox.postboxId}
              title={mailBox.title}
              lng={mailBox.longitude}
              lat={mailBox.latitude}
              postboxOwner={mailBox.postboxOwner}
              rollingPaperId={mailBox.rollingPaperId}
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
        <p>
          현재 {userLat} {userLng}
        </p>
        <button
          className="nes-btn"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          +
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="우체통 생성"
      >
        <div css={confirmModal}>
          <p>현재 위치에 생성하시겠습니까?</p>
          <label htmlFor="">롤링페이퍼 제목</label> <br />
          <input
            type="text"
            value={newTitle}
            onChange={handleTitle}
            className="nes-input"
          />
          <div css={confirmBtn}>
            <button
              className={
                (newTitle.length === 0 ? "is-disabled" : "") + " nes-btn"
              }
              onClick={() => createMailBox()}
            >
              예
            </button>
            <button className="nes-btn" onClick={() => setIsOpen(false)}>
              아니오
            </button>
          </div>
          {/* </div>
        <div> */}
        </div>
      </Modal>
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="경고"
      >
        {confirmContent === "error" ? (
          <>
            <p>{errorMessage}</p>
            <button
              className="nes-btn"
              css={singleBtn}
              onClick={() => setIsConfirmModalOpen(false)}
            >
              확인
            </button>
          </>
        ) : (
          <>
            <p>생성완료!</p>
            <button
              className="nes-btn"
              css={singleBtn}
              onClick={() => setIsConfirmModalOpen(false)}
            >
              확인
            </button>
          </>
        )}
      </Modal>
    </>
  );
};

export default Ar;
