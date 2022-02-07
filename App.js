// In App.js in a new project

import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Routes from './src/navigation';

import Home from "./src/screens/Home";
import LearnMore from "./src/screens/LearnMore";
import YourDeck from "./src/screens/YourDeck";
import Menu from "./src/screens/Menu";
import LogIn from "./src/screens/LogIn";
import SignUp from "./src/screens/SignUp";


const Stack = createNativeStackNavigator();

function App() {

  return (
    <Routes/>
  );
}

export default App;
