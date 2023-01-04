// @ts-nocheck
import React from "react";
import * as Notifications from 'expo-notifications'

async function registerForPushNotifcations(){
    let token;
    const {status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted'){
        const {status} = await Notifications.requestPermissionsAsync()
        finalStatus=status
    }
    if(finalStatus !== 'granted'){
        console.log("No push token received!")
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token)
}

async function schedulePushNotification(message, username){
    await Notifications.scheduleNotificationAsync({
        content:{
            title: "New Message from " + username,
            body: message,
            data: {
                data: message
            }
        },
        trigger: {seconds: 2},

    });
}

export {registerForPushNotifcations, schedulePushNotification}