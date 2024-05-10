import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
}

export const getAPI = async (path, data = '') => {
    const requestOptions = {
        method: 'GET',
        headers: headers,
    }
    try {
        const response = await axios.get(`${window.appSettings.API_BASE_URL}/${path}/${data}`, requestOptions);
        return response;
    } catch (error) {
        console.error(error)
    }
}

export const postAPI = async (path, data) => {
    const requestOptions = {
        method: 'POST',
        headers: headers,
    }
    try {
        const response = await axios.post(`${window.appSettings.API_BASE_URL}/${path}`, data, requestOptions);
        return response;
    } catch (error) {
        console.error(error)
    }
}

export const putAPI = async (path, data, payload) => {
    const requestOptions = {
        method: 'PUT',
        headers: headers,
    }
    try {
        const response = await axios.put(`${window.appSettings.API_BASE_URL}/${path}/${data}`, payload, requestOptions);
        return response;
    } catch (error) {
        console.error(error)
    }
}
