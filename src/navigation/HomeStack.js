import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "../../src/screens/Home";
import LearnMore from "../../src/screens/LearnMore";
import YourDeck from "../../src/screens/YourDeck";
import Menu from "../../src/screens/Menu";

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
          name="YourDeck"
          component={YourDeck}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
}