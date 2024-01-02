if ("function" === typeof importScripts) {
  // importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js");
  // importScripts(
  //   "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging.js"
  // );

  importScripts(
    "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js"
  );

  const firebaseConfig = {
    apiKey: "AIzaSyBatQyYtqdAmcDPaSOdRrHUDrURaTdQdIc",
    authDomain: "silocal-5f20d.firebaseapp.com",
    projectId: "silocal-5f20d",
    storageBucket: "silocal-5f20d.appspot.com",
    messagingSenderId: "124892551306",
    appId: "1:124892551306:web:4947f7371f0c2ccefef573",
    measurementId: "G-FLQNWMWV6Q",
  };

  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message",
      payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("../firebase-messaging-sw.js")
      .then(function (registration) {
        console.log("Registration successful, scope is:", registration.scope);
      })
      .catch(function (err) {
        console.log("Service worker registration failed, error:", err);
      });
  }
}
