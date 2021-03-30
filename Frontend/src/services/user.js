
import axios from 'axios'
import Cookies from 'js-cookie'

const baseURL = 'http://localhost:8000/'
const accountsURL = `${baseURL}api/accounts/`
const projectsURL = `${baseURL}projects/`

let token = null

const setToken = (newToken) => {
    token = `token ${newToken}`
}

const login = async (credentials) => {
    const response = await axios.post(`${accountsURL}token/`, credentials)
    return response.data
}

const getUser = async () => {
    const config = {
        headers: { Authorization: `${token}`},
    }
    const response = await axios.get(`${accountsURL}me/`, config)
    return response.data
}

const createProject = async (payload) => {
    const userToken = JSON.parse(Cookies.get('user')).token
    const config = {
        headers: {Authorization: userToken},
    }
    const response = await axios.post(`${projectsURL}create/`, payload, config)
    return response.data
}

const getProject = async (id) => {
    const response = await axios.get(`${projectsURL}getProject/${id}`)
    return response.data
}

const deleteProject = async(id) => {
    // Get token
    const userToken = JSON.parse(Cookies.get('user')).token
    const config = {
        headers: {Authorization: userToken},
    }

    const response = await axios.delete(`${projectsURL}delete/${id}`, config)

    return response.data
}

const updateProject = async (payload) => {
    const p_id = payload['id']
    const url = `${projectsURL}update/${p_id}`
    const response = await axios.put(url, payload)
    
    return response.data
}

const getRecentProjects = async () => {
    const response = await axios.get(`${projectsURL}recentProjects/`)
    return response.data
}

const register = async (credentials) => {
    const response = await axios.post(`${accountsURL}create/`, credentials)
    return response.data
}


const getAllProjects = async () => {
    const response = await axios.get(`${projectsURL}list/`)
    return response.data
}


export default {login, deleteProject, getAllProjects, getProject, updateProject, getRecentProjects, createProject, getUser, register, setToken};