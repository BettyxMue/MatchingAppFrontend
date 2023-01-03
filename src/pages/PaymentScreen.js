// @ts-nocheck
import React from "react";
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { getPaymentIntent, setInvoiceToPayed } from "../connectors/InvoiceServiceConnector";
import { View,Button, Text, TouchableOpacity } from "react-native";
import {styles} from  '../resources/Styles'
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import PaymentTopBar from "../components/billing/PaymentTopBar";

export default function PaymentScreen({navigation, route}){
    const {confirmPayment} = useStripe()
    const {amount, service, invoice} = route.params

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

    const handlePayPress = async () => {
        const clientSecret = await getPaymentIntent(amount)
        const billingDetails = {
            email: 'testmail@test.test',
        }

        const {paymentIntent, error} = await confirmPayment(clientSecret, {
            paymentMethodType: "Card",
            billingDetails,
        })

        if (error) {
            console.log('Payment confirmation error', error);
          } else if (paymentIntent) {
            setInvoiceToPayed(invoice.id)
            showSuccesmessage("Rechnung beglichen!")
            navigation.goBack();
          }
    }

    return(
        <View>
            <PaymentTopBar/>

            <View style={{backgroundColor: "white", marginLeft: "3%", marginRight: "3%", marginTop: "3%"}}>
                <View style={styles.paymentHeader}>
                    <Text style={styles.paymentHeaderText}>Rechnung begleichen</Text>
                </View>
                <View style={{padding: "2%"}}>
                    <Text style={styles.paymentBodyHeader}>Leistung:</Text>
                    <Text style={styles.paymentBodyText}>{service}</Text>
                    <Text style={styles.paymentBodyHeader}>Rechnungsbetrag:</Text>
                    <Text style={styles.paymentBodyText}>{amount} €</Text>
                </View>
                <View style={{padding: "2%"}}>
                    <Text style={styles.paymentBodyHeader}>Bitte geben sie ihre Karte an!</Text>
                    <CardField
                        postalCodeEnabled={true}
                        placeholders={{
                          number: '4242 4242 4242 4242',
                        }}
                        cardStyle={{
                          backgroundColor: '#FFFFFF',
                          textColor: '#000000',
                        }}
                        style={{
                          width: '100%',
                          height: 50,
                          marginVertical: 30,
                        }}
                        onCardChange={(cardDetails) => {
                        }}
                        onFocus={(focusedField) => {
                        }}
                    />
                </View> 
                <View style={{marginLeft: "2%", marginRight: "2%"}}>
                    <TouchableOpacity style={styles.continueButton} onPress={handlePayPress}>
                        <Text style={styles.continueButtonText}>Kostenpflichtig Bezahlen</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
        
        
    )
}