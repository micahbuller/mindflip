import React from 'react'
import Swiper from 'react-native-deck-swiper';
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
    View,
    Image,
  } from "react-native";
  import tw from 'tailwind-rn';
  import { ImageBackground } from "react-native";

const YourDeck = ({navigation}) => {
    return (
        <ImageBackground source={require('../assets/Home.png')} resizeMode="cover" style={{flex: 1, justifyContent: "center"}}>
            <SafeAreaView style={tw(`flex-1`)}>

                <View style={tw('flex-row items-center justify-start px-5')}>
                    <TouchableOpacity onPress={() => {navigation.navigate('Home')}}>
                        <Text style={tw('text-2xl text-black')}>back</Text>
                    </TouchableOpacity>
                </View>

                <View style={tw('flex-1')}>
                    <Swiper
                        cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
                        renderCard={(card) => {
                            return (
                                <View
                                    style={
                                    tw(
                                        "relative bg-white h-3/4 rounded-xl justify-center items-center"
                                    )}
                                
                                >
                                    <Text style={tw("font-bold pb-5")}>{card}</Text>
                                    <Image
                                    style={tw("h-20 w-full")}
                                    height={100}
                                    width={100}
                                    source={{ uri: "https://links.papareact.com/6gb" }}
                                    />
                                </View>
                            )
                        }}
                        onSwiped={(cardIndex) => {console.log(cardIndex)}}
                        onSwipedAll={() => {console.log('onSwipedAll')}}
                        cardIndex={0}
                        backgroundColor={'rgba(52, 52, 52, 0)'}
                        stackSize= {3}>
                    </Swiper>
                </View>
                
            </SafeAreaView>
        </ImageBackground>
    )
}

export default YourDeck
