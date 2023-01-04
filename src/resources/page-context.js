// @ts-nocheck
import React, { useState, useContext } from "react";

const ChatContext = React.createContext({});
const ChatDispatcherContext = React.createContext(undefined)

const WebSocketContext = React.createContext({})
const WebSocketDispatcher = React.createContext({})

const ChatRoomContext = React.createContext([])
const ChatRoomDispatcher = React.createContext([])

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

export {ChatProvider, ChatDispatcherContext, ChatContext, useChat, WebSocketProvider, WebSocketContext, WebSocketDispatcher, ChatRoomContext, ChatRoomDispatcher, ChatRoomProvicer}