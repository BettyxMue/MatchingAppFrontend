// @ts-nocheck
import React from 'react'
import { View, Text, Pressable, TextInput, ScrollView } from 'react-native'
import { styles } from '../../resources/Styles'

const PasswordInput = ({onPasswordContinue, password, passwordRepeat, onPasswordRepeatChange, onPasswordChange}) => {

    function checkForSamePassword(){
        if (password !== passwordRepeat){
            return true;
        }
        return false;
    }

    return (
        <ScrollView style={styles.registerBackground}>
            <Text style={styles.registerTitle}>Wählen sie ein Passwort</Text>
            <View style={styles.registerInputField}>
                <View style={{widht: "100%"}}>
                    <Text>Bitte geben sie ihr Passwort ein:</Text>
                </View>
                <View style={{width: "100%"}}>
                    <TextInput 
                            style={styles.registerInputTextInput}  
                            value={password}
                            onChangeText={onPasswordChange}
                            textContentType="newPassword"
                            secureTextEntry="true"
                    />
                </View>
                <View style={{widht: "100%"}}>
                    <Text>Bitte bestätigen sie ihr Passwort:</Text>
                </View>
                <View style={{width: "100%"}}>
                    <TextInput 
                            style={styles.registerInputTextInput}  
                            value={passwordRepeat}
                            onChangeText={onPasswordRepeatChange}
                            textContentType="password"
                            secureTextEntry="true"
                    />
                </View>
                <View style={{width: "100%"}}>
                    <Pressable style={checkForSamePassword() ? styles.continueButtonDeactivated : styles.continueButton } onPress={onPasswordContinue} disabled={checkForSamePassword()} >
                        <Text style={styles.continueButtonText}>Weiter</Text>   
                    </Pressable>
                </View>         
            </View>

        </ScrollView>
    )

}

export default PasswordInput