// @ts-nocheck

import { getToken, storeToken } from "../resources/InternalStorage"

async function SignUp(username, email, city, plz, street, houseNumber){
    if (username == "" || email == "" || city == "" || plz == "" || street == "" || houseNumber == "") {
        return
    }
    var plzNumber = parseInt(plz)
    if (isNaN(plzNumber)){
        return "PLZ is not valid!"
    }
    var query = "http://192.168.178.63:8080/signUp"
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
    query = "http://192.168.178.63:8080/activate/" + userid;
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
    query = "http://192.168.178.63:8080/profile/" + user.id;
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
    let query = "http://192.168.178.63:8080/profile/" + userId;
    const response = await fetch(query, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzE4MzU1NDUsInN1YiI6MiwidXNlciI6Mn0.sTVRUgPZl04VMSbcGvjRSacucCiVOQ4iYU_Nx4a_IE3jy6JtrXXCOOMjeLaxAWbNho5DFLxjKDFf05JVgTB9Mo8lkeGeogDHfumcz3yBnRv0cOXfTjuATGULF8vyM8sjTkkD3O9hYiK568UBJEFE8geY2q_k-3ONTZLv2ysZt2Y"
        },
    });
    const resultData = await response.json();
    if (response.status != 200){
        return resultData.error;
    }
    return resultData;

}
export {GetProfileById}