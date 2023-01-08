// @ts-nocheck
import React from "react"
import { getToken, getUser } from "../resources/InternalStorage"
import '../resources/globals'
import { useContext } from "react"
import { ChatContext, ChatRoomContext } from "../resources/page-context"

const ip4v = "192.168.0.98"

// @ts-nocheck
function OpenWSConnection(){
    let websocket = new WebSocket("ws://" + ip4v + ":8081/sendMessage")
    websocket.onopen = () => {
        let openMessage = {
            "writtenBy": 1
        }
        let messageString = JSON.stringify(openMessage)
        websocket.send(messageString)
        return websocket
    }
    websocket.onerror = (e) => {
        console.log("WS is closed due to an error!")
        console.log(e)
        websocket.close()
    }
    websocket.onclose = () => {
        console.log("Websocket is closed from the server!")
    }
    websocket.onmessage = (e) => {
        if (e != null) {
            try {
                let message = JSON.parse(e.data)
                global.appendMessageToChat(message.chatID, message.message, message.sendTo, message.writtenBy, websocket)
                console.log(message)
            } catch (err){
                console.log(err)
            }
        }
        
    }
    return websocket
}

async function GetAllChatRoomsForUser(){
    let user = await getUser()
    if (user == null){
        console.log("No user found!")
        return
    }
    let token = await getToken();

    if(token == null){
        console.log("No token found!")
        return
    }
    let query = "http://" + ip4v + ":8081/Rooms"
    const response = await fetch(query, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': token,
            'user': user.id
        }
    })
    const responseData = await response.json()

    if (response.status != 200){
        console.log("Error: " + response.statusText)
        return response.statusText
    }
    return responseData
}

async function GetAllChatsForUser(){
    let user = await getUser()
    if (user == null){
        console.log("No user found!")
        return
    }
    let token = await getToken();

    if(token == null){
        console.log("No token found!")
        return
    }
    const query = "http://" + ip4v + ":8081/getAllMessagesForUser"
    const response = await fetch(query, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': token,
            'User': user.id
        }
    })

    const responseData = await response.json()

    if (response.status != 200){
        console.log("Error: " + response.statusText)
        return response.statusText
    }
    return responseData
}

async function getChatsWithToken(user,token){
    if(token == null){
        console.log("No token found!")
        return
    }
    const query = "http://" + ip4v + ":8081/getAllMessagesForUser"
    const response = await fetch(query, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': token,
            'User': user.id
        }
    })

    const responseData = await response.json()

    if (response.status != 200){
        console.log("Error: " + response.statusText)
        return response.statusText
    }
    return responseData
}

async function createChat(matchedId){
    let user = await getUser()
    if (user == null){
        console.log("No user found!")
        return
    }
    let token = await getToken();

    if(token == null){
        console.log("No token found!")
        return
    }

    const query = "http://" + ip4v + ":8081/createChatRoom"
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': token,
            'user1': user.id,
            'user2': matchedId
        }
    })

    const responseData = await response.json()

    if (response.status != 200){
        console.log("Error: " + response.statusText)
        return response.statusText
    }
    return responseData
}


export {OpenWSConnection, GetAllChatsForUser, GetAllChatRoomsForUser, createChat}