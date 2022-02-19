import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from 'react';
import tw from "tailwind-rn";
import { ImageBackground } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const auth = getAuth();

const LogIn = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
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
    <ImageBackground
      source={require("../assets/LogIn.png")}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw("flex-1")}
      >
        <SafeAreaView style={tw(`flex-1 `)}>
          <View style={tw("flex-row items-center justify-end px-5")}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={tw("text-xl text-black")}>or sign up</Text>
            </TouchableOpacity>
          </View>
          <View style={tw("justify-center flex-1 items-start px-5")}>
            <Text style={tw("text-3xl w-28")}>Wlcm to mindflip</Text>
          </View>
          <View style={tw("flex-1 justify-end items-center pb-10 mx-5")}>
            <View
              style={tw(
                "bg-gray-50 flex-row w-full rounded-xl text-lg mb-5"
              )}
            >
              <TextInput
                style={tw("p-5 text-lg flex-1 font-bold")}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            <View
              style={tw(
                "bg-gray-50 flex-row w-full rounded-xl text-lg mb-5"
              )}
            >
              <TextInput
                style={tw("p-5 text-lg flex-1 font-bold")}
                placeholder="Password"
                secureTextEntry={true}
                multiline
                keyboardType="email-address"
                onChangeText={(password) => setPassword(password)}

              />
            </View>
            <TouchableOpacity
              style={tw("w-full")}
              onPress={onLogin}
            >
              <View
                style={tw(
                  "bg-gray-900 flex-row w-full items-center justify-center opacity-75 px-2 py-5 rounded-full text-lg"
                )}
              >
                <Text style={tw("text-2xl text-white")}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LogIn;
