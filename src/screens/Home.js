import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Modal,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import { MenuIcon } from "react-native-heroicons/solid";
import { collection, onSnapshot, query } from "@firebase/firestore";
import { getFirestore } from "firebase/firestore";

import tw from "tailwind-rn";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { addCard } from "../services/cardHelper";
import MySwiper from "../components/MySwiper";

export default function Home({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const [noCards, setNoCards] = useState(false)
  const [cardsLoading, setCardsLoading] = useState(true);
  const [truth, setTruth] = useState("");
  const [lie, setLie] = useState("");
  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const db = getFirestore();

  useEffect(() => {

    async function mapCards(snapshot) {
      await setCards(snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort(() => Math.random() - 0.5))

        if(!cards.length){
          setNoCards(true)
        }

    }

    const fetchCards = async () => {
      const unsub = await onSnapshot(
        query(collection(db, "users", user.email, "cards")),
        (snapshot) =>
          mapCards(snapshot)
      );
      
      setCardsLoading(false);
      return unsub;
    };

    fetchCards();
  }, [db]);

  function addCardToLocalCards() {
    const newCard = {
      id: truth,
      lie: lie,
      truth: truth,
    };

    var tempCards = cards;
    cards.push(newCard);
    setCards(tempCards);
  }

  function sendCard() {
    if (truth != "" && lie != "") {
      addCard(user.email, truth, lie);
      addCardToLocalCards();
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
            <View style={tw("w-full h-3/4 bg-white rounded-2xl py-5")}>
              <TouchableOpacity
                onPress={sendCard}
                activeOpacity={1}
                style={tw(
                  "absolute -bottom-8 right-5 bg-yellow-300 bg-opacity-75 rounded-full p-5"
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
            <MenuIcon style={tw("text-black")} />
          </TouchableOpacity>
        </View>

        <View style={tw("relative flex-1 items-center justify-center")}>
          {!cards.length ? ( noCards ? 
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
            </View> : <ActivityIndicator size="large" />
          ) : (
            <MySwiper cards={cards} />
          )}
        </View>

        <View style={tw("flex flex-col justify-center py-8")}>
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
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
