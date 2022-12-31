// @ts-nocheck

async function Like(userId1, userId2){
    if (userId1 == "" || userId2 == "") {
        return
    }
    var query = "http:// 192.168.0.154:8084/like"
    var like = {
        "likerid": userId1,
        "likedid": userId2
    }
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(like)
    });
    const resultData = await response.json();
    if (response.status != 200){
        return resultData.error;
    }
    return resultData;
}
export {Like}

async function Dislike(userId1, userId2){
    if (userId1 == "" || userId2 == "") {
        return
    }
    var query = "http://192.168.0.154:8084/dislike"
    var dislike = {
        "dislikerid": userId1,
        "dislikedid": userId2
    }
    const response = await fetch(query, {
        method: 'PUT',
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'Content-type': 'application/json'
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(dislike)
    });
    const resultData = await response.json();
    if (response.status != 200){
        return resultData.error;
    }
    return resultData;
}
export {Dislike}

async function Searching(searchId, userId){
    if (searchId == "" || userId == "") {
        return
    }
    let query = "http:// 192.168.0.154:8084/searching/" + searchId + "/" + userId;
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
export {Searching}

async function CreateSearch(name, skill, level, gender, radius, userId){
    if (name == "" || skill == "" || level == "" || gender == "" || radius == "" || userId == "") {
        return
    }

    let skillNr = parseInt(skill)
    if (isNaN(skillNr)){
        return "Skill is not valid!"
    }
    let genderNr = parseInt(gender)
    if (isNaN(genderNr)){
        return "Gender is not valid!"
    }
    let radiusNr = parseInt(radius)
    if (isNaN(radiusNr)){
        return "Radius is not valid!"
    }
    let userIdNr = parseInt(userId)
    if (isNaN(userIdNr)){
        return "User ID is not valid!"
    }

    let query = "http://192.168.0.154:8084/search"
    let search = {
        "name": name,
        "skill": skillNr,
        "level": level,
        "gender": genderNr,
        "radius": radiusNr,
        "created_by": userIdNr
    }
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(search)
    });
    const resultData = await response.json();
    if (response.status != 200){
        return resultData.error;
    }
    return resultData;
}
export {CreateSearch}

async function DeleteSearch(searchId){
    if (searchId == "") {
        return
    }
    var query = "http://192.168.0.154:8084/search/" + searchId;

    const response = await fetch(query, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
    });
    const resultData = await response.json();
    if (response.status != 200){
        return resultData.error;
    }
    return resultData;
}
export {DeleteSearch}

async function DeleteMatch(matchId){
    if (matchId == "") {
        return
    }
    var query = "http://192.168.0.154:8084/match/" + matchId;

    const response = await fetch(query, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
    });
    const resultData = await response.json();
    if (response.status != 200){
        return resultData.error;
    }
    return resultData;
}
export {DeleteMatch}

async function GetSearchesByUser (userId) {
    if (userId == "") {
        return
    }
    let query = "http://192.168.0.154:8084/search/user/" + userId;
    const response = await fetch(query, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    });
    const resultData = await response.json();
    if (response.status != 200){
        return resultData.error;
    }
    return resultData;
}
export {GetSearchesByUser}

async function UpdateSearch(searchId, name, skill, level, gender, radius, userId){
    if (searchId == "" || name == "" || skill == "" || level == "" || gender == "" || radius == "" || userId == "") {
        return
    }

    let skillNr = parseInt(skill)
    if (isNaN(skillNr)){
        return "Skill is not valid!"
    }
    let genderNr = parseInt(gender)
    if (isNaN(genderNr)){
        return "Gender is not valid!"
    }
    let radiusNr = parseInt(radius)
    if (isNaN(radiusNr)){
        return "Radius is not valid!"
    }
    let userIdNr = parseInt(userId)
    if (isNaN(userIdNr)){
        return "User ID is not valid!"
    }

    let query = "http://192.168.0.154:8084/search/" + searchId
    let search = {
        "name": name,
        "skill": skillNr,
        "level": level,
        "gender": genderNr,
        "radius": radiusNr,
        "created_by": userIdNr
    }
    const response = await fetch(query, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(search)
    });
    const resultData = await response.json();
    if (response.status != 200){
        return resultData.error;
    }
    return resultData;
}
export {UpdateSearch}