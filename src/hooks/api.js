import axios from 'axios'

const baseURL = 'https://travel-journal-api-bootcamp.do.dibimbing.id';

const axiosInstance = axios.create({ 
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export const usePost = async (url, data, token) => {
    try {
        const response = await axiosInstance.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        // return error.response.data
        throw new Error(error.response.data.message || error.message)
    }
}

export const useDelete = async (url, token) => {
    try {
        const response = await axiosInstance.delete(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        // return error.response.data
        throw new Error(error.response.data.message || error.message)
    }
}