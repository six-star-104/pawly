import { useNotificationStore } from "@/stores/notificationStore";
import { container } from "./Notification.style";
import { useNavigate } from "react-router-dom";

// 파이어 베이스 기반 포그라운드  알람 발생시 
const Notification = () => {
  const { notificationContent, isOpen, linkToWhere, setIsOpen } = useNotificationStore();
  const navigate = useNavigate()

  return (
    <>
      {isOpen && (
        <div css={container}>
          {notificationContent}
          <button className="nes-btn" onClick={()=>{setIsOpen(false); navigate(linkToWhere)}}>이동</button>
        </div>
      )}
    </>
  );
};

export default Notification;
