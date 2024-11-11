import axios from 'axios';

export const registerUser = async (data) => {
  try {
    const res = await axios.post('http://localhost:8000/api/register', data);
    return res;
  } catch (error) {
    throw error.response?.data?.message || "Network error or server error. Please try again.";
  }
};

export const loginUser = async (data) => {
    const res = await axios.post('http://localhost:8000/api/login', data);
    return res;
  };