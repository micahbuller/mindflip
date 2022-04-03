import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
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

const DATA = [
  {
    id: 1,
    lie: "My friends don't like me to be around.",
    truth: "I am a fun person to be around and I have lots of friends that like me to be around.",
  },
  {
    id: 2,
    lie: "What is CBT 0.1",
    truth: "What is CBT 0.1",
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
  //const { params } = useRoute();
  //const { card } = params;
  const [truth, setTruth] = useState('');
  const [lie, setLie] = useState('');

  const RenderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        setTruth(item.truth)
        setLie(item.lie)
      }}
    >
      <View
        style={[
          tw(
            "flex-col border rounded-lg my-1 justify-between items-center px-5 py-4"
          ),
        ]}
      >
        <Text
          style={[tw("text-sm text-black line-through text-center"), { fontFamily: "Nanum-Gothic" }]}
        >
           {item.lie}
        </Text>
        <Text
          style={[tw("text-sm text-black text-center pt-1"), { fontFamily: "Nanum-Gothic" }]}
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
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={tw("flex")}
            keyboardVerticalOffset={10}
          >
            <View style={tw("flex-row items-center justify-start")}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <ArrowCircleLeftIcon style={[tw("text-black")]} />
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
