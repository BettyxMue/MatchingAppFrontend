// @ts-nocheck
import { getUserFromId } from "../../connectors/ProfileServiceConnector";
import React, { useEffect, useContext, useState, useRef } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { getUser } from "../../resources/InternalStorage";
import ChatStart from "./chatStart";
import { styles } from "../../resources/Styles";
import { useNavigation } from "@react-navigation/native";
import GlobalChatArray from "../../resources/globals";
import { ChatContext, ChatDispatcherContext, useChat } from "../../resources/page-context";


const ChatsWrapper = (chats) => {

    const chat = useContext(ChatContext);
    const setChat = useContext(ChatDispatcherContext)

    const firstUpdate = useRef(true)
    const navigation = useNavigation();
    const [chatIndex, setChatIndex] = React.useState(-1)
    const [isLoading, setLoading] = React.useState(true)
    const [userCache, setUserCache] = React.useState({})
    const [chatArrayCache, setChatArrayCache] = React.useState([]);

    function onChatClick(data,userCache2, navigation){
        let position = chatArray.findIndex(c => c.chatID === data.chatID)
        setChatIndex(position) 
        setChat(chatArray[position]);
        navigation.navigate('ChatDetail', {
            chat: chatArray[position],
            user: userCache2,
        });
    }

    const [chatArray, setChatArray] = React.useState([]);

    function GetChatsArray(chatData){
        let chatArrayCache = chatArray
        chatData.forEach(chat => {
            let position = chatArrayCache.findIndex(c => c.chatID === chat.chatID)
            if (position === -1 ){
                let chatPartner = {}
                
                let newChat = {
                    "chatID": chat.chatID,
                    "chatPartner": chatPartner,
                    "messages": [
                        {
                            "writtenBy": chat.writtenBy,
                            "sendTo": chat.sendTo,
                            "read": chat.read,
                            "message": chat.message,
                            "createdAt": chat.createdAt
                        }
                    ]
                }
                
                chatArrayCache.push(newChat)
            }else{
                chatArray[position].messages.push({
                    "writtenBy": chat.writtenBy,
                    "sendTo": chat.sendTo,
                    "read": chat.read,
                    "message": chat.message,
                    "createdAt": chat.createdAt
                })
            }
        });
        setChatArray(chatArrayCache)
    }
    
    async function SetUsersToChats(user, setLoading){
        let promises = []
        chatArray.forEach(chat => {
            if (chat.messages[0].writtenBy != user.id){
                const promise = getUserFromId(chat.messages[0].writtenBy)
                promises.push(promise)       
            }else{
                const promise = getUserFromId(chat.messages[0].sendTo)
                promises.push(promise)
            }
        })
        Promise.all(promises).then((values) => {
            let counter = 0; 
            values.forEach(value => {
                chatArray[counter].chatPartner = value
                counter++;
            })
            setLoading(false)
        })
    }
    
    function appendChatMessageToChat(chatID, message, sendTo, From){
        let chatArrayCache = chatArray
        let newMessage = {
            "writtenBy": From,
            "sendTo": sendTo,
            "read": false,
            "message": message,
            "createdAt": Date.now()
        }
        let position = chatArrayCache.findIndex(c => c.chatID === chatID)
        if (position == -1){
            console.log("Chat nicht vorhanden, baue ein...")
        }else{
            console.log(newMessage)
            chatArrayCache[position].messages.push(newMessage)
        }
        setLoading(true)
        const testCopy = [...chatArrayCache]
        console.log(testCopy)
        setChat(testCopy[position])
        setChatArray(testCopy)
        setLoading(false)
    }
    
    async function GetChats(){
        let chatsServer = await GetAllChatsForUser();
        console.log("Received new Data in Chat Screen!")
        global.chatRawData = chatsServer
    }
    
    function GetRawChatData(){
        return global.chatRawData
    }
    
    function GetChatArray(){
        return chatArray
    }
    
    // END CHAT FUNCTIONALITY
    
    useEffect(() => {
        if(firstUpdate.current){
            firstUpdate.current = false
        }else{
            
        }

        let chatArrayRawCache = GetRawChatData()
        console.log("Component did update (maybe?)")
        setChatArrayCache(GetChatArray())
        if (chatArrayCache.length <= 0){
            getUser().then(user => {
                setUserCache(user)
                GetChatsArray(chatArrayRawCache);
                SetUsersToChats(user, setLoading);
                global.appendMessageToChat = appendChatMessageToChat
                
            })
        }else{
            setLoading(false);
        }
    }, [chat.messages.length]);

    while(isLoading) {
        return <Text>Loading...</Text>
    }

    return (
        <View style={styles.chatOverview}>
            <Text style={styles.chatMessagesTitle}>Nachrichten</Text>
            {chatArray.map((data => {
                return(
                    <TouchableOpacity style={{width: "100%"}} key={data.chatID} onPress={() => onChatClick(data,userCache, navigation)}>
                        <ChatStart chat={data}/>
                    </TouchableOpacity>
                )
            }))}       
        </View>
    )
}
export default ChatsWrapper