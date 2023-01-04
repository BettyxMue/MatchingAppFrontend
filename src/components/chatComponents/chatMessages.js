// @ts-nocheck
import React, { useEffect, useRef } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import ChatBubble from "./ChatBubble";

const ChatMessages = (props) => {

    const chatArray = props.chatArray
    
    function sortChatMessages(chatArray){
        chatArray.messages.sort(function(a,b) {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
    };

    useEffect(() => {

    }, [props])

    sortChatMessages(chatArray)

    const scrollViewRef = useRef()


    return (
        <ScrollView bounces={true} style={{backgroundColor: "#f5f5f5"}}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
        >
            {chatArray.messages.map((data => {
                return (
                    <ChatBubble key={data.createdAt} data={data.message} createdAt={data.createdAt} userId={chatArray.chatPartner.id} writtenBy={data.writtenBy}/>
                )
            }))}
        </ScrollView>
    )
}

export default ChatMessages