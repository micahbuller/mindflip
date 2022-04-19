import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
  Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { ArrowCircleLeftIcon } from "react-native-heroicons/solid";
import tw from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";

import {
  doc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "@firebase/firestore";
import { getFirestore } from "firebase/firestore";
//EXPO NOTIFICATIONS
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const db = getFirestore();

//AUTH
const auth = getAuth();

const Account = () => {
  const [notificationSwitch, setNotificationSwitch] = useState(false);
  const [token, setToken] = useState(null);
  const navigation = useNavigation();
  const user = auth.currentUser;

  useEffect(async () => {
    //Get whether notifications is enabled or not.
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        //No permissions for notifications, so return
        setNotificationSwitch(false);
        return;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        setNotificationSwitch(false);
        return;
      }

      setNotificationSwitch(true);
      setToken((await Notifications.getExpoPushTokenAsync()).data);
    }

    return () => {
      //Clean Up State
    };
  }, []);

  function toggleSwitch() {
    if (token) {
      deletePushToken();
    } else {
      addPushTokenToDb();
    }
    setNotificationSwitch(!notificationSwitch);
  }

  function sendPassReset() {
    sendPasswordResetEmail(auth, user.email)
      .then(Alert.alert("Go ahead and check your email!"))
      .catch((error) => {
        Alert.alert(error);
      });
  }

  const addPushTokenToDb = async () => {
    //Check to see if current push token exists, if not add it to db

    if (Constants.isDevice) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldPlaySound: true,
          shouldSetBadge: true,
          shouldShowAlert: true,
        }),
      });

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notification!");
        return;
      }
      setToken((await Notifications.getExpoPushTokenAsync()).data);

      const q = query(
        collection(db, "subscriptions"),
        where("token", "==", token)
      );

      const querySnapShot = await getDocs(q);

      if (querySnapShot.empty) {
        await addDoc(collection(db, "subscriptions"), {
          email: auth.currentUser.email,
          token: token,
        }).then((docRef) => {
          console.log(docRef);
        });
      }
    }
  };

  const deletePushToken = async () => {
    if (Constants.isDevice) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldPlaySound: false,
          shouldSetBadge: false,
          shouldShowAlert: false,
        }),
      });

      const q = query(
        collection(db, "subscriptions"),
        where("token", "==", token)
      );

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        //DELETE PUSH TOKEN FROM DB
        querySnapShot.forEach((docItem) => {
          deleteDoc(doc(db, "subscriptions", docItem.id)).then((docRef) => {
            console.log(docRef);
          });
        });
      }
    }
  };

  const handleSignOut = async () => {
    try {
      //DELETE PUSH TOKEN FROM DB
      await deletePushToken();
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Home.png")}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw("flex-1")}
        keyboardVerticalOffset={10}
      >
        <SafeAreaView
          style={[
            tw(`flex-1 mx-5`),
            {
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
            },
          ]}
        >
          <View style={tw("flex-row items-center justify-start pt-2")}>
            <TouchableOpacity
              style={tw("h-12 w-12 items-start justify-center")}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ArrowCircleLeftIcon style={[tw("text-black")]} />
            </TouchableOpacity>
          </View>

          <Text
            style={[
              tw("pt-5 text-xl text-right my-5"),
              { fontFamily: "Mon-Cheri" },
            ]}
          >
            ACCOUNT
          </Text>

          <Text
            style={[
              tw("pt-5 text-sm text-right"),
              { fontFamily: "Nanum-Gothic" },
            ]}
          >
            your email
          </Text>
          <Text
            style={[tw("pt-2 text-lg text-right"), { fontFamily: "Mon-Cheri" }]}
          >
            {user.email}
          </Text>

          <Text
            style={[
              tw("pt-5 text-sm text-right"),
              { fontFamily: "Nanum-Gothic" },
            ]}
          >
            notifications
          </Text>
          <View style={tw(`flex flex-row justify-end items-center my-2`)}>
            <Text
              style={[
                tw("pt-2 pr-2 text-lg text-right"),
                { fontFamily: "Mon-Cheri" },
              ]}
            >
              daily reminders?
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notificationSwitch ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={notificationSwitch}
            />
          </View>
        
          <View style={tw("flex-row items-center justify-end")}>
            <TouchableOpacity onPress={() => sendPassReset()}>
              <Text
                style={[
                  tw("text-2xl text-black py-10"),
                  { fontFamily: "Mon-Cheri" },
                ]}
              >
                RESET PASS
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw("flex-row items-center justify-end")}>
            <TouchableOpacity onPress={handleSignOut}>
              <Text
                style={[
                  tw("text-2xl text-black pt-2"),
                  { fontFamily: "Mon-Cheri" },
                ]}
              >
                LOG OUT
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Account;
