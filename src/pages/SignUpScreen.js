// @ts-nocheck
import { Text, View, KeyboardAvoidingView } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {styles} from '../resources/Styles'
import NameAndEmailForm from '../components/registerProcess/nameAndEmail'
import PasswordInput from '../components/registerProcess/password'
import { ActivateAccount, SignUp, UpdateUser } from '../connectors/ProfileServiceConnector';
import Toast from 'react-native-root-toast';
import { ConfirmCode } from '../components/registerProcess/confirmCode';
import { storeUser, getUser } from '../resources/InternalStorage';
import { createHash } from '../resources/Hasher';

const SignUpScreen = ({navigation}) => {

  
  const [userName, onChangeUserName] = React.useState("")
  const [email, onChangeEmail] = React.useState("")
  const [code, onCodeChange] = React.useState("")
  const [city, onChangeCity] = React.useState("")
  const [plz, onChangePLZ] = React.useState("")
  const [street, onChangeStreet] = React.useState("")
  const [houseNumber, onChangeHouseNumber] = React.useState("")
  const [password, onChangePassword] = React.useState("")
  const [passwordRepeat, onPasswordRepeatChange] = React.useState("")

  const [shouldShowName, setShouldShowName] = React.useState(true)
  const [shouldShowCode, setShouldShowCode] = React.useState(false)
  const [shouldShowPassword, setShouldShowPassword] = React.useState(false)


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

  async function onContinueButtonMail(){
    SignUp(userName, email, city, plz, street, houseNumber).then(result => {
      console.log(result)
      if (typeof result !== 'object'){
        showErrorMessage(result);
        return;
      }
      storeUser(result);
      setShouldShowName(false);
      setShouldShowCode(true);
    });
  }

  async function onContinueButtonConfirm(){
    getUser().then(result => {
      ActivateAccount(result.id, code).then(queryResult => {
        if (queryResult !== true){
          showErrorMessage(queryResult)
        }
        setShouldShowCode(false);
        setShouldShowPassword(true);
      });
    })
  }

  async function onContinueButtonPassword(){
    createHash(password).then(hash => {
      console.log(hash);
      onChangePassword(null);
      onPasswordRepeatChange(null);
      getUser().then(user => {
      user.password = hash;
      UpdateUser(user).then(queryResult => {
        if (queryResult !== true){
          showErrorMessage(queryResult)
        }
      })

      })
    });

  }

  

  return(
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{
      alignContent: "center",
      flex: 1
    }}>
      <LinearGradient colors={['#3860ff', '#389bff']} style={styles.container} >
        {shouldShowName ? <NameAndEmailForm 
          onChangeEmail={onChangeEmail} 
          onChangeName={onChangeUserName}
          onChangeCity={onChangeCity}
          onChangeHouseNumber={onChangeHouseNumber}
          onChangePLZ={onChangePLZ}
          onChangeStreet={onChangeStreet} 
          onContinueButton={onContinueButtonMail}
          email={email}
          name={userName}
          city={city}
          houseNumber={houseNumber}
          plz={plz}
          street={street}  
          /> 
        : null  }        
        {shouldShowCode ? <ConfirmCode 
          onContinueButtonConfirm={onContinueButtonConfirm} 
          onChangeCode={onCodeChange} 
          code={code}
          /> 
        : null }  
        {shouldShowPassword ? <PasswordInput 
          onPasswordChange={onChangePassword}
          onPasswordRepeatChange={onPasswordRepeatChange}
          password={password}
          passwordRepeat={passwordRepeat}
          onPasswordContinue={onContinueButtonPassword}
          /> 
        : null }      
      </LinearGradient>
      

    </KeyboardAvoidingView>
  )
}

export default SignUpScreen