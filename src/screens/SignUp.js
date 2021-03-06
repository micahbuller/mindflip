import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
  Keyboard
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "../../lib/tailwind";
import { ImageBackground } from "react-native";
import Firebase from "../../config/firebase";
import { getFirestore } from "firebase/firestore";
import { setDoc, doc } from "@firebase/firestore";

const auth = Firebase.auth();
const db = getFirestore();

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contentVis, setContentVis] = useState(true)

  const onHandleSignup = async () => {
    try {
      if (email !== "" && password !== "" && name !== "") {
        await auth.createUserWithEmailAndPassword(email, password);
        setDoc(doc(db, "users", email), {
          email: email,
          name: name,
          notifications: true,
        });
      } else {
        Alert.alert("You forgot to fill out everything.");
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    const setContent = () => {
      setContentVis(true)
    }
    const hideContent = () => {
      setContentVis(false)
    }

    let keyboardShowListener = Keyboard.addListener('keyboardDidShow', hideContent)
    let keyboardHideListener = Keyboard.addListener('keyboardDidHide', setContent)


    return () => {
      keyboardHideListener.remove()
      keyboardShowListener.remove()
    };
  }, [])

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
      <SafeAreaView style={[tw`flex-1`, {paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}]}>
          <View style={tw`flex-row items-center justify-end px-5`}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LogIn");
              }}
            >
              <Text style={[tw`text-xl text-gray-400`, { fontFamily: "Nanum-Gothic" }]}>or log in</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`justify-center flex-1 items-start px-5 ${contentVis ? "" : "hidden"}`}>
            <Text style={[tw`text-xl`, { fontFamily: "Mon-Cheri" }]}>
              WLCM TO MINDFLIP
            </Text>
          </View>
          <View style={tw`flex-1 justify-end items-center pb-10 mx-5`}>
          

            <View
              style={tw`bg-gray-50 flex-row w-full rounded-xl text-lg mb-5`}
            >
              <TextInput
                style={tw`text-sm font-bold p-5 w-full h-full`}
                placeholder="Full Name"
                onChangeText={(name) => setName(name)}
              />
            </View>

            <View
              style={tw`bg-gray-50 flex-row w-full rounded-xl text-lg mb-5`}
            >
              <TextInput
                style={[tw`p-5 flex-1 text-sm font-bold`, { fontFamily: "Nanum-Gothic" }]}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            <View
              style={tw`bg-gray-50 flex-row w-full rounded-xl text-sm mb-5`}
            >
              <TextInput
                style={[tw`p-5 flex-1 text-sm font-bold`, { fontFamily: "Nanum-Gothic" }]}
                placeholder="Password"
                value={password}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <TouchableOpacity style={tw`w-full`} onPress={onHandleSignup}>
              <View
                style={tw
                  `bg-gray-900 flex-row w-full items-center justify-center opacity-75 px-2 py-5 rounded-full text-lg`
                }
              >
                <Text
                  style={[
                    tw`text-xl text-white`,
                    { fontFamily: "Mon-Cheri" },
                  ]}
                >
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
  );
};

export default SignUp;
