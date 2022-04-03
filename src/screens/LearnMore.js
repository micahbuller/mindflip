import React from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import tw from "tailwind-rn";
import { ImageBackground } from "react-native";
import { ArrowCircleLeftIcon } from "react-native-heroicons/solid";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "What is CBT 0.1",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "What is CBT 0.2",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Identifying Falsity",
  },
];

const LearnMore = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log("pressed flatlist item");
      }}
    >
      <View
        style={[
          tw(
            "flex-row bg-white opacity-50 rounded-lg mx-5 my-2 justify-between items-center px-5 pt-5 pb-5 overflow-hidden"
          ),
        ]}
      >
        <Text style={[tw("text-xl text-black"), { fontFamily: "Mon-Cheri" }]}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../assets/Home.png")}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <SafeAreaView style={tw(`flex-1`)}>
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

        <View style={tw("flex-1 py-5")}>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>

        <View style={tw("flex-1 items-center justify-start px-5")}>
          <Text
            style={[tw("font-bold text-xl"), { fontFamily: "Nanum-Gothic" }]}
          >
            More to come
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LearnMore;
