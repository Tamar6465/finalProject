import axios from "axios"


const registerUser=(data)=>{
    axios.post("http://localhost:8200/accessiableHeaven/api/v1/users/register", data)
    .then((response) => {
        console.log(response);
        return response;
    })
    .catch((error) => {
        if (error.response) {
            console.log("Status code:", error.response.status);
            console.log("Response data:", error.response.data);
        }
    });
}

const registerOwner=(data)=>{
    axios.post("http://localhost:8200/accessiableHeaven/api/v1/owners/register", data)
    .then((response) => {
        console.log(response);
        return response;
    })
    .catch((error) => {
        if (error.response) {
            console.log("Status code:", error.response.status);
            console.log("Response data:", error.response.data);
        }
    });
}

const loginUser = async (data) => {
    axios.post("http://localhost:8200/accessiableHeaven/api/v1/users/login", data)
        .then((response) => {
            console.log(response);
            return response
        })
        .catch((error) => {
            if (error.response) {
                console.log("Status code:", error.response.status);
                console.log("Response data:", error.response.data);
            }
        });
}
const loginOwner = async (data) => {
    axios.post("http://localhost:8200/accessiableHeaven/api/v1/owners/login", data)
        .then((response) => {
            console.log(response);
            return response
        })
        .catch((error) => {
            if (error.response) {
                console.log("Status code:", error.response.status);
                console.log("Response data:", error.response.data);
            }
        });
}



export {registerUser,loginUser,loginOwner,registerOwner}