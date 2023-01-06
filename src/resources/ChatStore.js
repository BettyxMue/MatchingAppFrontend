// @ts-nocheck

import { getUserFromId } from "../connectors/ProfileServiceConnector";
import React, { useContext } from "react"
import { GetAllChatsForUser } from "../connectors/ChatServiceConnector";
import './globals'
import PageContext from '../resources/page-context'

function GetChatsArray(chatData){
    let chatArrayCache = global.chatArray
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
    global.chatArray = chatArrayCache
}

async function SetUsersToChats(user, setLoading){
    let promises = []
    global.chatArray.forEach(chat => {
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
            global.chatArray[counter].chatPartner = value
            counter++;
        })
        setLoading(false)
    })
}

function appendChatMessageToChat(chatID, message, sendTo, From){
    let newMessage = {
        "writtenBy": From,
        "sendTo": sendTo,
        "read": false,
        "message": message,
        "createdAt": Date.now()
    }
    let position = global.chatArray.findIndex(c => c.chatID === chatID)
    if (position == -1){
        console.log("Chat nicht vorhanden, baue ein...")
        //TODO neuen Chat anlegen
    }else{
        global.chatArray[position].messages.push(newMessage)
    }
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
    return global.chatArray
}

export {GetChats, GetChatsArray, SetUsersToChats,GetChatArray, GetRawChatData, appendChatMessageToChat}