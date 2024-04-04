import { usePost, useDelete } from "@/hooks/api";

export const createCategory = async (categoryData, token) => {
    try {
        return await usePost("/api/v1/create-category", categoryData, token);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateCategory = async (categoryId, categoryData, token) => {
    try {
        return await usePost(`/api/v1/update-category/${categoryId}`, categoryData, token);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteCategory = async (categoryId, token) => {
    try {
        return await useDelete(`/api/v1/delete-category/${categoryId}`, token);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getAllCategories = async () => {
    try {
        return await axiosInstance.get("/api/v1/categories");
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getCategoryById = async (categoryId) => {
    try {
        return await axiosInstance.get(`/api/v1/category/${categoryId}`);
    } catch (error) {
        throw new Error(error.message);
    }
}