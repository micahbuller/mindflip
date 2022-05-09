// In App.js in a new project

import React, { useState, useEffect, useRef } from "react";
import Routes from "./src/navigation";
import { Platform } from "react-native";

//Firebase/Firestore
import Firebase from "./config/firebase";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "@firebase/firestore";
const userAuth = getAuth();
const auth = Firebase.auth();
const db = getFirestore();

//EXPO NOTIFICATIONS
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const addPushTokenToDb = async (myToken) => {
    // First check to see if the user notifications are enabled.
    //Check to see if current push token exists, if not add it to db.
    const n = query(doc(db, "users", userAuth.currentUser.email));

    const notificationSnapshot = await (await getDoc(n)).data();

    if (notificationSnapshot.notifications) {
      const q = query(
        collection(db, "subscriptions"),
        where("token", "==", myToken)
      );

      const querySnapShot = await getDocs(q);

      if (querySnapShot.empty) {
        await addDoc(collection(db, "subscriptions"), {
          email: userAuth.currentUser.email,
          token: myToken,
        });
      }
    }
  };

  async function registerForPushNotificationsAsync() {
    //Check to see if user is logged in first
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        // alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      //ADD TOKEN TO BACKEND
      addPushTokenToDb(token);

      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <Routes />;
}

export default App;
