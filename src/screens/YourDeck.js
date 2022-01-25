import React from "react";
import Swiper from "react-native-deck-swiper";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import tw from "tailwind-rn";
import { ImageBackground } from "react-native";
import { BlurView } from "expo-blur";

const YourDeck = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/Home.png")}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <SafeAreaView style={tw(`flex-1`)}>
        <View style={tw("flex-row items-center justify-start px-5")}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={tw("text-2xl text-black")}>back</Text>
          </TouchableOpacity>
        </View>

        <View style={tw("flex-1")}>
          <Swiper
            cards={["DO", "MORE", "OF", "WHAT", "MAKES", "YOU", "HAPPY"]}
            renderCard={(card) => {
              return (
                <View
                  style={[
                    tw(
                      "relative h-3/4 rounded-xl justify-center items-center overflow-hidden"
                    ),
                    styles.cardShadow,
                  ]}
                >
                  <BlurView
                    intensity={80}
                    tint="light"
                    style={[
                      tw("relative justify-center items-center"),
                      { flex: 1, height: "75%", width: "100%" },
                    ]}
                  >
                    <Text style={tw("font-bold pb-5")}>{card}</Text>
                    <Image
                      style={tw("h-20 w-full")}
                      height={100}
                      width={100}
                      source={{ uri: "https://links.papareact.com/6gb" }}
                    />
                    <View style={tw("flex-row justify-end")}>
                      <TouchableOpacity
                        onPress={() => {
                          console.log("Pressed");
                        }}
                      >
                        <Text style={tw("pt-5 font-bold text-black")}>
                          edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </BlurView>
                </View>
              );
            }}
            onSwiped={(cardIndex) => {
              console.log(cardIndex);
            }}
            onSwipedAll={() => {
              console.log("onSwipedAll");
            }}
            cardIndex={0}
            backgroundColor={"rgba(52, 52, 52, 0)"}
            stackSize={3}
          ></Swiper>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default YourDeck;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
