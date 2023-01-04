import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, Button, Keyboard} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {RootSiblingParent} from 'react-native-root-siblings';
import HomeScreen from "./src/pages/HomeScreen";
import SettingsScreen from "./src/pages/SettingsScreen";
import ProfileScreen from "./src/pages/ProfileScreen";
import FilterScreen from "./src/pages/FilterScreen";
import ChatScreen from "./src/pages/ChatScreen";
import MessagesScreen from "./src/pages/MessagesScreen";
import DetailsScreen from "./src/pages/DetailsScreen";
import StartScreen from "./src/pages/StartScreen";
import LogInScreen from "./src/pages/LogInScreen";
import SignUpScreen from "./src/pages/SignUpScreen";
import ChatDetail from "./src/pages/ChatDetail";
import CreateBill from "./src/pages/CreateBill"
import {ChatProvider, ChatRoomProvicer, WebSocketProvider} from "./src/resources/page-context";
import {registerForPushNotifcations} from './src/resources/Notificator'
import {storeNotificationToken} from "./src/resources/InternalStorage";
import * as Notifications from 'expo-notifications'
import MatchScreen from "./src/pages/MatchScreen";

const Stack = createNativeStackNavigator();

export default function App() {

    const [user, setUser] = useState(false);
    const [chatArray, setChatArray] = React.useState([]);
    const [chat, setChat] = React.useState([]);
    const [notification, setNotification] = React.useState(false)
    const notificationsListerner = useRef()


    useEffect(() => {
        registerForPushNotifcations().then(token => {
            storeNotificationToken(token)
        })
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldPlaySound: false,
                shouldShowAlert: true,
                shouldSetBadge: false
            })
        })
        notificationsListerner.current = Notifications.addNotificationReceivedListener(notification => {
            //setNotification(notification)
        })
    })

    return (
        <ChatProvider>
            <WebSocketProvider>
                <ChatRoomProvicer>
                        <RootSiblingParent>
                            <NavigationContainer StartScreen={(!user) ? 'Home' : 'Start'}>
                                <Stack.Navigator screenOptions={{headerShown: true, headerBackButtonMenuEnabled: false}}>
                                    <Stack.Screen name="Start" component={StartScreen} options={{
                                        headerShown: false
                                    }}/>
                                    <Stack.Screen name="LogIn" component={LogInScreen} options={({navigation,route}) => ({
                                        headerRight: () => {
                                            <Button title="Back" />
                                        },
                                        headerTransparent: true
                                    })}/>
                                    <Stack.Screen name="Registierung" component={SignUpScreen} options={({navigation,route}) => ({
                                        headerRight: () => {
                                            <Button title="Back" />
                                        },
                                        headerTransparent: true,
                                        headerShown: true
                                    })}/>
                                    <Stack.Screen name="Details" component={DetailsScreen} options={{headerShown: false}}/>
                                    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                                    <Stack.Screen name="Match" component={MatchScreen} options={{headerShown: false}}/>
                                    <Stack.Screen name="Filter" component={FilterScreen} options={{headerShown: false}}/>
                                    <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/>
                                    <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
                                    <Stack.Screen name="Filter" component={FilterScreen} options={{headerShown: false}}/>
                                    <Stack.Screen name="Chat" component={ChatScreen} />
                                    <Stack.Screen name="Messages" component={MessagesScreen}/>
                                    <Stack.Screen name="ChatDetail" component={ChatDetail} options={({navigation, route}) => ({
                                        headerShown: false
                                    })} />
                                    <Stack.Screen name="CreateBill" component={CreateBill} options={({navigation, route}) => ({
                                        headerShown: false
                                    })} />
                                </Stack.Navigator>
                            </NavigationContainer>
                        </RootSiblingParent>
                </ChatRoomProvicer>
            </WebSocketProvider>
        </ChatProvider>
    );
}
