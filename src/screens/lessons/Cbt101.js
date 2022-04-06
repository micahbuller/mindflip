import React, { useEffect } from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  Button,
} from "react-native";
import tw from "tailwind-rn";
import { ImageBackground } from "react-native";
import { ArrowCircleLeftIcon } from "react-native-heroicons/solid";
import { Video, AVPlaybackStatus, Audio } from "expo-av";

const Cbt101 = ({ navigation }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  // Setting the Audio interrupt status to always
  useEffect(() => {
    const enableAudio = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });
    };
    enableAudio();
  }, []);

  
  return (
    <ImageBackground
      source={require("../../assets/Home.png")}
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
            usePoster={true}
            posterStyle={{ width: 400, height: 225 }}
            posterSource={require("../../assets/cbt-placeholder-small.jpg")}
            ref={video}
            style={{ alignSelf: "center", width: 400, height: 225 }}
            source={{
              uri: "https://res.cloudinary.com/mindflip/video/upload/v1649208609/CBT_Explination_Animation_gghumb.mp4",
            }}
            useNativeControls={false}
            resizeMode="cover"
            isLooping={false}
            //shouldPlay={true}
            onPlaybackStatusUpdate={status => setStatus(() => status)}
            //playsInSilentModeIOS={true}
          />
        </View>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />

        <View style={tw("flex-1 py-5")}>
          {/* Everything will go here as far as the lesson goes. */}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Cbt101;
