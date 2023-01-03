// @ts-nocheck
import React from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import { styles } from "../../resources/Styles";
import {SelectList} from 'react-native-dropdown-select-list' 
import DateTimePicker from '@react-native-community/datetimepicker';
import { createInvoice } from "../../connectors/InvoiceServiceConnector";
import { useNavigation } from "@react-navigation/native";

const CreateBilling = (user) => {
    let userProp = user.user.user
    const navigation = useNavigation();
    const [selected, setSelected] = React.useState("")
    const [lessonDate, setLessonDate] = React.useState(new Date())
    const [hours, setHours] = React.useState("Test")
    const [confirm, setConfirmed] = React.useState(false)
    const [showPicker, setShowPicker] = React.useState(false)

    async function showSuccesmessage(message){
        let toast = Toast.show(message, {
          duration: Toast.durations.LONG,
          backgroundColor: "#abffc1",
          textColor: "white",
        });
        setTimeout(function hideToast(){
          Toast.hide(toast)
        }, 5000);
      }

    function onChange(event, selectedDate){
        const currentDate = selectedDate;
        setLessonDate(currentDate)
        setShowPicker(false)
    }

    function getSearched(searchedSkills){
        let names = []
        if (searchedSkills.length <= 0) {
            return [""]
        }
        searchedSkills.forEach(item => {
            names.push(item.name)
        })
        return names
    }
    function showDatePicker(){
        setShowPicker(true)
    }

    function sendInvoice(){
        createInvoice(selected, lessonDate, hours, userProp).then(() => {
            showSuccesmessage("Rechnung wurde verschickt!")
            navigation.goBack();
        })
    }

    return (
        <View style={{margin:"6%"}}>
            <View style={{alignContent: "center"}}>
                <Text style={styles.billingTextTitle}>Erstellen sie eine Rechnung für: {userProp.username}</Text>
            </View>
            <View>
                <View style={styles.billingInputSection}>
                    <View style={styles.billingInputSectionUnder1}>
                        <Text style={styles.billingText}>Bitte wählen sie eine Leistung: </Text>
                    </View>
                    <View style={styles.billingInputSectionUnder2}>
                        <SelectList
                            setSelected={(val) => setSelected(val)}
                            data={getSearched(userProp.searchedSkills)}
                            save="value"
                        />
                    </View>
                    
                    
                </View>
                <View style={styles.billingInputSection}>
                    <View style={styles.billingInputSectionUnder1}>
                        <Text style={styles.billingText}>Wann haben sie unterrichtet: </Text>
                    </View>
                    <View style={styles.billingInputSectionUnder2}>
                        <DateTimePicker
                            testID="BillingPicker"
                            value={lessonDate}
                            mode="date"
                            onChange={onChange}
                        />
                    </View>
                </View>
                <View style={styles.billingInputSection}>
                    <View style={styles.billingInputSectionUnder1}>
                        <Text style={styles.billingText}>Wie lange haben sie unterrichtet: </Text>
                    </View>
                    <View style={styles.billingInputSectionUnder2}>
                        <TextInput style={styles.billindInputField} value={hours} onChangeText={setHours} />
                    </View>  
                </View>
                

            </View>
            <View style={{marginTop: "10%"}}>
                <Text>Mit dem absenden bestätige ich, dass diese Stunde stattgefunden hat und nehme zur Kenntniss, dass ein missbrauch dieser Funktion zur Sperrung meines Accounts führen kann. </Text>
                <TouchableOpacity style={styles.continueButton} onPress={sendInvoice}>
                    <Text style={styles.continueButtonText}>Rechnung erstellen</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default CreateBilling