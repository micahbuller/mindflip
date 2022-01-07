import { StatusBar } from 'expo-status-bar';
import { UserIcon, MenuIcon, CheckIcon, InformationCircleIcon } from 'react-native-heroicons/outline'
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

const items = [
  {
    id:0,
    truth:"I am not enough for my girlfriend.",
    lie:"She loves me and it is okay to ask her to tell me."
  },
  {
    id:1,
    truth:"There is nothing good for me.",
    lie:"There are lots of things in this world that are up for grabs and I can get them."
  },
  {
    id:2,
    truth:"We are going down hill.",
    lie:"We are going uphill, and uphill is hard, but the view is worth it."
  },
  {
    id:3,
    truth:"We are going down hill.",
    lie:"We are going uphill, and uphill is hard, but the view is worth it."
  },
  {
    id:4,
    truth:"We are going down hill.",
    lie:"We are going uphill, and uphill is hard, but the view is worth it."
  }
]
  
export default function App() {
  const [color, setColor] = useState('bg-gray-100')

  const renderItem = ({ item }) => {

    return(
      <View>
        <View style={tw('flex-1')}>
        <View style={tw('items-center justify-center')}>
          <View style={tw('flex-row justify-between items-center bg-gray-100 w-96 px-2 py-5 rounded-t-xl text-lg')}>
            <Text style={tw('text-lg')}>{item.truth}</Text>
          </View>
          <View style={tw('relative flex-row justify-between items-center bg-purple-200 w-96 px-2 py-5 rounded-b-xl text-lg')}>
            <Text style={tw('text-lg')}>{item.lie}</Text>
            <TouchableOpacity style={tw('absolute right-2 bottom-2')}>
              <InformationCircleIcon style={tw('w-24 h-24 text-purple-400')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
    );
  }

  return (
  
    <SafeAreaView style={tw(`flex-1 bg-purple-100`)}>

      <View style={tw('flex-row items-center justify-between px-5')}>
        <TouchableOpacity onPress={() => {console.log("Pressed")}}>
          <MenuIcon style={tw('text-black')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {console.log("Pressed")}}>
          <UserIcon style={tw('text-black')}/>
        </TouchableOpacity>
      </View>
      
      <View style={tw('my-10')}>
        <View style={tw('items-center justify-center')}>
          <View style={tw('flex-row justify-between items-center bg-gray-100 w-96 px-2 py-5 rounded-t-xl text-lg')}>
            <TextInput
              style={tw('text-lg')}
              placeholder='What have you been telling yourself?'
              multiline
              numberOfLines={3}
            />
          </View>
          <View style={tw('flex-row justify-between items-center bg-purple-200 w-96 px-2 py-5 rounded-b-xl text-lg')}>
            <TextInput
              style={tw('text-lg')}
              placeholder='Tell yourself the truth...'
              multiline
              numberOfLines={3}
            />
            <TouchableOpacity>
              <CheckIcon style={tw('w-24 h-24 text-purple-400')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
