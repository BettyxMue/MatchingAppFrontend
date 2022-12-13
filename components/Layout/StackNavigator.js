import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../../pages/HomeScreen";
import ProfileScreen from "../../pages/ProfileScreen";
import SettingsScreen from "../../pages/SettingsScreen";
import FilterScreen from "../../pages/FilterScreen"
import ChatScreen from "../../pages/ChatScreen"
import MessagesScreen from "../../pages/MessagesScreen"
import DetailsScreen from "../../pages/DetailsScreen"
import LogInScreen from "../../pages/LogInScreen"
import SignUpScreen from "../../pages/SignUpScreen"
import StartScreen from "../../pages/StartScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {

    const [user, setUser] = useState(false);

    return (
        <Stack.Navigator>
            {user ? (
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Filter" component={FilterScreen} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                    <Stack.Screen name="Messages" component={MessagesScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Start" component={StartScreen} />
                    <Stack.Screen name="LogIn" component={LogInScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                </>
            )}
        </Stack.Navigator>
    )
}