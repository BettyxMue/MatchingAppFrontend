// @ts-nocheck
async function SignUp(username, email, city, plz, street, houseNumber){
    if (username == "" || email == "" || city == "" || plz == "" || street == "" || houseNumber == "") {
        return
    }
    var plzNumber = parseInt(plz)
    if (isNaN(plzNumber)){
        return "PLZ is not valid!"
    }
    var query = "http://192.168.178.20:8080/signUp"
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
    console.log(resultData);
    return resultData;
}

async function ActivateAccount(userid, code){
    if (userid == "" || code == ""){
        return
    }
    var codeDTO = {
        "Code": code
    }
    query = "http://192.168.178.20:8080/activate/" + userid;
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
    return true;
}

async function UpdateUser(user){
    if (user == null) {
        return
    }
    query = "http://192.168.178.20:8080/profile/" + user.id;
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzE0NjcxODQsInN1YiI6MSwidXNlciI6MX0.VZkq30ZYJ2OM9ka4xGuv1o9SwHExpTn5ws4W42AjZVpuSakRWs6fV1h9_fahuBUAzAS-85CJnREi7kVvP5WTiG8eipfjfN_BkqZQCLb55-786H468SHdtmkn-F3sYa6j0aLOmpaEPyJLiGM_GzerAi7Iu4rFzFqF54PuHKNXl-v_wU5KvtQZY-KeB-G7fy2rPIimSJveIXKieElBkQrO2wKu6CP_CkF-l1-r4vSgU1qahfwsoXYMw9F66CTXM1cNFnUjWgKyCHTfprM8SyOtJX9iKALzzQk5SbOie6NepxHpLGxTpsvgcFzr-e_q41kOPALyhlhYyNhMphqczRbETg'
        },
        body: JSON.stringify(user)
    });
    const resultData = await response.json();

    if (response.status != 200){
        console.log(resultData.error)
        return resultData.error;
    }
    return true;

}

export {SignUp,ActivateAccount,UpdateUser}