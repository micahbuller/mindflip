import React, { useState, useEffect, useContext } from "react";
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
import { collection, onSnapshot, query } from "@firebase/firestore";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { getFirestore } from "firebase/firestore";

const YourDeck = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const { user } = useContext(AuthenticatedUserContext);
  const db = getFirestore();

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "users", user.email, "cards")),
        (snapshot) =>
          setCards(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [db]
  );

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
            <Text style={[tw("text-2xl text-black"), { fontFamily: "Nanum-Gothic" }]}>back</Text>
          </TouchableOpacity>
        </View>

        <View style={tw("flex-1")}>
          <Swiper
            infinite={true}
            cards={cards}
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
                    <View style={tw("flex-1 pb-5 px-5 justify-end items-end")}>
                      <Text style={[tw("font-bold text-2xl line-through text-center"), { fontFamily: "Nanum-Gothic" }]}>
                        {card?.lie}
                      </Text>
                    </View>
                    <View style={tw("flex-1 pt-5 px-5")}>
                      <Text style={[tw("font-bold text-2xl text-center"), { fontFamily: "Nanum-Gothic" }]}>
                        {card?.truth}
                      </Text>
                    </View>
                    
                    <View style={tw("flex-row justify-end")}>
                      <TouchableOpacity
                        onPress={() => {
                          console.log("Pressed");
                        }}
                      >
                        <Text style={[tw("pb-5 font-bold text-black opacity-25"), { fontFamily: "Nanum-Gothic" }]}>
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
