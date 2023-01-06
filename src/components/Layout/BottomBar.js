import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";


const BottomBar = ({navigation}) => {
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "space-evenly",
            paddingBottom: "4%",
            paddingTop: "2%",
            backgroundColor: "#FFFFFF"
        }}>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{
                    alignContent: "center", alignItems: "center"
                }}>
                    <Ionicons name="home" size={30} color='#3860ff'/>
                    <Text>Home</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("Explore")} style={{
                    alignContent: "center", alignItems: "center"
                }}>
                    <Ionicons name="list" size={30} color='#3860ff' />
                    <Text>Stöbern</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={{
                    alignContent: "center", alignItems: "center"
                }}>
                    <Ionicons name="person" size={30} color='#3860ff'/>
                    <Text>Profil</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={{
                    alignContent: "center", alignItems: "center"
                }}>
                    <Ionicons name="chatbubbles" size={30} color='#3860ff'/>
                    <Text>Chat</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default BottomBar