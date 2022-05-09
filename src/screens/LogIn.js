import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import tw from "../../lib/tailwind";
import { ImageBackground } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(error.message + errorCode);
          });
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <SafeAreaView
          style={[
            tw`flex-1`,
            {
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
            },
          ]}
        >
          <View style={tw`flex-row items-center justify-end px-5`}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text
                style={[
                  tw`text-xl text-gray-400`,
                  { fontFamily: "Nanum-Gothic" },
                ]}
              >
                or sign up
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`justify-center flex-1 items-start px-5`}>
            <Text style={[tw`text-xl`, { fontFamily: "Mon-Cheri" }]}>
              WLCM TO MINDFLIP
            </Text>
          </View>
          <View style={tw`flex-1 justify-end items-center pb-10 mx-5`}>
            <View style={tw`flex flex-row w-full justify-end pb-4`}>
              <TouchableOpacity>
                <Text
                  style={[tw`text-gray-400`, { fontFamily: "Nanum-Gothic" }]}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={tw`bg-gray-50 flex-row w-full rounded-xl text-lg mb-5`}
            >
              <TextInput
                style={tw`text-sm font-bold p-5 w-full h-full`}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            <View
              style={tw`bg-gray-50 flex-row w-full rounded-xl text-lg mb-5`}
            >
              <TextInput
                style={tw`text-sm font-bold p-5 w-full h-full`}
                placeholder="Password"
                secureTextEntry={true}
                keyboardType="default"
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <TouchableOpacity style={tw`w-full`} onPress={onLogin}>
              <View
                style={tw`
                  bg-gray-900 flex-row w-full items-center justify-center opacity-75 px-2 py-5 rounded-full text-lg`}
              >
                <Text
                  style={[
                    tw`text-xl text-white`,
                    { fontFamily: "Mon-Cheri" },
                  ]}
                >
                  Sign In
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
  );
};

export default LogIn;
