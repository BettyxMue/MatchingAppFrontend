import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, Button, Keyboard} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootSiblingParent} from 'react-native-root-siblings';
import HomeScreen from "./src/pages/HomeScreen";
import ProfileScreen from "./src/pages/ProfileScreen";
import FilterScreen from "./src/pages/FilterScreen";
import ChatScreen from "./src/pages/ChatScreen";
import DetailsScreen from "./src/pages/DetailsScreen";
import StartScreen from "./src/pages/StartScreen";
import LogInScreen from "./src/pages/LogInScreen";
import SignUpScreen from "./src/pages/SignUpScreen";
import ChatDetail from "./src/pages/ChatDetail";
import CreateBill from "./src/pages/CreateBill"
import InvoicesScreen from './src/pages/InvoicesScreen'
import InvoiceDetail from './src/pages/InvoiceDetail'
import PaymentScreen from './src/pages/PaymentScreen'
import { ChatArrayProvicer, ChatProvider, ChatRoomProvicer, WebSocketProvider } from "./src/resources/page-context";
import {registerForPushNotifcations} from './src/resources/Notificator'
import { storeNotificationToken } from "./src/resources/InternalStorage";
import {StripeProvider} from '@stripe/stripe-react-native'
import * as Notifications from 'expo-notifications'
import SkillsScreen from "./src/pages/SkillsScreen";
import OtherProfileScreen from "./src/pages/OtherProfileScreen";
import MatchScreen from "./src/pages/MatchScreen";
import ExploreScreen from "./src/pages/ExploreScreen";
import * as MediaLibrary from 'expo-media-library';

const Stack = createNativeStackNavigator();

export default function App() {

    const [user, setUser] = useState(false);
    const [chatArray, setChatArray] = React.useState([]);
    const [chat, setChat] = React.useState([]);
    const [notification, setNotification] = React.useState(false)
    const notificationsListerner = useRef()
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();


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
      <ChatArrayProvicer>
        <ChatProvider>
          <WebSocketProvider>
            <ChatRoomProvicer>
              <StripeProvider
                publishableKey="pk_test_51MMAKCKk0KHEbPNGlJYBHadqSjLpxKh8LApAEqQSVk1O4VJbWxBKz2kLmYyMVNxqT6cFR9vOOZyNE0ZX8KDotCFQ00RFXAsr1k"
                urlScheme="http://192.168.2.120"
              >
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
                          headerTransparent: true,
                          headerShown: false
                        })}/>
                        <Stack.Screen name="Registierung" component={SignUpScreen} options={({navigation,route}) => ({
                          headerRight: () => {
                            <Button title="Back" />
                          },
                          headerTransparent: true,
                          headerShown: false
                        })}/>
                        <Stack.Screen name="Details" component={DetailsScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Match" component={MatchScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Explore" component={ExploreScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="OtherProfile" component={OtherProfileScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Skills" component={SkillsScreen} options={{headerShown: true}} />
                        <Stack.Screen name="Filter" component={FilterScreen} options={{headerShown: true}}/>
                        <Stack.Screen name="Chat" component={ChatScreen} options={({navitation, route}) => ({
                          headerShown: true,
                          headerBackVisible: false
                        })}/>
                        <Stack.Screen name="ChatDetail" component={ChatDetail} options={({navitation, route}) => ({
                          headerShown: false,
                          headerBackVisible: false
                        })} />
                        <Stack.Screen name="CreateBill" component={CreateBill} options={({navitation, route}) => ({
                          headerShown: false
                        })} />
                        <Stack.Screen name="Invoices" component={InvoicesScreen} options={({navitation, route}) => ({
                          headerShown: true
                        })} />
                        <Stack.Screen name="Invoice" component={InvoiceDetail} options={({navitation, route}) => ({
                          headerShown: false
                        })} />
                        <Stack.Screen name="Payment" component={PaymentScreen} options={({navitation, route}) => ({
                          headerShown: false
                        })} />
                      </Stack.Navigator>
                  </NavigationContainer>
                </RootSiblingParent>
              </StripeProvider>
                      
            </ChatRoomProvicer>
          </WebSocketProvider>
        </ChatProvider>
      </ChatArrayProvicer>
    );
}
