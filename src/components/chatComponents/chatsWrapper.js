// @ts-nocheck
import { getUserFromId } from "../../connectors/ProfileServiceConnector";
import React, { useEffect } from "react"
import { View, Text } from "react-native"
import { getUser } from "../../resources/InternalStorage";
import ChatStart from "./chatStart";
import { styles } from "../../resources/Styles";

async function getChatsArray(chatData, chatArray, setChatArray){
    let chatArrayCache = chatArray
    chatData.chats.forEach(chat => {
        position = chatArrayCache.findIndex(c => c.chatID === chat.chatID)
        if (position === -1 ){
            let chatPartner = {}
            
            newChat = {
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
    setChatArray(chatArrayCache);
    console.log("Neues Chats Array:")
    console.log(chatArray);
}

async function setUsersToChats(chatArray, user, setLoading){
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

const ChatsWrapper = (chats) => {
    const [chatArray, setChatArray] = React.useState([])
    const [isLoading, setLoading] = React.useState(true)
    useEffect(() => {
        if(chatArray.length <= 0){
            let user = getUser().then(user => {
                getChatsArray(chats,chatArray,setChatArray)
                setUsersToChats(chatArray, user, setLoading)
            })
            
        }
    },[])

    while(isLoading) {
        return <Text>Loading...</Text>
    }

    return (
        <View style={styles.chatOverview}>
            <Text style={styles.chatMessagesTitle}>Nachrichten</Text>
            {chatArray.map((data => {
                return(
                    <ChatStart key={data.chatID} chat={data}/>
                )
            }))}       
        </View>
    )
}
export default ChatsWrapper