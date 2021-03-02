
import axios from 'axios'

const baseURL = 'http://localhost:8000/'
const accountsURL = `${baseURL}api/accounts/`
const projectsURL = `${baseURL}projects/`

let token = null

const setToken = (newToken) => {
    token = `token ${newToken}`
}

const login = async (credentials) => {
    console.log(credentials);
    const response = await axios.post(`${accountsURL}token/`, credentials)
    return response.data
}

const getUser = async () => {
    const config = {
        headers: { Authorization: token},
    }
    console.log(config);
    const response = await axios.get(`${accountsURL}me/`, config)
    return response.data
}

const createProject = async (payload) => {
    console.log(payload)
    const response = await axios.post(`${projectsURL}create/`, payload)
    return response.data
}

const register = async (credentials) => {
    console.log(credentials);
    const response = await axios.post(`${accountsURL}create/`, credentials)
    return response.data
}

export default {login, createProject, getUser, register, setToken};