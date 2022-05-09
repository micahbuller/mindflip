import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  CheckCircleIcon,
  ArrowCircleLeftIcon,
} from "react-native-heroicons/solid";
import tw from "../../lib/tailwind";
import { useNavigation } from "@react-navigation/native";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { addCard } from "../services/cardHelper";

const DATA = [
  {
    id: 1,
    lie: "When you fail, you may tell yourself that you’re a complete failure.",
    truth: "This is All-Or-Nothing thinking. You are not always a failure.",
  },
  {
    id: 2,
    lie: "When you’re rejected by someone you care about, you may tell yourself that you’re an unlovable loser.",
    truth:
      "This is an Overgeneralization. You were rejected by only one person, there is a whole world out there.",
  },
  {
    id: 3,
    lie: "You are loved by lots of people. When one person doesn't like you, you obsess over it for hours. It can often ruid the rest of your day.",
    truth:
      "This is a Mental Filter. You are loved by lots of people, don't focus on the one out of a hundred.",
  },
  {
    id: 4,
    lie: "You were complimented by someone the other day. You told your self that they told you that only to make you feel good.",
    truth:
      "This is a Mental Filter. You are loved by lots of people, don't focus on the one out of a hundred.",
  },
  {
    id: 5,
    lie: "You’re feeling shy at a party, you may tell yourself that other people don’t have to struggle with shyness.",
    truth:
      "You are jumping to conclusions. You will have no idea what others are thinking and going through without asking.",
  },
  {
    id: 6,
    lie: "When you are procrastinating, you may also tell yourself that your efforts today wouldn’t amount to anything anyway, so you might as well put it off.",
    truth:
      "This is Minimizing. Every little bit of effort counts towards your end goal. You never know how it will turn out until you start.",
  },
  {
    id: 7,
    lie: "You meet someone attractive and there is a romantic intoxication that leads you to believe that person is the person of your dreams.",
    truth:
      "This is Emotional Reasoning. You are feeling this way in the moment. This person may be a nasty individual and you don't know who they really are.",
  },
  {
    id: 8,
    lie: "You may tell yourself that your values are the best values and that other people should think and feel the same way.",
    truth:
      "This is a Should-Statement. You make yourself (or others) miserable with “should's,” “must's” or ”ought to’s.",
  },
  {
    id: 9,
    lie: "You may label yourself or someone you’re not getting along with as “a loser” or “a jerk.”",
    truth:
      "This is Labeling, and is as extreme form of overgeneralization. You or that other person are not entirely defined by that label.",
  },
  {
    id: 10,
    lie: "You may beat up on yourself constantly, blaming yourself for every error and shortcoming.",
    truth:
      "This is Blaming. Instead of blaming yourself and stopping there, use your energy to find creative solutions to your problems.",
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
          tw
            `flex-col border rounded-lg my-1 justify-between items-center px-5 py-4`
          ,
        ]}
      >
        <Text
          style={[
            tw`text-sm text-black line-through text-center`,
            { fontFamily: "Nanum-Gothic" },
          ]}
        >
          {item.lie}
        </Text>
        <Text
          style={[
            tw`text-sm text-black text-center pt-2`,
            { fontFamily: "Nanum-Gothic" },
          ]}
        >
          {item.truth}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (

      <SafeAreaView
        style={[
          tw`flex-1 mx-5`,
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={tw`flex`}
            keyboardVerticalOffset={10}
          >
            <View style={tw`flex-row items-center justify-between`}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <ArrowCircleLeftIcon style={[tw`text-black`]} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  sendCard();
                }}
              >
                <CheckCircleIcon style={tw`text-black`} />
              </TouchableOpacity>
            </View>

            <Text style={[tw`pt-5 text-xl`, { fontFamily: "Mon-Cheri" }]}>
              LIE
            </Text>
            <View style={tw`flex-1 rounded-md  bg-white bg-opacity-50 my-2`}>
              <TextInput
                style={tw`h-32 pl-2 mr-2`}
                autoCapitalize="none"
                clearButtonMode="always"
                value={lie}
                onChangeText={(text) => setLie(text)}
                multiline
                maxLength={180}
              />
              <Text
                style={[tw`absolute bottom-2 right-2 text-xs opacity-50`, { fontFamily: "Nanum-Gothic" }]}
              >
                Limit 180.
              </Text>
            </View>

            <Text style={[tw`pt-5 text-xl`, { fontFamily: "Mon-Cheri" }]}>
              TRUTH
            </Text>
            <View style={tw`flex-1 rounded-md  bg-white bg-opacity-50 my-2`}>
              <TextInput
                style={tw`h-32 pl-2 mr-2`}
                autoCapitalize="none"
                clearButtonMode="always"
                value={truth}
                onChangeText={(text) => setTruth(text)}
                multiline
                maxLength={180}
              />
              <Text
                style={[tw`absolute bottom-2 right-2 text-xs opacity-50`, { fontFamily: "Nanum-Gothic" }]}
              >
                Limit 180.
              </Text>
            </View>
            <Text style={[tw`pt-5 text-sm`, { fontFamily: "Mon-Cheri" }]}>
              SUGGESTIONS
            </Text>
          </KeyboardAvoidingView>
          {DATA.map((item) => (
            <RenderItem key={item.id} item={item} />
          ))}
        </ScrollView>
      </SafeAreaView>
  );
};

export default CardAdd;
