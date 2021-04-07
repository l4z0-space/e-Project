
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
    // get user token and project id
    const userToken = JSON.parse(Cookies.get('user')).token

    const p_id = payload['id']
    const config = {
        headers: {Authorization: userToken},
    }

    const url = `${projectsURL}update/${p_id}`
    const response = await axios.post(url, payload, config)
    
    return response.data
}

const  upload_projects = async (contentType, data) => {
    const userToken = JSON.parse(Cookies.get('user')).token
    const config = {
        headers: {
            "Authorization": userToken,
            "Content-Type":contentType
        },
    }

    const response = await axios.post(
                        `${projectsURL}upload/`,
                        data,
                        config
                    )
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


// eslint-disable-next-line import/no-anonymous-default-export
export default {login,upload_projects, deleteProject, getAllProjects, getProject, updateProject, getRecentProjects, createProject, getUser, register, setToken};