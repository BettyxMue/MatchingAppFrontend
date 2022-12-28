// @ts-nocheck
import ChatTopBar from "../components/chatComponents/ChatTopBar"
import React from "react"
import { KeyboardAvoidingView, Text, View, ScrollView } from "react-native"
import ChatMessages from "../components/chatComponents/chatMessages"
import ChatWrite from "../components/chatComponents/ChatWrite"


const ChatDetail = ({navigation, route}) => {
    const {chatArray} = route.params
    return (
        <View style={{backgroundColor: "white", height: "100%", flex: 1}}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{height: "100%", minHeight: "100%", flex: 1}}>
                <ChatTopBar user={chatArray.chatPartner}/>
                <ChatMessages chatArray={chatArray}/>
                <ChatWrite />
            </KeyboardAvoidingView>
        </View>
        
    )

}

export default ChatDetail