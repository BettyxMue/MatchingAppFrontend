import { ImageBackground, Text, View } from 'react-native'
import React, { Component, useLayoutEffect } from 'react'
import tw from "tailwind-rn";
import { useNavigation } from '@react-navigation/native';

export default function StartScreen () {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    })
    
    return (
      <View>
        <ImageBackground
            resizeMode="cover"
            style={tw("flex-1")}
            source={{ uri: "" }}>

        </ImageBackground>
      </View>
    )
}