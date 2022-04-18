import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { UserCircleIcon } from "react-native-heroicons/solid";
import { collection, onSnapshot, query } from "@firebase/firestore";
import { getFirestore } from "firebase/firestore";

import tw from "tailwind-rn";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import MySwiper from "../components/MySwiper";

export default function Home({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const [noCards, setNoCards] = useState(false);
  const [cardsLoading, setCardsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [cardSnapshot, setCardSnapshot] = useState(null)
  const db = getFirestore();

  useEffect(() => {
    async function mapCards(snapshot) {
      await setCards(
        snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort(() => Math.random() - 0.5)
      );

      if (!cards.length) {
        setNoCards(true);
      }
    }

    const fetchCards = async () => {
      const unsub = await onSnapshot(
        query(collection(db, "users", user.email, "cards")),
        (snapshot) => mapCards(snapshot)
      );

      setCardsLoading(false);
      return unsub;
    };

    fetchCards();

  }, [db]);

  return (
    <ImageBackground
      source={require("../assets/Home.png")}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
    
      <SafeAreaView style={[tw(`flex-1`), {paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}]}>
        <View style={tw("flex-row items-center justify-end px-5")}>
          <TouchableOpacity
            style={tw("h-12 w-12 items-end justify-center")}
            onPress={() => {
              navigation.navigate("Account", {cardSnapshot});
            }}
          >
            <UserCircleIcon style={tw("text-black")} />
          </TouchableOpacity>
        </View>

        <View style={tw("relative flex-1 items-center justify-center")}>
          {!cards.length ? (
            noCards ? (
              <View
                style={[
                  tw(
                    "relative border h-3/4 rounded-xl justify-center items-center"
                  ),
                ]}
              >
                <Image
                  source={require("../assets/no-cards-screen.png")}
                  style={{ height: 300, width: 300 }}
                />
              </View>
            ) : (
              <ActivityIndicator size="large" />
            )
          ) : (
            <MySwiper cards={cards} />
          )}
        </View>

        <View style={tw("flex flex-col justify-center mb-4 mt-4")}>
          <View
            style={tw("flex flex-row items-center justify-between px-5 pb-5")}
          >
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
                navigation.navigate("CardAdd");
              }}
            >
              <Text
                style={[tw("text-2xl text-black"), { fontFamily: "Mon-Cheri" }]}
              >
                add card
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
