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
import {Ionicons} from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
                            {(!user) ?
                                <Stack.Navigator
                                    screenOptions={{headerShown: true, headerBackButtonMenuEnabled: false}}>
                                    <Stack.Screen name="Start" component={StartScreen} options={{
                                        headerShown: false
                                    }}/>
                                    <Stack.Screen name="LogIn" component={LogInScreen}
                                                  options={({navigation, route}) => ({
                                                      headerRight: () => {
                                                          <Button title="Back"/>
                                                      },
                                                      headerTransparent: true
                                                  })}/>
                                    <Stack.Screen name="Registierung" component={SignUpScreen}
                                                  options={({navigation, route}) => ({
                                                      headerRight: () => {
                                                          <Button title="Back"/>
                                                      },
                                                      headerTransparent: true,
                                                      headerShown: true
                                                  })}/>
                                </Stack.Navigator>
                                :
                                <Tab.Navigator
                                    screenOptions={({route}) => ({
                                        headerShown: false,
                                        tabBarIcon: ({focused, color, size}) => {
                                            let iconName
                                            let rn = route.name

                                            if (rn == "Home"){
                                                iconName = focused ? 'home' : 'home-outline'
                                            } else if (rn == "Profil"){
                                                iconName = focused ? 'person' : 'person-outline'
                                            } else if (rn == "Chat"){
                                                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
                                            }
                                            return <Ionicons name={iconName} size={size} color={color} />
                                        },
                                    })}
                                    tabBarOptions={{
                                        activeTintColor: "blue",
                                        inactiveTintColor: "blue",
                                        labelStyle: {paddingBottom: 10, fontSize: 10},
                                        style: {padding: 10, height: 70}
                                    }}
                                >
                                    <Tab.Screen name="Home" component={HomeStackScreen}/>
                                    <Tab.Screen name="Profil" component={ProfileStackScreen}/>
                                    <Tab.Screen name="Chat" component={ChatStackScreen}/>
                                </Tab.Navigator>
                            }
                        </NavigationContainer>
                    </RootSiblingParent>
                </ChatRoomProvicer>
            </WebSocketProvider>
        </ChatProvider>
    );
}

const HomeStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Match" component={MatchScreen}/>
            <Stack.Screen name="Details" component={DetailsScreen} options={({navigation, route}) => ({
                headerRight: () => {
                    <Button title="Back"/>
                }
            })}/>
        </Stack.Navigator>
    )
}

const ProfileStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Settings" component={SettingsScreen} options={({navigation, route}) => ({
                headerRight: () => {
                    <Button title="Back"/>
                }
            })}/>
            <Stack.Screen name="Profil" component={ProfileScreen}/>
            <Stack.Screen name="Filter" component={FilterScreen} options={({navigation, route}) => ({
                headerRight: () => {
                    <Button title="Back"/>
                }
            })}/>
            <Stack.Screen name="CreateBill" component={CreateBill} options={({navitation, route}) => ({
                headerShown: false
            })}/>
        </Stack.Navigator>
    )
}

const ChatStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="ChatDetail" component={ChatDetail} options={({navitation, route}) => ({
                headerShown: false
            })}/>
        </Stack.Navigator>
    )
}