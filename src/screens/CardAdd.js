import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from "react-native";
import React, { useContext, useState } from "react";
import {
  CheckCircleIcon,
  ArrowCircleLeftIcon,
} from "react-native-heroicons/solid";
import tw from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { addCard } from "../services/cardHelper";

const DATA = [
  {
    id: 1,
    lie: "Some friends are going out to dinner this weekend and I wasn't invited. My friends don't like me. They think I am boring. I will end up having no friends.",
    truth:
      "My friends have told me several times that they think I am fun and that I make them laugh. Other friends have not been invited to other activities. I do get invited to most things.",
  },
  {
    id: 2,
    lie: "I made a suggestion at the weekly meeting and most people thought it wasn't a good idea. I have no good ideas. People think I am stupid. I am terrible at my work.",
    truth:
      "People at work think that I am capable and often have good ideas. I do my work well, but this wasn't one of my best ideas.",
  },
  {
    id: 3,
    lie: "What is CBT 0.1",
    truth: "What is CBT 0.1",
  },
];

const CardAdd = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const navigation = useNavigation();
  const [truth, setTruth] = useState("");
  const [lie, setLie] = useState("");

  function sendCard() {
    if (truth != "" && lie != "") {
      addCard(user.email, truth, lie);
      Alert.alert("Card added.");
      setLie("");
      setTruth("");
      navigation.goBack();
    } else {
      Alert.alert("You haven't entered anything yet. Try looking deeper.");
    }
  }

  const RenderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        setTruth(item.truth);
        setLie(item.lie);
      }}
    >
      <View
        key={item.id}
        style={[
          tw(
            "flex-col border rounded-lg my-1 justify-between items-center px-5 py-4"
          ),
        ]}
      >
        <Text
          style={[
            tw("text-sm text-black line-through text-center"),
            { fontFamily: "Nanum-Gothic" },
          ]}
        >
          {item.lie}
        </Text>
        <Text
          style={[
            tw("text-sm text-black text-center pt-2"),
            { fontFamily: "Nanum-Gothic" },
          ]}
        >
          {item.truth}
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
      <SafeAreaView style={tw("flex-1 mx-5")}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={tw("flex")}
            keyboardVerticalOffset={10}
          >
            <View style={tw("flex-row items-center justify-between")}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <ArrowCircleLeftIcon style={[tw("text-black")]} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  sendCard();
                }}
              >
                <CheckCircleIcon style={tw("text-black")} />
              </TouchableOpacity>
            </View>

            <Text style={[tw("pt-5 text-xl"), { fontFamily: "Mon-Cheri" }]}>
              LIE
            </Text>
            <View style={tw("flex-1 rounded-md  bg-white bg-opacity-50 my-2")}>
              <TextInput
                style={tw("h-32 pl-2 mr-2")}
                autoCapitalize="none"
                clearButtonMode="always"
                value={lie}
                onChangeText={(text) => setLie(text)}
                multiline
                maxLength={180}
              />
            </View>

            <Text style={[tw("pt-5 text-xl"), { fontFamily: "Mon-Cheri" }]}>
              TRUTH
            </Text>
            <View style={tw("flex-1 rounded-md  bg-white bg-opacity-50 my-2")}>
              <TextInput
                style={tw("h-32 pl-2 mr-2")}
                autoCapitalize="none"
                clearButtonMode="always"
                value={truth}
                onChangeText={(text) => setTruth(text)}
                multiline
                maxLength={180}

              />
            </View>
            <Text style={[tw("pt-5 text-sm"), { fontFamily: "Mon-Cheri" }]}>
              SUGGESTIONS
            </Text>
          </KeyboardAvoidingView>
          {DATA.map((item) => (
            <RenderItem item={item} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CardAdd;
