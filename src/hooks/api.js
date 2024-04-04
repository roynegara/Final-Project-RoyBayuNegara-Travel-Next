
import axios from 'axios';

const baseURL = 'https://travel-journal-api-bootcamp.do.dibimbing.id';

const axiosInstance = axios.create({
  baseURL,
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k',
      
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
