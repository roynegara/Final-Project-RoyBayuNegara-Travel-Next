import { usePost, useDelete } from "@/hooks/api";

export const createPromo = async (promoData, token) => {
    try {
        return await usePost("/api/v1/create-promo", promoData, token);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updatePromo = async (promoId, promoData, token) => {
    try {
        return await usePost(`/api/v1/update-promo/${promoId}`, promoData, token);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deletePromo = async (promoId, token) => {
    try {
        return await useDelete(`/api/v1/delete-promo/${promoId}`, token);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getAllPromos = async () => {
    try {
        return await axiosInstance.get("/api/v1/promos");
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getPromoById = async (promoId) => {
    try {
        return await axiosInstance.get(`/api/v1/promo/${promoId}`);
    } catch (error) {
        throw new Error(error.message);
    }
}