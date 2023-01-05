// @ts-nocheck

import {getUser} from "../resources/InternalStorage";

const ip4v = "192.168.0.207"

async function Like(userId1, userId2){
    if (userId1 == "" || userId2 == "") {
        return
    }
    let query = "http://" + ip4v + ":8084/like"
    let like = {
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
    var query = "http://" + ip4v + ":8084/dislike"
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

async function Searching(searchId){
    if (searchId == undefined) {
        return
    }
    const userStore = await getUser()
    const userId = userStore.id
    const query = "http://" + ip4v + ":8084/searching/" + searchId + "/" + userId;
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

async function CreateSearch(searchId, name, skill, level, gender, radius){
    if (searchId == "" || name == "" || skill == "" || level == "" || gender == "" || radius == "") {
        return
    }
    var query = "http://" + ip4v + ":8084/search"
    var search = {
        "searchid": searchId,
        "name": name,
        "skill": skill,
        "level": level,
        "gender": gender,
        "radius": radius
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
    var query = "http://" + ip4v + ":8084/search/" + searchId;

    const response = await fetch(query, {
        method: 'DEL',
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
    var query = "http://" + ip4v + ":8084/match/" + matchId;

    const response = await fetch(query, {
        method: 'DEL',
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
    const query = "http://" + ip4v + ":8084/search/user/" + userId;
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

async function Exploring(){
    const userStore = await getUser()
    const userId = userStore.id
    const query = "http://" + ip4v + ":8084/exploring/" + userId;
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
export {Exploring}