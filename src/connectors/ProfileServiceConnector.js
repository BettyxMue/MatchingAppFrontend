// @ts-nocheck

import { getToken, storeToken } from "../resources/InternalStorage"

let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzI2MDMxMzcsInN1YiI6MiwidXNlciI6Mn0.fQ7DX2j6u5qSu3bfsR8zQaNUytL_bk2z4IGkmZeIQ2mEH3wLYEb6LPSyPc3oXpzeQghliJgzKuvG1Cs-LIR3rkBsz36-z7lnzBGHShPiNR-O-PFfBGTtSCvXLCUCCXy5ZjjP_njMe1WFJ5oeRGJKieEn8btLkeSKkqp6DeUWUaw"

async function SignUp(username, email, city, plz, street, houseNumber){
    if (username == "" || email == "" || city == "" || plz == "" || street == "" || houseNumber == "") {
        return
    }
    var plzNumber = parseInt(plz)
    if (isNaN(plzNumber)){
        return "PLZ is not valid!"
    }
    var query = "http://192.168.0.159:8080/signUp"
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
    let query = "http://192.168.0.159:8080/activate/" + userid;
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
    let query = "http://192.168.0.159:8080/profile/" + user.id;
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
    let query = "http://192.168.0.159:8080/profile/" + userId;
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

async function UpdateUserProfile(userId, gender, price, phoneNumber, firstName, name, username, email, city, plz, street, houseNumber, token){
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

    let query = "http://192.168.0.159:8080/profile/" + userId
    let user = {
        "firstName": firstName,
        "name": name,
        "gender": gender,
        "username": username,
        "email": email,
        "street": street,
        "houseNumber": houseNumber,
        "telephoneNumber": phoneNumber,
        //"password": pw,
        "price": priceNumber,
        "city": {
            "plz": plzNumber,
            "place": city
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

async function AddSkill(skillName, level){
    if (skillName == "" || level == "") {
        return
    }

    let query = "http://192.168.0.159:8080/skill/"
    let skill = {
        "name": skillName,
        "level": level
    }
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(skill)
    });
    const resultData = await response.json();

    if (response.status != 200){
        return resultData.error;
    }
    return resultData;
}
export {AddSkill}

async function GetAllSkills(){
    let query = "http://192.168.0.159:8080/skill/"
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

    let query = "http://192.168.0.159:8080/skill/"
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