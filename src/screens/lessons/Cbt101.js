import React, { useRef } from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Button,
  StatusBar,
  Image,
  StyleSheet,
  ImageBackground,
  Animated,
  useWindowDimensions
} from "react-native";
import tw from "tailwind-rn";
import {
  ArrowCircleLeftIcon,
  ArrowSmDownIcon,
  PlayIcon,
} from "react-native-heroicons/solid";

//Testing take out later
const images = new Array(6).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');

const Cbt101 = ({ navigation }) => {
  //Testing take out later
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  return (
    <ImageBackground
      source={require("../../assets/Home.png")}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <SafeAreaView
        style={[
          tw(`flex-1 mx-5`),
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
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
          <TouchableOpacity
            style={tw(
              "h-64 w-full items-center justify-center bg-white rounded-md overflow-hidden"
            )}
          >
            <Image
              style={tw("absolute inset-0 h-full w-full")}
              source={require("../../assets/temp-bg-first-lesson.jpg")}
            />
            <PlayIcon style={tw("h-24 w-24 text-white")} />
          </TouchableOpacity>
          <Text
            style={[
              tw("py-5 text-xl uppercase max-w-xs"),
              { fontFamily: "Mon-Cheri" },
            ]}
          >
            A brief introduction to cognitive behavioral therapy.
          </Text>
          <Text
            style={[
              tw("py-5 text-sm text-right uppercase pl-12 text-gray-800"),
              { fontFamily: "Nanum-Gothic" },
            ]}
          >
            Whether you are dealing with problems of avoidance, addiction,
            self-limiting thinking, generalized anxiety, or a whole array of
            cognitive issues, cognitive behavioral therapy can help.
          </Text>
          <Text
            style={[
              tw("py-5 text-sm text-left uppercase pr-12 text-gray-800"),
              { fontFamily: "Nanum-Gothic" },
            ]}
          >
            Cognitive behavioral therapy (CBT for short) is a long term solution
            for many problems. It gives you the tool that you need to be able to
            effectively handle the situations that life may throw your way.
          </Text>
          <Text
            style={[
              tw("py-5 text-lg text-center uppercase text-gray-800"),
              { fontFamily: "Nanum-Gothic" },
            ]}
          >
            The general struture for cbt is:
          </Text>
          <View style={tw("h-12 w-full bg-white rounded-full overflow-hidden")}>
            <Text
              style={[
                tw(
                  "pt-2 items-center text-lg text-center uppercase text-gray-800"
                ),
                { fontFamily: "Nanum-Gothic" },
              ]}
            >
              Situation
            </Text>
          </View>
          <View style={tw("flex flex-col items-center py-2")}>
            <ArrowSmDownIcon style={[tw("text-gray-800")]} />
          </View>
          <View style={tw("h-12 w-full bg-white rounded-full overflow-hidden")}>
            <Text
              style={[
                tw(
                  "pt-2 items-center text-lg text-center uppercase text-gray-800"
                ),
                { fontFamily: "Nanum-Gothic" },
              ]}
            >
              Automatic Thought
            </Text>
          </View>
          <View style={tw("flex flex-col items-center py-2")}>
            <ArrowSmDownIcon style={[tw("text-gray-800")]} />
          </View>
          <View style={tw("h-12 w-full bg-white rounded-full overflow-hidden")}>
            <Text
              style={[
                tw(
                  "pt-2 items-center text-lg text-center uppercase text-gray-800"
                ),
                { fontFamily: "Nanum-Gothic" },
              ]}
            >
              Reaction
            </Text>
          </View>
          <Text
            style={[
              tw("pt-12 text-sm text-right uppercase pl-12 text-gray-800"),
              { fontFamily: "Nanum-Gothic" },
            ]}
          >
            Example:
          </Text>
          <Text
            style={[
              tw("py-5 text-sm text-right uppercase pl-12 text-gray-800"),
              { fontFamily: "Nanum-Gothic" },
            ]}
          >
            (Situation) You see someone you know while walking down the street
            and they don’t say hi back to you.
          </Text>
          <Text
            style={[
              tw("py-5 text-sm text-right uppercase pl-12 text-gray-800"),
              { fontFamily: "Nanum-Gothic" },
            ]}
          >
            (Automatic Thoughts) Your instinctive way of thinking takes over and
            you may tell yourself “They must not like me because they ignored
            me”.
          </Text>
          <Text
            style={[
              tw("py-5 text-sm text-right uppercase pl-12 text-gray-800"),
              { fontFamily: "Nanum-Gothic" },
            ]}
          >
            (Reaction) You may end up avoiding that person in the future and
            losing contact with them totally.
          </Text>
          <Text
            style={[
              tw("py-5 text-sm text-left uppercase pr-12 text-gray-800"),
              { fontFamily: "Nanum-Gothic" },
            ]}
          >
            If we have more grounded and healthy automatic thoughts, we probably
            would have said “They probably didn’t even see me or hear me” and
            thought nothing more of it.
          </Text>
          {/* Testing Take out later */}
          <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ])}
          scrollEventThrottle={1}
        >
          {images.map((image, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth, height: 250 }}
                key={imageIndex}
              >
                <ImageBackground source={{ uri: image }} style={styles.card}>
                  <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {"Image - " + imageIndex}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1)
              ],
              outputRange: [8, 16, 8],
              extrapolate: "clamp"
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { width }]}
              />
            );
          })}
        </View>
      </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Cbt101;
