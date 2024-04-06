import { usePost, useGet } from "@/hooks/api";
import { axiosInstance } from "@/hooks/api";
import axios from "axios";

export const updateUserProfile = async (userData, token) => {
    
try {
    return await usePost('/api/v1/update-profile', userData, token)
} catch (error) {
    throw new Error(error.message);
}
};

export const updateUserRole = async (userId, userData, token) => {
try {
    return await usePost(`/api/v1/update-user-role/${userId}`, userData, token)
} catch (error) {
    throw new Error(error.message);
}
};


export const getAllUsers = async () => {
    try {
        return await useGet(`/api/v1/all-user`);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getLoggedUser = async () => {
    try {
        return await useGet(`/api/v1/user`);
    } catch (error) {
        throw new Error(error.message);
    }
}