import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from 'react';
import tw from 'tailwind-rn';

export default function App() {
const [color, setColor] = useState('bg-blue-200')

  return (
    <View style={tw(`flex-1 ${color} justify-center items-center`)}>
      <Text style={tw('text-black')}>Tailwind is working!</Text>
      <View>
      <TouchableOpacity 
        styl={tw('bg-black py-3 m-3')} 
        onPress={() => {
          if(color == "bg-red-200"){
            setColor("bg-blue-200")
          }else{
            setColor("bg-red-200")
          }
        }}>
        <Text>Press me.</Text>
      </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
