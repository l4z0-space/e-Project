
import axios from 'axios'
const baseURL = 'http://localhost:8000/api/accounts/'

let token = null

const setToken = (newToken) => {
    token = `token ${newToken}`
}

const login = async (credentials) => {
    console.log(credentials);
    const response = await axios.post(`${baseURL}token/`, credentials)
    return response.data
}

const getUser = async () => {
    const config = {
        headers: { Authorization: token},
    }
    console.log(config);
    const response = await axios.get(`${baseURL}me/`, config)
    return response.data
}


const register = async (credentials) => {
    console.log(credentials);
    const response = await axios.post(`${baseURL}create/`, credentials)
    return response.data
}



export default {login, getUser, register, setToken};