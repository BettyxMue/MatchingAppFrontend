import React from "react";
import { View,Text, TextInput, Touchable, TouchableOpacity } from "react-native";
import {styles} from '../../resources/Styles'

const NameAndEmailForm = ({onChangeName, onChangeEmail, name, email, onContinueButton}) => {
    return (
        <View style={styles.registerBackground}>
            <Text style={styles.registerTitle}>Schritt 1:</Text>
            <View style={styles.registerInputField}>
                <Text>Gib deinen Usernamen ein</Text>
                <TextInput
                    onChangeText={onChangeName}
                    value={name}
                    style={styles.registerInputTextInput}
                    textContentType="nickname"
                />
                <Text>Gib deine Email Addresse ein</Text>
                <TextInput
                    onChangeText={onChangeEmail}
                    value={email}
                    style={styles.registerInputTextInput}
                    textContentType="emailAddress"
                />
                <TouchableOpacity style={styles.continueButton} onPress={onContinueButton}>
                    <Text style={styles.continueButtonText}>Weiter</Text>   
                </TouchableOpacity>
            </View>
        </View>
    )
    
}

export default NameAndEmailForm;