// @ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUser = async(user) => {
    try{
        const json = JSON.stringify(user)
        await AsyncStorage.setItem('@current_user', json)
    }catch(e){
        console.log(e)
    }
}

const getUser = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@current_user')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}

const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('@jwt', token)
    }catch (e){
        console.log(e)
    }
}

const getToken = async () => {
    try{
        const token = await AsyncStorage.getItem('@jwt')
        return token
    } catch (e) {
        console.log(e)
    }
}

const storeNotificationToken = async (notifyToken) => {
    try {
        await AsyncStorage.setItem('@notificationToken', notifyToken)
    }catch(e){
        console.log(e)
    }
}

const getNotificationToken = async () => {
    try{
        const token = AsyncStorage.setItem('@notificationToken', notifyToken)
        return token
    } catch (e) {
        console.log(e)
    }
}

export {storeUser, storeToken, getUser, getToken, storeNotificationToken, getNotificationToken}