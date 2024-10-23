import axios from "axios";

const url = 'http://localhost:8080/api/user/change-email/3';

const data = {
    "newEmail": "test",
    "oldPassword": "Engage77"
};
const config = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzA5MTE2MTUzfQ.HylcyJN6CdsOBfRuxy-Hs2v2VFhpuLJmRPH4A3-FLUyK8J6C49_wI8ew17apjKOFMFsUIeBB_iw09y5NIoHkDw'
    }
};

console.log("URL: ", url);
console.log("DATA: ", data);
console.log("CONFIG: ", config);

axios.put(url,data,config)
    .then(response => {
        console.log("Response recieved: ")
        console.log(response.data)
    })
    .catch(error => {
        if (error.response) {
            console.log("Error response received: ",
                error.response.data);
            console.log("Response status:",
                error.response.status);
            console.log("Response headers:",
                error.response.headers)
        } else if (error.request) {
            console.log('Request:',
                error.request)
        } else {
            console.log('Error:', error.message);
        }
        console.log('Config:', error.config);
    })
