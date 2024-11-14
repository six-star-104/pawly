importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBV9FLFR02WJnrUgac6Nm9KgWz6NX-KCYg",
  projectId: "pawly-235a8",
  messagingSenderId: "1068445140985",
  appId: "1:1068445140985:web:3490f659801218073c9f28",
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
  