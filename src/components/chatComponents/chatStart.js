// @ts-nocheck
import React, { Component, useEffect } from 'react'
import { Image, Text, View } from "react-native"
import { styles } from '../../resources/Styles'

const ChatStart = (chat) => {
    useEffect(() => {

    }, [chat])

    function getLastMessage(messages){
        if(messages.length > 0){
            return messages[messages.length -1].message
        }else{
            return ""
        }
    }

    return (
        <View style={styles.chatOverviewElement}>
            <View style={{width: "20%"}}>
                <Image style={styles.chatPicture} source={{uri: "https://cdn-icons-png.flaticon.com/512/3106/3106921.png"}}/>
            </View>
            <View style={{width: "70%"}}>
                <View>
                    <Text style={styles.chatOverviewName}>{chat.chat.chatPartner.username}</Text>
                </View>
                <View>
                    <Text>{getLastMessage(chat.chat.messages)}</Text>
                </View>
            </View>
        </View>
    )
}

export default ChatStart

