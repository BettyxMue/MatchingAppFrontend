// @ts-nocheck
import { getToken, getUser } from "../resources/InternalStorage"

// @ts-nocheck
function OpenWSConnection(){
    let websocket = new WebSocket("ws://192.168.2.120:8081/sendMessage")
    websocket.onopen = () => {
        let message = {
            "writtenBy": 1,
            "sendTo": 2,
            "message": "I am connected from the app!"
        }
        let messageString = JSON.stringify(message)
        websocket.send(messageString)
        console.log(websocket)
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
                console.log(message.message)
            } catch (err){
                console.log(err)
            }
        }
        
    }
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
    let query = "http://192.168.2.120:8081/getAllMessagesForUser"
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
    let query = "http://192.168.2.120:8081/getAllMessagesForUser"
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


export {OpenWSConnection, GetAllChatsForUser}