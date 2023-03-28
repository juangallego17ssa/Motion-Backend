import axios from "axios"


// const getToken = () => {
//     return localStorage.getItem("token")
// }

const myHeader = {
    // "Authorization": `Bearer ${getToken()}`,
    "Content-Type": "application/json"
}


const configAPI = {
    baseURL: ((process.env.NODE_ENV==="development") ? "http://localhost:8001/" : "https://motion-t3.propulsion-learn.ch/") + "backend/api/",
    headers: myHeader
}

const motionAPI = axios.create(
    configAPI
)

export default motionAPI