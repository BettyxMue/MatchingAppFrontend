// @ts-nocheck

import {getToken, getUser, storeToken, storeUser} from "../resources/InternalStorage"

const ip4v = "192.168.0.98"

async function SignUp(username, email, city, plz, street, houseNumber){
    if (username == "" || email == "" || city == "" || plz == "" || street == "" || houseNumber == "") {
        return
    }
    let plzNumber = parseInt(plz)
    if (isNaN(plzNumber)){
        return "PLZ is not valid!"
    }
    const query = "http://" + ip4v + ":8080/signUp"
    let user = {
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
    let codeDTO = {
        "Code": code
    }
    const query = "http://" + ip4v + ":8080/activate/" + userid;
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
    const token = resultData.token
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

async function loginUser(loginObject){
    if (loginObject == null){
        return "No Login Data provided!"
    }
    const query = "http://"+ ip4v +":8080/login"
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(loginObject)
    })
    const resultData = await response.json();

    if (response.status != 200){
        return resultData.error;
    }
    let token = resultData.token;
    let user = resultData.user
    if (token == null){
        return "No token provided!"
    }
    if (user == null){
        console.log("No user provided!")
    }
    storeUser(user);
    storeToken(token).then(() => {
        return true;
    });
    return true;
}

/*async function GetProfileById (userId, token) {
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
export {GetProfileById}*/

async function getUserFromId(userid){
    if (userid == null){
        return "No Id given!"
    }
    const query = "http://" + ip4v + ":8080/profile/" + userid
    const token = await getToken()
    const request = await fetch(query, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    const response = await request.json();

    if(request.status != 200){
        console.log("Error when querying user")
        return request.statusText
    }

    return response
}


// Helper

async function sendActivationQuery(user, token){
    const query = "http://" + ip4v + ":8080/profile/" + user.id;
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

export {SignUp,ActivateAccount,UpdateUser,loginUser,getUserFromId}


async function UpdateUserProfile(gender, price, phoneNumber, firstName, name, username, email, city, plz, street, houseNumber, profilePicture, searchedSkills, achievedSkills ){

    let priceNumber
    let plzNumber

    if (price != ""){
        priceNumber = parseInt(price)
        if (isNaN(priceNumber)){
            return "Price is not valid!"
    }}
    if (plz != ""){
        plzNumber = parseInt(plz)
        if (isNaN(plzNumber)){
            return "PLZ is not valid!"
        }
    }

    const userStore = await getUser()
    const userId = userStore.id
    const token = await getToken()
    let user

    const query = "http://"+ ip4v +":8080/profile/" + userId
    if(searchedSkills != undefined && achievedSkills != undefined){
        if (searchedSkills.length == 0 & achievedSkills.length == 0){
            user = {
                "firstName": firstName,
                "name": name,
                "gender": gender,
                "username": username,
                "email": email,
                "street": street,
                "houseNumber": houseNumber,
                "telephoneNumber": phoneNumber,
                "price": priceNumber,
                "profilePicture": profilePicture,
                "CityIdentifier": plzNumber,
                "city": {
                    "plz": plzNumber,
                    "place": city
                }
            }
        } else {
            user = {
                "firstName": firstName,
                "name": name,
                "gender": gender,
                "username": username,
                "email": email,
                "street": street,
                "houseNumber": houseNumber,
                "telephoneNumber": phoneNumber,
                "price": priceNumber,
                "profilePicture": profilePicture,
                "CityIdentifier": plzNumber,
                "city": {
                    "plz": plzNumber,
                    "place": city
                },
                "achievedSkills": achievedSkills,
                "searchedSkills": searchedSkills
            }
        }
    }else {
        user = {
            "firstName": firstName,
            "name": name,
            "gender": gender,
            "username": username,
            "email": email,
            "street": street,
            "houseNumber": houseNumber,
            "telephoneNumber": phoneNumber,
            "price": priceNumber,
            "profilePicture": profilePicture,
            "CityIdentifier": plzNumber,
            "city": {
                "plz": plzNumber,
                "place": city
            },
            "achievedSkills": achievedSkills,
            "searchedSkills": searchedSkills
        }
    }
    
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
    return resultData;
}
export {UpdateUserProfile};

async function GetAllSkills(){
    const query = "http://"+ ip4v +":8080/skill/"
    const token = await getToken()
    const response = await fetch(query, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    const resultData = await response.json();

    if (response.status != 200){
        return resultData.error;
    }
    return resultData;
}
export {GetAllSkills}

async function DeleteUser(){
    const userData = await getUser()
    const userMail = userData.email
    const query = "http://" + ip4v +":8084/profile/";

    const user = {
        email: userMail
    }

    const response = await fetch(query, {
        method: 'DELETE',
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
export {DeleteUser}
