// @ts-nocheck
import React from "react";
import { View,Text, TextInput, Touchable, TouchableOpacity } from "react-native";
import {styles} from '../../resources/Styles'

const ConfirmCode = ({onContinueButtonConfirm, code, onChangeCode}) => {
    return (
        <View style={styles.registerBackground}>
            <Text style={styles.registerTitle}>Bitte gib deinen Bestätigungscode ein!</Text>
            <View style={styles.registerInputField}>
                <Text style={{marginBottom: "20%", textAlign:"center"}}>Wir haben dir so eben einen Bestätigunscode per Mail geschickt. Dies kann bis zu 10 Minuten dauern!</Text>
                <View style={{width: "100%"}}>
                    <TextInput 
                        style={styles.registerInputTextInput}  
                        value={code}
                        onChangeText={onChangeCode}
                    />
                </View>
                
                <TouchableOpacity style={styles.continueButton} onPress={onContinueButtonConfirm}>
                    <Text style={styles.continueButtonText}>Weiter</Text>   
                </TouchableOpacity>
            </View>

        </View>
    );
}

export {ConfirmCode};