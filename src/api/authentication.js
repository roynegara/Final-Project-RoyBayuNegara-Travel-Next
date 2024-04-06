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
        return await usePost('/api/v1/login', userData)
    } catch (error) {
        throw new Error(error.message)
    }
  
}
// export const loginUser = async (userData) => {
//     try {
//         return await usePost('/api/v1/login', userData)
//     } catch (error) {
//         throw new Error(error.message)
//     }
// }

export const logoutUser = async (token) => {
    try {
        return await usePost('/api/v1/logout', token, {
            headers: {
                "Content-Type": "application/json",
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
            }
        },
        ) 
        const token = localStorage.getItem("access_token");
        console.log("access_token", token);
    } catch (error) {
        throw new Error(error.message)
    }
}