import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
  } from "react-native";
  import React from "react";
  import tw from "tailwind-rn";
  import { ImageBackground } from "react-native";
  
  const SignUp = ({ navigation }) => {
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
                  secureTextEntry={true}
                  multiline
                  keyboardType="email-address"
                />
              </View>
              <TouchableOpacity
                style={tw("w-full")}
                onPress={() => {
                  navigation.navigate("Home");
                }}
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
  
  export default SignUp;
  