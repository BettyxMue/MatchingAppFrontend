import React, {useRef, useState} from "react";
import {StyleSheet, Button, Keyboard} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootSiblingParent} from 'react-native-root-siblings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
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
import {Ionicons} from "@expo/vector-icons";
import MatchScreen from "./src/pages/MatchScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

    const [user, setUser] = useState(true);
    const [chatArray, setChatArray] = React.useState([]);
    const [chat, setChat] = React.useState([]);
    const [notification, setNotification] = React.useState(false)
    const notificationsListerner = useRef()


    return (
        <RootSiblingParent>
            <NavigationContainer StartScreen={(!user) ? 'Home' : 'Start'}>
                {(!user) ?
                    <Stack.Navigator screenOptions={{headerShown: true, headerBackButtonMenuEnabled: false}}>
                        <Stack.Screen name="Start" component={StartScreen} options={{
                            headerShown: false
                        }}/>
                        <Stack.Screen name="LogIn" component={LogInScreen} options={({navigation, route}) => ({
                            headerRight: () => {
                                <Button title="Back"/>
                            },
                            headerTransparent: true
                        })}/>
                        <Stack.Screen name="Registierung" component={SignUpScreen} options={({navigation, route}) => ({
                            headerRight: () => {
                                <Button title="Back"/>
                            },
                            headerTransparent: true,
                            headerShown: true
                        })}/>
                        <Tab.Screen name="Home" component={HomeScreen}/>
                    </Stack.Navigator>
                    :
                    <Tab.Navigator
                        screenOptions={({route}) => ({
                            headerShown: false,
                            tabBarIcon: ({focused, color, size}) => {
                                let iconName;
                                let rn = route.name;

                                if (rn === "Home") {
                                    iconName = focused ? 'home' : 'home-outline';

                                } else if (rn === "Profile") {
                                    iconName = focused ? 'person' : 'person-outline';

                                } else if (rn === "Chat") {
                                    iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                                }

                                // You can return any component that you like here!
                                return <Ionicons name={iconName} size={size} color={color}/>;
                            },
                        })}
                        tabBarOptions={{
                            activeTintColor: 'blue',
                            inactiveTintColor: 'grey',
                            labelStyle: {paddingBottom: 10, fontSize: 10},
                            style: {padding: 10, height: 70}
                        }}>

                        <Tab.Screen name="Home" component={HomeStackScreen}/>
                        <Tab.Screen name="Profile" component={ProfileStackScreen}/>
                        <Tab.Screen name="Chat" component={ChatStackScreen}/>
                    </Tab.Navigator>
                }
            </NavigationContainer>
        </RootSiblingParent>
    );
}

const HomeStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Finder"}}/>
            <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "Finder"}}/>
            <Stack.Screen name="Match" component={MatchScreen} options={{ title: "Finder"}}/>
        </Stack.Navigator>
    )
}

const ProfileStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Finder"}}/>
            <Stack.Screen name="Filter" component={FilterScreen} options={{ title: "Finder"}}/>
        </Stack.Navigator>
    )
}

const ChatStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="Chat" component={ChatScreen} options={{ title: "Finder"}}/>
            <Stack.Screen name="Messages" component={MessagesScreen} options={{ title: "Finder"}}/>
        </Stack.Navigator>
    )
}