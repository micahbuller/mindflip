import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LogIn from "../../src/screens/LogIn";
import SignUp from "../../src/screens/SignUp";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
}