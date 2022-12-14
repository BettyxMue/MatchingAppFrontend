import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {styles} from '../resources/Styles'
import NameAndEmailForm from '../components/registerProcess/nameAndEmail'
import { SignUp } from '../connectors/ProfileServiceConnector';

const SignUpScreen = ({navigation}) => {

  var user = {};
  const [name, onChangeName] = React.useState("")
  const [email, onChangeEmail] = React.useState("")

  function onContinueButton(){
    SignUp(name, email);
  }

  return(
    <View style={{
      height: '100%',
      width: '100%',
      alignContent: "center"
    }}>
      <LinearGradient colors={['#3860ff', '#389bff']} style={styles.container} >
        <NameAndEmailForm email={email} onChangeEmail={onChangeEmail} name={name} onChangeName={onChangeName} onContinueButton={onContinueButton}/>         
      </LinearGradient>
      

    </View>
  )
}

export default SignUpScreen