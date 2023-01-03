import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import {styles} from "../../resources/Styles"

const PaymentTopBar = () => {
    const navigation = useNavigation();

    const backButtonChar = "\u276e"

    function navigateBack(){
        navigation.goBack();
    }

    return (
        <View style={styles.ChatTopBar}>
            <View style={{width: "20%", alignContent: "center", justifyContent: "center", paddingLeft: "5%", marginTop: "10%"}}>
                <TouchableOpacity onPress={navigateBack}>
                    <Text style={styles.ChatTopBarBackChar}>{backButtonChar}</Text>
                </TouchableOpacity>
            </View>
            <View style={{width: "80%", alignContent: "center", justifyContent: "center", marginTop: "7%"}}>
                <View style={{marginLeft: "35%", marginTop: "5%", alignContent: "center"}}>
                    <View>
                        <Text style={styles.billingTitle}>Rechnung begleichen</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default PaymentTopBar