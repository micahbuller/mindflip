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
  import Firebase from '../../config/firebase';

const auth = Firebase.auth();
  
  const SignUp = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onHandleSignup = async () => {
      try {
        if (email !== '' && password !== '') {
          await auth.createUserWithEmailAndPassword(email, password);
        }
      } catch (error) {
        Alert.alert(error.message);
        setSignupError(error.message);
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
                  navigation.navigate("LogIn");
                }}
              >
                <Text style={tw("text-xl text-black")}>or log in</Text>
              </TouchableOpacity>
            </View>
            <View style={tw("justify-center flex-1 items-start px-5")}>
              <Text style={tw("text-3xl w-28")}>Wlcm to mindflip</Text>
            </View>
            <View style={tw("flex-1 justify-end items-center pb-10 mx-5")}>
            <View
                style={tw(
                  "bg-gray-50 flex-row w-full px-2 py-5 rounded-xl text-lg mb-5"
                )}
              >
                <TextInput
                  style={tw("mx-5 text-lg font-bold")}
                  placeholder="Full Name"
                  multiline
                  onChangeText={(name) => setName(name)}
                />
              </View>
        
              <View
                style={tw(
                  "bg-gray-50 flex-row w-full  px-2 py-5 rounded-xl text-lg mb-5"
                )}
              >
                <TextInput
                  style={tw("mx-5 text-lg font-bold")}
                  placeholder="Email"
                  multiline
                  keyboardType="email-address"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
              <View
                style={tw(
                  "bg-gray-50 flex-row w-full px-2 py-5 rounded-xl text-lg mb-5"
                )}
              >
                <TextInput
                  style={tw("mx-5 text-lg font-bold")}
                  placeholder="Password"
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  secureTextEntry={true}

                />
              </View>
              <TouchableOpacity
                style={tw("w-full")}
                onPress={onHandleSignup}
              >
                <View
                  style={tw(
                    "bg-gray-900 flex-row w-full items-center justify-center opacity-75 px-2 py-5 rounded-full text-lg"
                  )}
                >
                  <Text style={tw("text-2xl text-white")}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  };
  
  export default SignUp;
  