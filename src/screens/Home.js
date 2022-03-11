import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  Modal,
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
  const [modalVisible, setModalVisible] = useState(false);

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
      Alert.alert("Card added.");
      setModalVisible(false);
      setLie("");
      setTruth("");
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
      {/* Beginning of Modal for Entering Card Info */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw("flex-1")}
        >
          <TouchableOpacity
            style={tw(
              "flex-1 justify-center items-center bg-black bg-opacity-80 px-2"
            )}
            activeOpacity={1}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={tw("w-full h-1/2 bg-gray-100 rounded-2xl py-5")}>
              <TouchableOpacity
                onPress={sendCard}
                activeOpacity={1}
                style={tw(
                  "absolute -bottom-8 right-5 bg-black rounded-full p-5"
                )}
              >
                <Text
                  style={[tw("text-white"), { fontFamily: "Nanum-Gothic" }]}
                >
                  add
                </Text>
              </TouchableOpacity>
              <View style={tw("flex-1 justify-start")}>
                <TextInput
                  style={[
                    tw("px-5 flex-1 text-lg font-bold "),
                    { fontFamily: "Nanum-Gothic" },
                  ]}
                  placeholder="What have you been telling yourself?"
                  value={lie}
                  onChangeText={setLie}
                  multiline
                />
              </View>
              <View style={tw("flex-1 justify-end")}>
                <TextInput
                  style={[
                    tw("flex-1 px-5 text-lg font-bold"),
                    { fontFamily: "Nanum-Gothic" },
                  ]}
                  placeholder="Tell yourself the truth..."
                  value={truth}
                  onChangeText={setTruth}
                  multiline
                />
              </View>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
      {/* End of Modal for Entering Card Info */}

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

        <View style={tw("relative flex-1")}>
          <Swiper
            infinite={true}
            cards={cards}
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
                          navigation.navigate("CardEditor");
                        }}
                        style={tw('flex-1 justify-center items-center')}
                      >
                        <Text style={tw('text-2xl font-bold')}>All Out</Text>
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
            onSwiped={(cardIndex) => {
              console.log(cardIndex);
            }}
            onSwipedAll={() => {
              console.log("onSwipedAll");
            }}
            cardIndex={0}
            verticalSwipe={false}
            backgroundColor={"rgba(52, 52, 52, 0)"}
            stackSize={3}
          ></Swiper>
        </View>

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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text
              style={[tw("text-2xl text-black"), { fontFamily: "Mon-Cheri" }]}
            >
              add card
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
