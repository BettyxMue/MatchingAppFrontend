import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {GetProfileById} from "../connectors/ProfileServiceConnector";
import {getToken} from "../resources/InternalStorage";
import {Entypo} from "@expo/vector-icons";
import {styles} from "../resources/Styles";
import {LinearGradient} from "expo-linear-gradient";

const MatchScreen = (params) => {

    const navigation = useNavigation();
    //const { userId, userSwipedId } = params;
    const userId = 2;
    const userSwipedId = 3;

    const [userData, setUserData] = React.useState("")
    const [userSwipedData, setSwipedData] = React.useState("")

    let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzI3NjIxMzUsInN1YiI6MiwidXNlciI6Mn0.TOoeocqIDd9yIz5mCu8JL81xQaPobuOP3jTB1Ek5tLvMHCS5nnv86WJOl_g-4Eu-1KzdB0wXyl4d8sGYG7akXFxbDlArB1BWk9w9f52XnaBjTKWF_gZvmzatqi83f3nJu803naIu1W-dzKTHIwo8LDKzNK62nSjRv9aNLH-F1P4"

    useEffect(() => {
        GetProfileById(userId, token).then(r => {
            setUserData(r)
            console.log(r)
        })
        GetProfileById(userSwipedData, token).then(r => {
            setSwipedData(r)
        })
    })

    return (
        <SafeAreaView style={{
            height: '100%',
            width: '100%',
            alignContent: "center"
        }}>
            <LinearGradient colors={['#3860ff', '#389bff']} style={styles.container}>
                <View>
                    <View style="height-full paddingTop-20">
                        <View style="justify-center px-10 paddingTop-20">
                            <Entypo name="heart" size={50} color="red"/>
                        </View>
                        <Text style="text-black text-center marginTop-5 text-lg">
                            Du und {userSwipedData.firstName} finden einander toll!
                        </Text>
                        <View style="flex-row justify-evenly marginTop-5">
                            <Image
                                style="height-32 width-32 rounded-full"
                                //source={{ uri: userData.pictures[0] }}
                            />
                            <Image
                                style="height: 32 width: 32 rounded: full"
                                //source={{ uri: userSwipedData.pictures[0] }}
                            />
                        </View>
                        <TouchableOpacity
                            style={{background: "white", margin: 5, pixel: 10, paddingTop: 8, paddingBottom: 8, rounded: full, marginTop: 20}}
                        >
                            <Text
                                onPress={() => {
                                    navigation.goBack();
                                    navigation.navigate("Chat", {
                                        userSwipedId
                                    });
                                }}
                                style="text-center"
                            >
                                Schicke doch gleich eine Nachricht!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default MatchScreen