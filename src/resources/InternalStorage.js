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

export {storeUser, getUser}