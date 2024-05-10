import axios from 'axios';

export const getAPI = async (path, data = '') => {
    const requestOptions = {
        method: 'GET',
    }
    try {
        const apiURL = (data === '') ? `${path}` : `${path}/${data}`
        const response = await axios.get(`${window.appSettings.API_BASE_URL}/${apiURL}`, requestOptions);
        return response;
    } catch (error) {
        console.error(error)
    }
}

export const postAPI = async (path, data) => {
    const requestOptions = {
        method: 'POST',
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
    }
    try {
        const response = await axios.put(`${window.appSettings.API_BASE_URL}/${path}/${data}`, payload, requestOptions);
        return response;
    } catch (error) {
        console.error(error)
    }
}
