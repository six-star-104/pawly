import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useNotificationStore } from "@/stores/notificationStore";
import { axiosInstance } from "./apis/axiosInstance";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission() {
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }

  console.log("알림 권한이 허용됨");

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_VAPID_KEY,
  });

  if (token) {
    console.log("토큰 성공");

    // FCM 토큰 등록
    try {
      await axiosInstance.post("member/fcm", {
        fcmToken: token,
      });
      console.log("토큰 백 전송 성공");
    } catch (error) {
      console.error("토큰 백 전송 실패", error);
    }
  } else {
    console.log("Can not get Token");
  }

  // 포그라운드 메시지 수신
  onMessage(messaging, (payload) => {
    const store = useNotificationStore.getState(); // Access Zustand store functions directly

    console.log("메시지가 도착했습니다.", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "./assets/icons/Pawly.svg",
    };

    if (Notification.permission === "granted") {
      console.log("갱신 성공", payload);

      // Update Zustand store state
      store.setIsOpen(true);
      store.setNotificationContent(payload.notification.body);
      if(payload.notification.title.includes("친구")){
        store.setLinkToWhere("friends");}
      else if(payload.notification.title.includes("롤링페이퍼")){
        store.setLinkToWhere("rollingpaper");}
      else if(payload.notification.title.includes("편지")){
        store.setLinkToWhere("friends");}
      else if(payload.notification.title.includes("도전과제")){
        store.setLinkToWhere("easteregg");}
      
      // Show native browser notification
      new Notification(notificationTitle, notificationOptions);
    }
  });
}

requestPermission();
