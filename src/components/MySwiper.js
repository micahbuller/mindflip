import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import React, {useState} from "react";
import Swiper from "react-native-deck-swiper";
import tw from "tailwind-rn";

export default function MySwiper({ cards, cardIndex }) {
  const [myKey, setMyKey] = useState(0);
  return (
    <Swiper
      key={myKey}
      infinite={true}
      cards={cards}
      cardIndex={0}
      verticalSwipe={false}
      backgroundColor={"rgba(52, 52, 52, 0)"}
      stackSize={3}
      renderCard={(card) =>
        card ? (
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
              <View style={tw("flex-1 pb-5 px-5 justify-end items-end")}>
                <Text
                  style={[
                    tw("font-bold text-2xl line-through text-center"),
                    { fontFamily: "Nanum-Gothic" },
                  ]}
                >
                  {card?.lie}
                </Text>
              </View>
              <View style={tw("flex-1 pt-5 px-5")}>
                <Text
                  style={[
                    tw("font-bold text-2xl text-center"),
                    { fontFamily: "Nanum-Gothic" },
                  ]}
                >
                  {card?.truth}
                </Text>
              </View>

              <View style={tw("flex-row justify-end")}>
                <TouchableOpacity
                // onPress={() => {
                //   navigation.navigate("CardEditor");
                // }}
                >
                  <Text
                    style={[
                      tw("pb-5 font-bold text-black opacity-25"),
                      { fontFamily: "Nanum-Gothic" },
                    ]}
                  >
                    edit
                  </Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>
        ) : (
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
              <TouchableOpacity
                onPress={() => {
                  setMyKey(myKey + 1);
                }}
                style={tw("flex-1 justify-center items-center")}
              >
                <Text style={tw("text-2xl font-bold")}>All Out</Text>
                <Text
                  style={[
                    tw("pb-5 font-bold text-black opacity-25"),
                    { fontFamily: "Nanum-Gothic" },
                  ]}
                >
                  Refresh
                </Text>
              </TouchableOpacity>
            </BlurView>
          </View>
        )
      }
    ></Swiper>
  );
}

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
