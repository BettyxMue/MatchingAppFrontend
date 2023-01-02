// @ts-nocheck
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {styles} from '../../resources/Styles'

const InvoicesListElement = (props) => {
    const {invoice} = props;
    const navigation = useNavigation();
    const detailButton = "\u27A4"
    const payed= "\u2705"
    const pending = "\u231B"

    function navigateToDetail(){
        navigation.navigate('Invoice', {
            invoice: invoice
        })
    }

    function formatDateInput(date){
        if(typeof date == "string"){
            let date = Date.parse(date)
            console.log(date)
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

    function showPDF(){
        const file = new Blob([invoice.invoicepdf], {type: 'application/pdf'})
        const fileURL = URL.createObjectURL(file)
        window.open(fileURL)
    }

    return (
        <View style={styles.invoiceOverviewBox}>
            <View style={styles.invoiceOverviewHeader}>
                <View >
                    <Text style={styles.invoiceOverviewHeaderText}>Rechnung {invoice.id} vom {formatDateInput(invoice.createdAt)}</Text>
                </View>
                <View>
                    <TouchableOpacity 
                        style={{display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent:"center"}}
                        onPress={navigateToDetail}
                    >
                        <Text style={styles.invoiceOverviewDetailButton}>{detailButton}</Text>
                        <Text style={styles.invoiceOverviewDetailButtonText}>Rechnungsdetails</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.invoiceOverviewBody}>
                <Text style={styles.invoiceOverviewHeaderText}>{invoice.service}</Text>
                <Text style={styles.invoiceOverviewSubheaderText}>Von {invoice.billerDetails.username}</Text>
                <Text>Stunden: {invoice.hours}</Text>
                <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", marginBottom: "5%"}}>
                    <Text>{payedSymbol(invoice.payedAt) }</Text>
                    <Text>{payedText(invoice.payedAt)}</Text>
                </View>
                <View style={styles.invoiceOverviewInvoiceSection}>
                    <TouchableOpacity 
                    style={{display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent:"center"}}
                    >
                        <Text style={styles.invoiceOverviewDetailButton}>{detailButton}</Text>
                        <Text style={styles.invoiceOverviewDetailButtonText}>Bezahlen {invoice.id}</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}

export default InvoicesListElement