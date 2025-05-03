import axios from "axios";


const token = localStorage.getItem("remember_token");

const instance = axios.create({
    baseURL: "https://100m.uz/api",
    headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), 
    },
});


export default instance;