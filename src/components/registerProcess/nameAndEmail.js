// @ts-nocheck
import React from "react";
import { View,Text, TextInput, Touchable, TouchableOpacity } from "react-native";
import {styles} from '../../resources/Styles'

const NameAndEmailForm = ({
    onChangeName, 
    onChangeEmail,
    onChangePLZ,
    onChangeCity,
    onChangeStreet,
    onChangeHouseNumber, 
    name, 
    email,
    plz,
    city,
    street,
    houseNumber, 
    onContinueButton}) => {
    return (
        <View style={styles.registerBackground}>
            <Text style={styles.registerTitle}>Wir benötigen einige Infos!</Text>
            <View style={styles.registerInputField}>
                <View style={{width: "100%", marginTop: "10%"}}>
                    <Text>Username</Text>
                    <TextInput
                        onChangeText={onChangeName}
                        value={name}
                        style={styles.registerInputTextInput}
                        textContentType="nickname"
                    />
                </View>
                <View style={{width: "100%"}}>
                    <Text>Email Addresse</Text>
                    <TextInput
                        onChangeText={onChangeEmail}
                        value={email}
                        style={styles.registerInputTextInput}
                        textContentType="emailAddress"
                    />
                </View>
                
                <View style={{width: "30%", marginRight: "2%"}}>
                    <Text>PLZ</Text>
                    <TextInput
                        onChangeText={onChangePLZ}
                        value={plz}
                        style={styles.registerInputTextInput}
                        textContentType="postalCode"
                    />
                </View>              
                <View style={{width: "68%"}}>
                    <Text>Wohnort</Text>
                    <TextInput
                        onChangeText={onChangeCity}
                        value={city}
                        style={styles.registerInputTextInput}
                        textContentType="addressCity"
                    />
                </View>

                <View style={{width: "75%", marginRight: "2%"}}>
                    <Text>Straße</Text>
                    <TextInput
                        onChangeText={onChangeStreet}
                        value={street}
                        style={styles.registerInputTextInput}
                        textContentType="streetAddressLine1"
                    />
                </View>              
                <View style={{width: "23%"}}>
                    <Text>Nr.</Text>
                    <TextInput
                        onChangeText={onChangeHouseNumber}
                        value={houseNumber}
                        style={styles.registerInputTextInput}
                    />
                </View>
                <TouchableOpacity style={styles.continueButton} onPress={onContinueButton}>
                    <Text style={styles.continueButtonText}>Weiter</Text>   
                </TouchableOpacity>
            </View>
        </View>
    )
    
}

export default NameAndEmailForm;