// @ts-nocheck
import React, { useRef } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import ChatBubble from "./ChatBubble";

const ChatMessages = (chatArray) => {
    
    const padding = 0

    function sortChatMessages(chatArray){
        chatArray.chatArray.messages.sort(function(a,b) {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
    };

    

    sortChatMessages(chatArray)
    let calcPadding = function() {
        return {
            paddingBottom: chatArray.chatArray.messages.length * 35
        }
    }

    const scrollViewRef = useRef()


    return (
        <ScrollView bounces={true} style={{backgroundColor: "#f5f5f5"}}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
        >
            {chatArray.chatArray.messages.map((data => {
                return (
                    <ChatBubble key={data.createdAt} data={data.message} userId={chatArray.chatArray.chatPartner.id} writtenBy={data.writtenBy}/>
                )
            }))}
        </ScrollView>
    )
}

export default ChatMessages