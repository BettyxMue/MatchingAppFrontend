// @ts-nocheck
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Text, TouchableOpacity, View, Image } from "react-native";
import { styles } from "../../resources/Styles";
const ChatTopBar = (user) => {

    const navigation = useNavigation();

    const backButtonChar = "\u276e"
    const billChar = "€"

    function navigateBack(){
        navigation.goBack();
    }

    function navigateToOtherProfile(){
        navigation.navigate("OtherProfile", {
            otherUserId: user.user.id
        })
    }

    function navigateToBilling(){
        navigation.navigate("CreateBill", {
            user: user
        })
    }

    return (
        <View style={styles.ChatTopBar}>
            <View style={{width: "20%", alignContent: "center", justifyContent: "center", paddingLeft: "5%", marginTop: "10%"}}>
                <TouchableOpacity onPress={navigateBack}>
                    <Text style={styles.ChatTopBarBackChar}>{backButtonChar}</Text>
                </TouchableOpacity>
            </View>
            <View style={{width: "60%", alignContent: "center", justifyContent: "center", marginTop: "7%"}}>
                <View style={{marginLeft: "35%", marginTop: "5%", alignContent: "center"}}>
                    <View style={{marginLeft: "10%"}}>
                        <TouchableOpacity onPress={navigateToOtherProfile}>
                            <Image style={styles.chatTopBarPicture} source={{uri: "https://cdn-icons-png.flaticon.com/512/3106/3106921.png"}}/>
                        </TouchableOpacity>         
                    </View>
                    <View>
                        <Text style={styles.ChatTopBarText}>{user.user.username}</Text>
                    </View>
                </View>
            </View>
            <View style={{width: "20%", alignContent: "center", justifyContent: "center", marginTop: "10%"}}>
            <TouchableOpacity onPress={navigateToBilling}>
                    <Text style={styles.ChatTopBarBillChar}>{billChar}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatTopBar