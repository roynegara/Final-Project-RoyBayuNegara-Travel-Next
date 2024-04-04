import { usePost, useDelete } from "@/hooks/api";

export const createBanner = async (bannerData, token) => {
  try {
    return await usePost("/api/v1/create-banner", bannerData, token);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateBanner = async (bannerId, bannerData, token) => {
  try {
    return await usePost(`/api/v1/update-banner//${bannerId}`, bannerData, token);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteBanner = async (bannerId, token) => {
  try {
    return await useDelete(`/api/v1/delete-banner/${bannerId}`, token);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllBanners = async () => {
  try {
    return await axiosInstance.get("/api/v1/banners");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getBannerById = async (bannerId) => {
  try {
    return await axiosInstance.get(`/api/v1/banner/${bannerId}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
