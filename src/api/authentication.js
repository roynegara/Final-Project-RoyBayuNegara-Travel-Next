import { usePost } from "@/hooks/api";

export const registerUser = async (userData, token) => { 
    try {
        return await usePost('/api/v1/register', userData, token)
    } catch (error) {
        throw new Error(error.message)
    }
}
// export const registerUser = async (userData) => { 
//     try {
//         return await usePost('/authentication/register', userData)
//     } catch (error) {
//         throw new Error(error.message)
//     }
// }

export const loginUser = async (userData) => {
    try {
        return await usePost('/authentication/login', userData)
    } catch (error) {
        throw new Error(error.message)
    }
}

export const logoutUser = async (token) => {
    try {
        return await usePost('/authentication/logout', {}, token) 
    } catch (error) {
        throw new Error(error.message)
    }
}