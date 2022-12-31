// @ts-nocheck
import { getUserFromId } from "../../connectors/ProfileServiceConnector";
import React, { useEffect, useContext, useState, useRef } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { getUser } from "../../resources/InternalStorage";
import ChatStart from "./chatStart";
import { styles } from "../../resources/Styles";
import { useNavigation } from "@react-navigation/native";
import GlobalChatArray from "../../resources/globals";
import { ChatContext, ChatDispatcherContext, ChatRoomContext, ChatRoomDispatcher, useChat, WebSocketContext } from "../../resources/page-context";
import { schedulePushNotification } from "../../resources/Notificator";
import { GetAllChatRoomsForUser } from "../../connectors/ChatServiceConnector";


const ChatsWrapper = (chats) => {

    const chat = useContext(ChatContext);
    const setChat = useContext(ChatDispatcherContext)
    const websocket = useContext(WebSocketContext)
    const setChatRooms = useContext(ChatRoomDispatcher)
    const chatRooms = useContext(ChatRoomContext)

    console.log(websocket)

    const firstUpdate = useRef(true)
    const navigation = useNavigation();
    const [chatIndex, setChatIndex] = React.useState(-1)
    const [isLoading, setLoading] = React.useState(true)
    const [userCache, setUserCache] = React.useState({})
    const [chatArrayCache, setChatArrayCache] = React.useState([])


    function onChatClick(data,userCache2, navigation){
        let position = chatArray.findIndex(c => c.chatID === data.chatID)
        if (position != -1){
            setChatIndex(position) 
            setChat(chatArray[position]);
            navigation.navigate('ChatDetail', {
                chat: chatArray[position],
                user: userCache2,
            });
        }else{
            position = chatRooms.findIndex(c => c.chatID === data.chatID)
            setChatIndex(-1)
            setChat(chatRooms[position])
            navigation.navigate('ChatDetail', {
                chat: chatRooms[position],
                user: userCache2,
            })
        }
        
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
        })
    }
    
    function appendChatMessageToChat(chatID, message, sendTo, From, chat){
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
            if(chat == null){
                return
            }
            chatArrayCache.push(chat)
            position = chatArrayCache.findIndex(c => c.chatID === chat.chatID)
        }
        chatArrayCache[position].messages.push(newMessage)
        setLoading(true)
        if(From == user.id){
            let newMessageString = JSON.stringify(newMessage)
            websocket.send(newMessageString)
        }else{
            schedulePushNotification(newMessage.message, chatArrayCache[position].chatPartner.username)
        }
        const testCopy = [...chatArrayCache]
        console.log(testCopy)
        setChat(testCopy[position])
        setChatArray(testCopy)
        setLoading(false)
    }

    function getChatRoomById(chatId){
        let chatRoomsCache2 = chatRooms
        let position = chatRoomsCache2.findIndex(c => c.chatID == chatId)
        if (position == -1){
            console.log("Chat room not found?!")
            return
        }
        let chatRoomsCache = [...chatRoomsCache2]
        chatRoomsCache.splice(position, 1)
        //setChatRooms(chatRoomsCache)
        return chatRooms[position]
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


    async function sortChatRooms(rooms){
        let roomArray = []
        rooms.forEach(room => {
            let position = chatArray.findIndex(c => c.chatID === room.chatId)
            if (position == -1){
                room.chatID = room.chatId
                delete room.chatId
                roomArray.push(room)
            }
        })
        console.log(roomArray)
        return roomArray
    }

    async function setUserNamesToEmptyChats(rooms){
        let promises = []
        rooms.forEach(room => {
            if (room.userID1 != user.id){
                const promise = getUserFromId(room.userID1)
                promises.push(promise)       
            }else{
                const promise = getUserFromId(room.userID2)
                promises.push(promise)
            }
        })
        Promise.all(promises).then((values) => {
            let counter = 0; 
            values.forEach(value => {
                rooms[counter].chatPartner = value
                rooms[counter].messages = []
                counter++;
            })
            setChatRooms(rooms)
            console.log(rooms)
            console.log(chatRooms)
            setLoading(false)
        })
    }
    
    // END CHAT FUNCTIONALITY
    
    useEffect(() => {
        let chatArrayRawCache = GetRawChatData()
        console.log("Component did update (maybe?)")
        setChatArrayCache(GetChatArray())
        if (chatArrayCache.length <= 0){
            getUser().then(user => {
                setUserCache(user)
                GetChatsArray(chatArrayRawCache);
                SetUsersToChats(user, setLoading).then(() => {
                    GetAllChatRoomsForUser().then(rooms => {
                        sortChatRooms(rooms).then((rooms) => {
                            setUserNamesToEmptyChats(rooms)
                        })
                    })
                })
                global.appendMessageToChat = appendChatMessageToChat
                
            })
        }else{
            setLoading(false);
        }
    }, [chat.messages.length, chatRooms]);

    while(isLoading) {
        return <Text>Loading...</Text>
    }

    return (
        <View style={styles.chatOverview}>
            <Text style={styles.chatMessagesTitle}>Matches</Text>
            {chatRooms.map((data => {
                return(
                    <TouchableOpacity style={{width: "100%"}} key={data.chatID} onPress={() => onChatClick(data,userCache, navigation)}>
                        <ChatStart chat={data}/>
                    </TouchableOpacity>
                )
            }))}
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