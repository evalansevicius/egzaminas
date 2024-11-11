import axios from 'axios';

export const fetchOrders = async () => {
  const response = await axios.get('http://localhost:8000/api/orders');
  return response.data.orders;
};

export const changeUserRole = async (userID, action) => {
  const token = localStorage.getItem("token");
  const endpoint = action === "promote" ? "promote" : "demote";
  await axios.post(`http://localhost:8000/api/${endpoint}`, { userID }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
