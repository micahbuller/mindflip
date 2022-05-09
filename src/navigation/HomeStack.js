import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../src/screens/Home";
import Menu from "../../src/screens/Menu";
import Account from "../screens/Account";
import CardAdd from "../screens/CardAdd";

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
        name="CardAdd"
        component={CardAdd}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
}
