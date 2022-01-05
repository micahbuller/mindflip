import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-rn';

export default function App() {
  return (
    <View style={tw('flex-1 bg-blue-200 justify-center items-center')}>
      <Text style={tw('text-black')}>Tailwind is working!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
