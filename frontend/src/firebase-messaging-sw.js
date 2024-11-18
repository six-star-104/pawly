import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {axiosInstance} from './apis/axiosInstance';
// import {logo} from './assets/icons/pawly'
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

  if (token) {console.log("토큰 성공"); 
    // console.log(token);
    // fcm 토큰 등록
    try{
      await axiosInstance.post('member/fcm', {
        fcmToken:token
      })
    console.log("토큰 백 전송 성공")
    } catch{
        console.log("토큰 백 전송 실패")
      }
    
  }
  
  else console.log("Can not get Token");

  // 포그라운드 메세지 수신
  onMessage(messaging, (payload) => {

    console.log("메시지가 도착했습니다.", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };

    if (Notification.permission === "granted") {
      new Notification(notificationTitle, notificationOptions);
    }
    
  });
}

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    // icon: logo, // 웹 푸시 이미지는 icon
    // tag: resultData.tag,
  };
  console.log("활성중 알람", notificationOptions.body)
  self.registration.showNotification(notificationTitle, notificationOptions);
});

requestPermission();
