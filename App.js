import { StatusBar } from 'expo-status-bar';
import { UserIcon } from 'react-native-heroicons/outline'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from 'react';
import tw from 'tailwind-rn';

export default function App() {
const [color, setColor] = useState('bg-gray-100')

  return (
  
    <SafeAreaView style={tw(`flex-1 ${color} justify-between items-center`)}>

      <View style={tw('flex-row items-center justify-between px-5')}>
        <UserIcon style={tw('text-black')}/>
        <UserIcon style={tw('text-black')}/>
      </View>
      

      <View style={tw('items-center justify-center')}>
        <TextInput
          style={tw('bg-purple-200 w-80 px-2 py-5 rounded-t-xl text-lg')}
          placeholder='False thought...'
          multiline
          numberOfLines={3}
        />
        <TextInput
          style={tw('bg-purple-100 w-80 px-2 py-5 rounded-b-xl text-lg')}
          placeholder='Tell yourself the truth...'
          multiline
          numberOfLines={3}
        />
      </View>
        
      
      <View>
        <TouchableOpacity 
          style={tw('bg-black py-3 m-3 rounded-md')} 
          onPress={() => {
            if(color == "bg-gray-100"){
              setColor("bg-purple-300")
            }else{
              setColor("bg-gray-100")
            }
          }}>
          <Text style={tw('text-white px-5')}>Press me.</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
