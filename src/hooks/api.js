
import axios from 'axios';

const baseURL = 'https://travel-journal-api-bootcamp.do.dibimbing.id';

const axiosInstance = axios.create({
  baseURL,
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
  },
});

export const usePost = async (url, data, token) => {
  try {
    const response = await axiosInstance.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const useDelete = async (url, token) => {
  try {
    const response = await axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};
