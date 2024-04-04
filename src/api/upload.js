import { usePost } from "@/hooks/api";

export const uploadImage = async (imageData, token) => {
    try {
        return await usePost("/api/v1/upload-image", imageData, token);
    } catch (error) {
        throw new Error(error.message);
    }
}