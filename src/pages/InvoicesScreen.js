// @ts-nocheck
import { getAllInvoicesByUser } from "../connectors/InvoiceServiceConnector";
import React, { useEffect,useRef } from "react";
import { Text, View } from "react-native";
import InvoicesListElement from "../components/billing/invoicesListElement";
import { getUserFromId } from "../connectors/ProfileServiceConnector";

const InvoicesScreen = ({navigation, route}) => {

    const [invoices, setInvoices] = React.useState([])
    const [isLoading, setLoading] = React.useState(true)
    const firstUpdate = useRef(true)

    async function getInvoices(){
        return await getAllInvoicesByUser()   
    }

    async function getUserForInvoice(invoicesServer){
        let promises = []
        invoicesServer.forEach(invoice => {
            promises.push(getUserFromId(invoice.biller))
        })
        Promise.all(promises).then(values => {
            let counter = 0
            values.forEach(value => {
                invoicesServer[counter].billerDetails = value
                counter++
            })
            setInvoices(invoicesServer)
            setLoading(false)
        })

    }

    useEffect(() => {
        console.log("Use Effect is triggered")
        if(firstUpdate.current){
            getInvoices().then((invoicesServer) => {
                getUserForInvoice(invoicesServer).then(() => {
                    firstUpdate.current = false
                })  
            })
        }
        

    },[invoices])

    while(isLoading){
        return(
            <Text>Loading...</Text>
        )
    }

    return(
        <View>
            {invoices.map((data) => {
                return(
                    <InvoicesListElement key={data.id} invoice={data} />
                )
            })}
        </View>
    )
}

export default InvoicesScreen