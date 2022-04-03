import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  LogBox,
} from "react-native";
import { BlurView } from "expo-blur";
import React from "react";
import Swiper from "react-native-deck-swiper";
import tw from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
export default function MySwiper({ cards }) {
  const navigation = useNavigation();

  //IMPORTANT it ignores this warning message.
  LogBox.ignoreLogs(['Warning: Encountered two children with the same key']);

  return (
    <Swiper
      key={cards.length}
      cardVerticalMargin={40}
      marginTop={-10}
      cardIndex={0}
      infinite={true}
      cards={cards}
      verticalSwipe={false}
      backgroundColor={"rgba(52, 52, 52, 0)"}
      stackSize={3}
      renderCard={(card, cardIndex) =>
        card ? (
          <View
            key={card.id}
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
              <View style={tw("flex-1 py-5 px-5 justify-end items-end")}>
                <Text
                  style={[
                    tw("font-bold text-lg line-through text-center"),
                    { fontFamily: "Nanum-Gothic" },
                  ]}
                >
                  {card?.lie}
                </Text>
              </View>
              <View style={tw("flex-1 py-5 px-5")}>
                <Text
                  style={[
                    tw("font-bold text-lg text-center"),
                    { fontFamily: "Nanum-Gothic" },
                  ]}
                >
                  {card?.truth}
                </Text>
              </View>

              <View style={tw("h-12 flex-row items-center justify-end")}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CardEditor", { card });
                  }}
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
              <ActivityIndicator size="large" />
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
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
