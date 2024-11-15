importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// 백그라운드 푸시 알림 용도
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBV9FLFR02WJnrUgac6Nm9KgWz6NX-KCYg",
  projectId: "pawly-235a8",
  messagingSenderId: "1068445140985",
  appId: "1:1068445140985:web:3490f659801218073c9f28",
});

self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image, // 웹 푸시 이미지는 icon
    tag: resultData.tag,
  };
  console.log("백그라운드 알람", notificationOptions.body)
  self.registration.showNotification(notificationTitle, notificationOptions);
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드 메시지 수신:", payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

