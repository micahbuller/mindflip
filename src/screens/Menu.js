import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import tw from "tailwind-rn";
import { ImageBackground } from "react-native";
import Firebase from '../../config/firebase';

const auth = Firebase.auth();

const Menu = ({ navigation }) => {

  const handleSignOut = async () => {
    try {
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
      <SafeAreaView style={tw(`flex-1 `)}>
        <View style={tw("flex-row items-center justify-end px-5")}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={tw("text-2xl text-black")}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={tw("flex-1 justify-center items-center")}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={tw("text-2xl text-black pb-10")}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={tw("text-2xl text-black pb-10")}>Reminders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={tw("text-2xl text-black pb-10")}>Widget</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={tw("text-2xl text-black pb-10")}>Theme</Text>
          </TouchableOpacity>
        </View>
        <View style={tw("flex-row items-center justify-center px-5")}>
          <TouchableOpacity
            onPress={handleSignOut}
          >
            <Text style={tw("text-2xl text-black pb-10")}>log out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Menu;
