// @ts-nocheck
import React from "react"
import { getToken, getUser } from "../resources/InternalStorage"


async function createInvoice(serviceName,date,hours,billedUser){
    if(serviceName == "" || date == null || hours == "" || billedUser == null){
        return
    }
    let user = await getUser()
    let token = await getToken()
    let hoursInt;
    try{
        hoursInt = parseInt(hours)
    }catch(e){
        console.log(e)
        return
    }
      

    const body = {
        "biller" : user.id,
        "payer": billedUser.id,
        "hours": hoursInt,
        "service": serviceName + " am " + date.toLocaleDateString()
    }

    const query = "http://192.168.2.120:8085/invoice"
    const request = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    })

    const resultData = await response.json();

    if (response.status != 200){
        return resultData.error;
    }
    return true;
}

async function getAllInvoicesByUser(){
    let user = await getUser()
    let token = await getToken()
    if (user == null || token == null){
        return
    }
    let userid
    try{
        userid = parseInt(user.id)
    }catch(e){
        console.log(e)
        return
    }
    query = "http://192.168.2.120:8085/invoice/user/" + userid
    const request = await fetch(query, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    const response = await request.json()

    if (request.status != 200){
        return resultData.error;
    }
    return response
}
export {createInvoice, getAllInvoicesByUser}