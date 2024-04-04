import { usePost, useDelete } from "@/hooks/api";

export const createActivity = async (activityData, token) => {
  try {
    return await usePost("/api/v1/create-activity", activityData, token);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateActivity = async (activityId, activityData, token) => {
  try {
    return await usePost(`/api/v1/update-activity/${activityId}`, activityData, token);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteActivity = async (activityId, token) => {
  try {
    return await useDelete(`/api/v1/delete-activity/${activityId}`, token);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllActivities = async () => {
  try {
    return await axiosInstance.get("/api/v1/activities");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getActivityById = async (activityId) => {
  try {
    return await axiosInstance.get(`/api/v1/activity/${activityId}`);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getActivitiesByCategoryId = async (categoryId) => {
  try {
    return await axiosInstance.get(`/api/v1/activities-by-category/${categoryId}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
