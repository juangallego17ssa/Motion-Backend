import axios from "axios"


// const getToken = () => {
//     return localStorage.getItem("token")
// }

const myHeader = {
    // "Authorization": `Bearer ${getToken()}`,
    "Content-Type": "application/json"
}


const configAPI = {
    baseURL: "https://motion.propulsion-home.ch/backend/api/",
    headers: myHeader
}

const motionAPI = axios.create(
    configAPI
)

export default motionAPI