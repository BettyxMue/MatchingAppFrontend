// @ts-nocheck
import React, { useState, useContext } from "react";
import { schedulePushNotification } from "./Notificator"

const ChatContext = React.createContext({});
const ChatDispatcherContext = React.createContext(undefined)

const WebSocketContext = React.createContext({})
const WebSocketDispatcher = React.createContext({})

const ChatRoomContext = React.createContext([])
const ChatRoomDispatcher = React.createContext([])

const ChatArrayContext = React.createContext([])
const ChatArrayDispatcher = React.createContext([])

const ChatArrayProvicer = ({children}) => {
    const [chatArray, setChatArray] = useState([])
    const [chatArrayCache, setChatArrayCache] = React.useState([])
    const setChat = React.useState(ChatDispatcherContext)
    

    // Functions

    function appendChatMessageToChat(chatID, message, sendTo, From, chat, websocket){
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
        if(From == user.id){
            let newMessageString = JSON.stringify(newMessage)
            websocket.send(newMessageString)
        }else{
            schedulePushNotification(newMessage.message, chatArrayCache[position].chatPartner.username)
        }
        const testCopy = [...chatArrayCache]
        console.log(testCopy)
        //setChat(testCopy[position])
        setChatArray(testCopy)
    }

    return(
        <ChatArrayContext.Provider value={chatArray}>
            <ChatArrayDispatcher.Provider value={{
                setChatArray: setChatArray,
                appendChatMessageToChat: appendChatMessageToChat,
            }}>
                {children}
            </ChatArrayDispatcher.Provider>
        </ChatArrayContext.Provider>
    )
}

const ChatRoomProvicer = ({children}) => {
    const [chatRooms, setChatRooms] = useState([])
    return (
        <ChatRoomContext.Provider value={chatRooms}>
            <ChatRoomDispatcher.Provider value={setChatRooms}>
                {children}
            </ChatRoomDispatcher.Provider>
        </ChatRoomContext.Provider>
    )
}

const WebSocketProvider = ({children}) => {
    const [websocket, setWebsocket] = useState({})

    return(
        <WebSocketContext.Provider value={websocket}>
            <WebSocketDispatcher.Provider value={setWebsocket}>
                {children}
            </WebSocketDispatcher.Provider>

        </WebSocketContext.Provider>
    )
}

const ChatProvider = ({ children }) => {
    const [chat, setChat] = useState({
        "messages": []
    });

    function setChatPre(newData){
        const chatCopy = {...newData}
        console.log(chatCopy)
        setChat(chatCopy)
    }

    return(
        <ChatContext.Provider value={chat}>
            <ChatDispatcherContext.Provider value={setChatPre}>
                {children}
            </ChatDispatcherContext.Provider>
        </ChatContext.Provider>
    )
}


const useChat = () => {
    const {chat} = useContext(ChatContext)
    console.log("Please work!")
    /*if(chat.messages.length <= newArray.messages.length){
        setChat(newArray)
    }*/
}

export {ChatProvider, ChatDispatcherContext, ChatContext, useChat, WebSocketProvider, WebSocketContext, WebSocketDispatcher, ChatRoomContext, ChatRoomDispatcher, ChatRoomProvicer, ChatArrayContext, ChatArrayDispatcher, ChatArrayProvicer}