import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {GetProfileById} from "../connectors/ProfileServiceConnector";
import {getToken} from "../resources/InternalStorage";
import {Entypo} from "@expo/vector-icons";
import {styles} from "../resources/Styles";
import {LinearGradient} from "expo-linear-gradient";
import {useRoute} from "@react-navigation/core";

const MatchScreen = () => {

    const { params } = useRoute();
    const { navigation, userId, userSwipedId } = params

    const [userData, setUserData] = React.useState("")
    const [userSwipedData, setSwipedData] = React.useState("")

    let temp
    let temp2

    let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzI3NzM1NTcsInN1YiI6MiwidXNlciI6Mn0.kFcTJT-YRVCBmRbWdknOpYDIT8TC6Nx1OAY0TJo1oQn6ktNDIISKW2c5kkGHjFOVKbsI5H1KJs90NYujdOCtU_9Rg6QW-h-INGaw02LCXmvSMY-DkGAVSyyT56PSISvKZ6KJPTkVA31h12iYZQ9PhNy6DfyCKu6AEXcE3VRPqGk"

    useEffect(() => {

        GetProfileById(userId, token).then(r => {
            console.log(r)
            temp = {
                firstName: r.firstName,
                name: r.name
            }
            setUserData(temp)
        })
        GetProfileById(userSwipedData, token).then(r => {
            temp2 = {
                firstName: r.firstName,
                name: r.name
            }
            setSwipedData(temp2)
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
                    <View style={{
                        height: "100%",
                        paddingTop: 20
                    }}>
                        <View>
                            <Entypo name="heart" size={70} color="red"/>
                        </View>
                        <Text style={
                            {
                                marginTop: 5,
                                textAlign: "center",
                                fontSize: 20,
                                fontWeight: "bold"
                            }
                        }>
                            Du und {userSwipedData.firstName} finden einander toll!
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            width: "80%",
                            marginTop: 5
                        }}>
                            <Image
                                style={{
                                    resizeMode: "cover",
                                    height: "10%",
                                    width: "10%",
                                    borderRadius: 100,
                                    margin: 10
                                }}
                                source={require("./../../assets/defaultPicture.jpg")}
                            />
                            <Image
                                style={{
                                    resizeMode: "cover",
                                    height: "10%",
                                    width: "10%",
                                    borderRadius: 100,
                                    margin: 10
                                }}
                                source={require("./../../assets/defaultPicture.jpg")}
                            />
                        </View>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 12,
                            paddingHorizontal: 32,
                            borderRadius: 20,
                            elevation: 3,
                            backgroundColor: '#ffffff',
                            borderColor: '#ffffff',
                            marginTop: '5%',
                            borderWidth: 1
                        }}>
                            <Text
                                onPress={() => {
                                    navigation.goBack();
                                    navigation.navigate("Chat", {
                                        userSwipedId
                                    });
                                }}
                                style={{
                                    textAlign: "center",
                                    fontSize: 15,
                                    color: "black"
                                }}
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