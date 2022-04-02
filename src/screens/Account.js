import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    KeyboardAvoidingView,
  } from "react-native";
  import React, { useState } from "react";
  import {
    ArrowCircleLeftIcon,
  } from "react-native-heroicons/solid";
  import tw from "tailwind-rn";
  import { useNavigation } from "@react-navigation/native";

  
  const Account = () => {
    const navigation = useNavigation();
  
  
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
          <SafeAreaView style={tw("flex-1 mx-5")}>
            <View style={tw("flex-row items-center justify-start")}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <ArrowCircleLeftIcon style={[tw("text-black")]} />
              </TouchableOpacity>
              
            </View>
            
            <Text style={[tw("pt-5 text-xl"), { fontFamily: "Mon-Cheri" }]}>
              Account Screen
            </Text>
            
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  };
  
  export default Account;
  