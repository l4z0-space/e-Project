
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
    console.log(response.data);
    return response.data
}

const getUser = async () => {
    const config = {
        headers: { Authorization: `${token}`},
    }
    console.log(config);
    const response = await axios.get(`${accountsURL}me/`, config)
    return response.data
}

const createProject = async (payload) => {
    const userToken = JSON.parse(window.localStorage.getItem('user')).token
    const config = {
        headers: {Authorization: userToken},
    }
    const response = await axios.post(`${projectsURL}create/`, payload, config)
    return response.data
}

const getRecentProjects = async () => {
    const response = await axios.get(`${projectsURL}recentProjects/`)
    return response.data
}

const register = async (credentials) => {
    console.log(credentials);
    const response = await axios.post(`${accountsURL}create/`, credentials)
    return response.data
}

export default {login, getRecentProjects, createProject, getUser, register, setToken};