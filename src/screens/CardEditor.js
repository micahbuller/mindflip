import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  CheckCircleIcon,
  ArrowCircleLeftIcon,
  TrashIcon,
} from "react-native-heroicons/solid";
import tw from "tailwind-rn";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateCard, deleteCard } from "../services/cardHelper";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

const CardEditor = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const navigation = useNavigation();
  const { params } = useRoute();
  const { card } = params;
  const [truth, setTruth] = useState(card.truth);
  const [lie, setLie] = useState(card.lie);

  return (
    <ImageBackground
      source={require("../assets/Home.png")}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw("flex-1")}
        keyboardVerticalOffset={10}
      >
        <SafeAreaView style={tw("flex-1 mx-5")}>
          <View style={tw("flex-row items-center justify-between")}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ArrowCircleLeftIcon style={[tw("text-black")]} />
            </TouchableOpacity>
            <View style={tw("flex-row")}>
              <TouchableOpacity
                onPress={() => {
                  updateCard(user.email, card, truth, lie);
                }}
              >
                <CheckCircleIcon style={tw("text-black mr-5")} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteCard(user.email, card, truth, lie);
                  navigation.goBack();
                }}
              >
                <TrashIcon style={tw("text-black")} />
              </TouchableOpacity>
            </View>
          </View>
          
          <Text style={[tw("pt-5 text-xl"), { fontFamily: "Mon-Cheri" }]}>
            LIE
          </Text>
          <View style={tw("flex-1 rounded-md  bg-white bg-opacity-50 my-2")}>
            <TextInput
              style={tw("flex-1 pl-2 mr-2")}
              autoCapitalize="none"
              clearButtonMode="always"
              value={lie}
              onChangeText={(text) => setLie(text)}
              multiline
            />
          </View>

          <Text style={[tw("pt-5 text-xl"), { fontFamily: "Mon-Cheri" }]}>
            TRUTH
          </Text>
          <View style={tw("flex-1 rounded-md  bg-white bg-opacity-50 my-2")}>
            <TextInput
              style={tw("flex-1 pl-2 mr-2")}
              autoCapitalize="none"
              clearButtonMode="always"
              value={truth}
              onChangeText={(text) => setTruth(text)}
              multiline
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default CardEditor;
