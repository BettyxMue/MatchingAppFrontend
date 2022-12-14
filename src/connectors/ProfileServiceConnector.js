async function SignUp(username, email){
    if (username == "" || email == "") {
        return
    }
    var query = "http://<localIp>:8080/signUp"
    var user = {
        "username": username,
        "email": email
    }
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const resultData = await response.json();

    console.log(resultData)
    
    return resultData;
}

export {SignUp}