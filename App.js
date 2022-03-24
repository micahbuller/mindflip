// In App.js in a new project

import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Routes from './src/navigation';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <Routes/>
  );
}

export default App;
