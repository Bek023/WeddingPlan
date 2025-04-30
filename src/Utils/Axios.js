import axios from "axios";


const instance = axios.create({
    baseURL: "https://100m.uz/api",
    headers: {
        "Content-Type": "text/json",
    },
});

export default instance;