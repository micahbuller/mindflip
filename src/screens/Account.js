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
import React, {useState} from "react";
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

const db = getFirestore();



//AUTH
const auth = getAuth();

//EXPO NOTIFICATIONS
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const Account = () => {
  const [notificationSwitch, setNotificationSwitch] = useState(false)
  const navigation = useNavigation();
  const user = auth.currentUser;

  function toggleSwitch(){
    setNotificationSwitch(!notificationSwitch)
    Alert.alert("Still need to do this.")
  }

  function sendPassReset() {
    sendPasswordResetEmail(auth, user.email)
      .then(Alert.alert("Go ahead and check your email!"))
      .catch((error) => {
        Alert.alert(error);
      });
  }

  const deletePushToken = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        //No permissions for notifications, so return
        return;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;

      const q = query(
        collection(db, "subscriptions"),
        where("token", "==", token)
      );

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        //DELETE PUSH TOKEN FROM DB
        querySnapShot.forEach((docItem) => {
          deleteDoc(doc(db, "subscriptions", docItem.id));
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

          <TouchableOpacity
            style={tw("w-full pt-2")}
            onPress={() => sendPassReset()}
          >
            <View
              style={tw(
                "bg-gray-800 flex-row w-full items-center justify-center bg-opacity-25 px-2 py-5 my-5 rounded-full text-lg"
              )}
            >
              <Text
                style={[
                  tw("text-lg text-white"),
                  { fontFamily: "Nanum-Gothic" },
                ]}
              >
                send password reset
              </Text>
            </View>
          </TouchableOpacity>
          <View style={tw("flex-row items-center justify-end px-5")}>
          <TouchableOpacity onPress={handleSignOut}>
            <Text
              style={[
                tw("text-2xl text-black py-10"),
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
