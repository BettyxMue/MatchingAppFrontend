// @ts-nocheck
import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {styles} from '../resources/Styles'
import NameAndEmailForm from '../components/registerProcess/nameAndEmail'
import { ActivateAccount, SignUp } from '../connectors/ProfileServiceConnector';
import Toast from 'react-native-root-toast';
import { ConfirmCode } from '../components/registerProcess/confirmCode';
import { storeUser, getUser } from '../resources/InternalStorage';

const SignUpScreen = ({navigation}) => {

  
  const [userName, onChangeUserName] = React.useState("")
  const [email, onChangeEmail] = React.useState("")
  const [code, onCodeChange] = React.useState("")
  const [city, onChangeCity] = React.useState("")
  const [plz, onChangePLZ] = React.useState("")
  const [street, onChangeStreet] = React.useState("")
  const [houseNumber, onChangeHouseNumber] = React.useState("")

  const [shouldShowName, setShouldShowName] = React.useState(true)
  const [shouldShowCode, setShouldShowCode] = React.useState(false)

  var registerUser = {
    id : 0,
    firstName: "",
    name: "",
    gender: 0,
    username: "",
    email: "",
    street: "",
    houseNumber: "",
    telephoneNumber: ""
  };

  var registrationState = {
    showNameAndEmailForm: true,
    showConfirmCodeForm: false
  }

  function updateUser(newUser){
    registerUser.id = newUser.id;
    registerUser.firstName = newUser.firstName;
    registerUser.name = newUser.name;
    registerUser.gender = newUser.gender;
    registerUser.username = newUser.username;
    registerUser.email = newUser.email;
    registerUser.street = newUser.street;
    registerUser.houseNumber = newUser.houseNumber;
    registerUser.telephoneNumber = newUser.telephoneNumber;
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
      });
    })
  }

  

  return(
    <View style={{
      height: '100%',
      width: '100%',
      alignContent: "center"
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
      </LinearGradient>
      

    </View>
  )
}

export default SignUpScreen