import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import React from "react";
import tw from "tailwind-rn";
import { ImageBackground } from "react-native";
import Firebase from "../../config/firebase";
import { ArrowCircleLeftIcon } from "react-native-heroicons/solid";

//EXPO NOTIFICATIONS
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

//Firebase/Firestore
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "@firebase/firestore";
const userAuth = getAuth();
const auth = Firebase.auth();
const db = getFirestore();

const Menu = ({ navigation }) => {

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
        querySnapShot.forEach((doc) => {
          deleteDoc(doc)
        })
      }
    }
  };

  const handleSignOut = async () => {
    try {
      //DELETE PUSH TOKEN FROM DB
      await deletePushToken();
      //await auth.signOut();
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
      <SafeAreaView
        style={[
          tw(`flex-1`),
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        <View style={tw("flex-row items-center justify-start px-5 pt-2")}>
          <TouchableOpacity
            style={tw("h-12 w-12 items-start justify-center")}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ArrowCircleLeftIcon style={[tw("text-black")]} />
          </TouchableOpacity>
        </View>
        <View style={tw("flex-1 justify-center items-center")}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Account");
            }}
          >
            <Text
              style={[
                tw("text-2xl text-black pb-10"),
                { fontFamily: "Nanum-Gothic" },
              ]}
            >
              Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Friendly notifications are coming soon!");
            }}
          >
            <Text
              style={[
                tw("text-2xl text-black pb-10"),
                { fontFamily: "Nanum-Gothic" },
              ]}
            >
              Notifications
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw("flex-row items-center justify-center px-5")}>
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
    </ImageBackground>
  );
};

export default Menu;
