// @ts-nocheck
import BillingTopBar from "../components/billing/billingTopBar"
import React from "react"
import { Text, View } from "react-native"
import CreateBilling from "../components/billing/createBilling"

const CreateBill = ({navigation, route}) =>{
    const { user } = route.params
    return(
        <View style={{height: "100%"}}>
            <BillingTopBar user={user} />
            <CreateBilling user={user}/>           
        </View>
    )
}
export default CreateBill