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

export default function Home({ navigation }) {
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
              navigation.navigate('Menu')
            }}
          >
            <Text style={tw("text-2xl text-black")}>#</Text>
          </TouchableOpacity>
        </View>

        <View style={tw("m-10 flex-1")}>
          <View style={tw("mx-10 items-center justify-center")}>
            <View
              style={tw(
                "h-1/2 justify-start bg-gray-50 opacity-75 w-96 px-2 py-5 rounded-t-xl text-lg"
              )}
            >
              <TextInput
                style={tw("mx-5 text-lg font-bold")}
                placeholder="What have you been telling yourself?"
                multiline
              />
            </View>
            <View
              style={tw(
                "h-1/2 justify-end items-end bg-gray-50 opacity-75 w-96 px-2 py-5 rounded-b-xl text-lg"
              )}
            >
              <TextInput
                style={tw("mx-5 text-lg font-bold")}
                placeholder="Tell yourself the truth..."
                multiline
              />
            </View>
          </View>
          <View style={tw("flex-row justify-end")}>
            <TouchableOpacity
              onPress={() => {
                console.log("Pressed");
              }}
            >
              <Text style={tw("pt-5 font-bold text-black")}>
                put it in your stack
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw("flex-row h-1/4 items-center justify-between px-5")}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LearnMore");
            }}
          >
            <Text style={tw("text-2xl text-black")}>learn more</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("YourDeck");
            }}
          >
            <Text style={tw("text-2xl text-black")}>your cards</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
