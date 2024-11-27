import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Response Interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,  // Return the response if no error
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or not valid
      alert('Your session has expired. Please log in again.');
      localStorage.removeItem('token');  // Remove expired token
      window.location.href = '/login';  // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export const fetchOrders = async () => {
  const response = await api.get('/orders');
  return response.data.orders;
};

export const changeUserRole = async (userID, action) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("No token found, please log in.");
  }

  const endpoint = action === "promote" ? "promote" : "demote";
  await api.post(`/${endpoint}`, { userID }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data.users;
};
