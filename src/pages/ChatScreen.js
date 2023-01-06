// @ts-nocheck
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import { GetAllChatsForUser } from '../connectors/ChatServiceConnector';
import ChatsWrapper from '../components/chatComponents/chatsWrapper';
import { styles } from '../resources/Styles';
import Topbar from '../components/Layout/Topbar';
import BottomBar from '../components/Layout/BottomBar';



const ChatScreen = ({navigation}) => {

  function navigateToChat(data){
    navigation.navigate('ChatDetail',{
      chatArray: data
    })
  }

  const [isLoading, setLoading] = React.useState(true)
    
  return (
    <KeyboardAvoidingView style={{
      alignContent: "center",
      flex: 1,
      backgroundColor: "white"}}>
      <ScrollView>
        <ChatsWrapper/>
      </ScrollView>
      <BottomBar/>
    </KeyboardAvoidingView>
      
    )
}

export default ChatScreen