// @ts-nocheck

import { getToken, storeToken } from "../resources/InternalStorage"

let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzI3NDk5NzcsInN1YiI6MiwidXNlciI6Mn0.LxNtfs3ZZNFZ4MCoAfybx0YktGVAn7lwYx6qgqmMjNx2UdxXcox6OjOMF1jIcmrXuLW92_hBXWJf13XaM5nZjTljwepvsw0bzIdGZKiYbnh3L72jmp7EIzetkK5XO5990ahGVrnb_YBm-qgx20fgQIFKXxoAAGWtEmij3LjzKYg"
let ip4v = "192.168.0.207"

async function SignUp(username, email, city, plz, street, houseNumber){
    if (username == "" || email == "" || city == "" || plz == "" || street == "" || houseNumber == "") {
        return
    }
    var plzNumber = parseInt(plz)
    if (isNaN(plzNumber)){
        return "PLZ is not valid!"
    }
    var query = "http://" + ip4v + ":8080/signUp"
    var user = {
        "username": username,
        "email": email,
        "street": street,
        "houseNumber": houseNumber,
        "city": {
            "plz": plzNumber,
            "place": city
        }
    }
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const resultData = await response.json();

    if (response.status != 200){
        return resultData.error;
    }
    return resultData;
}

async function ActivateAccount(userid, code){
    if (userid == "" || code == ""){
        return
    }
    var codeDTO = {
        "Code": code
    }
    let query = "http://" + ip4v + ":8080/activate/" + userid;
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(codeDTO)
    });
    const resultData = await response.json();

    if (response.status != 200){
        return resultData.error;
    }
    token = resultData.token
    if (token != null) {
        storeToken(token)
    }else{
        console.log("No token received!")
    }
    return true;
}

async function UpdateUser(user){
    if (user == null) {
        return
    }
    getToken().then(token => {
        sendActivationQuery(user, token).then(result => {
            return result
        })
    })
}

async function sendActivationQuery(user, token){
    let query = "http://" + ip4v + ":8080/profile/" + user.id;
        const response = await fetch(query, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(user)
        });
        const resultData = await response.json();

        if (response.status != 200){
            return resultData.error;
        }
        return true;
}

export {SignUp,ActivateAccount,UpdateUser}

async function GetProfileById (userId, token) {
    if (userId == "") {
        return
    }
    let query = "http://" + ip4v + ":8080/profile/" + userId;
    const response = await fetch(query, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
    const resultData = await response.json();
    if (response.status != 200){
        return resultData.error;
    }
    return resultData;

}
export {GetProfileById}