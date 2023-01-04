import React, {useEffect,} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {getUserFromId} from "../connectors/ProfileServiceConnector";
import {Entypo} from "@expo/vector-icons";
import {styles} from "../resources/Styles";
import {LinearGradient} from "expo-linear-gradient";

const MatchScreen = ({navigation, route}) => {

    const { userId, userSwipedId } = route.params

    const [userData, setUserData] = React.useState("")
    const [userSwipedData, setSwipedData] = React.useState("")

    let temp
    let temp2

    useEffect(() => {

        getUserFromId(userId).then(r => {
            console.log(r)
            temp = {
                firstName: r.firstName,
                name: r.name,
                pic: r.profilePictures
            }
            setUserData(temp)
        })
        getUserFromId(userSwipedData).then(r => {
            temp2 = {
                firstName: r.firstName,
                name: r.name,
                pic: r.profilePictures
            }
            setSwipedData(temp2)
        })
    })

    const GetImageSource = (source) => {
        return `data:image/jpeg;base64,${source}`
    }

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
                            Du und {userSwipedData.firstName} können einander etwas beibringen!
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
                                //source={{uri: GetImageSource(userData.pic)}}
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
                                //source={{uri: GetImageSource(userSwipedData.pic)}}
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