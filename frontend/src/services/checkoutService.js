import axios from 'axios';

export const checkoutAPI = async (orderData) => {
  const response = await axios.post(`http://localhost:8000/api/checkout`, orderData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
};

