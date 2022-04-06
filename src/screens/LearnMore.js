import React, { useEffect } from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import tw from "tailwind-rn";
import { ImageBackground } from "react-native";
import { ArrowCircleLeftIcon } from "react-native-heroicons/solid";
import { Video, AVPlaybackStatus, Audio } from "expo-av";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "What is CBT 0.1",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "What is CBT 0.2",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Identifying Falsity",
  },
];

const LearnMore = ({ navigation }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  // Setting the Audio interrupt status to always
  useEffect(() => {
    const enableAudio = async () => {
      await video.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });
    };
    enableAudio();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log("pressed flatlist item");
      }}
    >
      <View
        style={[
          tw(
            "flex-row bg-white bg-opacity-50 rounded-lg my-2 justify-between items-center px-5 pt-5 pb-5 overflow-hidden"
          ),
        ]}
      >
        <Text style={[tw("text-xl text-black"), { fontFamily: "Mon-Cheri" }]}>
          {item.title}
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
      <SafeAreaView style={tw(`flex-1 mx-5`)}>
        <View style={tw("flex-row items-center justify-start pt-2")}>
          <TouchableOpacity
            style={tw("h-12 w-12 items-start justify-center")}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ArrowCircleLeftIcon style={[tw("text-black")]} />
          </TouchableOpacity>
        </View>

        <Text style={[tw("pt-5 text-xl"), { fontFamily: "Mon-Cheri" }]}>
          CBT EXPLAINER
        </Text>

        <View style={tw("mt-5")}>
          <Video
            //usePoster={true}
            posterStyle={{ width: 320, height: 180 }}
            posterSource={require("../assets/cbt-placeholder-small.jpg")}
            ref={video}
            style={{ alignSelf: "center", width: 320, height: 180 }}
            source={{
              uri: "https://res.cloudinary.com/mindflip/video/upload/v1649208609/CBT_Explination_Animation_gghumb.mp4",
            }}
            useNativeControls={true}
            resizeMode="contain"
            isLooping={false}
            playsInSilentModeIOS={true}
          />
        </View>

        <View style={tw("flex-1 py-5")}>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LearnMore;
