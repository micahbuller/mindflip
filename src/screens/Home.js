import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { collection, onSnapshot, query } from "@firebase/firestore";
import { getFirestore } from "firebase/firestore";

import React, { useContext, useState, useEffect } from "react";
import Swiper from "react-native-deck-swiper";
import tw from "tailwind-rn";
import { ImageBackground } from "react-native";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { addCard } from "../services/cardHelper";

export default function Home({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const [truth, setTruth] = useState("");
  const [lie, setLie] = useState("");
  const [cards, setCards] = useState([]);
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

  function sendCard() {
    if (truth != "" && lie != "") {
      addCard(user.email, truth, lie);
      setLie("");
      setTruth("");
      Alert.alert("Card added.");
    } else {
      Alert.alert("You haven't entered anything yet. Try looking deeper.");
    }
  }

  return (
    <ImageBackground
      source={require("../assets/Home.png")}
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
                navigation.navigate("Menu");
              }}
            >
              <Text
                style={[
                  tw("text-2xl text-black"),
                  { fontFamily: "Nanum-Gothic" },
                ]}
              >
                #
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tw("relative z-50 flex-1")}>
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
                      <View
                        style={tw("flex-1 pb-5 px-5 justify-end items-end")}
                      >
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
                          onPress={() => {
                            navigation.navigate("CardEditor");
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

          <View style={tw("flex-row h-1/4 items-center justify-between px-5")}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LearnMore");
              }}
            >
              <Text
                style={[tw("text-2xl text-black"), { fontFamily: "Mon-Cheri" }]}
              >
                learn more
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("YourDeck");
              }}
            >
              <Text
                style={[tw("text-2xl text-black"), { fontFamily: "Mon-Cheri" }]}
              >
                add card
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
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
