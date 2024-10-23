import axios from "axios";

const backendUrl = 'http://localhost:8080/api';

export async function findUserByEmail(token, user) {
    const url = backendUrl + '/user/find-by-email/' + user;
    const method = "GET";
    const headers = {'Authorization': token};
    try {
        const response = await axios({
            method: method,
            url: url,
            headers: headers
        });
        return {response, error: ''};
    } catch (error) {
        console.log(error);
        return {response: '', error}
    }
}

export async function handleDeleteActiveAccount(password, id, token) {
    const data = {oldPassword: password};
    const url = backendUrl + '/user/delete-account/' + id;
    const method = "DELETE";
    const config = {'Authorization': token}
    return handleBackendChangeCall(url, data, config);
}

export async function handleUsernameChange(username, password, id, token) {
    const data = {newUsername: username, oldPassword: password};
    const url = backendUrl + '/user/change-username/' + id;
    const config = {
        'Authorization': token
    }
    return handleBackendChangeCall(url, data, config);
}

export async function handleNewPasswordChange(newPassword, oldPassword, id, token) {
    const data = {newPassword, oldPassword};
    const url = backendUrl + '/user/change-password/' + id;
    const config = {
        Authorization: token
    }
    return handleBackendChangeCall(url, data, config);
}

export async function handleEmailChange(newEmail, oldPassword, id, token) {
    const data = {newEmail, oldPassword};
    const url = backendUrl + '/user/change-email/' + id
    const config = {
        Authorization: token
    };
    return handleBackendChangeCall(url, data, config);
}


export async function handleRecoveryCall(email) {
    const data = {email};
    const url = backendUrl + `/user/recovery`;
    const method = "POST";

    return handleBackendCall(data, url, method)
}

export async function handleSignInCall(email, password) {
    const data = {"username": email, password};
    const url = backendUrl + `/user/login`;
    const method = "POST";

    return handleBackendCall(data, url, method);
}

export async function handleSignUpCall(email, username, password) {
    const data = {email, username, password};
    const url = backendUrl + `/user/register`
    const method = "POST";

    return handleBackendCall(data, url, method)
}

async function handleBackendCall(data, url, method) {
    try {
        const response = await axios({
            method: method,
            data: data,
            url: url
        });
        return {response, error: ''};
    } catch (error) {
        console.log(error.data);
        return {response: "", error};
    }


}

async function handleBackendChangeCall(url, data, config) {
    console.log("URL: ", url);
    console.log("DATA: ", data);
    console.log("CONFIG: ", config);
    try{
        const response = await axios({
            // This should REALLY REALLY REALLY be a PUT mapping,
            // but PUT doesnt want to work and changing to POST allows it to work
            // spent too much time on this to really want.
            // PUT mapping gave me a generic "axios network error"
            // and no one seems to know how to fix it so this is staying.
            // and no one seems to know how to fix it so this is staying.
            method: "POST",
            data: data,
            url: url,
            headers: config
        });
        console.log(response);
        return {response, error: ""};
    } catch(error) {
        if (error.response){
            console.log("RESPONSE STATUS: ", error.response.status);
            console.log("RESPONSE: ", error.response);
            console.log("HEADERS: ", error.headers);
            console.log("DATA: ", error.response.data);
        } else if (error.request){
            console.log("REQUEST: ", error.request);
        }
        console.log("CONFIG: ", error.config);
        return {response: "", error};
    }
}