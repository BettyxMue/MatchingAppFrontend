// @ts-nocheck
import ChatTopBar from "../components/chatComponents/ChatTopBar"
import React, { useContext, useEffect } from "react"
import { KeyboardAvoidingView, Text, View, ScrollView } from "react-native"
import ChatMessages from "../components/chatComponents/chatMessages"
import ChatWrite from "../components/chatComponents/ChatWrite"
import { ChatContext } from "../resources/page-context"


const ChatDetail = ({navigation, route}) => { 
    const { user } = route.params
    console.log(route.params)
    const chat = useContext(ChatContext);

    const [chatCache, setChatCache] = React.useState({})

    useEffect(() => {
        console.log("Chat Detail ist erreicht!")
        console.log(chat)
        //setChatCache({})
        //setChatCache(chat)

    }, [chat.messages])

    console.log(chat); 

    return (
        <View style={{backgroundColor: "white", height: "100%", flex: 1}}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{height: "100%", minHeight: "100%", flex: 1}}>
                <ChatTopBar user={chat.chatPartner}/>
                <ChatMessages chatArray={chat}/>
                <ChatWrite chatArray={chat} currentUser={user} />
            </KeyboardAvoidingView>
        </View>
        
    )

}

export default ChatDetail