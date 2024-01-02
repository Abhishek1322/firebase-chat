import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBatQyYtqdAmcDPaSOdRrHUDrURaTdQdIc",
  authDomain: "silocal-5f20d.firebaseapp.com",
  projectId: "silocal-5f20d",
  storageBucket: "silocal-5f20d.appspot.com",
  messagingSenderId: "124892551306",
  appId: "1:124892551306:web:4947f7371f0c2ccefef573",
  measurementId: "G-FLQNWMWV6Q",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);
const PARENTCOLLECTIONNAME = "chats";
const CHILDCOLLECTIONNAME = "messages"
const VAPID_KEY =
  "BIxgyl370mEcMrx4B1IifDDuKT__Cd8uCcmuXt6CamNftgCF8Gyb-3vSctMXN5kabDBSE4BN1-tmu91D8Qya_GQ";

  // export const onMessageListener = () =>
  // new Promise((resolve) => {
  //   onMessage(messaging, (payload) => {
  //     console.log("payload", payload)
  //     resolve(payload);
  //   });
  // });

export { db, storage, app, messaging, PARENTCOLLECTIONNAME,CHILDCOLLECTIONNAME, VAPID_KEY };
