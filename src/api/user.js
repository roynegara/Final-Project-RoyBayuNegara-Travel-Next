import { usePost } from "@/hooks/api";

export const updateUserProfile = async (userData, token) => {
  try {
    return await usePost("api/v1/update-profile", userData, token);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserRole = async (userId, userData, token) => {
  try {
    return await usePost(`/api/v1/update-user-role/${userId}`, userData, token);
  } catch (error) {
    throw new Error(error.message);
  }
};
