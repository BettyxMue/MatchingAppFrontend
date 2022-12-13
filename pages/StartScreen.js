import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
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
            style={tw("flex-1")}>
            {/*source={{ uri: "" }}*/}
              <TouchableOpacity
                style={[
                  tw("absolute bottom-40 w-52 bg-white p-2 rounded-2xl"),
                  { marginHorizontal: "25%" },
                ]}
              >
                <Text
                  style={tw("font-semibold text-center")}
                  onPress={navigation.navigate('LogIn')}>
                  Log In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw("absolute bottom-20 w-52 bg-white p-2 rounded-2xl"),
                  { marginHorizontal: "25%" },
                ]}
              >
                <Text
                  style={tw("font-semibold text-center")}
                  onPress={navigation.navigate('SignUp')}>
                  Sign Up
                </Text>
              </TouchableOpacity>
        </ImageBackground>
      </View>
    )
}