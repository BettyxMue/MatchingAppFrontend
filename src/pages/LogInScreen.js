// @ts-nocheck
import { KeyboardAvoidingView, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { styles } from '../resources/Styles'
import { LinearGradient } from 'expo-linear-gradient';
import { createHash } from '../resources/Hasher';
import { loginUser } from '../connectors/ProfileServiceConnector';
import Toast from 'react-native-root-toast';

const LogInScreen =  ({navigation}) => {
  const [email, onChangeEmail] = React.useState("")
  const [password, onChangePassword] = React.useState("")

  const titleStyle = {
    marginTop: "20%"
  }

  async function showErrorMessage(message){
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
      backgroundColor: "#f5543b",
      textColor: "white",
    });
    setTimeout(function hideToast(){
      Toast.hide(toast)
    }, 5000);
  }

  async function onLoginButton(){
    createHash(password).then(hash => {
      onChangePassword(null);
      let loginObject = {
        "email": email,
        "password": hash
      }
      loginUser(loginObject).then(result => {
        if (result !== true){
          showErrorMessage(result);
          return;
        }
        showErrorMessage("Logged in!");
        navigation.navigate('Home')
      })
    })
  }

    
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{
      alignContent: "center",
      flex: 1
    }}>
      <LinearGradient colors={['#3860ff', '#389bff']} style={styles.container}>
        <ScrollView style={styles.registerBackground}>
          <Text style={styles.registerTitle}>Login</Text>
          <View style={[styles.registerInputField, titleStyle]}>
            <View style={{width: "100%"}}>
              <Text>E-Mail</Text>
            </View>
            <View style={{width: "100%"}}>
              <TextInput 
                style={styles.registerInputTextInput}  
                value={email}
                onChangeText={onChangeEmail}
                textContentType="emailAddress"
              />
            </View>
            <View style={{width: "100%"}}>
              <Text>Passwort</Text>
            </View>
            <View style={{width: "100%"}}>
              <TextInput 
                style={styles.registerInputTextInput}  
                value={password}
                onChangeText={onChangePassword}
                textContentType="password"
                secureTextEntry="true"
              />
            </View>
          </View>
          <View style={{width: "100%"}}>
              <TouchableOpacity style={styles.continueButton} onPress={onLoginButton}>
                  <Text style={styles.continueButtonText}>Login</Text>   
              </TouchableOpacity>
          </View> 

        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
    )
}

export default LogInScreen;