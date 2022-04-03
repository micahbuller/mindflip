import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React from "react";
import { sendPasswordResetEmail, getAuth, deleteUser } from "firebase/auth";
// import { deleteDbUser } from "../services/cardHelper";
import { ArrowCircleLeftIcon } from "react-native-heroicons/solid";
import tw from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
const auth = getAuth();

const Account = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;

  function sendPassReset() {
    sendPasswordResetEmail(auth, user.email)
      .then(Alert.alert("Go ahead and check your email!"))
      .catch((error) => {
        Alert.alert(error);
      });
  }

//   const deleteCurrentUser = () => {
//     Alert.alert("Delete Account", "Hope you enjoyed the app!", [
//       {
//         text: "Don't delete!",
//       },
//       {
//         text: "Delete",
//         onPress: () => {
//             console.log(user)
//         //   deleteDbUser();
//           deleteUser(user)
//             .then(() => {
//               navigation.navigate("Login");
//               Alert.alert("You have been deleted!");
//             })
//             .catch((error) => Alert.alert(error));
//         },
//         style: "cancel",
//       },
//     ]);
//   };

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
          <View style={tw("flex-row items-center justify-start pt-2")}>
            <TouchableOpacity
            style={tw(
              "h-12 w-12 items-start justify-center"
            )}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ArrowCircleLeftIcon style={[tw("text-black")]} />
            </TouchableOpacity>
          </View>

          <Text
            style={[
              tw("pt-5 text-xl text-center my-5"),
              { fontFamily: "Mon-Cheri" },
            ]}
          >
            ACCOUNT
          </Text>

          <Text
            style={[
              tw("pt-5 text-sm text-center"),
              { fontFamily: "Nanum-Gothic" },
            ]}
          >
            your email
          </Text>
          <Text
            style={[
              tw("pt-2 text-lg text-center"),
              { fontFamily: "Mon-Cheri" },
            ]}
          >
            {user.email}
          </Text>

          <View style={tw("w-full h-1 mb-5 mt-10 bg-gray-800 bg-opacity-10")} />

          <TouchableOpacity
            style={tw("w-full")}
            onPress={() => sendPassReset()}
          >
            <View
              style={tw(
                "bg-gray-800 flex-row w-full items-center justify-center bg-opacity-25 px-2 py-5 my-5 rounded-full text-lg"
              )}
            >
              <Text
                style={[
                  tw("text-lg text-white"),
                  { fontFamily: "Nanum-Gothic" },
                ]}
              >
                send password reset
              </Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={tw("w-full")}
            onPress={() => deleteCurrentUser()}
          >
            <View
              style={tw(
                "bg-gray-800 flex-row w-full items-center justify-center bg-opacity-25 px-2 py-5 rounded-full text-lg"
              )}
            >
              <Text
                style={[
                  tw("text-lg text-yellow-200"),
                  { fontFamily: "Nanum-Gothic" },
                ]}
              >
                delete account
              </Text>
            </View>
          </TouchableOpacity> */}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Account;
