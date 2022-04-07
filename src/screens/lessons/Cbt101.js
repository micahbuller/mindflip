import React, { useEffect } from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Button,
  StatusBar,
} from "react-native";
import tw from "tailwind-rn";
import { ImageBackground } from "react-native";
import { ArrowCircleLeftIcon } from "react-native-heroicons/solid";

const Cbt101 = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/Home.png")}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <SafeAreaView
        style={[
          tw(`flex-1 mx-5`),
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        <ScrollView>
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
          <View style={tw("h-64 w-full bg-white rounded-md overflow-hidden")}></View>
          <Text style={[tw("pt-5 text-xl"), { fontFamily: "Mon-Cheri" }]}>
            SO WHAT IS CBT?
          </Text>
          <Text>
            It is something so cool you will flip out!
          </Text>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Cbt101;
