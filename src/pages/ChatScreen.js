// @ts-nocheck
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import { GetAllChatsForUser } from '../connectors/ChatServiceConnector';
import ChatsWrapper from '../components/chatComponents/chatsWrapper';
import { styles } from '../resources/Styles';
import Topbar from '../components/Layout/Topbar';



const ChatScreen = ({navigation}) => {

  /*async function getChats(){
    GetAllChatsForUser().then(chatsServer => {
      console.log("Received new Data in Chat Screen!")
      setChatsChange(chatsServer)
      setLoading(false)
    })
  }*/

  function navigateToChat(data){
    navigation.navigate('ChatDetail',{
      chatArray: data
    })
  }

  //const [chats, setChatsChange] = React.useState(getChats)
  const [isLoading, setLoading] = React.useState(true)
  
  /*if(isLoading) {
    return <Text>Loading...</Text>
  }*/
    
  return (
    <KeyboardAvoidingView style={{
      alignContent: "center",
      flex: 1,
      backgroundColor: "white"}}>
      <ScrollView>
        <Text>Hier entstehen chats</Text>
        <ChatsWrapper/>
      </ScrollView>
    </KeyboardAvoidingView>
      
    )
}

export default ChatScreen