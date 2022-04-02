import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../src/screens/Home";
import LearnMore from "../../src/screens/LearnMore";
import Menu from "../../src/screens/Menu";
import CardEditor from "../screens/CardEditor";
import Account from "../screens/Account";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LearnMore"
        component={LearnMore}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardEditor"
        component={CardEditor}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
