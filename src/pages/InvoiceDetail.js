// @ts-nocheck
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {styles} from '../resources/Styles'

const InvoiceDetail = ({navigation, route}) => {
    const {invoice} = route.params
    console.log(invoice)
    const detailButton = "\u27A4"
    const payed= "\u2705"
    const pending = "\u231B"
    const backButtonChar = "\u276e"

    function formatDateInput(date){
        if(typeof date == "string"){
            let date = Date.parse(date)
        }
        let localDate = new Date(date)
        return localDate.toLocaleDateString("de-de")
    }

   function payedSymbol(payedAt){
        if(payedAt.Valid){
            return payed
        }
        else {
            return pending
        }
    }
    function payedText(payedAt){
        if(payedAt.Valid){
            return "Bezahlt am " + formatDateInput(payedAt.Time)
        }
        else {
            return "Ausstehend"
        }
    }

    function goBack(){
        navigation.goBack();
    }

    return(
        <View style={{height: "100%"}}>
            <View style={{marginLeft: "2%", marginTop: "20%"}}>
                <TouchableOpacity style={{display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent:"center"}} onPress={goBack}>
                    <Text style={styles.ChatTopBarBackChar}>{backButtonChar}</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{marginLeft: "2%", marginRight: "2%", marginTop: "2%", borderColor: "#c7c7c7", borderWidth: 1, backgroundColor: "white"}}>
                <View style={styles.invoiceDetailsSectionHeader}>
                    <Text style={styles.invoiceDetailsSectionHeaderText}>Details</Text>
                </View>
                <View style={{marginLeft: "5%", marginRight: "5%"}}>
                    <Text style={styles.invoiceDetailHeaderTitle}>Rechnungsdatum</Text>
                    <Text style={styles.invoiceDetailHeaderText}>{formatDateInput(invoice.createdAt)}</Text>
                    <Text style={styles.invoiceDetailHeaderTitle}>Auftragsnummer</Text>
                    <Text style={styles.invoiceDetailHeaderText}>{invoice.id}</Text>
                    <Text style={styles.invoiceDetailHeaderTitle}>Zahlung</Text>
                    <Text style={styles.invoiceDetailHeaderText}>Stripe</Text>
                </View>
                <View style={styles.invoiceDetailsSectionHeader}>
                    <Text style={styles.invoiceDetailsSectionHeaderText}>Artikel</Text>
                </View>
                <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent:"center", marginLeft: "5%", marginRight: "5%"}}>
                    <View style={{width: "70%"}}>
                        <Text style={styles.invoiceOverviewHeaderText}>{invoice.service}</Text>
                        <Text style={styles.invoiceOverviewSubheaderText}>Von {invoice.billerDetails.username}</Text>
                        <Text>Am: {formatDateInput(invoice.createdAt)}</Text>
                        <Text>Stunden: {invoice.hours}</Text>
                        <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", marginBottom: "5%", marginTop: "5%"}}>
                            <Text>{payedSymbol(invoice.payedAt) }</Text>
                            <Text style={styles.invoiceDetailPayedText}>{payedText(invoice.payedAt)}</Text>
                        </View>
                    </View>
                    <View style={{width: "25%", marginLeft: "5%"}}>
                        <Text>{invoice.amount} €</Text>
                    </View>
                    <View style={styles.invoiceTotalSection}>
                    <View style={{width: "65%", marginLeft: "5%"}}>
                        <Text style={styles.invoiceTotalHeader}>Gesamtsumme (inkl. MwST)</Text>
                    </View>
                    <View style={{width: "25%", marginLeft: "5%"}}>
                        <Text style={styles.invoiceTotalHeader}>{invoice.amount} €</Text>
                    </View>
            </View>   
                </View>
                
            </View>
                     
        </View>
    )
}

export default InvoiceDetail