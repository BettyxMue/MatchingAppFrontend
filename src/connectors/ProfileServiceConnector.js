// @ts-nocheck

import {getToken, getUser, storeToken, storeUser} from "../resources/InternalStorage"
import { NetworkInfo } from "react-native-network-info";

//let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzI3NzM1NTcsInN1YiI6MiwidXNlciI6Mn0.kFcTJT-YRVCBmRbWdknOpYDIT8TC6Nx1OAY0TJo1oQn6ktNDIISKW2c5kkGHjFOVKbsI5H1KJs90NYujdOCtU_9Rg6QW-h-INGaw02LCXmvSMY-DkGAVSyyT56PSISvKZ6KJPTkVA31h12iYZQ9PhNy6DfyCKu6AEXcE3VRPqGk"
const ip4v = await NetworkInfo.getIPV4Address();

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
    const query = "http://"+ ipv4 +":8080/login"
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

export {SignUp,ActivateAccount,UpdateUser}

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
    let request = await fetch(query, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    this.response = await this.request.json();

    if(this.request.status != 200){
        console.log("Error when querying user")
        return this.request.statusText
    }

    return this.response
}


// Helper

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

export {SignUp,ActivateAccount,UpdateUser,loginUser,getUserFromId}


async function UpdateUserProfile(gender, price, phoneNumber, firstName, name, username, email, city, plz, street, houseNumber, searchedSkills, achievedSkills){
    if (price == "" || gender == "" || phoneNumber == "" || firstName == "" || name == "" || username == "" || email == "" || city == "" || plz == "" || street == "" || houseNumber == "") {
        return
    }
    let priceNumber = parseInt(price)
    if (isNaN(priceNumber)){
        return "Price is not valid!"
    }
    let plzNumber = parseInt(plz)
    if (isNaN(plzNumber)){
        return "PLZ is not valid!"
    }
    let phoneNr = parseInt(phoneNumber)
    if (isNaN(phoneNr)){
        return "Phone Number is not valid!"
    }

    /*let genderNr
    switch (gender){
        case "Weiblich":
            genderNr = 2
            break
        case "Männlich":
            genderNr = 1
            break
        case "Divers":
            genderNr = 3
            break
    }*/

    const userId = await getUser().id
    const token = await getToken()

    let query = "http://"+ ip4v +":8080/profile/" + userId
    if (searchedSkills == "" & achievedSkills == ""){
        let user = {
            "firstName": firstName,
            "name": name,
            "gender": gender,
            "username": username,
            "email": email,
            "street": street,
            "houseNumber": houseNumber,
            "telephoneNumber": phoneNumber,
            "price": priceNumber,
            "city": {
                "plz": plzNumber,
                "place": city
            }
        }
    } else {
        let user = {
            "firstName": firstName,
            "name": name,
            "gender": gender,
            "username": username,
            "email": email,
            "street": street,
            "houseNumber": houseNumber,
            "telephoneNumber": phoneNumber,
            "price": priceNumber,
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
    let query = "http://"+ ip4v +":8080/skill/"
    const response = await fetch(query, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
    const resultData = await response.json();

    if (response.status != 200){
        return resultData.error;
    }
    return resultData;
}
export {GetAllSkills}

async function RemoveSkillFromUser(userId, skillId){
    if (uderId == "" || skillId == "") {
        return
    }

    let skillIdNr = parseInt(skillId)
    if (isNaN(skillIdNr)){
        return "User ID is not valid!"
    }
    let userIdNr = parseInt(userId)
    if (isNaN(userIdNr)){
        return "User ID is not valid!"
    }

    let query = "http://"+ ip4v +":8080/skill/"
    let data = {
        userid: userIdNr,
        skill_ids: [skillIdNr]
    }
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const resultData = await response.json();

    if (response.status != 200){
        return resultData.error;
    }
    return resultData;
}
export {RemoveSkillFromUser}